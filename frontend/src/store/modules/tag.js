import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTags, postTag, patchTag, deleteTag } from "./../../api/tagApi";

export const getTags = createAsyncThunk(
  "tags/getTags",
  async (params, thunkApi) => {
    try {
      const { data } = await fetchTags(params);
      return data;
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const createTag = createAsyncThunk(
  "tags/createTag",
  async (payload, thunkApi) => {
    try {
      await postTag(payload);
      thunkApi.dispatch(getTags());
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async ({ tagId, data }, thunkApi) => {
    try {
      await patchTag({ tagId, data });
      thunkApi.dispatch(getTags());
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const removeTag = createAsyncThunk(
  "tags/deleteTag",
  async ({ tagId }, thunkApi) => {
    try {
      await deleteTag({ tagId });
      thunkApi.dispatch(getTags());
    } catch (err) {
      if (err.response) return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const slice = createSlice({
  name: "tagSlice",
  initialState: {
    data: null,
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: {
    [getTags.fulfilled]: (tagSlice, action) => {
      tagSlice.data = action.payload;
      tagSlice.loading = false;
    },
    [getTags.pending]: (tagSlice, action) => {
      tagSlice.loading = true;
    },
    [getTags.rejected]: (tagSlice, action) => {
      tagSlice.errors = action.payload;
      tagSlice.loading = false;
    },
    [updateTag.rejected]: (tagSlice, action) => {
      tagSlice.errors = action.payload;
      tagSlice.loading = false;
    },
    [updateTag.pending]: (tagSlice, action) => {
      tagSlice.loading = true;
    },
  },
});

export default slice.reducer;
