const getLanguage = (languages) => {
  return Object.values(languages)[0];
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        <li>{getLanguage(country.languages)}</li>
      </ul>
      <img
        src={country.flags.svg}
        width={300}
        height={300}
        alt={country.name.common}
      />
    </div>
  );
};
export default Country;
