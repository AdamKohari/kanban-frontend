import './CardDetailsPopup.scss';
import {CardData} from "../../../redux/reducers";

type CardDetailsPopupProps = {
    close: () => void,
    cardData: CardData
}
export default function CardDetailsPopup ({close, cardData}: CardDetailsPopupProps) {
    const nameArr = cardData.user.toUpperCase().split(' ');
    const monogram = nameArr[0].charAt(0) + nameArr[1].charAt(0);
    return (
        <div className="card-details-popup popup">
            <div className="header">
                <h2>{cardData.title} (#{cardData.id})</h2>
                <div onClick={close}>🗙</div>
            </div>

            <div className="text-content">
                {cardData.desc}
            </div>

            <div style={{marginTop: '3rem'}}>Assigned to:</div>
            <div className="assigned-to">
                <div className="user-circle">{monogram}</div>
                <div>{cardData.user}</div>
            </div>
        </div>
    );
}