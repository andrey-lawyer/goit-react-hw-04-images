import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import {
  SearchbarUser,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      Notiflix.Notify.failure(`Enter data in the search field`);
      return;
    }

    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <SearchbarUser>
      <SearchForm onSubmit={handleSubmit} c>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchbarUser>
  );
};

export default SearchBar;
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
