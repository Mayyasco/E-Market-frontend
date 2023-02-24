import React from 'react';
import { useContext } from 'react';
import Card from '../components/Card';
import INSign from './INSign';
import classes from '../UI/SignUser.module.css';
import email_image from '../components/images/email.png';
import password_image from '../components/images/pw.png';
import aucontext from '../au-context';
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
    const ctx = useContext(aucontext);
    const navigate = useNavigate();
    function signin(ref_email_in, ref_password_in, e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": ref_email_in.current.value,
                "password": ref_password_in.current.value,
            })
        };
        fetch('/emarket/signin', requestOptions)
            .then(response => response.json())
            .then(data => {
                let tmp = JSON.parse(data);
                if (tmp === 0)
                    alert("Wrong Email or Password!!");
                else {
                    localStorage.setItem("id3r5", tmp);
                    ctx.set_id(tmp);
                    navigate("/main");
                }
            });
    }
    const ref_email_in = React.createRef();
    const ref_password_in = React.createRef();
    return (


        < Card >
            <label className={classes.labelhead}>Member..Sign in</label>
            <INSign placeholder='Email' alt='email' type="email" src={email_image} ref={ref_email_in} />
            <INSign placeholder='Password' alt='password' type="password" src={password_image} ref={ref_password_in} />
            <button className={classes.button} onClick={(e) => signin(
                ref_email_in, ref_password_in, e)}>Sign in</button>
        </Card>

    );
};

export default SignIn;