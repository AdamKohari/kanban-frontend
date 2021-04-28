import './Board.scss';
import Card from "./card/Card";
import {Button, Modal} from "@material-ui/core";
import {DragDropContext} from 'react-beautiful-dnd';
import {useState, Fragment} from "react";
import CreateCardPopup from "./create-card-popup/CreateCardPopup";

export default function Board() {

    const [modalOpen, setModalOpen] = useState(false);

    const onDragEnd = (result: any) => {
      console.log(result);
    };

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
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </div>
                            <div className="plus-button-holder">
                                <Button variant="contained"
                                        onClick={() => setModalOpen(true)}
                                        className="green-button">+ Add New</Button>
                            </div>
                        </div>
                        <div className="vertical-card-holder">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                        <div className="vertical-card-holder">
                            <Card />
                        </div>
                    </div>
                </DragDropContext>
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {<Fragment>
                    <CreateCardPopup close={() => setModalOpen(false)}/>
                </Fragment>}
            </Modal>
        </div>
    );
}