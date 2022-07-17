import api from "../api/customer";
const { createSlice } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setCustomers(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    add(state, action) {
      state.data.push(action.payload);
    },
    updateCustomer(state, action) {
      const { id, Username, email, phoneno, company } = action.payload;
      const existingCustomer = state.data.find(
        (customer) => customer.id === id
      );
      if (existingCustomer) {
        existingCustomer.Username = Username;
        existingCustomer.email = email;
        existingCustomer.phoneno = phoneno;
        existingCustomer.company = company;
      }
    },
    deleteCustomer(state, action) {
      const customerID = action.payload;
      console.log(customerID);
      const existingCustomer = state.data.find(
        (customer) => customer.id === customerID
      );
      if (existingCustomer) {
        state.data = state.data.filter(
          (customer) => customer.id !== customerID
        );
      }
    },
  },
});

export const { setCustomers, setStatus, add, updateCustomer, deleteCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;

// Thunks

export function fetchCustomers() {
  return async function fetchCustomerThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.get("/customers");
      const data = await res.data;
      dispatch(setCustomers(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function postCustomers(request) {
  return async function postCustomerThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.post("/customers", request);
      const data = res.data;
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function updateCustomers(customer, customerid) {
  return async function updateCustomerThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.put(`/customers/${customerid}`, customer);
      const data = res.data;
      dispatch(updateCustomer(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function deleteCustomers(customerid) {
  return async function deleteCustomerThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await api.delete(`/customers/${customerid}`);
      const data = res.data;
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}