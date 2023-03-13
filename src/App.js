import { React, useState, useEffect } from 'react';
import SignUser from './UI/SignUser';
import Main from './UI/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import aucontext from "./au-context";
import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter"
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

//import "bootstrap/dist/js/bootstrap.bundle.min";


function App() {

  const [log_id_state, setLog_id_state] = useState("-1");
  const cookies = new Cookies();
  const navigate = useNavigate();
  let d = [[], []];
  function handler(st) {
    setLog_id_state(st);
  }
  let returned = <div></div>;
  useEffect(() => {
    if (window.location.pathname === '/main' || window.location.pathname === '/') {
      let j = cookies.get('token');
      if (j === "0" || !j || j === null) {
        cookies.set('token', "0");
        setLog_id_state("0");
        navigate("/");
      }
      else {

        fetch('/emarket/getid/' + j)
          .then(response => {
            if (response.ok)
              return response.json();
            else {
              cookies.set('token', "0");
              setLog_id_state("0");
              navigate("/");
              return -1;
            }
          })
          .then(data => {
            if (data !== -1) {
              setLog_id_state(data.id);
              navigate("/main");
            }
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (log_id_state !== '-1') returned =
    <div>
      <aucontext.Provider value={{ log_id: log_id_state, set_id: handler }}>
        <div className="App">
          <Routes>
            <Route exact path="/main" element={
              <PrivateRouter>
                <Main data={d} />
              </PrivateRouter>
            }></Route>
            <Route exact path="/" element={<SignUser />}></Route>
          </Routes>
        </div>
      </aucontext.Provider>
    </div>
    ;
  else returned = <div></div>;
  return (
    <div>{returned}</div>
  );
}

export default App;
