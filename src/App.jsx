import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    if (!country) return;

    fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch(() => setStates([]));
  }, [country]);

  useEffect(() => {
    if (!country || !state) return;

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(() => setCities([]));
  }, [country, state]);

  return (
    <div>
      <select
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setState("");
          setCity("");
          setStates([]);
          setCities([]);
        }}
      >
        <option value="">Select Country</option>
        {countries.map((countryName) => (
          <option key={countryName} value={countryName}>
            {countryName}
          </option>
        ))}
      </select>

      <select
        value={state}
        disabled={!country}
        onChange={(e) => {
          setState(e.target.value);
          setCity("");
          setCities([]);
        }}
      >
        <option value="">Select State</option>
        {states.map((stateName) => (
          <option key={stateName} value={stateName}>
            {stateName}
          </option>
        ))}
      </select>

      <select
        value={city}
        disabled={!state}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select City</option>
        {cities.map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      {country && state && city && (
        <h3>
          You selected {city}, {state}, {country}
        </h3>
      )}
    </div>
  );
}

export default App;