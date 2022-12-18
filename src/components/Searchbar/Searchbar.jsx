import React, { Component } from 'react';
import Notiflix from 'notiflix';
import {
  SearchbarUser,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
// import { nanoid } from 'nanoid';
// import { FormUser, LabelUser, InputUser, ButtonAdd } from './Form.styled';
const PAGE = 1;
class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      Notiflix.Notify.failure(`Enter data in the search field`);
      return;
    }

    this.props.onSubmit(this.state.searchName, PAGE);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <SearchbarUser>
        <SearchForm onSubmit={this.handleSubmit} c>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchbarUser>
    );
  }
}

export default SearchBar;
