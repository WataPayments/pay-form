import "./styles.css";
import sbpLogo from '../../../Images/sbp-logo.png';
import { QRCode } from "react-qrcode-logo";
import { useEffect, useLayoutEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import isMobile from "is-mobile";
import Agreement from "../../agreenent";
import InfoItem from "../../info-item";
import formatPrice from "../../../utils/format-price";
import {Link, useNavigate} from "react-router-dom";

const WS_URL = "wss://acquiring.foreignpay.ru/ws/";


const PayQrPage = () => {
    const navigate=useNavigate();
    const [info, setInfo] = useState(null);
    const { sendJsonMessage, lastJsonMessage, readyState } =
        useWebSocket(WS_URL);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && info) {
            sendJsonMessage({ transaction_id: info.uuid });
        }
    }, [readyState, info, sendJsonMessage]);

    useEffect(() => {
        if (!lastJsonMessage || lastJsonMessage.status === "Paid") {
            return;
        }
        if (lastJsonMessage.status) {
            navigate(`/success-pay/${info?.success_url}`);
        } else {
            navigate(`/error-pay`);
        }
    }, [lastJsonMessage, navigate, info]);

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
                        logoImage={sbpLogo.src}
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
                    Чтобы оплатить, вам нужно отсканировать{" "}
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
