import React from 'react';

import classes from './INSign.module.css';

const IN_sign = React.forwardRef((props, ref) => (
  <div className={classes.container}>
    <img src={props.src} alt={props.alt} className={classes.side_image} />
    <input
      className={classes.tb}
      type={props.type || 'text'}
      ref={ref}
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
    />
  </div>
));

export default IN_sign;
