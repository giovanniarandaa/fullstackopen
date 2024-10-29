import { useState } from "react";
import Country from "./Country.jsx";

const CountryItem = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div>
        {country.name.common}{" "}
        <button onClick={() => setShow((p) => !p)}>
          {show ? "hide" : "show"}
        </button>
      </div>
      {show && <Country country={country} />}
    </div>
  );
};
export default CountryItem;
