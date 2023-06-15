import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search on caasoeyewear.com"
          className="search-input"
        />
        {searchTerm && (
          <button onClick={clearSearch} className="close-button">
            Fechar
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;


