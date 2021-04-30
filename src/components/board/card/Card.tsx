import './Card.scss';

type CardProps = {
    cardData: {
        title: string,
        id: string,
        user: string
    }
}
export default function Card ({cardData}: CardProps) {
    const nameArr = cardData.user.toUpperCase().split(' ');
    const monogram = nameArr[0].charAt(0) + nameArr[1].charAt(0);
    return (
        <div className="card">
            <div className="card-title">{cardData.title}</div>
            <div className="id-and-user">
                <div className="card-id">{cardData.id}</div>
                <div className="user-circle">{monogram}</div>
            </div>
        </div>
    );
}