import React from 'react';
import classes from './SearchCar.module.css';
import clsx from 'clsx';
import { useState } from 'react';

const SearchCar = (props) => {
  const [validation, setValidation] = useState(["", "", "", ""]);

  function handleSubmit(props, ref_make,
    ref_year_min, ref_mileage_min, ref_cost_min,
    ref_year_max, ref_mileage_max, ref_cost_max,
    ref_condition, ref_body_type, e) {
    e.preventDefault();
    //validation---------------------------------------------------

    let val = ["", "", "", ""];
    setValidation(val);
    let er = 0;
    let regex = new RegExp(/^[0-9]+$/);
    if (ref_make.current.value.trim().length < 2) { val[0] = "please enter at least two letters"; er = 1; }
    if (!regex.test(ref_cost_min.current.value) || !regex.test(ref_cost_max.current.value) || Number(ref_cost_min.current.value) > Number(ref_cost_max.current.value)) { val[1] = "please enter valid integer number and max must be the greater"; er = 1; }
    if (!regex.test(ref_year_min.current.value) || !regex.test(ref_year_max.current.value) || Number(ref_cost_min.current.value) > Number(ref_cost_max.current.value)) { val[2] = "please enter valid integer number and max must be the greater"; er = 1; }
    if (!regex.test(ref_mileage_min.current.value) || !regex.test(ref_mileage_max.current.value) || Number(ref_cost_min.current.value) > Number(ref_cost_max.current.value)) { val[3] = "please enter valid integer number and max must be the greater"; er = 1; }

    if (er === 1) {
      setValidation(val);
      return;
    }
    //-------------------------------------------------------------
    let b = ""; let c = "";
    if (ref_body_type.current.value !== "All") b = ref_body_type.current.value;
    if (ref_condition.current.value !== "All") c = ref_condition.current.value;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "make": ref_make.current.value,
        "cond": c,
        "body_type": b,
        "year_min": ref_year_min.current.value,
        "cost_min": ref_cost_min.current.value,
        "mileage_min": ref_mileage_min.current.value,
        "year_max": ref_year_max.current.value,
        "cost_max": ref_cost_max.current.value,
        "mileage_max": ref_mileage_max.current.value,
      })
    };
    fetch('/emarket/searchcar', requestOptions)
      .then(response => {
        if (response.ok)
          return response.json();
        else {
          alert("something went wrong please try again later");
          setValidation(["", "", "", ""]);
          return -1;
        }
      })
      .then(data => {
        if (data !== -1) {
          props.onSearch(data);
          setValidation(["", "", "", ""]);
        }
      });
  }

  const ref_make = React.createRef();
  const ref_year_min = React.createRef();
  const ref_mileage_min = React.createRef();
  const ref_year_max = React.createRef();
  const ref_mileage_max = React.createRef();
  const ref_condition = React.createRef();
  const ref_body_type = React.createRef();
  const ref_cost_max = React.createRef();
  const ref_cost_min = React.createRef();
  return (
    <div className={classes.carddad}>
      <label className={classes.labelh}> Find car that fits your needs and your budget <br /></label>

      <div className={classes.carddad1}>

        <input placeholder='Make' className={clsx(classes.tb, classes.mar)} ref={ref_make} />
        <select className={clsx(classes.cb, classes.mar)} name="body_type" ref={ref_body_type}>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
          <option value="Van">Van</option>
          <option value="Sport">Sport</option>
          <option value="All">All</option>
        </select>
        <select className={classes.cb} name="conditon" ref={ref_condition}>
          <option value="used">used</option>
          <option value="new">new</option>
          <option value="All">All</option>
        </select>
        <span className={classes.span}>{validation[0]}</span>
      </div>

      <div className={classes.carddad2}>
        <input type="number" className={classes.tb} placeholder="Min" ref={ref_cost_min} />
        <label className={classes.label}> cost $</label>
        <input type="number" className={classes.tb} placeholder="Max" ref={ref_cost_max} />
        <span className={classes.span}>{validation[1]}</span>
      </div>

      <div className={classes.carddad2}>
        <input type="number" className={classes.tb} placeholder="Min" ref={ref_year_min} />
        <label className={classes.label}> year</label>
        <input type="number" className={classes.tb} placeholder="Max" ref={ref_year_max} />
        <span className={classes.span}>{validation[2]}</span>
      </div>

      <div className={classes.carddad2}>
        <input type="number" className={classes.tb} placeholder="Min" ref={ref_mileage_min} />
        <label className={classes.label}> mileage</label>
        <input type="number" className={classes.tb} placeholder="Max" ref={ref_mileage_max} />
        <span className={classes.span}>{validation[3]}</span>
      </div>

      <div className={classes.carddad3}>
        <button className={classes.button} onClick={(e) => handleSubmit(
          props, ref_make,
          ref_year_min, ref_mileage_min, ref_cost_min,
          ref_year_max, ref_mileage_max, ref_cost_max,
          ref_condition, ref_body_type,
          e)}>search</button>
      </div>
    </div>
  );
};

export default SearchCar;