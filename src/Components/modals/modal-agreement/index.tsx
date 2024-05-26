import { Dispatch, SetStateAction } from "react"
import SVG from "../../icons/svg"
import Button from "../../button"
import { useIsModal } from "../../hooks/is-modal"
import "./styles.module.css"

type Props = {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

const ModalAgreement = ({ show, setShow }: Props) => {
    useIsModal({show})

    if (!show) return null

    return (
        <div className={"root"}>
            <div className={"background"} />
            <div className={"modal"}>
                <div className={"header"}>
                    <h1 className={"title"}>Договор оферты</h1>
                    <span className={"close"} onClick={() => setShow(false)}>{SVG.Close}</span>
                </div>
                <div className={"content"}>
                    <p className={"text"}>Поставщик предлагает услуги по приёму платежей согласно следующим условиям:</p>
                    <br />
                    <p className={"text"}>1. Предмет оферты<br />
                        Поставщик предоставляет услуги по приёму платежей от клиентов, включая, но не ограничиваясь, приёмом платежей через банковские карты, электронные кошельки, мобильные платежи и другие средства платежей.</p>
                    <br />
                    <p className={"text"}>2. Условия использования<br />
                        2.1. Клиенты, желающие воспользоваться услугами Поставщика, должны быть законными представителями юридических лиц или физическими лицами, достигшими совершеннолетия.<br />
                        2.2. Клиенты обязуются предоставить достоверную информацию о себе и своих платежных данных.<br />
                        2.3. Поставщик не несет ответственности за любые неправомерные действия клиентов, включая мошенничество или незаконные операции.</p>
                    <br />
                    <p className={"text"}>3. Стоимость услуг<br />
                        3.1. Стоимость услуг Поставщика определяется в соответствии с действующими тарифами, которые могут быть предоставлены по запросу клиента.<br />
                        3.2. Поставщик оставляет за собой право изменять тарифы на услуги с уведомлением клиентов не менее чем за 30 дней до вступления в силу изменений.</p>
                    <br />
                    <p className={"text"}>4. Ответственность сторон<br />
                        4.1. Поставщик не несет ответственности за любые убытки, прямые или косвенные, понесенные клиентами в результате использования услуг.<br />
                        4.2. Клиенты несут ответственность за сохранность своих платежных данных и обязуются предпринять все необходимые меры для предотвращения несанкционированного доступа к ним.</p>
                    <br />
                    <p className={"text"}>5. Конфиденциальность<br />
                        5.1. Поставщик обязуется обрабатывать персональные данные клиентов в соответствии с действующим законодательством о защите персональных данных.<br />
                        5.2. Поставщик не передает персональные данные клиентов третьим лицам без их согласия, за исключением случаев, предусмотренных законодательством.</p>
                    <br />
                    <p className={"text"}>6. Прочие условия<br />
                        6.1. Настоящая оферта является публичным документом и размещается на официальном сайте Поставщика.<br />
                        6.2. В случае возникновения споров или разногласий, стороны обязуются приложить все усилия для их разрешения путем переговоров.<br />
                        6.3. Настоящая оферта вступает в силу с момента ее публикации на официальном сайте Поставщика и действует до момента ее отзыва.</p>
                </div>
                <div className={"footer"}>
                    <Button
                        title="Соглашаюсь с договором оферты"
                        className={"button"}
                        onClick={() => setShow(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalAgreement