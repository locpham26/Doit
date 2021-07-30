import { combineReducers } from "redux";
import userReducer from "./modules/user";
import taskReducer from "./modules/task";
import tagReducer from "./modules/tag";
import priorityReducer from "./modules/priority";

export default combineReducers({
  users: userReducer,
  tasks: taskReducer,
  tags: tagReducer,
  priority: priorityReducer,
});
