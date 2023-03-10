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
import Cookies from 'universal-cookie';

const HouseItem = (props) => {
  const cookies = new Cookies();
  const [info, setInfo] = useState([props.bn, props.street, props.city, props.state, props.cost
    , props.baths, props.beds, props.area, props.fo, props.other, props.zip]);
  const [userInfo, setUserInfo] = useState(['', '', '', '']);
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
    const token = cookies.get("token");
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    fetch("/emarket/getimage/" + props.id + "/house", requestOptions)
      .then(response => {
        if (response.ok)
          return response.blob();
        else {
          //alert("could not retrieve the image for this house " + props.make + " " + props.model + " " + props.trim);
          return -1;
        }
      })
      .then(data => {
        if (data !== -1 && data.size > 0) {
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
    const token = cookies.get("token");
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    if (props.icon !== "m") {
      fetch("/emarket/chechlikehouse?id_house=" + house_id + "&id_user=" + user_id, requestOptions)
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
  //-----------------------------------------------------------------
  useEffect(() => {
    const token = cookies.get("token");
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    fetch('/emarket/gethouseowner/' + props.id, requestOptions)
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
          let info = ['', '', '', ''];
          info[0] = data.name;
          info[1] = data.email;
          info[2] = data.address;
          info[3] = data.phone;
          setUserInfo(info);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //-----------------------------------------------------------------
  function dl() {
    const response = window.confirm("Are you sure you want to delete the house?");
    if (response) {
      const id = props.id;
      let houses = [...props.houselist];
      const token = cookies.get("token");
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };
      fetch('/emarket/deletehouse/' + id + '/' + ctx.log_id, requestOptions)
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
      info[9], info[8], info[5], img,
      userInfo[0], userInfo[1], userInfo[2], userInfo[3]
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
    const token = cookies.get("token");
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    if (h === heart_empty) {
      fetch("/emarket/likehouse?id_house=" + house_id + "&id_user=" + user_id + "&act=add", requestOptions)
        .then(response => {
          if (!response.ok)
            alert("something went wrong please try again later");
          else seth(heart_fill);
        });
    }
    else {
      fetch("/emarket/likehouse?id_house=" + house_id + "&id_user=" + user_id + "&act=del", requestOptions)
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
              <div style={{ fontWeight: "normal" }}>{info[7]} SF</div>
            </div>
            <div className={classes.inf}>
              <img src={beds} alt="beds" className={classes.ic} />
              <div style={{ fontWeight: "normal" }}>{info[6]}</div>
            </div>
            <div className={classes.inf}>
              <img src={baths} alt="baths" className={classes.ic} />
              <div style={{ fontWeight: "normal" }}>{info[5]}</div>
            </div>
          </div>
          <div className={classes.item_price}>{info[4]} $</div>
        </div>
      </CardItem>
    </div>
  );
};

export default HouseItem;