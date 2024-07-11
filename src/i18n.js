import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      "pay_form-mir-payment-alert": "Оплата картой МИР",
      "pay_form-input-card-placeholder": "Введите номер карты",
      "pay_form-input-expiration": "ММ/ГГ",
      "pay_form-pay": "Оплатить",
      "pay_form-offer-disclamer": "Оплачивая, вы соглашаетесь с договором",
      "pay_form-offer-action": "оферты",
      "offer-title": "Публичная оферта",
      "offer-subtitle":
        "Компания {{companyName}}, именуемая в дальнейшем 'Поставщик', предлагает услуги по приёму платежей согласно следующим условиям:",
      "offer-block-1-title": "1. Предмет оферты",
      "offer-block-1":
        "Поставщик предоставляет услуги по приёму платежей от клиентов, включая, но не ограничиваясь, приёмом платежей через банковские карты, электронные кошельки, мобильные платежи и другие средства платежей.",
      "offer-block-2-title": "2. Условия использования",
      "offer-block-2.1":
        "2.1. Клиенты, желающие воспользоваться услугами Поставщика, должны быть законными представителями юридических лиц или физическими лицами, достигшими совершеннолетия.",
      "offer-block-2.2":
        "2.2. Клиенты обязуются предоставить достоверную информацию о себе и своих платежных данных",
      "offer-block-2.3":
        "2.3. Поставщик не несет ответственности за любые неправомерные действия клиентов, включая мошенничество или незаконные операции.",
      "offer-block-3-title": "3. Стоимость услуг",
      "offer-block-3.1":
        "3.1. Стоимость услуг Поставщика определяется в соответствии с действующими тарифами, которые могут быть предоставлены по запросу клиента.",
      "offer-block-3.2":
        "3.2. Поставщик оставляет за собой право изменять тарифы на услуги с уведомлением клиентов не менее чем за 30 дней до вступления в силу изменений.",
      "offer-block-4-title": "4. Ответственность сторон",
      "offer-block-4.1":
        "4.1. Поставщик не несет ответственности за любые убытки, прямые или косвенные, понесенные клиентами в результате использования услуг.",
      "offer-block-4.2":
        "4.2. Клиенты несут ответственность за сохранность своих платежных данных и обязуются предпринять все необходимые меры для предотвращения несанкционированного доступа к ним",
      "offer-block-5-title": "5. Конфиденциальность",
      "offer-block-5.1":
        "5.1. Поставщик обязуется обрабатывать персональные данные клиентов в соответствии с действующим законодательством о защите персональных данных.",
      "offer-block-5.2":
        "5.2. Поставщик не передает персональные данные клиентов третьим лицам без их согласия, за исключением случаев, предусмотренных законодательством.",
      "offer-block-6-title": "6. Прочие условия",
      "offer-block-6.1":
        "6.1. Настоящая оферта является публичным документом и размещается на официальном сайте Поставщика",
      "offer-block-6.2":
        "6.2. В случае возникновения споров или разногласий, стороны обязуются приложить все усилия для их разрешения путем переговоров.",
      "offer-block-6.3":
        "6.3. Настоящая оферта вступает в силу с момента ее публикации на официальном сайте Поставщика и действует до момента ее отзыва.",
      "result_page-paid": "Успешный платеж",
      "result_page-failed": "Ошибка",
      "result_page-pending": "В обработке",
      "result_page-refunded": "Возврат осуществлен",
      "result_page-expired": "Просроченная транзакция",
      "result_page-share": "Поделиться",
      "result_page-pending-alert":
        "Если у вас списались средства с карты, значит все прошло успешно, но банк не успел обработать транзакцию",
      "result_page-link-copied": "Ссылка скопирована",
      "result_page-redirect":
        "Вы будете перенаправлены обратно в магазин через",
      "result_page-second1": "секунд",
      "result_page-second2": "секунду",
      "result_page-second3": "секунды",
      "error_page-500": "Ошибка сервера",
      "error_page-home": "На главную",
      "error_page-404": "Страницы не существует",
    },
  },
  en: {
    translation: {
      "pay_form-mir-payment-alert": "Pay by card",
      "pay_form-input-card-placeholder": "Card number",
      "pay_form-input-expiration": "MM/YY",
      "pay_form-pay": "Pay",
      "pay_form-offer-disclamer":
        "By proceeding with the payment you accept the",
      "pay_form-offer-action": "Contract Offer",
      "offer-title": "Contract Offer",
      "offer-subtitle":
        "{{companyName}}, hereinafter referred to as the 'Provider', offers payment acceptance services under the following conditions:",
      "offer-block-1-title": "Subject of the Offer",
      "offer-block-1":
        "The Provider offers payment acceptance services from clients, including, but not limited to, payments through bank cards, electronic wallets, mobile payments, and other payment methods.",
      "offer-block-2-title": "Terms of Use",
      "offer-block-2.1":
        "2.1. Clients wishing to use the Provider's services must be legal representatives of legal entities or individuals who have reached the age of majority.",
      "offer-block-2.2":
        "2.2. Clients are obliged to provide accurate information about themselves and their payment details.",
      "offer-block-2.3":
        "2.3. The Provider is not responsible for any unlawful actions of clients, including fraud or illegal transactions.",
      "offer-block-3-title": "Cost of Services",
      "offer-block-3.1":
        "3.1. The cost of the Provider's services is determined according to the current rates, which can be provided upon the client's request",
      "offer-block-3.2":
        "3.2. The Provider reserves the right to change the service rates with at least 30 days' notice to clients before the changes take effect.",
      "offer-block-4-title": "Responsibility of the Parties",
      "offer-block-4.1":
        "4.1. The Provider is not responsible for any direct or indirect losses incurred by clients as a result of using the services.",
      "offer-block-4.2":
        "4.2. Clients are responsible for the security of their payment details and are obliged to take all necessary measures to prevent unauthorized access to them.",
      "offer-block-5-title": "Confidentiality",
      "offer-block-5.1":
        "5.1. The Provider is committed to processing clients' personal data in accordance with the applicable data protection laws",
      "offer-block-5.2":
        "5.2. The Provider does not transfer clients' personal data to third parties without their consent, except in cases provided by law",
      "offer-block-6-title": "Other Conditions",
      "offer-block-6.1":
        "6.1. This contract offer is a public document and is posted on the Provider's official website.",
      "offer-block-6.2":
        "6.2. In the event of disputes or disagreements, the parties agree to make every effort to resolve them through negotiations",
      "offer-block-6.3":
        "6.3. This contract offer comes into effect from the moment of its publication on the Provider's official website and remains in force until it is withdrawn.",
      "result_page-paid": "Payment complete",
      "result_page-failed": "Payment failed",
      "result_page-pending": "Processing payment... ",
      "result_page-refunded": "Refund complete",
      "result_page-expired": "Expired transaction",
      "result_page-share": "Share",
      "result_page-pending-alert":
        "If the funds have been withdrawn from your account, the payment has been processed successfully, but the confirmation from the bank is being delayed.",
      "result_page-link-copied": "Link copied",
      "result_page-redirect": "You’ll be redirected back to the store in",
      "result_page-second1": "seconds",
      "result_page-second2": "second",
      "result_page-second3": "seconds",
      "error_page-500": "Server error",
      "error_page-home": "Home page",
      "error_page-404": "This page doesn’t exist",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
});

export default i18n;
