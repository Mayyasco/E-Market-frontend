import React from 'react';
import Card from '../components/Card';
import IN from '../components/IN';
import Button from '../components/Button';
import classes from './Add.module.css';
import aucontext from '../au-context';
import { useContext } from 'react';

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
  const ctx = useContext(aucontext);
  function handleSubmit(ref_bn, ref_state, ref_city,
    ref_street, ref_zip, ref_area,
    ref_bed, ref_bath, ref_other_details, ref_cost, ref_fo, e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "bn": ref_bn.current.value,
        "state": ref_state.current.value,
        "city": ref_city.current.value,
        "street": ref_street.current.value,
        "zip": ref_zip.current.value,
        "area": ref_area.current.value,
        "bed": ref_bed.current.value,
        "bath": ref_bath.current.value,
        "other": ref_other_details.current.value,
        "cost": ref_cost.current.value,
        "fo": ref_fo.current.value,
      })
    };
    fetch('/emarket/addhouse/' + ctx.log_id, requestOptions);
    //.then(response => response.json())
    // .then(data => console.log(data));

    ref_bn.current.value = '';
    ref_state.current.value = '';
    ref_city.current.value = '';
    ref_street.current.value = '';
    ref_zip.current.value = '';
    ref_area.current.value = '';
    ref_cost.current.value = '';
    ref_bed.current.value = '';
    ref_other_details.current.value = '';
    ref_fo.current.value = '';
    ref_bath.current.value = '';
    alert('A new house has been added successfully');
  }

  return (
    <div className="App">
      <Card>
        <label className={classes.labelhead}> Add House</label>
        <IN label='building number' ref={ref_bn} />
        <IN label='street' ref={ref_street} />
        <IN label='city' ref={ref_city} />
        <IN label='zip' ref={ref_zip} />
        <IN label='state' ref={ref_state} />
        <IN label='area' type="number" ref={ref_area} />
        <IN label='bed rooms' type="number" ref={ref_bed} />
        <IN label='baths' type="number" ref={ref_bath} />
        <label className={classes.label}> rent/sale</label>
        <select className={classes.cb} ref={ref_fo} name="rentsale">
          <option value="rent">rent</option>
          <option value="sale">sale</option>
        </select>
        <IN label='cost $' type="number" ref={ref_cost} />
        <label className={classes.label}> other details</label>
        <textarea className={classes.cb2} ref={ref_other_details}></textarea>
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