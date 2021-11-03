import React, { useState, useEffect, Suspense, lazy } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import AddTagModal from "../components/taskPage/AddTagModal";
import { useDispatch, useSelector } from "react-redux";
import { getTags, createTag, updateTag, removeTag } from "../store/modules/tag";
import { getTasks } from "../store/modules/task";
import Content from "../components/taskPage/Content";
import Header from "../components/taskPage/Header";
import SideBar from "../components/taskPage/SideBar";

const TagModal = lazy(() => import("../components/taskPage/TagModal"));

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
  },
}));

function TaskPage(props) {
  // states
  const [drawerOpen, setDrawerOpen] = useState(true); //drawer state

  // tag modal states
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [tagModalMode, setTagModalMode] = useState("");
  const [editedTag, setEditedTag] = useState(null);

  // task modal states

  // styles
  const classes = useStyles();

  const dispatch = useDispatch();

  //fetch data
  useEffect(() => {
    dispatch(getTags());
    dispatch(getTasks());
  }, []);

  // redux calling
  const {
    data: tags,
    // loading: tagLoading,
    // errors: tagErrors,
  } = useSelector((state) => state.tags);
  const {
    data: tasks,
    // loading: taskLoading,
    // errors: taskErrors,
  } = useSelector((state) => state.tasks);

  // tag modal
  const onTagAdded = (data) => {
    dispatch(createTag(data));
  };

  const onTagUpdated = ({ tagId, data }) => {
    dispatch(updateTag({ tagId, data }));
  };

  const onTagRemoved = ({ tagId }) => {
    dispatch(removeTag({ tagId }));
  };

  const handleTagModalOpen = (mode, instance) => {
    setTagModalMode(mode);
    if (mode === "edit") setEditedTag(instance);
    setTagModalOpen(!tagModalOpen);
  };

  const closeTagModal = () => {
    setTagModalMode("");
    setTagModalOpen(false);
  };

  // get tasks functions used in sidebar
  const getTasksByParams = (params) => {
    dispatch(getTasks(params));
  };
  return (
    <Container className={classes.container} disableGutters maxWidth={false}>
      <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      {tags && (
        <SideBar
          drawerOpen={drawerOpen}
          handleTagModalOpen={handleTagModalOpen}
          tags={tags}
          onTagRemoved={onTagRemoved}
          getTasksByParams={getTasksByParams}
        />
      )}
      <Suspense>
        <TagModal
          open={tagModalOpen}
          mode={tagModalMode}
          closeTagModal={closeTagModal}
          onAdd={onTagAdded}
          onUpdate={onTagUpdated}
          instance={editedTag}
        />
      </Suspense>
      {tags && tasks && <Content tags={tags} tasks={tasks} />}
    </Container>
  );
}

export default TaskPage;
