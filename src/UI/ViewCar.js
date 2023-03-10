import React from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import IN from '../components/IN';
import im from '../components/images/car_image.jpg';
import classes from './Add.module.css';
import { forwardRef, useImperativeHandle } from 'react';
import Button from '../components/Button';

const ViewCar = forwardRef((props, ref) => {
  const [img, setImg] = useState(im);
  useImperativeHandle(ref, () => {
    return {
      updateinput: (m, mod, t, y, mi, c, b, co, o, tr, a, img, un, ue, ua, up) => {
        ref_make.current.value = m;
        ref_scroll.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        ref_model.current.value = mod;
        ref_year.current.value = y;
        ref_condition.current.value = c;
        ref_body_type.current.value = b;
        ref_trans.current.value = tr;
        ref_cost.current.value = co;
        ref_mileage.current.value = mi;
        ref_other_details.current.value = o;
        ref_trim.current.value = t;
        ref_address.current.value = a;
        name.current.value = un;
        email.current.value = ue;
        add.current.value = ua;
        phone.current.value = up;

        setImg(img);
      }
    };
  });

  const ref_make = React.createRef();
  const ref_model = React.createRef();
  const ref_trim = React.createRef();
  const ref_year = React.createRef();
  const ref_mileage = React.createRef();
  const ref_condition = React.createRef();
  const ref_body_type = React.createRef();
  const ref_cost = React.createRef();
  const ref_other_details = React.createRef();
  const ref_trans = React.createRef();
  const ref_address = React.createRef();
  const ref_scroll = React.createRef();
  const name = React.createRef();
  const email = React.createRef();
  const add = React.createRef();
  const phone = React.createRef();

  return (
    <div className="App" disabled={true}>
      <Card>
        <button className={classes.close_button} onClick={props.cancel} ref={ref_scroll}>X</button>
        <img src={img} alt="Car" className={classes.im} />
        <IN label='make' ref={ref_make} disabled={true} />
        <IN label='model' ref={ref_model} disabled={true} />
        <IN label='trim' ref={ref_trim} disabled={true} />
        <IN label='year' ref={ref_year} disabled={true} />
        <IN label='mileage' ref={ref_mileage} disabled={true} />
        <IN label='transmission' ref={ref_trans} disabled={true} />
        <IN label='condition' ref={ref_condition} disabled={true} />
        <IN label='body type' ref={ref_body_type} disabled={true} />
        <IN label='cost $' type="number" ref={ref_cost} disabled={true} />
        <IN label='address' ref={ref_address} disabled={true} />
        <label className={classes.label} > other details</label>
        <textarea className={classes.cb2} ref={ref_other_details} disabled={true}></textarea>
        <label className={classes.labelhead} >owner info</label>
        <IN label='Name' ref={name} disabled={true} />
        <IN label='Email' ref={email} disabled={true} />
        <IN label='Address' ref={add} disabled={true} />
        <IN label='Phone' ref={phone} disabled={true} />
        <Button onClick={props.cancel}>OK</Button>
      </Card>
    </div>
  );
});

export default ViewCar;