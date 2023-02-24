import React from 'react';
import classes from './SearchHouse.module.css';

function handleSubmit(props,ref_state,
  ref_city,ref_beds,ref_cost_min,
  ref_area,ref_baths,ref_cost_max,
  ref_fo,e) {
  e.preventDefault();
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      "state":ref_state.current.value,
	    "city":ref_city.current.value,
	    "fo":ref_fo.current.value,
	    "area":ref_area.current.value,
      "baths":ref_baths.current.value,
      "beds":ref_beds.current.value,
      "cost_min":ref_cost_min.current.value,
      "cost_max":ref_cost_max.current.value
    })
};
fetch('/emarket/searchhouse', requestOptions)
    .then(response => response.json())
    .then(data => props.onSearch(data));
}

const SearchHouse = (props) => {
  
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
      <label className={classes.labelh}> Find house that fits your needs and your budget <br/></label>
      
      <div className={classes.carddad1}>
      <input placeholder='State' className={classes.tb} style={{marginRight:"15px"}} ref={ref_state}/>
      <input placeholder='City' className={classes.tb} style={{marginRight:"15px"}} ref={ref_city}/>
      <select className={classes.cb} name="fo" ref={ref_fo}>
        <option value="sale">sale</option>
        <option value="rent">rent</option>
      </select>
      </div>
      <div className={classes.carddad2}>
      <label className={classes.label3}>area+</label>
      <input type="number" className={classes.tb} style ={{marginRight:"10px"}} ref={ref_area}/>
      <label className={classes.label3} >beds+</label>
      <input type="number" className={classes.tb} style ={{marginRight:"10px"}} ref={ref_beds}/>
      <label className={classes.label3} >baths+</label>
      <input type="number" className={classes.tb} ref={ref_baths}/>
      </div>
      <div className={classes.carddad3}>
      <input type="number" className={classes.tb}  placeholder="Min" ref={ref_cost_min}/>
      <label className={classes.label}> cost $</label>
      <input type="number" className={classes.tb} placeholder="Max" ref={ref_cost_max}/>
      </div>
      <div className={classes.carddad4}>
      <button className={classes.button} onClick={(e) =>handleSubmit(
        props,ref_state,
        ref_city,ref_beds,ref_cost_min,
        ref_area,ref_baths,ref_cost_max,
        ref_fo,
         e)}>search</button>
      </div>
    </div>
  );
};

export default SearchHouse ;