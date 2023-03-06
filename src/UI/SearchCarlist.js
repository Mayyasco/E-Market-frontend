import { React, useState } from 'react';
import SearchCar from '../components/SearchCar';
import CarItem from '../components/CarItem';
import classes from './Searchlist.module.css';

const SearchCarlist = (props) => {
  const [cars, setCars] = useState([]);
  const [startSearch, setStartSearch] = useState(0);
  function handleSearch(Cars) {
    setCars(Cars);
    setStartSearch(1);
  }
  const icon = "f";
  let headLabel = "Result (" + cars.length + ")";
  let lab;
  if (cars.length === 0 && startSearch === 0)
    lab = <div></div>;
  else if (cars.length === 0 && startSearch === 1)
    lab = <div className={classes.card} ><label className={classes.labelhead}
      style={{ color: "red" }}>
      No Result found</label></div>;
  else
    lab = <div className={classes.card} ><label className={classes.labelhead}>{headLabel}</label></div>;

  return (
    <div >
      <SearchCar onSearch={handleSearch} />
      {lab}
      <ul className={classes.ilist}>
        {cars.map((caritem) => (
          <CarItem
            carlist={cars}
            onDelete={handleSearch}
            id={caritem.id}
            key={caritem.id}
            year={caritem.year}
            mileage={caritem.mileage}
            address={caritem.address}
            cost={caritem.cost}
            icon={icon}
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

    </div>
  );
};

export default SearchCarlist;