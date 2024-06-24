import Offer from "../Offer";
import { BottomSheet } from "../bottom-sheet/BottomSheet";

export const OfferMobile = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Offer />
    </BottomSheet>
  );
};
