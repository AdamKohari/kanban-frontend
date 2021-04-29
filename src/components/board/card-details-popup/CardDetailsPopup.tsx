import './CardDetailsPopup.scss';

type CardDetailsPopupProps = {
    close: () => void
}
export default function CardDetailsPopup ({close}: CardDetailsPopupProps) {
    return (
        <div className="card-details-popup popup"></div>
    );
}