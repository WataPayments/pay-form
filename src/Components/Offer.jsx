import React, { useContext, useMemo } from "react";
import "../Styles/OfferStyle.css";
import { useTranslation, Trans } from "react-i18next";

import { DataContext } from "../App";
import isMobile from "is-mobile";

const offerToNameMap = {
  Wata: "WATA Group Limited",
  FYLS: "Finvoka Yazilim Limited Şirketi",
};

export default function Offer({ isModal }) {
  const { transactionData } = useContext(DataContext);

  const { t } = useTranslation();

  const companyName = useMemo(() => {
    return offerToNameMap[transactionData.offer];
  }, [transactionData]);

  return (
    <div
      className={`offer ${isModal ? "modal" : ""} ${
        isMobile() ? "mobile" : ""
      }`}
    >
      <div className="offer-content">
        <div className="title">{t("offer-title")}</div>
        <div className="offer-blocks">
          <div className="block">
            <p className="p2">
              <Trans i18nKey="offer-subtitle" values={{ companyName }} />
            </p>
          </div>
          <div className="block">
            <p className="p2">{t("offer-block-1-title")}</p>
            <p className="p2">{t("offer-block-1")}</p>
          </div>
          <div className="block">
            <p className="p2">{t("offer-block-2-title")}</p>
            <p className="p2">{t("offer-block-2.1")}</p>
            <p className="p2">{t("offer-block-2.2")}</p>
            <p className={"p2"}>{t("offer-block-2.3")}</p>
          </div>
          <div className="block">
            <p className={"p2First"}>{t("offer-block-3-title")}</p>
            <p className={"p2"}>{t("offer-block-3.1")}</p>
            <p className={"p2"}>{t("offer-block-3.2")}</p>
          </div>
          <div className="block">
            <p className={"p2First"}>{t("offer-block-4-title")}</p>
            <p className={"p2"}>{t("offer-block-4.1")}</p>
            <p className={"p2"}>{t("offer-block-4.2")}</p>
          </div>
          <div className="block">
            <p className={"p2First"}>{t("offer-block-5-title")}</p>
            <p className={"p2"}>{t("offer-block-5.1")}</p>
            <p className={"p2"}>{t("offer-block-5.2")}</p>
          </div>
          <div className="block">
            <p className={"p2First"}>{t("offer-block-6-title")}</p>
            <p className={"p2"}>{t("offer-block-6.1")}</p>
            <p className={"p2"}>{t("offer-block-6.2")}</p>
            <p className={"p2"}>{t("offer-block-6.3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
