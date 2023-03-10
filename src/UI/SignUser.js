import React from 'react';
import classes from './SignUser.module.css';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const SignUser = (props) => {


  return (

    <div>
      <div className={classes.header1}>
        <div className={classes.header2}>
          E-Market..
          <span style={{ fontSize: "35px" }}> search and offer cars and houses</span>
        </div>
      </div>
      <SignIn />
      <div className={classes.or}>OR</div>
      <SignUp t={"Sign up.. to be  a member"} b={"Sign Up"} su={"s"} />
    </div >

  );
};

export default SignUser;