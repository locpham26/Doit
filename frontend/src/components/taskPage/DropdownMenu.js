import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";

function DropdownMenu({ tag, openEditModal, onTagRemoved }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton component="span" edge="end" onClick={handleClick}>
        <MoreHoriz size="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
        PaperProps={{
          style: {
            width: "20ch",
          },
          elevation: 1,
        }}
      >
        <MenuItem
          onClick={() => {
            openEditModal("edit", tag);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => onTagRemoved({ tagId: tag.id })}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default DropdownMenu;
