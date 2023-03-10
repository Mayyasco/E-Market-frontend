import React from 'react';
import { useContext, useState } from 'react';
import Card from './Card';
import INSign from './INSign';
import classes from '../UI/SignUser.module.css';
import name_image from '../components/images/name.png';
import address_image from '../components/images/address.png';
import email_image from '../components/images/email.png';
import password_image from '../components/images/pw.png';
import phone_image from '../components/images/phone.png';
import aucontext from '../au-context';
import { forwardRef, useImperativeHandle } from 'react';
import Cookies from 'universal-cookie';



const SignUp = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            updateinput: (n, e, p, a, ph) => {
                ref_name.current.value = n;
                ref_email.current.value = e;
                ref_address.current.value = a;
                ref_phone.current.value = ph;
            }
        };
    });
    const cookies = new Cookies();
    const [validation, setValidation] = useState(["", ""]);
    const [validationPass, setValidationPass] = useState(["", ""]);
    const ctx = useContext(aucontext);
    //-----------------------------------------------------------------------------
    function handlePass(ref_password_old, ref_password_new1, ref_password_new2, e) {
        e.preventDefault();
        let v = ["", ""];
        let er = 0;
        if (ref_password_new1.current.value !== ref_password_new2.current.value ||
            ref_password_new1.current.value.length < 4) { v[0] = "the length of password must be at least 4 and the two pw fields must be identical"; er = 1; }
        if (ref_password_old.current.value.length < 4) { v[1] = "the length of password must be at least 4"; er = 1; }
        if (er === 1) {
            setValidationPass(v);
            return;
        }
        const token = cookies.get("token");
        const requestOptions = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "oldP": ref_password_old.current.value,
                "newP": ref_password_new1.current.value
            })
        };
        let id = ctx.log_id;
        fetch("/emarket/updateuserpass/" + id, requestOptions)
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
                    let val = ["", ""];
                    if (data.ms !== "ok") {
                        val[1] = data.ms;
                        setValidationPass(val);
                    }
                    else {
                        alert('your password has been updated successfully');
                        ref_password_old.current.value = "";
                        ref_password_new1.current.value = "";
                        ref_password_new2.current.value = "";
                        setValidationPass(val);
                    }

                }
            });
    }
    //-----------------------------------------------------------------------------
    function handleSubmit(ref_name, ref_email, ref_address, ref_phone, e) {
        e.preventDefault();
        const token = cookies.get("token");
        const requestOptions = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "name": ref_name.current.value,
                "email": ref_email.current.value,
                "address": ref_address.current.value,
                "phone": ref_phone.current.value,
                "password": "111111"
            })
        };
        let id = ctx.log_id;

        fetch("/emarket/updateuser/" + id, requestOptions)
            .then(response => {
                if (response.ok || response.status === 400)
                    return response.json();
                else {
                    alert("something went wrong please try again later");
                    setValidation(["", ""]);
                    return -1;
                }
            })
            .then(data => {
                if (data !== -1) {
                    let val = ["", ""];
                    if (!data.id) {
                        if (data.name)
                            val[0] = data.name;
                        if (data.email)
                            val[1] = data.email;
                        if (JSON.stringify(val) === JSON.stringify(["", ""]))
                            alert("something went wrong please try again later");
                        setValidation(val);

                    }
                    else {
                        setValidation(["", ""]);
                        alert('your information has been updated successfully');

                    }
                }

            });
    }
    const ref_name = React.createRef();
    const ref_email = React.createRef();
    const ref_phone = React.createRef();
    const ref_address = React.createRef();
    const ref_password_old = React.createRef();
    const ref_password_new1 = React.createRef();
    const ref_password_new2 = React.createRef();

    return (
        <div>
            <Card >
                <label className={classes.labelhead}>Update your info</label>
                <INSign placeholder='Name' alt='name' src={name_image} ref={ref_name} value={props.value_name} />
                <span className={classes.span}>{validation[0]}</span>
                <INSign placeholder='Email' alt='email' type="email" src={email_image} ref={ref_email} value={props.value_email} />
                <span className={classes.span}>{validation[1]}</span>
                <INSign placeholder='Address' alt='address' src={address_image} ref={ref_address} value={props.value_address} />
                <INSign placeholder='Phone' alt='phone' src={phone_image} ref={ref_phone} value={props.value_phone} />
                <button className={classes.button} onClick={(e) => handleSubmit(
                    ref_name, ref_email,
                    ref_address, ref_phone, e)}>Update</button>
            </Card>
            <Card>
                <label className={classes.labelhead}>Update your password</label>
                <INSign placeholder='Old Password' alt='password' type="password" src={password_image} ref={ref_password_old} />
                <span className={classes.span}>{validationPass[1]}</span>
                <INSign placeholder='New Password' alt='password' type="password" src={password_image} ref={ref_password_new1} />
                <INSign placeholder='re-enter password' alt='re-enter password' type="password" src={password_image} ref={ref_password_new2} />
                <span className={classes.span}>{validationPass[0]}</span>
                <button className={classes.button} onClick={(e) => handlePass(
                    ref_password_old, ref_password_new1, ref_password_new2, e)}>Update</button>
            </Card>
        </div>
    );
});

export default SignUp;