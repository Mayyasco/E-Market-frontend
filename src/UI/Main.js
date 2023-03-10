import React from 'react';
import MainHeader from '../components/MainHeader';
import SignUpdate from '../components/SignUpdate';
import { useContext, useRef, useState, useEffect } from 'react';
import aucontext from '../au-context';
import AddCar from './AddCar';
import AddHouse from './AddHouse';
import SearchCarlist from './SearchCarlist';
import SearchHouselist from './SearchHouselist';
import Mine from './Mine';
import Fav from './Fav';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

function Main(props) {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [child_state, setChild_state] = useState();
    const signRef = useRef();
    const ctx = useContext(aucontext);
    //-----------------------------------------

    useEffect(() => {

        const token = cookies.get("token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        fetch('/emarket/mine/' + ctx.log_id, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();
                else {
                    alert("something went wrong please try again later");
                    return -1;
                }
            })
            .then(data => {
                if (data !== -1)
                    setChild_state(<Mine my_list={data} icon={"m"} />);
            });
        // eslint-disable-next-line
    }, []);
    //-----------------------------------------------------------------
    function f_myinfo() {
        let id = ctx.log_id;
        const token = cookies.get("token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        };
        fetch('/emarket/getuser/' + id, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();
                //-------------------------
                else if (response.status === 403) {
                    alert("you are not signed please sign in");
                    navigate("/");
                }
                //-------------------------
                else {
                    alert("something went wrong please try again later");
                    return -1;
                }
            })
            .then(data => {
                if (data !== -1) {
                    setChild_state(<SignUpdate ref={signRef} />);
                    signRef.current.updateinput(data.name, data.email, data.password, data.address, data.phone);
                }
            });

    }
    function addCar(mine_return) {
        setChild_state(<AddCar mine_return={mine_return} />);
    }
    function addHouse(mine_return) {
        setChild_state(<AddHouse mine_return={mine_return} />);
    }
    function searchHouse() {
        setChild_state(<SearchHouselist />);
    }
    function searchCar() {
        setChild_state(<SearchCarlist />);
    }
    function mine() {
        const token = cookies.get("token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        };
        fetch('/emarket/mine/' + ctx.log_id, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();
                //-------------------------
                else if (response.status === 403) {
                    alert("you are not signed please sign in");
                    navigate("/");
                }
                //-------------------------
                else {
                    alert("something went wrong please try again later");
                    return -1;
                }
            })
            .then(data => {
                if (data !== -1)
                    setChild_state(<Mine my_list={data} icon={"m"} />)
            });
    }
    function fav() {
        const token = cookies.get("token");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        };
        fetch('/emarket/fav/' + ctx.log_id, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();
                //-------------------------
                else if (response.status === 403) {
                    alert("you are not signed please sign in");
                    navigate("/");
                }
                //-------------------------
                else {
                    alert("something went wrong please try again later");
                    return -1;
                }
            })
            .then(data => {
                if (data !== -1)
                    setChild_state(<Fav my_list={data} icon={"f"} />);

            });
    }
    return (
        <div>
            <MainHeader myinfo={f_myinfo} addCar={addCar}
                addHouse={addHouse} mine={mine} fav={fav}
                searchCar={searchCar} searchHouse={searchHouse}
            />
            <div>{child_state}</div>
        </div>
    );
}

export default Main;
