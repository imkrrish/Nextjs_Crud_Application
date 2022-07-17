import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { add, postCustomers } from "../pages/store/customerSlice";
import { setVisibleStatus } from "../pages/store/stateSlice";
import { v4 as uuidv4 } from "uuid";
import Success from "./success";
import Bug from "./bug";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function AddUserForm() {
  const { status: visible } = useSelector((state) => state.state);
  const dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formReducer, {});

  const addCustomerHandler = async (data) => {
    const request = {
      id: uuidv4(),
      ...data,
    };
    dispatch(postCustomers(request));
    dispatch(add(request));
    dispatch(setVisibleStatus(!visible));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    addCustomerHandler(formData);
  };

    // if (Object.keys(formData).length > 0) return <Bug message={"Error"}></Bug>;

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="Username"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="User Name"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="E-mail"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="phoneno"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Phone No."
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="company"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Company"
        />
      </div>

      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{" "}
        <span className="px-1">
          <BiPlus size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
}
