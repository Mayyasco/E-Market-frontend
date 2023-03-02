import { React, useState, useContext, useRef, useEffect } from 'react';
import classes from './HouseItem.module.css';
import CardItem from './CardItem';
import im from './images/house.jpg';
import area from './images/area.png';
import baths from './images/baths.png';
import beds from './images/beds.png';
import heart_fill from './images/heart_fill.png';
import heart_empty from './images/heart_empty.png';
import loading from './images/loading.png';
import aucontext from '../au-context';
import del from './images/del.png';
import upd from './images/upd.png';
import UpdateHouse from '../UI/UpdateHouse';
import ViewHouse from '../UI/ViewHouse';

const HouseItem = (props) => {
  const [info, setInfo] = useState([props.bn, props.street, props.city, props.state, props.cost
    , props.baths, props.beds, props.area, props.fo, props.other, props.zip]);
  const houseRef = useRef();
  const housevRef = useRef();
  const [img, setImg] = useState(im);
  const [overlay_h, setOverlay_h] = useState("0");
  const [overlay_hv, setOverlay_hv] = useState("0");
  const ctx = useContext(aucontext);
  const [h, seth] = useState(loading);
  const house_id = props.id;
  const user_id = ctx.log_id;
  let icon = "";
  //--------------------------------------------------------------
  useEffect(() => {
    fetch("/emarket/getimage/" + props.id + "/house")
      .then(response => {
        if (response.ok)
          return response.blob();
        else {
          //alert("could not retrieve the image for this car " + props.make + " " + props.model + " " + props.trim);
          return -1;
        }
      })
      .then(data => {
        if (data !== -1) {
          const imageObjectURL = URL.createObjectURL(data);
          setImg(imageObjectURL);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);
  //--------------------------------------------------------------
  if (props.icon === "m")
    icon = <div><img src={del} alt="delete" onClick={dl} className={classes.del} />
      <img src={upd} alt="update" onClick={up} className={classes.upd} /></div>;
  else
    icon = <img src={h} alt="heart" onClick={heart} className={classes.heart} />;
  //------------------------------------------
  useEffect(() => {

    if (props.icon !== "m") {
      fetch("/emarket/chechlikehouse?id_house=" + house_id + "&id_user=" + user_id)
        .then(response => {
          if (response.ok)
            return response.json();
          else {
            alert("something went wrong please try again later");
            return -1;
          }
        })
        .then(data => {
          if (data !== -1) {
            let tmp = JSON.parse(data);
            if (tmp === 0) seth(heart_empty);
            else seth(heart_fill);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //------------------------------------------
  function dl() {
    const response = window.confirm("Are you sure you want to delete the house?");
    if (response) {
      const id = props.id;
      let houses = [...props.houselist];
      fetch('/emarket/deletehouse/' + id, { method: 'DELETE' })
        .then(response => {
          if (!response.ok)
            alert("something went wrong please try again later");
          else {
            const removeIndex = houses.findIndex(item => item.id === id);
            houses.splice(removeIndex, 1);
            props.onDelete(houses);
          }
        });
    }
  }
  function setAllInfo(inf) {
    setInfo(inf);
    update_h();
  }

  function up() {
    update_h();
    houseRef.current.updateinput(
      info[0], info[3], info[2], info[1],
      info[10], info[4], info[7], info[6],
      info[9], info[8], info[5]
    );
  }
  function view() {
    update_hv();
    housevRef.current.updateinput(
      info[0], info[3], info[2], info[1],
      info[10], info[4], info[7], info[6],
      info[9], info[8], info[5], img
    );
  }
  function update_h() {
    if (overlay_h === "0")
      setOverlay_h("100");
    else
      setOverlay_h("0");
  }
  function update_hv() {
    if (overlay_hv === "0")
      setOverlay_hv("100");
    else
      setOverlay_hv("0");
  }
  function heart() {
    if (h === heart_empty) {
      fetch("/emarket/likehouse?id_house=" + house_id + "&id_user=" + user_id + "&act=add", { method: 'POST' })
        .then(response => {
          if (!response.ok)
            alert("something went wrong please try again later");
          else seth(heart_fill);
        });
    }
    else {
      fetch("/emarket/likehouse?id_house=" + house_id + "&id_user=" + user_id + "&act=del", { method: 'POST' })
        .then(response => {
          if (!response.ok)
            alert("something went wrong please try again later");
          else seth(heart_empty);
        });
      if (props.ty === "f") {
        const id = props.id;
        let houses = [...props.houselist];
        const removeIndex = houses.findIndex(item => item.id === id);
        houses.splice(removeIndex, 1);
        props.onLike_h(houses);
      }
    }
  }
  return (
    <div>
      <div className={classes.overlay} style={{ width: overlay_h + "%" }}>
        <UpdateHouse className={classes.overlayContent} cancel={update_h}
          ref={houseRef} id={props.id} setAllInfo={setAllInfo}
        />
        <div className={classes.overlay} style={{ width: overlay_hv + "%" }}>
          <ViewHouse className={classes.overlayContent} cancel={update_hv}
            ref={housevRef}
          /></div>
      </div>
      <CardItem>
        <div className={classes.card}>
          {icon}
          <img src={img} alt="House" className={classes.im} onClick={view} />
          <div className={classes.item_description}>
            <div style={{ fontSize: "22px" }}>{info[0]} {info[1]}</div>
            <div style={{ fontSize: "22px" }}>{info[2]} {info[3]}</div><br />
            <div className={classes.inf}>
              <img src={area} alt="area" className={classes.ic} />
              <div>{info[7]} ftsqr</div>
            </div>
            <div className={classes.inf}>
              <img src={beds} alt="beds" className={classes.ic} />
              <div>{info[6]}</div>
            </div>
            <div className={classes.inf}>
              <img src={baths} alt="baths" className={classes.ic} />
              <div>{info[5]}</div>
            </div>
          </div>
          <div className={classes.item_price}>$ {info[4]}</div>
        </div>
      </CardItem>
    </div>
  );
};

export default HouseItem;