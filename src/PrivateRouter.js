import { React } from "react";
import { Navigate } from "react-router-dom";
const PrivateRouter = ({ children }) => {
    let j = localStorage.getItem("id3r5");
    if (j === "0" || !j || j === null)
        return <Navigate to="/" />;
    else
        return children;
}
export default PrivateRouter;
