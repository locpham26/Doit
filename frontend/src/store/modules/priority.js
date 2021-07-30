import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "prioritySlice",
  initialState: {
    data: [
      { key: 1, label: "Extreme Priority", color: "purple" },
      { key: 2, label: "High Priority", color: "red" },
      { key: 3, label: "Medium Priority", color: "orange" },
      { key: 4, label: "Low Priority", color: "yellow" },
      { key: 5, label: "No Priority", color: "gray" },
    ],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: {},
});

export default slice.reducer;
