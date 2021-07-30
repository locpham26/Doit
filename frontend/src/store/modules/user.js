import { login, register } from "../../api/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ username, password }, thunkApi) => {
    try {
      const { data: jwt } = await login({
        username,
        password,
      });
      localStorage.setItem("access_token", jwt.access);
      return jwt_decode(jwt.access);
    } catch (ex) {
      if (ex.response) {
        return thunkApi.rejectWithValue(ex.response.data);
      }
    }
  }
);

const slice = createSlice({
  name: "userSlice",
  initialState: {
    data: null,
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: {
    [loginUser.rejected]: (userSlice, action) => {
      userSlice.errors = action.payload;
      userSlice.loading = false;
    },
    [loginUser.fulfilled]: (userSlice, action) => {
      userSlice.data = action.payload;
    },
    [loginUser.pending]: (userSlice, action) => {
      userSlice.loading = true;
      userSlice.loading = false;
    },
  },
});

export default slice.reducer;
