
import Home from "../components/Home";
import Login from "../components/Login";
import TableUser from "../components/TableUser";
import PrivateRoute from "./privateRoute";
import {
    Route,
    Routes,
} from "react-router-dom";

const AppRoutes = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/user"
                element={
                    <PrivateRoute>
                        <TableUser />
                    </PrivateRoute>
                }
            />
        </Routes>
    </>
}

export default AppRoutes;