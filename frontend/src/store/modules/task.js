import { fetchTasks, postTask, deleteTask, patchTask } from "../../api/taskApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (params, thunkApi) => {
    try {
      const { data } = await fetchTasks(params);
      return data;
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ data }, thunkApi) => {
    try {
      await postTask(data);
      thunkApi.dispatch(getTasks());
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const removeTask = createAsyncThunk(
  "task/deleteTask",
  async ({ taskId }, thunkApi) => {
    try {
      await deleteTask({ taskId });
      thunkApi.dispatch(getTasks());
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ taskId, data }, thunkApi) => {
    try {
      await patchTask({ taskId, data });
      thunkApi.dispatch(getTasks());
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const slice = createSlice({
  name: "taskSlice",
  initialState: {
    data: null,
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: {
    [getTasks.fulfilled]: (taskSlice, action) => {
      taskSlice.data = action.payload;
      taskSlice.loading = false;
    },
    [getTasks.pending]: (taskSlice, action) => {
      taskSlice.loading = true;
    },
    [getTasks.rejected]: (taskSlice, action) => {
      taskSlice.errors = action.payload;
      taskSlice.loading = false;
    },
    [createTask.pending]: (taskSlice, action) => {
      taskSlice.loading = true;
    },
    [createTask.rejected]: (taskSlice, action) => {
      taskSlice.errors = action.payload;
      taskSlice.loading = false;
    },
  },
});

export default slice.reducer;
