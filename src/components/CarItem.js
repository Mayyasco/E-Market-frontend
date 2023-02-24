import { React, useState, useContext, useRef } from 'react';
import classes from './CarItem.module.css';
import CardItem from './CardItem';
import im from './images/car_image.jpg';
import mil from './images/mil.png';
import addr from './images/addr.png';
import heart_fill from './images/heart_fill.png';
import heart_empty from './images/heart_empty.png';
import del from './images/del.png';
import upd from './images/upd.png';
import aucontext from '../au-context';
import UpdateCar from '../UI/UpdateCar';
import ViewCar from '../UI/ViewCar';

const CarItem = (props) => {
  const [info, setInfo] = useState([props.year, props.mileage, props.address, props.cost, props.make
    , props.model, props.trim, props.body_type, props.trans, props.other, props.cond]);
  const carRef = useRef();
  const carvRef = useRef();
  const [overlay_c, setOverlay_c] = useState("0");
  const [overlay_cv, setOverlay_cv] = useState("0");
  const ctx = useContext(aucontext);
  const [h, seth] = useState(heart_fill);
  const car_id = props.id;
  const user_id = ctx.log_id;
  let icon = "";
  if (props.icon === "m")
    icon = <div><img src={del} alt="delete" onClick={dl} className={classes.del} />
      <img src={upd} alt="update" onClick={up} className={classes.upd} /></div>;
  else {
    icon = <img src={h} alt="heart" onClick={heart} className={classes.heart} />;
    //------------------------------------------
    if (!props.fa) {
      fetch("/emarket/chechlikecar?id_car=" + car_id + "&id_user=" + user_id)
        .then(response => response.json())
        .then(data => {
          let tmp = JSON.parse(data);
          if (tmp === 0) seth(heart_empty);
          else seth(heart_fill);
        });
    }
  }
  //------------------------------------------
  async function heart() {
    if (h === heart_empty) {
      await fetch("/emarket/likecar?id_car=" + car_id + "&id_user=" + user_id + "&act=add");
      seth(heart_fill);

    }
    else {
      await fetch("/emarket/likecar?id_car=" + car_id + "&id_user=" + user_id + "&act=del");
      seth(heart_empty);
      if (props.ty === "f") {
        const id = props.id;
        let cars = [...props.carlist];
        const removeIndex = cars.findIndex(item => item.id === id);
        cars.splice(removeIndex, 1);
        props.onLike_c(cars);
      }
    }
  }
  function dl() {
    const response = window.confirm("Are you sure you want to delete the car?");
    if (response) {
      const id = props.id;
      let cars = [...props.carlist];
      fetch('/emarket/deletecar/' + id, { method: 'DELETE' });
      const removeIndex = cars.findIndex(item => item.id === id);
      cars.splice(removeIndex, 1);
      props.onDelete(cars);

    }
  }
  function setAllInfo(inf) {
    setInfo(inf);
    update_c();
  }
  function up() {
    update_c();
    carRef.current.updateinput(
      info[4], info[5], info[6], info[0],
      info[1], info[10], info[7], info[3],
      info[9], info[8], info[2]
    );
  }
  function view() {
    update_cv();
    carvRef.current.updateinput(
      info[4], info[5], info[6], info[0],
      info[1], info[10], info[7], info[3],
      info[9], info[8], info[2]
    );
  }
  function update_c() {
    if (overlay_c === "0")
      setOverlay_c("100");
    else
      setOverlay_c("0");
  }
  function update_cv() {
    if (overlay_cv === "0")
      setOverlay_cv("100");
    else
      setOverlay_cv("0");
  }
  return (
    <div>
      <div className={classes.overlay} style={{ width: overlay_c + "%" }}>
        <UpdateCar className={classes.overlayContent} cancel={update_c}
          ref={carRef} id={props.id} setAllInfo={setAllInfo}
        /></div>
      <div className={classes.overlay} style={{ width: overlay_cv + "%" }}>
        <ViewCar className={classes.overlayContent} cancel={update_cv}
          ref={carvRef}
        /></div>
      <CardItem>

        <div className={classes.card}>
          {icon}
          <img src={im} alt="Car" className={classes.im} onClick={view} />
          <div className={classes.car_item_description}>
            <div style={{ fontSize: "22px" }}>{info[4] + " " + info[5] + " " + info[6]}</div>
            <div style={{ fontSize: "20px" }}>{info[0]}</div><br />
            <div className={classes.inf}>
              <img src={mil} alt="mileage" className={classes.ic} />
              <div>{info[1]}</div>
            </div>
            <div className={classes.inf}>
              <img src={addr} alt="address" className={classes.ic} />
              <div>{info[2]}</div>
            </div>
          </div>
          <div className={classes.car_item_price}>$ {info[3]}</div>
        </div>
      </CardItem>
    </div>
  );
};

export default CarItem;