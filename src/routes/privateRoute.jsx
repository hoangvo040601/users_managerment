import { useContext } from "react";
import {
    Route,
    Routes,
} from "react-router-dom";
import { UserContext } from "../context/useContext";


const PrivateRoute = (props) => {

    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (

            <div className="alert alert-danger mt-3" role="alert">
                You don't have permission to access this route.
            </div>
        )
    } else {
        return (

            <>
                {props.children}
            </>
        )
    }
}
export default PrivateRoute;