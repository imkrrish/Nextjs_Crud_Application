import { useEffect, useReducer, useState } from "react";
import { BiBrush } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomers } from "../pages/store/customerSlice";
import Success from "./success";
import Bug from "./bug";

export default function UpdateUserForm() {
  const dispatch = useDispatch();
  const { customerID: customerid } = useSelector((state) => state.update);
  const { data: customer } = useSelector((state) => state.update);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phoneno, setPhoneno] = useState();
  const [company, setcompany] = useState();

  useEffect(() => {
    setUserName(customer.Username);
    setEmail(customer.email);
    setPhoneno(customer.phoneno);
    setcompany(customer.company);
  }, []);

  const formData = {
    Username: userName,
    email,
    phoneno,
    company,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    dispatch(updateCustomers(formData, customerid));
  };

  // if (Object.keys(formData).length > 0) return <Bug message={"Error"}></Bug>;

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          name="Username"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="User Name"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="E-mail"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          value={phoneno}
          onChange={(e) => setPhoneno(e.target.value)}
          name="phoneno"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Phone No."
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          value={company}
          onChange={(e) => setcompany(e.target.value)}
          name="company"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Company"
          defaultValue={customer.company}
        />
      </div>

      <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Update{" "}
        <span className="px-1">
          <BiBrush size={24}></BiBrush>
        </span>
      </button>
    </form>
  );
}
