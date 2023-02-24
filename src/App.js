import { React, useState, useEffect } from 'react';
import SignUser from './UI/SignUser';
import Main from './UI/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import aucontext from "./au-context";
import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter"
import { useNavigate } from "react-router-dom";
//import "bootstrap/dist/js/bootstrap.bundle.min";


function App() {
  const [log_id_state, setLog_id_state] = useState("");
  const navigate = useNavigate();
  let d = [[], []];
  function handler(st) {
    setLog_id_state(st);
  }
  useEffect(() => {
    let j = localStorage.getItem("id3r5");
    if (j === "0" || !j || j === null)
      setLog_id_state("0");
    else {
      setLog_id_state(j);
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <aucontext.Provider value={{ log_id: log_id_state, set_id: handler }}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SignUser />}></Route>
          <Route exact path="/main" element={
            <PrivateRouter>
              <Main data={d} />
            </PrivateRouter>
          }></Route>
        </Routes>
      </div>
    </aucontext.Provider>
  );
}

export default App;
