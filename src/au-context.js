import React from "react";
function handler() { }
const aucontext = React.createContext({ log_id: "", set_id: handler });
export default aucontext;