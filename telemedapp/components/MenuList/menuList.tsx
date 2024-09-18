"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import { IconType } from 'react-icons';

const MenuList = ({ linkTo, linkName, text }: { linkTo: string[], linkName: string[], text: string | React.ReactNode }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let menuItems = linkName.map((name, index) => {
        return (
            <Link href={linkTo[index]} key={name}>
                <MenuItem onClick={handleClose}>{linkName[index]}</MenuItem>
            </Link>
        )
    });
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {text}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItems}
            </Menu>
        </div>
    );
}
export default MenuList;