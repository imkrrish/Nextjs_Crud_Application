const { createSlice } = require("@reduxjs/toolkit");

const stateSlice = createSlice({
  name: "state",
  initialState: {
    visibleStatus: "false",
    flagStatus: "true",
  },
  reducers: {
    setVisibleStatus(state, action) {
      state.visibleStatus = action.payload;
    },
    setFlagStatus(state, action) {
        state.flagStatus = action.payload;
    },
  },
});

export const { setVisibleStatus, setFlagStatus } = stateSlice.actions;
export default stateSlice.reducer;
