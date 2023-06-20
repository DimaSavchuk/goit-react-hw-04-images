import React, { useState } from 'react';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FiSearch fontSize="2em" />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={search}
        />
      </SearchForm>
    </SearchBar>
  );
};

export default Searchbar;
