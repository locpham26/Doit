import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  MenuItem,
  Typography,
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@material-ui/core";
import { InvertColors, Close } from "@material-ui/icons";

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

const colorList = [
  { key: "maroon", label: "Maroon", value: "#800000" },
  { key: "red", label: "Red", value: "#FF0000" },
  { key: "coral", label: "Coral", value: "#FF8080" },
  { key: "orange", label: "Orange", value: "#FF4500" },
  { key: "gold", label: "Gold", value: "#FFD700" },
  { key: "yellow", label: "Yellow", value: "#FFFF00" },
  { key: "lime", label: "Lime", value: "#00FF00" },
  { key: "green", label: "Green", value: "#008000" },
  { key: "spring green", label: "Spring Green", value: "#00FF7F" },
  { key: "cyan", label: "Cyan", value: "#00FFFF" },
  { key: "teal", label: "Teal", value: "#008080" },
  { key: "blue", label: "Blue", value: "#0000FF" },
  { key: "navy", label: "Navy", value: "#000080" },
  { key: "dodger blue", label: "Dodger Blue", value: "#1E90FF" },
  { key: "purple", label: "Purple", value: "#800080" },
  { key: "indigo", label: "Indigo", value: "#4B0082" },
  { key: "fuchsia", label: "Fuchsia", value: "#FF00FF" },
  { key: "gray", label: "Gray", value: "#696969" },
];

export default function AddTagModal({
  open,
  closeTagModal,
  onAdd,
  onUpdate,
  mode,
  instance,
}) {
  const classes = useStyles();
  const [color, setColor] = useState("#FF0000");
  const [tagName, setTagName] = useState("");
  useEffect(() => {
    if (instance) {
      setTagName(instance.title);
      setColor(instance.color);
    }
  }, [instance]);

  const pickColor = (event) => {
    setColor(event.target.value);
  };

  const onSubmit = () => {
    if (mode === "add") onAdd({ title: tagName, color: color });
    else if (mode === "edit")
      onUpdate({
        tagId: instance.id,
        data: { title: tagName, color: color },
      });
    closeTagModal();
  };

  return (
    <Dialog
      onClose={closeTagModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <CustomDialogTitle id="customized-dialog-title" onClose={closeTagModal}>
        Add a new tag
      </CustomDialogTitle>
      <CustomDialogContent dividers>
        <TextField
          className={classes.textField}
          variant="outlined"
          autoFocus
          fullWidth
          value={tagName}
          onChange={(event) => setTagName(event.target.value)}
          id="tag-name"
          type="text"
          label="Tag name"
          size="small"
          placeholder="Example: Sports, Homework,..."
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          className={classes.textField}
          label="Tag Color"
          variant="outlined"
          size="small"
          fullWidth
          id="tag-color-select"
          value={color}
          onChange={pickColor}
          InputLabelProps={{
            shrink: true,
          }}
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
          {colorList.map((color) => (
            <MenuItem key={color.key} value={color.value}>
              <InvertColors fontSize="small" style={{ color: color.value }} />
              <span style={{ marginLeft: "10px" }}>{color.label}</span>
            </MenuItem>
          ))}
        </TextField>
      </CustomDialogContent>
      <CustomDialogActions>
        <Button onClick={closeTagModal} style={{ color: "gray" }}>
          Close
        </Button>
        <Button variant="contained" onClick={onSubmit} color="primary">
          Add
        </Button>
      </CustomDialogActions>
    </Dialog>
  );
}
