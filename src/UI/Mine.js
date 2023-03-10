import { React, useState } from 'react';
import classes from './ListItem.module.css';
import CarItem from '../components/CarItem';
import HouseItem from '../components/HouseItem';

const Mine = (props) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const [cars, setCars] = useState(props.my_list[0]);
    const [houses, setHouses] = useState(props.my_list[1]);
    function del_car(cars) {
        setCars(cars);
    }
    function del_house(houses) {
        setHouses(houses);
    }
    let headLabelCar = "Your Car/s (" + cars.length + ")";
    let headLabelHouse = "Your House/s (" + houses.length + ")";
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
                        icon={"m"}
                        ty={"f"}
                        make={caritem.make}
                        model={caritem.model}
                        trim={caritem.trim}
                        body_type={caritem.body_type}
                        trans={caritem.trans}
                        other={caritem.other}
                        cond={caritem.cond}
                        onDelete={del_car}
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
                        icon={"m"}
                        houselist={houses}
                        onDelete={del_house}
                        fo={houseitem.fo}
                        other={houseitem.other}
                        zip={houseitem.zip}
                    />
                ))}
            </ul>

        </div>
    );
}

export default Mine;
