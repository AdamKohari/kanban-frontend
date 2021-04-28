import './TopBar.scss';
import {IconButton} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

export default function TopBar() {
    return (
        <div className="top-bar">
            <div className="hamburger-button">
                <IconButton edge="start" style={{color: 'white'}}>
                    <Menu />
                </IconButton>
            </div>
            <h2>
                Example Project
            </h2>
        </div>
    );
}