import InfoItem from "../../info-item";
import  "./styles.css";
import Agreement from "../../agreenent";
import formatPrice from "./../../../utils/format-price";
import SbpLogo from "./images/sbp-logo.png";
import "./react-app-env";
import { QRCode } from "react-qrcode-logo";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { InfoType } from "../../../types";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Link from "next/link";
import isMobile from "is-mobile";

const WS_URL = "wss://acquiring.foreignpay.ru/ws/";

type ResponseMessageType = {
    status: string;
};

const PayQrPage = () => {
    const router = useRouter();
    const [info, setInfo] = useState<InfoType>();
    const { sendJsonMessage, lastJsonMessage, readyState } =
        useWebSocket<ResponseMessageType>(WS_URL);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && info) {
            sendJsonMessage({ transaction_id: info.uuid });
        }
    }, [readyState]);

    useEffect(() => {
        if (!lastJsonMessage || lastJsonMessage.status === "connected") {
            return;
        }
        if (lastJsonMessage.status) {
            router.push(`/success-pay?redirect_url=${info?.success_url}`);
        } else {
            router.push(`/failed-pay`);
        }
    }, [lastJsonMessage, router]);

    useLayoutEffect(() => {
        if (localStorage) {
            const infoData = JSON.parse(localStorage.getItem("info") as string);

            if (!infoData) {
                router.push("/404?redirected=true");
            } else {
                setInfo(infoData);
            }
        }
    }, [router]);

    if (!info) return null;

    return (
        <div className={"root"}>
            <div className={"qrWrapper"}>
                <Link
                    href={info.sbp_url}
                    target="_blank"
                    className={"qrCode"}
                    onClick={(event) => !isMobile() && event.preventDefault()}
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
                    <p className={"QRdescription"}>нажмите на QR</p>
                </Link>
            </div>
            <div className={"infoWrapper"}>
                <h1 className={"title"}>Для оплаты отсканируйте QR-код</h1>
                <p className={"subTitle"}>
                    Что бы оплатить, вам нужно отсканировать{" "}
                    <span className={"bold"}>QR-код</span> в мобильном приложении
                    банка или с помощью камеры вашего телефона.
                </p>
                <div className={"infoItemsWrapper"}>
                    <InfoItem
                        title="К оплате:"
                        value={`${formatPrice(info.amount)}₽`}
                        className={"price"}
                    />
                    <InfoItem
                        title="Назначение платежа:"
                        value={info.description}
                        className={"accountNumber"}
                    />
                </div>
                <Agreement className={"agreement"} />
            </div>
        </div>
    );
};

export default PayQrPage;
