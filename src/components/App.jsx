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
    data: [],
    error: '',
    status: '',
    page: 1,
    largeImageURL: '',
    alt: '',
    totalHits: 0,
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
          const oldData = promise.data.hits.map(
            ({ id, largeImageURL, tags, webformatURL }) => ({
              id,
              largeImageURL,
              tags,
              webformatURL,
            })
          );
          return {
            data: oldData,
            totalHits: promise.data.totalHits,
          };
        })
        .then(({ data, totalHits }) => {
          // data.map(dateEl => data.id, data.L);
          if (!data.length) {
            this.setState({
              error:
                'Sorry, there are no images matching your search query.Please try again.',
              status: Status.RESOLVED,
            });
            return;
          }
          this.setState(prevState => ({
            data: [...prevState.data, ...data],
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

  handleFormSubmit = searchName => {
    this.setState({ searchName, page: 1, data: [] });
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = (largeImageURL, alt) => {
    this.setState({ largeImageURL, alt });
  };

  render() {
    const {
      searchName,
      data,
      error,
      status,
      page,
      largeImageURL,
      alt,
      totalHits,
    } = this.state;
    // console.log(data);
    const buttonShow =
      totalHits !== 0 && totalHits > data.length && error === '';

    return (
      <>
        <AppUser>
          <SearchBar onSubmit={this.handleFormSubmit} page={page} />
          <ImageGallery dataInfo={data} onImageClick={this.onImageClick} />
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
