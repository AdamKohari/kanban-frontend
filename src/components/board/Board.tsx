import './Board.scss';
import Card from "./card/Card";
import {Button, Modal} from "@material-ui/core";
import {DragDropContext} from 'react-beautiful-dnd';
import {useState, Fragment} from "react";
import CreateCardPopup from "./create-card-popup/CreateCardPopup";
import CardDetailsPopup from "./card-details-popup/CardDetailsPopup";
import {useStore} from "../../redux/UseStore";
import {CardData} from '../../redux/reducers';

export default function Board() {

    const [state] = useStore();
    const [newCardModalOpen, setNewCardModalOpen] = useState(false);
    const [cardDetailsModalOpen, setCardDetailsModalOpen] = useState(false);
    const [clickedCardData, setClickedCardData] = useState({} as CardData);

    const onDragEnd = (result: any) => {
      console.log(result);
    };

    function openDetails(card: CardData) {
        setClickedCardData(card);
        setCardDetailsModalOpen(true);
    }

    return (
        <div className="board-div">
            <div className="board-content">
                <div className="table-headers">
                    <h1>To Do</h1>
                    <h1>In Progress</h1>
                    <h1>Done</h1>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="table-section">
                        <div>
                            <div className="vertical-card-holder">
                                {state.kanban.currentBoard.cols.toDo.map(card => (
                                    <Card cardData={card} onClick={() => openDetails(card)}/>
                                ))}
                            </div>
                            <div className="plus-button-holder">
                                <Button variant="contained"
                                        onClick={() => setNewCardModalOpen(true)}
                                        className="green-button">+ Add New</Button>
                            </div>
                        </div>
                        <div className="vertical-card-holder">
                            {state.kanban.currentBoard.cols.inProgress.map(card => (
                                <Card cardData={card} onClick={() => openDetails(card)}/>
                            ))}
                        </div>
                        <div className="vertical-card-holder">
                            {state.kanban.currentBoard.cols.done.map(card => (
                                <Card cardData={card} onClick={() => openDetails(card)}/>
                            ))}
                        </div>
                    </div>
                </DragDropContext>
            </div>

            <Modal open={newCardModalOpen} onClose={() => setNewCardModalOpen(false)}>
                {<Fragment>
                    <CreateCardPopup close={() => setNewCardModalOpen(false)}/>
                </Fragment>}
            </Modal>

            <Modal open={cardDetailsModalOpen} onClose={() => setCardDetailsModalOpen(false)}>
                {<Fragment>
                    <CardDetailsPopup
                        cardData={clickedCardData}
                        close={() => setCardDetailsModalOpen(false)}/>
                </Fragment>}
            </Modal>
        </div>
    );
}