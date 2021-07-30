import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  MenuItem,
  ListItemText,
  Checkbox,
  Typography,
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Stop, FiberManualRecord, Close } from "@material-ui/icons";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(2, 0),
    "& .MuiSelect-root": {
      display: "flex",
      alignItems: "center",
    },
  },
  checkbox: {
    padding: theme.spacing(1),
  },
  menuItem: {
    padding: theme.spacing(0, 2),
  },
}));

const CustomDialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const CustomDialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(DialogContent);

const CustomDialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(DialogActions);

export default function AddTaskModal({
  open,
  closeTaskModal,
  tags,
  mode,
  instance,
  onTaskUpdated,
  onTaskCreated,
  parentTask,
}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState([]);
  const [priority, setPriority] = useState(3);
  let today = new Date();
  today = today.toISOString().substr(0, 10);
  const [date, setDate] = useState(today);

  const { data: priorityList } = useSelector((state) => state.priority);

  useEffect(() => {
    if (instance) {
      setName(instance.title);
      setDescription(instance.description);
      setPriority(instance.priority);
      setTag(instance.tags.map((item) => item.id));
      setDate(instance.due_at.substr(0, 10));
    }
  }, [instance]);

  const handleChangeMultiple = (event) => {
    setTag(event.target.value);
  };

  const handleSelect = (selected) => {
    return selected
      .map((item) => {
        const tagObj = tags.find((tag) => tag.id === item);
        return tagObj.title;
      })
      .join(", ");
  };

  const onSubmit = () => {
    const data = {
      title: name,
      description: description,
      tags: tag,
      priority: priority,
      due_at: date.concat(" 23:59:00"),
    };
    console.log(data);
    if (parentTask) data.parent = parentTask;
    if (mode === "add") {
      onTaskCreated({ data });
    } else if (mode === "edit") {
      onTaskUpdated({
        taskId: instance.id,
        data,
      });
    }

    closeTaskModal();
  };

  return (
    <Dialog
      onClose={closeTaskModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <CustomDialogTitle id="customized-dialog-title" onClose={closeTaskModal}>
        {mode === "add" ? "Add a" : "Edit this "}{" "}
        {parentTask ? "sub task" : "task"}
      </CustomDialogTitle>
      <CustomDialogContent dividers>
        <TextField //name
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={classes.textField}
          variant="outlined"
          autoFocus
          fullWidth
          id="tag-name"
          type="text"
          label="Title"
          size="small"
          // placeholder="Example: Sports, Homework,..."
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField //description
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={classes.textField}
          variant="outlined"
          fullWidth
          id="tag-description"
          type="text"
          label="Description"
          size="small"
          // placeholder="Example: Sports, Homework,..."
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField //due date
          className={classes.textField}
          variant="outlined"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          fullWidth
          id="task-date"
          type="date"
          label="Due Date"
          size="small"
          // placeholder="Example: Sports, Homework,..."
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField //priority
          className={classes.textField}
          label="Priority"
          variant="outlined"
          size="small"
          fullWidth
          id="tag-priority-select"
          InputLabelProps={{
            shrink: true,
          }}
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          select
          SelectProps={{
            style: {
              display: "flex",
              alignItems: "center",
            },
            MenuProps: {
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
              PaperProps: {
                style: {
                  maxHeight: "200px",
                  width: "20ch",
                },
              },
            },
          }}
        >
          {priorityList.map((item) => (
            <MenuItem key={item.key} value={item.key}>
              <Stop fontSize="small" style={{ color: item.color }} />
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField // tags
          className={classes.textField}
          label="Tag"
          variant="outlined"
          size="small"
          fullWidth
          id="tag-color-select"
          InputLabelProps={{
            shrink: true,
          }}
          value={tag}
          onChange={handleChangeMultiple}
          select
          SelectProps={{
            multiple: true,
            renderValue: handleSelect,
            style: {
              display: "flex",
              alignItems: "center",
            },
            MenuProps: {
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
              PaperProps: {
                style: {
                  maxHeight: "200px",
                  width: "20ch",
                },
              },
            },
          }}
        >
          {tags.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              className={classes.menuItem}
            >
              <FiberManualRecord
                fontSize="small"
                style={{ color: item.color }}
              />
              <ListItemText>{item.title}</ListItemText>
              <Checkbox
                checked={tag.includes(item.id)}
                className={classes.checkbox}
                size="small"
              ></Checkbox>
            </MenuItem>
          ))}
        </TextField>
      </CustomDialogContent>
      <CustomDialogActions>
        <Button onClick={closeTaskModal} style={{ color: "gray" }}>
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {mode === "add" ? "Add" : "Save"}
        </Button>
      </CustomDialogActions>
    </Dialog>
  );
}
