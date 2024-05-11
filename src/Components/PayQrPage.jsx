import InfoItem from "@/components/lib/info-item"
import styles from "./styles.module.css"
import Agreement from "@/components/lib/agreement"
import formatPrice from "@/utils/format-price"
import SbpLogo from "public/images/sbp-logo.png"
import { QRCode } from "react-qrcode-logo"
import { useEffect, useLayoutEffect, useState } from "react"
import { useRouter } from "next/router"
import { InfoType } from "@/types"
import useWebSocket, { ReadyState } from "react-use-websocket"
import Link from "next/link"
import isMobile from "is-mobile"

const WS_URL = "wss://acquiring.foreignpay.ru/ws/"

type ResponseMessageType = {
    status: string
}

const PayQrPage = () => {
    const router = useRouter()
    const [info, setInfo] = useState<InfoType>()
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<ResponseMessageType>(WS_URL)

    useEffect(() => {
        if (readyState === ReadyState.OPEN && info) {
            sendJsonMessage({ transaction_id: info.uuid })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readyState])

    useEffect(() => {
        if (!lastJsonMessage || lastJsonMessage.status === "connected") { return }
        if (lastJsonMessage.status) {
            router.push(`/success-pay?redirect_url=${info?.success_url}`)
        } else {
            router.push(`/failed-pay`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastJsonMessage, router])

    useLayoutEffect(() => {
        if (localStorage) {
            const infoData = JSON.parse(localStorage.getItem("info") as string)

            if (!infoData) {
                router.push("/404?redirected=true")
            } else {
                setInfo(infoData)
            }

        }
    }, [router])

    if (!info) return null

    return (
        <div className={styles.root}>
            <div className={styles.qrWrapper}>
                <Link
                    href={info.sbp_url}
                    target="_blank"
                    className={styles.qrCode}
                    onClick={event => !isMobile() && event.preventDefault()}
                >
                    <QRCode
                        size={700}
                        value={info.sbp_url}
                        logoImage={SbpLogo.src}
                        logoWidth={209}
                        logoHeight={209}
                        quietZone={2}
                        fgColor="#170038"
                        ecLevel="H"
                        removeQrCodeBehindLogo
                    />
                    <p className={styles.QRdescription}>нажмите на QR</p>
                </Link>
            </div>
            <div className={styles.infoWrapper}>
                <h1 className={styles.title}>Для оплаты отсканируйте QR-код</h1>
                <p className={styles.subTitle}>Что бы оплатить, вам нужно отсканировать <span className={styles.bold}>QR-код</span> в мобильном приложении банка или с помощью камеры вашего телефона.</p>
                <div className={styles.infoItemsWrapper}>
                    <InfoItem
                        title="К оплате:"
                        value={`${formatPrice(info.amount)}₽`}
                        className={styles.price}
                    />
                    <InfoItem
                        title="Назначение платежа:"
                        value={info.description}
                        className={styles.accountNumber}
                    />
                </div>
                <Agreement className={styles.agreement} />
            </div>
        </div>
    )
}

export default PayQrPage