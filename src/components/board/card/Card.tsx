import './Card.scss';

export default function Card () {
    return (
        <div className="card">
            <div className="card-title">
                Card title
            </div>
            <div className="id-and-user">
                <div className="card-id">PROJ-001</div>
                <div className="user-circle">AK</div>
            </div>
        </div>
    );
}