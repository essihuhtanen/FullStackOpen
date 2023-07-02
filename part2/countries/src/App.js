import { useState, useEffect } from "react";
import { getAllCountries } from "./services/countries";

const CountryNameList = ({ countries, handleClick }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common} ({country.name.official}){" "}
          <button onClick={() => handleClick(country)}>Show</button>
        </p>
      ))}
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} m2</p>
      </div>
      <div>
        <h4>Languages:</h4>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} />
      </div>
    </div>
  );
};

const App = () => {
  const [searchKey, setSearchKey] = useState("");
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleKeyChange = (e) => {
    setSearchKey(e.target.value);
    selectedCountry && setSelectedCountry(null);
  };

  useEffect(() => {
    countries &&
      setFilteredCountries(
        countries.filter(
          (country) =>
            country.name.common
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            country.name.official
              .toLowerCase()
              .includes(searchKey.toLowerCase())
        )
      );
  }, [searchKey]);

  useEffect(() => {
    getAllCountries().then((res) => setCountries(res));
  }, []);

  return (
    <div>
      <div>
        <form>
          Find countries
          <div>
            <input value={searchKey} onChange={handleKeyChange} />
          </div>
        </form>
      </div>
      <div>
        {countries &&
          filteredCountries &&
          (filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : filteredCountries.length === 1 ? (
            <CountryInfo country={filteredCountries[0]} />
          ) : (
            <CountryNameList
              countries={filteredCountries}
              handleClick={setSelectedCountry}
            />
          ))}
        {selectedCountry && <CountryInfo country={selectedCountry} />}
      </div>
    </div>
  );
};

export default App;
