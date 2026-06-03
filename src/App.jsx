import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");

  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setCountryError("");
      })
      .catch(() => {
        setCountries([]);
        setCountryError("Unable to load countries");
      });
  }, []);

  useEffect(() => {
    if (!country) return;

    fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        setStates(data);
        setStateError("");
      })
      .catch(() => {
        setStates([]);
        setStateError("Unable to load states");
      });
  }, [country]);

  useEffect(() => {
    if (!country || !state) return;

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => setCities(data))
      .catch(() => {
        setCities([]);
      });
  }, [country, state]);

  return (
    <div>
      <h1>Select Location</h1>

      {countryError && <p>{countryError}</p>}
      {stateError && <p>{stateError}</p>}

      <select
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setState("");
          setCity("");
          setStates([]);
          setCities([]);
          setStateError("");
        }}
      >
        <option value="">Select Country</option>
        {countries.map((countryName) => (
          <option
            key={countryName}
            value={countryName}
            data-testid={countryName}
          >
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
          <option
            key={stateName}
            value={stateName}
            data-testid={stateName}
          >
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
          <option
            key={cityName}
            value={cityName}
            data-testid={cityName}
          >
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