import React from "react";
import CountryItem from "./CountryItem.jsx";

const Countries = ({ countries = [] }) => {
  if (countries.length <= 1) return null;

  return countries.map((country) => (
    <CountryItem key={country.name.official} country={country} />
  ));
};
export default Countries;
