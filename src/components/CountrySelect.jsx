import { useState, useContext } from 'react';
import { countries } from 'countries-list';
import { Appcontext } from '../context/appContext';
import Loader from './Loader';

const CountrySelect = () => {
  const countryArr = Object.entries(countries).map(([code, value]) => ({
    code,
    value,
  }));

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countryArr.filter((country) =>
    country.value.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { setActiveCountry, activeCountry } = useContext(Appcontext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand" href="#">
          You are from
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-warning"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {activeCountry?.name ? (
                  `${activeCountry?.name} ?` || 'country'
                ) : (
                  <Loader />
                )}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li className="country-select">
                  <input
                    type="text"
                    className="search-country-input"
                    placeholder="Search country"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </li>
                {filteredCountries?.map((country) => {
                  return (
                    <li
                      key={country.code}
                      onClick={() =>
                        setActiveCountry({
                          code: country.code,
                          name: country?.value.name,
                        })
                      }
                    >
                      <span className="dropdown-item text-warning">
                        {country?.value.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CountrySelect;
