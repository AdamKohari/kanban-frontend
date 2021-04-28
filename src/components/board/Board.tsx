import './Board.scss';
import Card from "./card/Card";
import {Button} from "@material-ui/core";
import {GreenButtonStyle} from "../../shared-components/contants";

export default function Board() {
    return (
        <div className="board-div">
            <div className="board-content">
                <div className="table-headers">
                    <h1>To Do</h1>
                    <h1>In Progress</h1>
                    <h1>Done</h1>
                </div>

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
                            <Button variant="contained" style={GreenButtonStyle}>+ Add New</Button>
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
            </div>
        </div>
    );
}