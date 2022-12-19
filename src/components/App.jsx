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
  // EMPTY: 'empty_array',
};

class App extends Component {
  state = {
    searchName: '',
    date: [],
    error: '',
    status: '',
    page: 1,
    largeImageURL: '',
    alt: '',
    totalHits: 0,
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName, page: 1, date: [] });
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = (largeImageURL, alt) => {
    this.setState({ largeImageURL, alt });
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.searchName;
    const nextName = this.state.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING, error: '' });
      axiosSearchImages(nextName, nextPage)
        .then(promise => {
          return { date: promise.data.hits, totalHits: promise.data.totalHits };
        })
        .then(({ date, totalHits }) => {
          if (!date.length) {
            this.setState({
              error:
                'Sorry, there are no images matching your search query.Please try again.',
              status: Status.RESOLVED,
            });
            return;
          }
          this.setState(prevState => ({
            date: [...prevState.date, ...date],
            totalHits: totalHits,
            status: Status.RESOLVED,
          }));
        })
        .catch(() =>
          this.setState({
            error: 'Something went wrong...',
            status: Status.REJECTED,
          })
        );
    }
  }
  render() {
    const {
      searchName,
      date,
      error,
      status,
      page,
      largeImageURL,
      alt,
      totalHits,
    } = this.state;
    console.log(this.state);
    const buttonShow =
      totalHits !== 0 && totalHits > date.length && error === '';

    return (
      <>
        <AppUser>
          <SearchBar onSubmit={this.handleFormSubmit} page={page} />
          <ImageGallery dateInfo={date} onImageClick={this.onImageClick} />
          {status === 'pending' && (
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
          {(status === 'rejected' || error) && <Message>{error}</Message>}
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
