import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://location-selector.labs.crio.do/countries"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!country) return;

    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://location-selector.labs.crio.do/country=${country}/states`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch states");
        }

        const data = await response.json();
        setStates(data);
      } catch (error) {
        setStates([]);
      }
    };

    fetchStates();
  }, [country]);

  useEffect(() => {
    if (!country || !state) return;

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        setCities([]);
      }
    };

    fetchCities();
  }, [country, state]);

  return (
    <div style={{ padding: "20px" }}>
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