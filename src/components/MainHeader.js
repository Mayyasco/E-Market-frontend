import { React, useState, useContext } from 'react';
import aucontext from '../au-context';
import logout from './images/logout.png';
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";

const MainHeader = (props) => {
    const ctx = useContext(aucontext);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(["", "active", "", "", "", "", "", "", "none", "none", ""]);

    function handleClickOutside(e) {
        let tmp = isActive.slice();
        tmp[8] = "none";
        setIsActive(tmp);
    }
    function handleClickOutsidea(e) {
        let tmp = isActive.slice();
        tmp[9] = "none";
        setIsActive(tmp);
    }
    function fav_m() {
        if (isActive[0] === "") {
            setIsActive(["active", "", "", "", "", "", "", "", "none", "none", ""]);
        }
        props.fav();
    }
    function mine_m() {
        if (isActive[1] === "") {
            setIsActive(["", "active", "", "", "", "", "", "", "none", "none", ""]);
        }
        props.mine();
    }
    function search_m_c() {
        if (isActive[2] === "") {
            setIsActive(["", "", "active", "", "", "", "", "active", "none", "none", ""]);

        }
        props.searchCar();
    }
    function search_m_h() {
        if (isActive[3] === "") {
            setIsActive(["", "", "", "active", "", "", "", "active", "none", "none", ""]);
        }
        props.searchHouse();
    }
    function add_m_c() {
        if (isActive[4] === "") {
            setIsActive(["", "", "", "", "active", "", "", "", "none", "none", "active"]);
        }
        props.addCar();
    }
    function add_m_h() {
        if (isActive[5] === "") {
            setIsActive(["", "", "", "", "", "active", "", "", "none", "none", "active"]);
        }
        props.addHouse();
    }
    function my_info() {
        if (isActive[6] === "") {
            setIsActive(["", "", "", "", "", "", "active", "", "none", "none", ""]);
        }
        props.myinfo();
    }
    function search() {
        let tmp = isActive.slice();
        if (isActive[8] === "none") {
            tmp[8] = "block";
            tmp[9] = "none";
        }
        else {
            tmp[8] = "none";
        }
        setIsActive(tmp);
    }
    function ad() {
        let tmp = isActive.slice();
        if (isActive[9] === "none") {
            tmp[9] = "block";
            tmp[8] = "none";
        }
        else {
            tmp[9] = "none";
        }
        setIsActive(tmp);
    }
    function signout() {
        localStorage.setItem("id3r5", "0");
        ctx.log_id = 0;
        navigate("/");
    }
    return (
        <div style={{ backgroundColor: "rgb(82, 225, 244)", padding: "10px", minWidth: "280px" }}>
            <div style={{ backgroundColor: "rgb(234 252 247)", borderRadius: "10px" }}>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <ul className="nav nav-tabs" >
                            <li className="nav-item">
                                <div className={clsx("nav-link fs-5", isActive[0])} role="button" onClick={fav_m}>
                                    {/* <img src={home} alt="home" style={{ height: " 30px", width: "36px", paddingBottom: "4px" }} /> */}
                                    My Favorite
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={clsx("nav-link  fs-5", isActive[1])} role="button" onClick={mine_m}>Mine</div>
                            </li>
                            <li className="nav-item">
                                <div className={clsx("nav-link  fs-5", isActive[6])} role="button" onClick={my_info}>My info</div>
                            </li>
                            <li className="nav-item dropdown" onMouseLeave={handleClickOutside} onMouseEnter={search} >

                                <div className={clsx("nav-link dropdown-toggle fs-5 ", isActive[7])} data-bs-toggle="dropdown"
                                    role="button" aria-expanded="false"  >Search</div>

                                <ul className="dropdown-menu" style={{ display: isActive[8] }} >
                                    <li><div className={clsx("dropdown-item fs-5", isActive[2])} role="button" onClick={search_m_c} >Car</div></li>
                                    <li><div className={clsx("dropdown-item fs-5", isActive[3])} role="button" onClick={search_m_h} >House</div></li>
                                </ul>

                            </li>
                            <li className="nav-item dropdown" onMouseLeave={handleClickOutsidea} onMouseEnter={ad}>
                                <div className={clsx("nav-link dropdown-toggle fs-5 ", isActive[10])} data-bs-toggle="dropdown" role="button" aria-expanded="false" >Add</div>
                                <ul className="dropdown-menu" style={{ display: isActive[9] }}>
                                    <li><div className={clsx("dropdown-item  fs-5", isActive[4])} role="button" onClick={add_m_c}>Car</div></li>
                                    <li><div className={clsx("dropdown-item fs-5", isActive[5])} role="button" onClick={add_m_h}>House</div></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav d-flex">
                            <li className="nav-item " >
                                <div className="nav-link fs-5" role="button" onClick={signout}>
                                    <img src={logout} alt="logout" style={{ height: " 30px", width: "38px", paddingRight: "8px" }} />
                                    Sign out</div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MainHeader;