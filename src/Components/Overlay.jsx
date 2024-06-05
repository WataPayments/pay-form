import React, { useContext, useMemo } from "react";
import "../Styles/OverlayStyle.css";
import Close from "../Images/Close.svg";
import CloseLight from "../Images/CloseLight.svg";

import { DataContext, ThemeContext } from "../App";

const offerToNameMap = {
  Wata: "WATA Group Limited",
  FYLS: "Finvoka Yazilim Limited Şirketi",
};

export default function Overlay({ onClose }) {
  const theme = useContext(ThemeContext);
  const { transactionData } = useContext(DataContext);

  const companyName = useMemo(() => {
    return offerToNameMap[transactionData.offer];
  }, [transactionData]);

  return (
    <div className={`overlay ${theme}`}>
      <div className={`overlay-content ${theme}`}>
        <img
          src={theme === "dark" ? Close : CloseLight}
          alt="Close"
          className="close-btn"
          onClick={onClose}
        />
        <h2>Публичная оферта</h2>
        <div className="block">
          <p className="p2">
            Компания {companyName}, именуемая в дальнейшем "Поставщик",
            предлагает услуги по приёму платежей согласно следующим условиям:
          </p>
        </div>
        <div className="block">
          <p className="p2">
            1. Предмет оферты Поставщик предоставляет услуги по приёму платежей
            от клиентов, включая, но не ограничиваясь, приёмом платежей через
            банковские карты, электронные кошельки, мобильные платежи и другие
            средства платежей.
          </p>
        </div>
        <div className="block">
          <p className={"p2"}>2. Условия использования</p>
          <p className={"p2"}>
            2.1. Клиенты, желающие воспользоваться услугами Поставщика, должны
            быть законными представителями юридических лиц или физическими
            лицами, достигшими совершеннолетия.
          </p>
          <p className={"p2"}>
            2.2. Клиенты обязуются предоставить достоверную информацию о себе и
            своих платежных данных.
          </p>
          <p className={"p2"}>
            2.3. Поставщик не несет ответственности за любые неправомерные
            действия клиентов, включая мошенничество или незаконные операции.
          </p>
        </div>
        <div className="block">
          <p className={"p2First"}>3. Стоимость услуг</p>
          <p className={"p2"}>
            3.1. Стоимость услуг Поставщика определяется в соответствии с
            действующими тарифами, которые могут быть предоставлены по запросу
            клиента.
          </p>
          <p className={"p2"}>
            3.2. Поставщик оставляет за собой право изменять тарифы на услуги с
            уведомлением клиентов не менее чем за 30 дней до вступления в силу
            изменений.
          </p>
        </div>
        <div className="block">
          <p className={"p2First"}>4. Ответственность сторон</p>
          <p className={"p2"}>
            4.1. Поставщик не несет ответственности за любые убытки, прямые или
            косвенные, понесенные клиентами в результате использования услуг.
          </p>
          <p className={"p2"}>
            4.2. Клиенты несут ответственность за сохранность своих платежных
            данных и обязуются предпринять все необходимые меры для
            предотвращения несанкционированного доступа к ним.
          </p>
        </div>
        <div className="block">
          <p className={"p2First"}>5. Конфиденциальность</p>
          <p className={"p2"}>
            5.1. Поставщик обязуется обрабатывать персональные данные клиентов в
            соответствии с действующим законодательством о защите персональных
            данных.
          </p>
          <p className={"p2"}>
            5.2. Поставщик не передает персональные данные клиентов третьим
            лицам без их согласия, за исключением случаев, предусмотренных
            законодательством.
          </p>
        </div>
        <div className="block">
          <p className={"p2First"}>6. Прочие условия</p>
          <p className={"p2"}>
            6.1. Настоящая оферта является публичным документом и размещается на
            официальном сайте Поставщика.
          </p>
          <p className={"p2"}>
            6.2. В случае возникновения споров или разногласий, стороны
            обязуются приложить все усилия для их разрешения путем переговоров.
          </p>
          <p className={"p2"}>
            6.3. Настоящая оферта вступает в силу с момента ее публикации на
            официальном сайте Поставщика и действует до момента ее отзыва.
          </p>
        </div>
      </div>
    </div>
  );
}
