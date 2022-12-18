import React, { Component } from 'react';
import { axiosSearchImages } from './axiosSearchImages';
import Spinner from 'react-spinner-material';
import { GlobalStyle } from 'utils/GlobalStyle';
import { AppUser, SpinnerUser, Message } from './App.styled';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  EMPTY: 'empty_array',
};

class App extends Component {
  state = {
    searchName: '',
    date: [],
    error: null,
    status: '',
    page: 1,
    largeImageURL: '',
    alt: '',
  };

  handleFormSubmit = (searchName, page) => {
    this.setState({ searchName, page });
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = (largeImageURL, alt) => {
    this.setState({ largeImageURL, alt });
  };

  componentDidMount() {
    document.addEventListener('keydown', () => this.onImageClick(''));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', () => this.onImageClick(''));
  }

  componentDidUpdate(_, prevState) {
    const prevName = prevState.searchName;
    const nextName = this.state.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      axiosSearchImages(nextName, nextPage)
        .then(promise => {
          return promise.data.hits;
        })
        .then(date => {
          if (nextPage === 1) {
            return this.setState({
              date,
              status: date.length === 0 ? Status.EMPTY : Status.RESOLVED,
            });
          }
          return this.setState(prevState => ({
            date: [...prevState.date, ...date],
            status: date.length === 0 ? Status.EMPTY : Status.RESOLVED,
          }));
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  render() {
    const { searchName, date, error, status, page, largeImageURL, alt } =
      this.state;
    const buttonShow = date.length !== 0 && status !== 'empty_array';
    const pendingOne = page === 1 && status === 'pending';
    const pendingTwo = page !== 1 && status === 'pending';
    return (
      <>
        <AppUser>
          <SearchBar onSubmit={this.handleFormSubmit} page={page} />
          {pendingOne && (
            <SpinnerUser>
              <Spinner
                radius={50}
                color={'#3f51b5e'}
                stroke={3}
                visible={true}
              />
              <p>Search {searchName} ...</p>
            </SpinnerUser>
          )}
          <ImageGallery dateInfo={date} onImageClick={this.onImageClick} />
          {pendingTwo && (
            <SpinnerUser>
              <Spinner
                radius={50}
                color={'#3f51b5e'}
                stroke={3}
                visible={true}
              />
              <p>Search {searchName} ...</p>
            </SpinnerUser>
          )}
          {status === 'rejected' && (
            <Message>
              {error} Sorry, there are no images matching your search query.
              Please try again.
            </Message>
          )}
          {status === 'empty_array' && (
            <Message>Sorry, there are no pictures for your request</Message>
          )}
          {buttonShow && <Button onClickLoadMore={this.onClickLoadMore} />}
        </AppUser>
        {this.state.largeImageURL && (
          <Modal
            alt={alt}
            largeImageURL={largeImageURL}
            onImageClick={this.onImageClick}
          />
        )}

        <GlobalStyle />
      </>
    );
  }
}

export default App;
