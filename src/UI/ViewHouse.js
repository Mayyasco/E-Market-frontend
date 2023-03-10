import React from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import IN from '../components/IN';
import im from '../components/images/house.jpg';
import Button from '../components/Button';
import classes from './Add.module.css';
import { forwardRef, useImperativeHandle } from 'react';

const ViewHouse = forwardRef((props, ref) => {
  const [img, setImg] = useState(im);
  useImperativeHandle(ref, () => {
    return {
      updateinput: (bn, s, c, str, z, co, a, b, o, fo, ba, img, un, ue, ua, up) => {
        ref_bn.current.value = bn;
        ref_scroll.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        ref_state.current.value = s;
        ref_city.current.value = c;
        ref_street.current.value = str;
        ref_zip.current.value = z;
        ref_area.current.value = co;
        ref_cost.current.value = a;
        ref_bed.current.value = b;
        ref_other_details.current.value = o;
        ref_fo.current.value = fo;
        ref_bath.current.value = ba;
        name.current.value = un;
        email.current.value = ue;
        add.current.value = ua;
        phone.current.value = up;
        setImg(img);
      }
    };
  });
  const ref_bn = React.createRef();
  const ref_state = React.createRef();
  const ref_city = React.createRef();
  const ref_street = React.createRef();
  const ref_bed = React.createRef();
  const ref_zip = React.createRef();
  const ref_area = React.createRef();
  const ref_cost = React.createRef();
  const ref_other_details = React.createRef();
  const ref_fo = React.createRef();
  const ref_bath = React.createRef();
  const ref_scroll = React.createRef();
  const name = React.createRef();
  const email = React.createRef();
  const add = React.createRef();
  const phone = React.createRef();

  return (
    <div className="App">
      <Card>
        <button className={classes.close_button} onClick={props.cancel} ref={ref_scroll}>X</button>
        <img src={img} alt="House" className={classes.im} />
        <IN label='building number' ref={ref_bn} disabled={true} />
        <IN label='street' ref={ref_street} disabled={true} />
        <IN label='city' ref={ref_city} disabled={true} />
        <IN label='zip' ref={ref_zip} disabled={true} />
        <IN label='state' ref={ref_state} disabled={true} />
        <IN label='area' ref={ref_area} disabled={true} />
        <IN label='bed rooms' ref={ref_bed} disabled={true} />
        <IN label='baths' ref={ref_bath} disabled={true} />
        <IN label='rent/sale' ref={ref_fo} disabled={true} />
        <IN label='cost $' type="number" ref={ref_cost} disabled={true} />
        <label className={classes.label}> other details</label>
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

export default ViewHouse;