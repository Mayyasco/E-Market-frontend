import React from 'react';
import classes from './SearchHouse.module.css';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const SearchHouse = (props) => {
  const navigate = useNavigate();
  const [validation, setValidation] = useState(["", "", ""]);
  function handleSubmit(props, ref_state,
    ref_city, ref_beds, ref_cost_min,
    ref_area, ref_baths, ref_cost_max,
    ref_fo, e) {
    e.preventDefault();
    //validation---------------------------------------------------

    let val = ["", "", ""];
    setValidation(val);
    let er = 0;
    let regex = new RegExp(/^[0-9]+$/);
    if (ref_state.current.value.trim().length < 2 || ref_city.current.value.trim().length < 2) { val[0] = "please enter at least two letters"; er = 1; }
    if (!regex.test(ref_beds.current.value) || !regex.test(ref_area.current.value) || !regex.test(ref_baths.current.value)
      || Number(ref_beds.current.value) < 1 || Number(ref_area.current.value) < 1 || Number(ref_baths.current.value) < 1) { val[1] = "please enter valid integer numbers greater than 0"; er = 1; }
    if (!regex.test(ref_cost_min.current.value) || !regex.test(ref_cost_max.current.value) || Number(ref_cost_min.current.value) > Number(ref_cost_max.current.value)) { val[2] = "please enter valid integer number and max must be the greater"; er = 1; }

    if (er === 1) {
      setValidation(val);
      return;
    }
    //-------------------------------------------------------------
    const cookies = new Cookies();

    const token = cookies.get("token");
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "state": ref_state.current.value,
        "city": ref_city.current.value,
        "fo": ref_fo.current.value,
        "area": ref_area.current.value,
        "baths": ref_baths.current.value,
        "beds": ref_beds.current.value,
        "costMin": ref_cost_min.current.value,
        "costMax": ref_cost_max.current.value
      })
    };
    fetch('/emarket/searchhouse', requestOptions)
      .then(response => {
        if (response.ok)
          return response.json();
        //-------------------------
        else if (response.status === 403) {
          alert("you are not signed please sign in");
          navigate("/");
        }
        //-------------------------
        else {
          alert("something went wrong please try again later");
          setValidation(["", "", ""]);
          return -1;
        }
      })
      .then(data => {
        if (data !== -1)
          props.onSearch(data);
        setValidation(["", "", ""]);
      });
  }

  const ref_state = React.createRef();
  const ref_city = React.createRef();
  const ref_fo = React.createRef();
  const ref_area = React.createRef();
  const ref_beds = React.createRef();
  const ref_baths = React.createRef();
  const ref_cost_max = React.createRef();
  const ref_cost_min = React.createRef();

  return (
    <div className={classes.carddad}>
      <label className={classes.labelh}> Find house that fits your needs and your budget <br /></label>

      <div className={classes.carddad1}>
        <input placeholder='State' className={classes.tb} style={{ marginRight: "15px" }} ref={ref_state} />
        <input placeholder='City' className={classes.tb} style={{ marginRight: "15px" }} ref={ref_city} />
        <select className={classes.cb} name="fo" ref={ref_fo}>
          <option value="sale">sale</option>
          <option value="rent">rent</option>
        </select>
        <span className={classes.span}>{validation[0]}</span>
      </div>
      <div className={classes.carddad2}>
        <label className={classes.label3}>area+</label>
        <input type="number" className={classes.tb} style={{ marginRight: "10px" }} ref={ref_area} />
        <label className={classes.label3} >beds+</label>
        <input type="number" className={classes.tb} style={{ marginRight: "10px" }} ref={ref_beds} />
        <label className={classes.label3} >baths+</label>
        <input type="number" className={classes.tb} ref={ref_baths} />
        <span className={classes.span}>{validation[1]}</span>
      </div>
      <div className={classes.carddad3}>
        <input type="number" className={classes.tb} placeholder="Min" ref={ref_cost_min} />
        <label className={classes.label}> cost $</label>
        <input type="number" className={classes.tb} placeholder="Max" ref={ref_cost_max} />
        <span className={classes.span}>{validation[2]}</span>
      </div>
      <div className={classes.carddad4}>
        <button className={classes.button} onClick={(e) => handleSubmit(
          props, ref_state,
          ref_city, ref_beds, ref_cost_min,
          ref_area, ref_baths, ref_cost_max,
          ref_fo,
          e)}>search</button>
      </div>
    </div>
  );
};

export default SearchHouse;