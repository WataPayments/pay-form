import ModalAgreement from "../modals/modal-agreement";
import "./styles.css"
import { useState } from "react"

type Props = {
    className?: string
}

const Agreement = ({ className }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <>
            <p className={`root ${className}`}>Совершая оплату, вы соглашаетесь <span className={"button"} onClick={() => setShowModal(true)}>с договором оферты</span></p>

            <ModalAgreement
                show={showModal}
                setShow={setShowModal}
            />
        </>
    )
}

export default Agreement