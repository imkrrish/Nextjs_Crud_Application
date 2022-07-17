import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCustomers } from "../pages/store/customerSlice";
import { setFlagStatus } from "../pages/store/stateSlice";
import { setVisibleStatus } from "../pages/store/stateSlice";
import { setCustomerId } from "../pages/store/updateCustomerSlice";
import { setUpdateCustomer } from "../pages/store/updateCustomerSlice";
import { deleteCustomers } from "../pages/store/customerSlice";
import { deleteCustomer } from "../pages/store/customerSlice";

export default function Table() {
  const dispatch = useDispatch();
  const { data: customers } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Username</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">E-mail</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Phone No.</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Company</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {customers.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ id, Username, email, phoneno, company }) {
  const dispatch = useDispatch();
  const { flagStatus: flag } = useSelector((state) => state.state);
  const { visibleStatus: visible } = useSelector((state) => state.state);

  const handler = (customerId) => {
    dispatch(setFlagStatus(!flag));
    dispatch(setVisibleStatus(!visible));
    dispatch(setCustomerId(customerId));
    dispatch(setUpdateCustomer({ id, Username, email, phoneno, company }));
  };

  const handleDelete = (customerID) => {
    console.log(customerID);
    dispatch(deleteCustomer(customerID));
    console.log(customerID);
    dispatch(deleteCustomers(customerID));
  };
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">
          {Username || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{phoneno || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{company || "Unknown"}</span>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button
          className="cursor"
          onClick={() => {
            const customerId = id;
            handler(customerId);
          }}
        >
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button
          className="cursor"
          onClick={() => {
            const customerID = id;
            handleDelete(customerID);
          }}
        >
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
