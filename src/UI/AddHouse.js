import React from 'react';
import Card from '../components/Card';
import IN from '../components/IN';
import Button from '../components/Button';
import classes from './Add.module.css';
import aucontext from '../au-context';
import { useContext, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const AddHouse = (props) => {
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
  const ref_image = React.createRef();
  const ctx = useContext(aucontext);
  const [validation, setValidation] = useState(["", "", "", "", "", "", "", ""]);
  const cookies = new Cookies();
  const navigate = useNavigate();
  function handleSubmit(ref_bn, ref_state, ref_city,
    ref_street, ref_zip, ref_area,
    ref_bed, ref_bath, ref_other_details, ref_cost, ref_fo, e) {
    e.preventDefault();
    let cost = ref_cost.current.value;
    let area = ref_area.current.value;
    let bed = ref_bed.current.value;
    let bath = ref_bath.current.value;
    if (!/^[0-9]+$/.test(cost)) { cost = 0; }
    if (!/^[0-9]+$/.test(area)) { area = 0 }
    if (!/^[0-9]+$/.test(bed)) { bed = 0; }
    if (!/^[0-9]+$/.test(bath)) { bath = 0; }
    const token = cookies.get("token");
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "bn": ref_bn.current.value,
        "state": ref_state.current.value,
        "city": ref_city.current.value,
        "street": ref_street.current.value,
        "zip": ref_zip.current.value,
        "area": area,
        "bed": bed,
        "bath": bath,
        "other": ref_other_details.current.value,
        "cost": cost,
        "fo": ref_fo.current.value,
      })
    };
    fetch('/emarket/addhouse/' + ctx.log_id, requestOptions)
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
          let val = ["", "", "", "", "", "", "", ""];
          if (!data.id) {
            if (data.area)
              val[0] = data.area;
            if (data.bed)
              val[1] = data.bed;
            if (data.bath)
              val[2] = data.bath;
            if (data.cost)
              val[3] = data.cost;
            if (data.state)
              val[4] = data.state;
            if (data.city)
              val[5] = data.city;
            if (data.bn)
              val[6] = data.bn;
            if (data.street)
              val[7] = data.street;
            ref_bn.current.focus();
            if (JSON.stringify(val) === JSON.stringify(["", "", "", "", "", "", "", ""]))
              alert("something went wrong please try again later");
            setValidation(val);
          }
          else {

            ref_bn.current.value = '';
            ref_state.current.value = '';
            ref_city.current.value = '';
            ref_street.current.value = '';
            ref_zip.current.value = '';
            ref_area.current.value = '';
            ref_cost.current.value = '';
            ref_bed.current.value = '';
            ref_other_details.current.value = '';
            ref_fo.current.value = "rent";
            ref_bath.current.value = '';

            //--------------------------------------------
            if (ref_image.current.files.length !== 0) {
              var formData = new FormData();
              formData.append("file", ref_image.current.files[0]);
              formData.append("id", data.id);
              formData.append("ty", "house");
              fetch("/emarket/addimage", { method: 'POST', body: formData, headers: { 'Authorization': 'Bearer ' + token } })
                .then(response => {
                  if (response.ok) return true;
                  else return false;
                }).then(data => {
                  if (data) {
                    alert('A new house has been added successfully');
                  }
                  else {
                    alert('new house has been added successfully but an error in uploading the image,' +
                      ' you can add later, please be sure the image size less than 2MB');
                  }
                  /*ref_image.current.value = '';
                  setValidation(["", "", "", "", "", "", "", ""]);*/
                  props.mine_return();
                });
            }
            //--------------------------------------------
            else {
              alert('A new house has been added successfully');
              /*ref_image.current.value = '';
              setValidation(["", "", "", "", "", "", "", ""]);*/
              props.mine_return();
            }
          }
        }
      });
  }
  return (
    <div className="App">
      <Card>
        <label className={classes.labelhead}> Add House</label>
        <IN label='building # *' ref={ref_bn} />
        <span className={classes.span}>{validation[6]}</span>
        <IN label='street *' ref={ref_street} />
        <span className={classes.span}>{validation[7]}</span>
        <IN label='city *' ref={ref_city} />
        <span className={classes.span}>{validation[5]}</span>
        <IN label='zip' ref={ref_zip} />
        <IN label='state *' ref={ref_state} />
        <span className={classes.span}>{validation[4]}</span>
        <IN label='area *' type="number" ref={ref_area} />
        <span className={classes.span}>{validation[0]}</span>
        <IN label='bed rooms *' type="number" ref={ref_bed} />
        <span className={classes.span}>{validation[1]}</span>
        <IN label='baths *' type="number" ref={ref_bath} />
        <span className={classes.span}>{validation[2]}</span>
        <label className={classes.label}> rent/sale</label>
        <select className={classes.cb} ref={ref_fo} name="rentsale">
          <option value="rent">rent</option>
          <option value="sale">sale</option>
        </select>
        <IN label='cost $ *' type="number" ref={ref_cost} />
        <span className={classes.span}>{validation[3]}</span>
        <label className={classes.label}> other details</label>
        <textarea className={classes.cb2} ref={ref_other_details}></textarea>
        <label className={classes.label} style={{ marginTop: "0px" }}> image:</label>
        <input type="file" accept="image/png, image/jpeg" ref={ref_image} size="60" />
        <Button onClick={(e) => handleSubmit(
          ref_bn, ref_state, ref_city,
          ref_street, ref_zip, ref_area,
          ref_bed, ref_bath, ref_other_details, ref_cost, ref_fo,
          e)}>Add House</Button>
      </Card>
    </div>
  );
};

export default AddHouse;