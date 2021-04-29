import './Board.scss';
import Card from "./card/Card";
import {Button, Modal} from "@material-ui/core";
import {DragDropContext} from 'react-beautiful-dnd';
import {useState, Fragment} from "react";
import CreateCardPopup from "./create-card-popup/CreateCardPopup";
import CardDetailsPopup from "./card-details-popup/CardDetailsPopup";

export default function Board() {

    const [newCardModalOpen, setNewCardModalOpen] = useState(false);
    const [cardDetailsModalOpen, setCardDetailsModalOpen] = useState(false);

    const onDragEnd = (result: any) => {
      console.log(result);
    };

    const mockedCardData = {
        title: 'Example Card',
        id: 'PROJ-001',
        user: 'Adam Kohari'
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
                                <Card cardData={mockedCardData}/>
                                <Card cardData={mockedCardData}/>
                                <Card cardData={mockedCardData}/>
                                <Card cardData={mockedCardData}/>
                                <Card cardData={mockedCardData}/>
                            </div>
                            <div className="plus-button-holder">
                                <Button variant="contained"
                                        onClick={() => setNewCardModalOpen(true)}
                                        className="green-button">+ Add New</Button>
                            </div>
                        </div>
                        <div className="vertical-card-holder">
                            <Card cardData={mockedCardData}/>
                            <Card cardData={mockedCardData}/>
                            <Card cardData={mockedCardData}/>
                            <Card cardData={mockedCardData}/>
                        </div>
                        <div className="vertical-card-holder">
                            <Card cardData={mockedCardData}/>
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
                    <CardDetailsPopup close={() => setCardDetailsModalOpen(false)}/>
                </Fragment>}
            </Modal>
        </div>
    );
}