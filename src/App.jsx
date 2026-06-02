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
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (!country) return;

    fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, [country]);

  useEffect(() => {
    if (!country || !state) return;

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, [state]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Xstates Location Selector</h2>

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
        {countries.map((c) => (
          <option key={c} value={c} data-testid={c}>
            {c}
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
        {states.map((s) => (
          <option key={s} value={s} data-testid={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={city}
        disabled={!state}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c} value={c} data-testid={c}>
            {c}
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