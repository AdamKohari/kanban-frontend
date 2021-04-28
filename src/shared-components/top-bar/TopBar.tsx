import './TopBar.scss';
import {IconButton} from "@material-ui/core";
import MenuCont from '@material-ui/core/Menu';
import {Menu} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import {useState, MouseEvent} from "react";
import TableChartIcon from '@material-ui/icons/TableChart';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function TopBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="top-bar">
            <div className="hamburger-button">
                <IconButton edge="start" style={{color: 'white'}} onClick={handleMenuClick}>
                    <Menu />
                </IconButton>
            </div>
            <h2>
                Example Project
            </h2>
            <MenuCont
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>
                    <div className="hamburger-menu-item">
                        <TableChartIcon />
                        My Projects
                    </div>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <div className="hamburger-menu-item">
                        <GroupIcon />
                        Edit Team
                    </div>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <div className="hamburger-menu-item">
                        <ExitToAppIcon />
                        Logout
                    </div>
                </MenuItem>
            </MenuCont>
        </div>
    );
}