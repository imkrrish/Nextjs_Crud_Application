import UpdateUserForm from "./updateUserForm";
import AddUserForm from "./addUserForm";
import { useSelector } from "react-redux";

export default function Form(){
    const { flagStatus: flag } = useSelector((state) => state.state);

    return (
        <div className="container mx-auto py-5 px-5">
            { flag ? <AddUserForm /> : <UpdateUserForm /> }
        </div>
    )
}