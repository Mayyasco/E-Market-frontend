import React from 'react';
import Card from '../components/Card';
import IN from '../components/IN';
import Button from '../components/Button';
import classes from './Add.module.css';
import aucontext from '../au-context';
import { useContext, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


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
  const ref_image = React.createRef();
  const ctx = useContext(aucontext);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [validation, setValidation] = useState(["", "", "", "", ""]);
  function handleSubmit(ref_make, ref_model, ref_trim,
    ref_year, ref_mileage, ref_trans,
    ref_condition, ref_body_type, ref_other_details, ref_cost, ref_address, e) {

    e.preventDefault();
    let cost = ref_cost.current.value;
    let mileage = ref_mileage.current.value;
    let year = ref_year.current.value;
    if (!/^[0-9]+$/.test(cost)) { cost = 0; }
    if (!/^[0-9]+$/.test(mileage)) { mileage = 0 }
    if (!/^\d{4}$/.test(year)) { year = 0; }
    const token = cookies.get("token");
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "make": ref_make.current.value,
        "model": ref_model.current.value,
        "year": year,
        "cond": ref_condition.current.value,
        "body_type": ref_body_type.current.value,
        "trans": ref_trans.current.value,
        "cost": cost,
        "mileage": mileage,
        "other": ref_other_details.current.value,
        "trim": ref_trim.current.value,
        "address": ref_address.current.value,
      })
    };
    fetch('/emarket/addcar/' + ctx.log_id, requestOptions)
      .then(response => {
        if (response.ok || response.status === 400)
          return response.json();
        //-------------------------
        else if (response.status === 403) {
          alert("you are not signed please sign in");
          navigate("/");
        }
        //-------------------------
        else {
          alert("something went wrong please try again later");
          return -1;
        }
      })
      .then(data => {
        if (data !== -1) {
          let val = ["", "", "", "", ""];
          if (!data.id) {
            if (data.make)
              val[0] = data.make;
            if (data.model)
              val[1] = data.model;
            if (data.year)
              val[2] = data.year;
            if (data.cost)
              val[3] = data.cost;
            if (data.mileage)
              val[4] = data.mileage;
            ref_make.current.focus();
            if (JSON.stringify(val) === JSON.stringify(["", "", "", "", ""]))
              alert("something went wrong please try again later");
            setValidation(val);
          }
          else {

            ref_make.current.value = '';
            ref_model.current.value = '';
            ref_year.current.value = '';
            ref_condition.current.value = "new";
            ref_body_type.current.value = "Hatchback";
            ref_trans.current.value = "manual";
            ref_cost.current.value = '';
            ref_mileage.current.value = '';
            ref_other_details.current.value = '';
            ref_trim.current.value = '';
            ref_address.current.value = '';

            //--------------------------------------------
            if (ref_image.current.files.length !== 0) {

              var formData = new FormData();
              formData.append("file", ref_image.current.files[0]);
              formData.append("id", data.id);
              formData.append("ty", "car");
              fetch("/emarket/addimage", { method: 'POST', body: formData, headers: { 'Authorization': 'Bearer ' + token } })
                .then(response => {
                  if (response.ok) return true;
                  else return false;
                }).then(data => {
                  if (data) {
                    alert('A new car has been added successfully');
                  }
                  else {
                    alert('new car has been added successfully but an error in uploading the image,' +
                      ' you can add later, please be sure the image size less than 2MB');
                  }
                });
              /*ref_image.current.value = '';
              setValidation(["", "", "", "", ""]);*/
              props.mine_return();

            }
            //--------------------------------------------
            else {
              alert('A new car has been added successfully');
              /*ref_image.current.value = '';
              setValidation(["", "", "", "", ""]);*/
              props.mine_return();

            }

          }
        }
      });


  }
  return (
    <div className="App">
      <Card>
        <label className={classes.labelhead}> Add Car</label>
        <IN label='make *' ref={ref_make} />
        <span className={classes.span}>{validation[0]}</span>
        <IN label='model *' ref={ref_model} />
        <span className={classes.span}>{validation[1]}</span>
        <IN label='trim' ref={ref_trim} />
        <IN label='year *' type="number" ref={ref_year} />
        <span className={classes.span}>{validation[2]}</span>
        <IN label='mileage *' type="number" ref={ref_mileage} />
        <span className={classes.span}>{validation[4]}</span>
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
        <IN label='cost $ *' type="number" ref={ref_cost} />
        <span className={classes.span}>{validation[3]}</span>
        <IN label='address' ref={ref_address} />
        <label className={classes.label}> other details</label>
        <textarea className={classes.cb2} ref={ref_other_details}></textarea>
        <label className={classes.label} style={{ marginTop: "0px" }}> image:</label>
        <input type="file" accept="image/png, image/jpeg" ref={ref_image} />
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