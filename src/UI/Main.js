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

function Main(props) {
    const [child_state, setChild_state] = useState();
    const signRef = useRef();
    const ctx = useContext(aucontext);
    useEffect(() => {
        let j = localStorage.getItem("id3r5");
        if (j === "0" || !j || j === null);
        else {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch('/emarket/mine/' + j, requestOptions)
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
        }
    }, []);
    function f_myinfo() {
        let id = ctx.log_id;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/emarket/getuser/' + id, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();
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
    function addCar() {
        setChild_state(<AddCar />);
    }
    function addHouse() {
        setChild_state(<AddHouse />);
    }
    function searchHouse() {
        setChild_state(<SearchHouselist />);
    }
    function searchCar() {
        setChild_state(<SearchCarlist />);
    }
    function mine() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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
                    setChild_state(<Mine my_list={data} icon={"m"} />)
            });
    }
    function fav() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/emarket/fav/' + ctx.log_id, requestOptions)
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
