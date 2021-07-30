import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: "50px",
    display: "flex",
    justifyContent: "center",
  },
  menuIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  menuIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(180deg)",
  },
}));

function TaskPage({ drawerOpen, setDrawerOpen }) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon
            className={
              drawerOpen ? classes.menuIconOpen : classes.menuIconClosed
            }
          />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Do it
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TaskPage;
