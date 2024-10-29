import { useEffect, useState } from "react";
import { getAll } from "./restcountries.js";
import Country from "./Country.jsx";
import Countries from "./Countries.jsx";

const getLanguage = (languages) => {
  return Object.values(languages)[0];
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleQueryChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    const filters = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase()),
    );
    console.log(filters);
    setCountriesToShow(filters);
  };

  return (
    <div>
      <div>
        find countries:{" "}
        <input type="text" value={search} onChange={handleQueryChange} />
      </div>
      {countriesToShow.length === 1 && <Country country={countriesToShow[0]} />}
      {countriesToShow.length > 10 ? (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      ) : (
        <Countries countries={countriesToShow} />
      )}
    </div>
  );
}

export default App;
