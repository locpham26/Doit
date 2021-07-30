import React, { useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  IconButton,
  Chip,
} from "@material-ui/core";
import {
  FiberManualRecord,
  ChevronRight,
  AddCircleOutline,
  Edit,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import SubTaskCard from "./SubTaskCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  checkBoxWrapper: {
    flex: "0 1 40px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  mainContent: {
    flex: "1 1 auto",
    padding: `${theme.spacing(1, 1, 1, 0)} !important`,
    width: "calc(100% - 40px)",
  },
  checkbox: {
    padding: theme.spacing(1),
  },
  cardTitle: {
    fontWeight: 600,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  },
  cardDetail: {
    color: theme.palette.text.secondary,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "100%",
    marginBottom: theme.spacing(1),
  },
  tagList: {
    display: "flex",
    flexDirection: "row",
  },
  tagListItem: {
    padding: theme.spacing(0, 1, 0, 0),
    flex: "0 0 50px",
  },
  tagItemIcon: {
    minWidth: "unset",
  },
  tagItemText: {
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
  subTask: {
    padding: theme.spacing(0, 1, 0, 0),
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
  },
  subTaskButton: {
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
    fontWeight: 600,
    color: theme.palette.text.secondary,
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
    transform: "rotate(90deg)",
  },
}));

function TaskCard({ task, onTaskRemoved, openTaskModal }) {
  const classes = useStyles();
  const [completed, setCompleted] = useState(false);
  const [subTaskOpen, setSubTaskOpen] = useState(false);

  const priorityInfo = () => {
    switch (task.priority) {
      case 1:
        return { color: "purple", text: "Extreme" };
      case 2:
        return { color: "red", text: "High" };
      case 3:
        return { color: "orange", text: "Medium" };
      case 4:
        return { color: "yellow", text: "Low" };
      default:
        return { color: "gray", text: "No priority" };
    }
  };

  const onCheck = () => {
    setCompleted(true);
    onTaskRemoved({ taskId: task.id });
  };

  return (
    <Card className={classes.root}>
      <div className={classes.checkBoxWrapper}>
        <Checkbox
          className={classes.checkbox}
          checked={completed}
          onChange={onCheck}
        />
      </div>
      <CardContent classes={{ root: classes.mainContent }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className={classes.cardTitle} variant="body1">
            {task.title}
          </Typography>
          <div>
            <Chip
              size="small"
              label={priorityInfo().text}
              style={{
                backgroundColor: priorityInfo().color,
                color: "white",
                marginRight: "8px",
              }}
            />
            <IconButton
              size="small"
              onClick={() => {
                openTaskModal({ mode: "edit", type: "task", instance: task });
              }}
            >
              <Edit style={{ fontSize: "16px" }} />
            </IconButton>
          </div>
        </div>
        <Typography className={classes.cardDetail} variant="body2">
          {task.description}
        </Typography>
        <List disablePadding className={classes.tagList}>
          {task.tags.map((tag) => (
            <ListItem key={tag.id} className={classes.tagListItem}>
              <ListItemIcon className={classes.tagItemIcon}>
                <FiberManualRecord
                  style={{ fontSize: "14px", color: tag.color }}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "body2",
                }}
                className={classes.tagItemText}
                primary={tag.title}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
        <div className={classes.subTask}>
          <Button
            className={classes.subTaskButton}
            startIcon={
              <ChevronRight
                fontSize="small"
                className={subTaskOpen ? classes.iconClose : classes.iconOpen}
              />
            }
            onClick={() => setSubTaskOpen(!subTaskOpen)}
            disableFocusRipple
            disableTouchRipple
          >
            Sub task ({task.subtask_count})
          </Button>
          <IconButton
            size="small"
            onClick={() => {
              openTaskModal({
                mode: "add",
                instance: null,
                parentTask: task.id,
              });
            }}
          >
            <AddCircleOutline fontSize="small" />
          </IconButton>
        </div>
        <Collapse in={subTaskOpen}>
          {task.subtasks.map((subtask, index) => (
            <SubTaskCard
              key={subtask.id}
              subtask={subtask}
              lastChild={index === task.subtask_count - 1}
              parentId={task.id}
              onTaskRemoved={onTaskRemoved}
              openTaskModal={openTaskModal}
            />
          ))}
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
