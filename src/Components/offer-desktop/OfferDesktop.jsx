import { Modal } from "../modal/Modal";
import Offer from "../Offer";

export const OfferDesktop = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Offer isModal={true} />
    </Modal>
  );
};
