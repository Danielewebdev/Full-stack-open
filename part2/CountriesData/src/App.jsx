import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Current value:", value);
    if (value.length > 0) {
      console.log("Making API request...");
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          console.log("API response:", response.data);

          const filteredCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
          );
          setCountries(filteredCountries);
          setError(null);
        })
        .catch((error) => {
          console.log("API request failed:", error);
          setCountries([]);
          setError("An error occurred while fetching data");
        });
    } else {
      setCountries([]);
      setError(null);
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log("Value updated:", event.target.value);
  };

  const renderCountryList = () => (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );

  const renderCountryDetails = (country) => (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages: </h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );

  return (
    <div>
      Find country: <input type="text" value={value} onChange={handleChange} />
      {error && <p>{error}</p>}
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length <= 10 && countries.length > 1 && renderCountryList()}
      {countries.length === 1 && renderCountryDetails(countries[0])}
    </div>
  );
};

export default App;
