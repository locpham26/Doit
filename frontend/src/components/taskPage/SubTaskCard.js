import React, { useState } from "react";
import {
  Checkbox,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FiberManualRecord, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    marginBottom: theme.spacing(0),
  },
  checkBoxWrapper: {
    flex: "0 1 40px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  mainContent: {
    flex: "1 1 auto",
    padding: `${theme.spacing(1, 0, 1, 0)} !important`,
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
  },
  tagList: {
    display: "flex",
    flexDirection: "row",
  },
  tagListItem: {
    padding: theme.spacing(1, 1, 0, 0),
    flex: "0 0 50px",
  },
  tagItemIcon: {
    minWidth: "unset",
  },
  tagItemText: {
    fontSize: "14px",
  },
  subTaskDivider: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

function SubTaskCard({
  parentId,
  subtask,
  lastChild,
  onTaskRemoved,
  openTaskModal,
}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const onCheck = () => {
    setChecked(true);
    onTaskRemoved({ taskId: subtask.id });
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.checkBoxWrapper}>
          <Checkbox
            className={classes.checkbox}
            checked={checked}
            onChange={onCheck}
          />
        </div>
        <div className={classes.mainContent}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography className={classes.cardTitle} variant="body1">
              {subtask.title}
            </Typography>
            <IconButton
              size="small"
              onClick={() =>
                openTaskModal({
                  mode: "edit",
                  instance: subtask,
                  parentTask: parentId,
                })
              }
            >
              <Edit style={{ fontSize: "16px" }} />
            </IconButton>
          </div>
          <Typography className={classes.cardDetail} variant="body2">
            {subtask.description}
          </Typography>
          <List disablePadding className={classes.tagList}>
            {subtask.tags.map((tag) => (
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
        </div>
      </div>
      {!lastChild && <Divider className={classes.subTaskDivider} />}
    </>
  );
}

export default SubTaskCard;
