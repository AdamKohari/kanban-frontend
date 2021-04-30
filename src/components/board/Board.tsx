import './Board.scss';
import {Button, Modal} from "@material-ui/core";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {useState, Fragment} from "react";
import CreateCardPopup from "./create-card-popup/CreateCardPopup";
import CardDetailsPopup from "./card-details-popup/CardDetailsPopup";
import {useStore} from "../../redux/UseStore";
import {CardData} from '../../redux/reducers';
import DroppableCol from "./droppable-col/DroppableCol";
import {movedCard} from "../../redux/actions";

export default function Board() {

    const [state, dispatch] = useStore();
    const [newCardModalOpen, setNewCardModalOpen] = useState(false);
    const [cardDetailsModalOpen, setCardDetailsModalOpen] = useState(false);
    const [clickedCardData, setClickedCardData] = useState({} as CardData);

    const onDragEnd = (result: any) => {
      dispatch(movedCard(result.source, result.destination))
    };

    function openDetails(card: CardData) {
        setClickedCardData(card);
        setCardDetailsModalOpen(true);
    }


    return (
        <div className="board-div">
            <div className="board-content">
                <div className="table-headers">
                    <div className="todo-header">
                        <h1>To Do</h1>
                        <Button variant="contained"
                                onClick={() => setNewCardModalOpen(true)}
                                className="green-button">+ Add New</Button>
                    </div>
                    <h1>In Progress</h1>
                    <h1>Done</h1>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="table-section">
                        <div className="vertical-card-holder">
                            <Droppable droppableId="toDo">
                                {(provided) => (
                                    <DroppableCol provided={provided}
                                                  cardArray={state.kanban.currentBoard.cols.toDo}
                                                  openDetails={(card) => openDetails(card)}/>
                                )}
                            </Droppable>
                        </div>

                        <div className="vertical-card-holder">
                            <Droppable droppableId="inProgress">
                                {(provided) => (
                                    <DroppableCol provided={provided}
                                                  cardArray={state.kanban.currentBoard.cols.inProgress}
                                                  openDetails={(card) => openDetails(card)}/>
                                )}
                            </Droppable>
                        </div>

                        <div className="vertical-card-holder">
                            <Droppable droppableId="done">
                                {(provided) => (
                                    <DroppableCol provided={provided}
                                                  cardArray={state.kanban.currentBoard.cols.done}
                                                  openDetails={(card) => openDetails(card)}/>
                                )}
                            </Droppable>
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