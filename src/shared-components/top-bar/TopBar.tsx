import './TopBar.scss';
import {IconButton} from "@material-ui/core";
import MenuCont from '@material-ui/core/Menu';
import {Menu} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import {useState, MouseEvent} from "react";
import TableChartIcon from '@material-ui/icons/TableChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import {useStore} from "../../redux/UseStore";
import {logout} from "../../redux/actions";

type TopBarProps = {
    place: string
}
export default function TopBar({place}: TopBarProps) {
    const [state, dispatch] = useStore();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleHamburgerClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (button: string) => {
        setAnchorEl(null);
        if (button === 'CLOSE') return;

        switch (button) {
            case 'MANAGER': {
                history.push('../manager');
                break;
            }
            case 'LOGOUT': {
                sessionStorage.clear();
                history.push('');
                dispatch(logout());
                break;
            }
        }
    };

    function getTitle(): string {
        switch (place) {
            case 'BOARD': return state.kanban.currentBoardName;
            case 'MANAGER': return 'Your Projects'
            default: return 'Kanban Board'
        }
    }

    return (
        <div className="top-bar">
            <div className="hamburger-button">
                <IconButton edge="start" style={{color: 'white'}} onClick={handleHamburgerClick}>
                    <Menu />
                </IconButton>
            </div>
            <h2>{getTitle()}</h2>
            <MenuCont
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleMenuClose('CLOSE')}>

                { place === 'BOARD' &&
                <MenuItem onClick={() => handleMenuClose('MANAGER')}>
                    <div className="hamburger-menu-item">
                        <TableChartIcon />
                        My Projects
                    </div>
                </MenuItem>}

                <MenuItem onClick={() => handleMenuClose('LOGOUT')}>
                    <div className="hamburger-menu-item">
                        <ExitToAppIcon />
                        Logout
                    </div>
                </MenuItem>
            </MenuCont>
        </div>
    );
}