import React from 'react';
import Card from '../components/Card';
import IN from '../components/IN';
import Button from '../components/Button';
import classes from './Add.module.css';
import aucontext from '../au-context';
import { useContext } from 'react';

const AddCar = (props) => {
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
  const ctx = useContext(aucontext);

  function handleSubmit(ref_make, ref_model, ref_trim,
    ref_year, ref_mileage, ref_trans,
    ref_condition, ref_body_type, ref_other_details, ref_cost, ref_address, e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "make": ref_make.current.value,
        "model": ref_model.current.value,
        "year": ref_year.current.value,
        "cond": ref_condition.current.value,
        "body_type": ref_body_type.current.value,
        "trans": ref_trans.current.value,
        "cost": ref_cost.current.value,
        "mileage": ref_mileage.current.value,
        "other": ref_other_details.current.value,
        "trim": ref_trim.current.value,
        "address": ref_address.current.value,
      })
    };
    fetch('/emarket/addcar/' + ctx.log_id, requestOptions);
    //.then(response => response.json())
    //.then(data => console.log(data));

    ref_make.current.value = '';
    ref_model.current.value = '';
    ref_year.current.value = '';
    ref_condition.current.value = '';
    ref_body_type.current.value = '';
    ref_trans.current.value = '';
    ref_cost.current.value = '';
    ref_mileage.current.value = '';
    ref_other_details.current.value = '';
    ref_trim.current.value = '';
    ref_address.current.value = '';
    alert('A new car has been added successfully');
  }
  return (
    <div className="App">
      <Card>
        <label className={classes.labelhead}> Add Car</label>
        <IN label='make' ref={ref_make} />
        <IN label='model' ref={ref_model} />
        <IN label='trim' ref={ref_trim} />
        <IN label='year' type="number" ref={ref_year} />
        <IN label='mileage' type="number" ref={ref_mileage} />
        <label className={classes.label}> transmission</label>
        <select className={classes.cb} name="trans" ref={ref_trans}>
          <option value="manual">manual</option>
          <option value="auto">auto</option>
        </select>
        <label className={classes.label}> condition</label>
        <select className={classes.cb} name="condition" ref={ref_condition}>
          <option value="new">new</option>
          <option value="used">used</option>
        </select>
        <label className={classes.label}> body type</label>
        <select className={classes.cb} name="body_type" ref={ref_body_type}>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
          <option value="Van">Van</option>
          <option value="Sport">Sport</option>
        </select>
        <IN label='cost $' type="number" ref={ref_cost} />
        <IN label='address' ref={ref_address} />
        <label className={classes.label}> other details</label>
        <textarea className={classes.cb2} ref={ref_other_details}></textarea>
        <Button onClick={(e) => handleSubmit(
          ref_make, ref_model, ref_trim,
          ref_year, ref_mileage, ref_trans,
          ref_condition, ref_body_type, ref_other_details, ref_cost, ref_address,
          e)}>Add Car</Button>
      </Card>
    </div>
  );
};

export default AddCar;