import './DroppableCol.scss';
import {Draggable} from "react-beautiful-dnd";
import Card from "../card/Card";
import {CardData} from "../../../redux/reducers";

type DroppableColProps = {
    provided: any,
    cardArray: CardData[],
    openDetails: (card: CardData) => void
}
export default function DroppableCol ({provided, cardArray, openDetails}: DroppableColProps) {
    return (
        <div
            ref={provided.innerRef}
            className="droppable-col">
            {cardArray.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => openDetails(card)}>
                            <Card cardData={card} />
                        </div>
                    )}
                </Draggable>
            ))}
            {provided.placeholder}
        </div>
    );
}