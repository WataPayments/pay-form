import "./styles.css";
import sbpLogo from "../../../Images/sbp-logo.png";
import { QRCode } from "react-qrcode-logo";
import { useEffect, useState, useContext, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../App";
import { TransactionInfo } from "../../TransactionInfo/TransactionInfo";
import Overlay from "../../Overlay";
import isMobile from "is-mobile";
import { ThemeContext } from "../../../App";
import logoDark from "../../../Images/Logo.svg";
import logoLight from "../../../Images/LogoLight.svg";
import { sendGaEvent } from "../../../utils/ga";
const WS_URL = "wss://acquiring.foreignpay.ru/ws/";

const PayQrPage = () => {
  const navigate = useNavigate();
  const { transactionData, loading, setTransactionData } =
    useContext(DataContext);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL);
  const [showOverlay, setShowOverlay] = useState(false);
  const theme = useContext(ThemeContext);

  const handleOverlayToggle = useCallback(() => {
    if (!showOverlay) {
      sendGaEvent("OfertaView_SBP", {
        transaction_id: transactionData.uuid,
        payment_method: transactionData.methods,
      });
    }
    setShowOverlay(!showOverlay);
  }, [showOverlay, transactionData]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN && transactionData) {
      sendJsonMessage({ transaction_id: transactionData.uuid });
    }
  }, [readyState, transactionData, sendJsonMessage]);

  useEffect(() => {
    console.log(lastJsonMessage);
    if (!lastJsonMessage || lastJsonMessage.status === "Paid") {
      return;
    }

    if (lastJsonMessage.status && lastJsonMessage.status !== "connected") {
      if (lastJsonMessage.status === "true") {
        setTransactionData((prev) => ({
          ...prev,
          status: "Paid",
        }));
      }

      navigate(`/result-pay/${transactionData.uuid}`);
    }
  }, [lastJsonMessage, navigate, transactionData]);

  const handleCancelClick = useCallback(() => {
    if (transactionData) {
      navigate(`/${transactionData.uuid}`);
    }
  }, [transactionData, navigate]);

  if (loading) {
    return (
      <div className="loader-block">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="qr-page-wrapper">
      <div
        className="order-info-block"
        style={isMobile() ? { marginTop: "20px" } : {}}
      >
        <TransactionInfo transactionData={transactionData} />
      </div>
      <div className="qr-block">
        <QRCode
          size={180}
          value={transactionData.sbp_url}
          logoImage={sbpLogo}
          logoHeight={50}
          logoWidth={50}
          quietZone={20}
          fgColor="#170038"
          ecLevel="H"
          removeQrCodeBehindLogo
        />
        <div className="qr-title">Для оплаты отсканируйте QR-код</div>
        <div className="qr-description">
          Что бы оплатить, вам нужно отсканировать QR-код в мобильном приложении
          банка или с помощью камеры вашего телефона.
        </div>
        <div className="accept-text" style={{ marginTop: "20px" }}>
          <p>
            Оплачивая, вы соглашаетесь с договором{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleOverlayToggle();
              }}
            >
              оферты
            </a>
          </p>
        </div>
        <div className="submit-button" onClick={handleCancelClick}>
          <span>
            <input id="submitButton" type="submit" value="Отменить" />
          </span>
        </div>
        {showOverlay && <Overlay onClose={handleOverlayToggle} />}
      </div>
      <div className="logo">
        <img src={theme === "dark" ? logoDark : logoLight} alt="WATA" />
      </div>
    </div>
  );
};

export default PayQrPage;
