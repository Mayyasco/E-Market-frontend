import { React, useState } from 'react';
import classes from './ListItem.module.css';
import CarItem from '../components/CarItem';
import HouseItem from '../components/HouseItem';

const Fav = (props) => {
    const [cars, setCars] = useState(props.my_list[0]);
    const [houses, setHouses] = useState(props.my_list[1]);



    function onLike_c(cars) {
        setCars(cars);
    }
    function onLike_h(houses) {
        setHouses(houses);
    }
    let headLabelCar = "Your favorite Car/s (" + cars.length + ")";
    let headLabelHouse = "Your favorite House/s (" + houses.length + ")";
    return (
        <div className={classes.card}>
            <label className={classes.labelhead}>{headLabelCar}</label>
            <ul className={classes.ilist}>
                {cars.map((caritem) => (
                    <CarItem
                        carlist={cars}
                        id={caritem.id}
                        key={caritem.id}
                        year={caritem.year}
                        mileage={caritem.mileage}
                        address={caritem.address}
                        cost={caritem.cost}
                        icon={"f"}
                        onLike_c={onLike_c}
                        ty={"f"}
                        make={caritem.make}
                        model={caritem.model}
                        trim={caritem.trim}
                        body_type={caritem.body_type}
                        trans={caritem.trans}
                        other={caritem.other}
                        cond={caritem.cond}
                    />
                ))}
            </ul>
            <label className={classes.labelhead}>{headLabelHouse}</label>
            <ul className={classes.ilist}>
                {houses.map((houseitem) => (
                    <HouseItem
                        key={houseitem.id}
                        id={houseitem.id}
                        bn={houseitem.bn}
                        street={houseitem.street}
                        city={houseitem.city}
                        state={houseitem.state}
                        cost={houseitem.cost}
                        baths={houseitem.bath}
                        beds={houseitem.bed}
                        area={houseitem.area}
                        icon={"f"}
                        onLike_h={onLike_h}
                        ty={"f"}
                        houselist={houses}
                        fo={houseitem.fo}
                        other={houseitem.other}
                        zip={houseitem.zip}
                    />
                ))}
            </ul>

        </div>
    );
}

export default Fav;
