import { React, useContext } from "react";
import { Navigate } from "react-router-dom";
import aucontext from './au-context';

const PrivateRouter = ({ children }) => {
    const ctx = useContext(aucontext);
    let j = ctx.log_id;
    if (j === "0" || !j || j === null)
        return <Navigate to="/" />;
    else
        return children;
}
export default PrivateRouter;
