import { React, useState } from 'react';
import SearchHouse from '../components/SearchHouse';
import HouseItem from '../components/HouseItem';
import classes from './Searchlist.module.css';

const SearchHouselist = (props) => {
  const [houses, setHouses] = useState([]);
  const [startSearch, setStartSearch] = useState(0);
  function handleSearch(Houses) {
    setHouses(Houses);
    setStartSearch(1);
  }
  const icon = "f";
  let headLabel = "Result ( " + houses.length + " )";
  let lab;
  if (houses.length === 0 && startSearch === 0)
    lab = <div></div>;
  else if (houses.length === 0 && startSearch === 1)
    lab = <div className={classes.card} ><label className={classes.labelhead}
      style={{ color: "red" }}>
      No Result found</label></div>;
  else
    lab = <div className={classes.card} ><label className={classes.labelhead}>{headLabel}</label></div>;
  return (
    <div>
      <SearchHouse onSearch={handleSearch} />
      {lab}
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
            icon={icon}
            fo={houseitem.fo}
            other={houseitem.other}
            zip={houseitem.zip}
          />
        ))}
      </ul>

    </div>
  );
};

export default SearchHouselist;