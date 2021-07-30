import React, { useState } from "react";
import { Toolbar, Typography, Button, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add, ChevronRight } from "@material-ui/icons";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { useDispatch } from "react-redux";
import { updateTask, createTask, removeTask } from "../../store/modules/task";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowX: "hidden",
  },
  toolbar: {
    height: "50px",
    minHeight: "50px",
  },
  contentPaper: {
    padding: theme.spacing(4, 2),
    display: "flex",
    justifyContent: "center",
    overflowX: "hidden",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  pageTitle: {
    fontWeight: 600,
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2, 0, 1, 0),
    cursor: "pointer",
  },
  sectionText: {
    fontWeight: 600,
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

function Content({ tags, tasks }) {
  const classes = useStyles();

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState("");
  const [editedTask, setEditedTask] = useState(null);
  const [parentTask, setParentTask] = useState(null);

  const [activeListOpen, setActiveListOpen] = useState(true);
  const [overduedListOpen, setOverduedListOpen] = useState(true);

  const dispatch = useDispatch();

  const closeTaskModal = () => {
    setTaskModalOpen(false);
    setEditedTask(null);
    setTaskModalMode("");
    setParentTask(null);
  };

  const openTaskModal = ({ mode, instance, parentTask }) => {
    setTaskModalMode(mode);
    if (mode === "edit") setEditedTask(instance);
    setParentTask(parentTask);
    setTaskModalOpen(true);
  };

  const onTaskUpdated = ({ taskId, data }) => {
    dispatch(updateTask({ taskId, data }));
  };

  const onTaskCreated = ({ data }) => {
    dispatch(createTask({ data }));
  };

  const onTaskRemoved = ({ taskId }) => {
    dispatch(removeTask({ taskId }));
  };
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar} />
      <div className={classes.contentPaper}>
        <div style={{ maxWidth: "90%", minWidth: "60%" }}>
          <div className={classes.titleContainer}>
            <Typography variant="h6" classes={{ root: classes.pageTitle }}>
              Today
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              endIcon={<Add />}
              onClick={() =>
                openTaskModal({
                  mode: "add",
                  instance: null,
                  parentTask: null,
                })
              }
            >
              Add task
            </Button>
          </div>
          <div
            className={classes.sectionTitle}
            onClick={() => setOverduedListOpen(!overduedListOpen)}
          >
            <ChevronRight
              color="primary"
              className={
                overduedListOpen ? classes.iconClose : classes.iconOpen
              }
            />
            <Typography
              variant="body1"
              color="primary"
              className={classes.sectionText}
            >
              Overdued ({tasks.overdued_count})
            </Typography>
          </div>
          <Collapse in={overduedListOpen} timeout="auto">
            {tasks.overdued.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskRemoved={onTaskRemoved}
                openTaskModal={openTaskModal}
              />
            ))}
          </Collapse>

          <div
            className={classes.sectionTitle}
            onClick={() => setActiveListOpen(!activeListOpen)}
          >
            <ChevronRight
              className={activeListOpen ? classes.iconClose : classes.iconOpen}
            />
            <Typography variant="body1" className={classes.sectionText}>
              In progress ({tasks.active_count})
            </Typography>
          </div>
          <Collapse in={activeListOpen} timeout="auto">
            {tasks.active.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskRemoved={onTaskRemoved}
                openTaskModal={openTaskModal}
              />
            ))}
          </Collapse>
        </div>
      </div>
      {taskModalOpen && (
        <TaskModal
          tags={tags}
          open={taskModalOpen}
          closeTaskModal={closeTaskModal}
          mode={taskModalMode}
          instance={editedTask}
          onTaskUpdated={onTaskUpdated}
          onTaskCreated={onTaskCreated}
          parentTask={parentTask}
        />
      )}
    </div>
  );
}

export default Content;
