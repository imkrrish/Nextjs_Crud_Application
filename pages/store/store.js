import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice';
import stateReducer from './stateSlice';
import updateCustomerReducer from './updateCustomerSlice';

const store = configureStore({
    reducer: {
        customer: customerReducer,
        state: stateReducer,
        update: updateCustomerReducer,
    },
});

export default store;