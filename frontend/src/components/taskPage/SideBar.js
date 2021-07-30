import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  Today,
  DateRange,
  Label,
  ExpandLess,
  ExpandMore,
  PriorityHigh,
  ChevronLeft,
  Stop,
  FiberManualRecord,
  AddCircleOutline,
  Remove,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: 60,
    overflowX: "hidden",
  },
  listOpen: {
    padding: theme.spacing(0, 2),
  },
  listClose: {
    padding: theme.spacing(0, 1),
  },
  listItem: {
    borderRadius: "5px",
    height: "40px",
    padding: theme.spacing(0, 1),
    fontWeight: 600,
  },
  listItemText: {
    fontWeight: 600,
  },
  nestedItemText: {
    color: "#999999",
    fontWeight: 400,
  },
  addItemText: {
    color: "#999999",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  iconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  iconClose: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    transform: "rotate(-90deg)",
  },
}));

const items = [
  { key: "today", label: "Today", icon: <Today /> },
  { key: "tomorrow", label: "Tomorrow", icon: <DateRange /> },
];

function SideBar({
  drawerOpen,
  handleTagModalOpen,
  tags,
  onTagRemoved,
  getTasksByParams,
}) {
  const [tagMenuOpen, setTagMenuOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const { data: priorityList } = useSelector((state) => state.priority);
  const classes = useStyles();

  const history = useHistory();

  const filterTasks = ({ priority, tag }) => {
    if (tag === selectedTag) setSelectedTag(null);
    else if (tag) setSelectedTag(tag);
    if (priority === selectedPriority) setSelectedPriority(null);
    else if (priority) setSelectedPriority(priority);
  };

  const removeFilter = () => {
    setSelectedPriority(null);
    setSelectedTag(null);
  };

  useEffect(() => {
    console.log("change");
    getTasksByParams({ priority: selectedPriority, tag: selectedTag });
  }, [selectedTag, selectedPriority]);

  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${
        drawerOpen ? classes.drawerOpen : classes.drawerClose
      }`}
      classes={{
        paper: drawerOpen ? classes.drawerOpen : classes.drawerClose,
      }}
    >
      <Toolbar />
      <List className={drawerOpen ? classes.listOpen : classes.listClose}>
        {items.map((item) => (
          <ListItem button key={item.key} className={classes.listItem}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              disableTypography
              primary={item.label}
            ></ListItemText>
          </ListItem>
        ))}
        <Divider className={classes.divider} />
        <ListItem
          className={classes.listItem}
          style={{ cursor: "pointer" }}
          onClick={() => setTagMenuOpen(!tagMenuOpen)}
        >
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            disableTypography
            primary="Tags"
          ></ListItemText>
          <ChevronLeft
            className={tagMenuOpen ? classes.iconClose : classes.iconOpen}
          />
        </ListItem>

        <Collapse in={tagMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {tags.map((tag) => (
              <ListItem
                key={tag.id}
                button
                className={classes.listItem}
                onClick={() => filterTasks({ tag: tag.id })}
                selected={tag.id === selectedTag}
              >
                <ListItemIcon>
                  <FiberManualRecord
                    fontSize="small"
                    style={{ color: tag.color }}
                  />
                </ListItemIcon>
                <ListItemText
                  className={classes.nestedItemText}
                  primary={tag.title}
                  disableTypography
                ></ListItemText>
                <ListItemSecondaryAction>
                  <DropdownMenu
                    onTagRemoved={onTagRemoved}
                    openEditModal={handleTagModalOpen}
                    tag={tag}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem //Add a new tag
          button
          className={classes.listItem}
          onClick={() => handleTagModalOpen("add")}
        >
          <ListItemIcon>
            <AddCircleOutline />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary="Add a new tag"
            className={classes.addItemText}
          ></ListItemText>
        </ListItem>

        <Divider className={classes.divider} />

        <ListItem //priority
          className={classes.listItem}
          onClick={() => setPriorityOpen(!priorityOpen)}
          style={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <PriorityHigh />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            disableTypography
            primary="Priority"
          ></ListItemText>
          <ChevronLeft
            className={priorityOpen ? classes.iconClose : classes.iconOpen}
          />
        </ListItem>
        <Collapse in={priorityOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {priorityList.map((item) => (
              <ListItem
                key={item.key}
                button
                className={classes.listItem}
                onClick={() => filterTasks({ priority: item.key })}
                selected={selectedPriority === item.key}
              >
                <ListItemIcon>
                  <Stop fontSize="small" style={{ color: item.color }} />
                </ListItemIcon>
                <ListItemText
                  className={classes.nestedItemText}
                  disableTypography
                  primary={item.label}
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        </Collapse>
        {(selectedTag || selectedPriority) && (
          <Divider className={classes.divider} />
        )}
        {(selectedTag || selectedPriority) && (
          <ListItem button className={classes.listItem} onClick={removeFilter}>
            <ListItemIcon>
              <Remove />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary="Remove filters"
              className={classes.addItemText}
            ></ListItemText>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default SideBar;
