import React from 'react';
import { useContext, useState } from 'react';
import Card from '../components/Card';
import INSign from './INSign';
import classes from '../UI/SignUser.module.css';
import email_image from '../components/images/email.png';
import password_image from '../components/images/pw.png';
import aucontext from '../au-context';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const SignIn = (props) => {
    const cookies = new Cookies();
    const [validation, setValidation] = useState(["", ""]);
    const ctx = useContext(aucontext);
    const navigate = useNavigate();
    function signin(ref_email_in, ref_password_in, e) {
        e.preventDefault();
        let email = ref_email_in.current.value;
        let password = ref_password_in.current.value;
        let val = ["", ""];
        let er = 0;
        let regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
        if (!regex.test(email)) { val[0] = "please enter valid email"; er = 1; }
        if (password.length < 4) { val[1] = "the length of password must be at least 4"; er = 1; }
        if (er === 1) {
            setValidation(val);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": ref_email_in.current.value,
                "password": ref_password_in.current.value,
            })
        };
        fetch('/emarket/signin', requestOptions)
            .then(response => {
                if (response.ok || response.status === 501)
                    return response.json();
                else {
                    alert("something went wrong please try again later");
                    setValidation(["", ""]);
                    return -1;
                }
            })
            .then(data => {

                if (data !== -1) {
                    if (data.Exception) {
                        if (data.Exception === "Bad credentials") {
                            alert("Wrong Email or Password!!");
                            setValidation(["", ""]);
                        }
                        else {
                            alert("something went wrong please try again later");
                            setValidation(["", ""]);
                        }
                    }
                    else if (data.id) {
                        cookies.set('token', data.token, { path: '/', expires: new Date(Date.now() + 604800000000) });
                        //localStorage.setItem("token", data.token);
                        ctx.set_id(data.id);
                        navigate("/main");
                    }
                    else {
                        alert("something went wrong please try again later");
                        setValidation(["", ""]);
                    }
                }
            }
            );
    }
    const ref_email_in = React.createRef();
    const ref_password_in = React.createRef();
    return (


        < Card >
            <label className={classes.labelhead}>Member..Sign in</label>
            <INSign placeholder='Email' alt='email' type="email" src={email_image} ref={ref_email_in} />
            <span className={classes.span}>{validation[0]}</span>
            <INSign placeholder='Password' alt='password' type="password" src={password_image} ref={ref_password_in} />
            <span className={classes.span}>{validation[1]}</span>
            <button className={classes.button} onClick={(e) => signin(
                ref_email_in, ref_password_in, e)}>Sign in</button>
        </Card>

    );
};

export default SignIn;