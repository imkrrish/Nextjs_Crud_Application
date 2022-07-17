const { createSlice } = require("@reduxjs/toolkit");

const updateCustomerSlice = createSlice({
  name: "update",
  initialState: {
    data: [],
    customerID: "",
  },
  reducers: {
    setCustomerId(state, action) {
      state.customerID = action.payload;
    },
    setUpdateCustomer(state, action) {
      const { id, Username, email, phoneno, company } = action.payload;
      state.data = {
        id: id,
        Username: Username,
        email: email,
        phoneno: phoneno,
        company: company,
      };
    },
  },
});

export const { setCustomerId, setUpdateCustomer } = updateCustomerSlice.actions;
export default updateCustomerSlice.reducer;
