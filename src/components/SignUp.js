import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import INSign from './INSign';
import classes from '../UI/SignUser.module.css';
import name_image from '../components/images/name.png';
import address_image from '../components/images/address.png';
import email_image from '../components/images/email.png';
import password_image from '../components/images/pw.png';
import phone_image from '../components/images/phone.png';
import aucontext from '../au-context';
import { useNavigate } from "react-router-dom";
import { forwardRef, useImperativeHandle } from 'react';




const SignUp = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            updateinput: (n, e, p, a, ph) => {
                ref_name.current.value = n;
                ref_email.current.value = e;
                ref_password.current.value = p;
                ref_password2.current.value = p;
                ref_address.current.value = a;
                ref_phone.current.value = ph;
            }
        };
    });
    const ctx = useContext(aucontext);
    const navigate = useNavigate();
    function handleSubmit(ref_name, ref_email, ref_password,
        ref_address, ref_phone, ref_password2, su, e) {
        e.preventDefault();
        if (su === "s") {//update or sign up
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": ref_name.current.value,
                    "email": ref_email.current.value,
                    "password": ref_password.current.value,
                    "address": ref_address.current.value,
                    "phone": ref_phone.current.value,
                })
            };
            fetch('/emarket/adduser', requestOptions)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("id3r5", data.id);
                    ctx.set_id(data.id);
                    alert('you signed up successfully');
                    navigate("/main");
                });
        }
        else {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": ref_name.current.value,
                    "email": ref_email.current.value,
                    "password": ref_password.current.value,
                    "address": ref_address.current.value,
                    "phone": ref_phone.current.value,
                })
            };
            let id = ctx.log_id;
            fetch("/emarket/updateuser/" + id, requestOptions);
            alert('your information has been updated successfully');
        }

    }
    const ref_name = React.createRef();
    const ref_email = React.createRef();
    const ref_password = React.createRef();
    const ref_password2 = React.createRef();
    const ref_phone = React.createRef();
    const ref_address = React.createRef();

    return (
        <Card >
            <label className={classes.labelhead}>{props.t}</label>
            <INSign placeholder='Name' alt='name' src={name_image} ref={ref_name} value={props.value_name} />
            <INSign placeholder='Email' alt='email' type="email" src={email_image} ref={ref_email} value={props.value_email} />
            <INSign placeholder='Password' alt='password' type="password" src={password_image} ref={ref_password} value={props.value_password} />
            <INSign placeholder='re-enter password' alt='re-enter password' type="password" src={password_image} ref={ref_password2} value={props.value_password} />
            <INSign placeholder='Address' alt='address' src={address_image} ref={ref_address} value={props.value_address} />
            <INSign placeholder='Phone' alt='phone' src={phone_image} ref={ref_phone} value={props.value_phone} />
            <button className={classes.button} onClick={(e) => handleSubmit(
                ref_name, ref_email, ref_password,
                ref_address, ref_phone, ref_password2, props.su,
                e)}>{props.b}</button>
        </Card>
    );
});

export default SignUp;