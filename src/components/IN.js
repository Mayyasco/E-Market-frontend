import React from 'react';

import classes from './IN.module.css';

const IN = React.forwardRef((props, ref) => (
  <div className={classes.container}>
    <label className={classes.label}> {props.label}</label>
    <input
      className={classes.tb}
      type={props.type || 'text'}
      ref={ref}
      disabled={props.disabled}
    //onChange={props.onChange}
    />
  </div>
));

export default IN;
