import React, { useState, useEffect } from 'react';
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
};

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const buttonShow =
    totalHits !== 0 &&
    totalHits > data.length &&
    error === '' &&
    status === Status.RESOLVED;

  useEffect(() => {
    if (!searchName) {
      return;
    }
    setStatus(Status.PENDING);
    axiosSearchImages(searchName, page)
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
        if (!data.length) {
          setError(
            'Sorry, there are no images matching your search query.Please try again.'
          );
          setStatus(Status.RESOLVED);
          return;
        }
        setData(oldData => [...oldData, ...data]);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(() => {
        setError('Something went wrong...');
        setStatus(Status.REJECTED);
      });
  }, [searchName, page]);

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setData([]);
  };

  const onClickLoadMore = () => {
    setPage(oldPage => oldPage + 1);
  };

  const onImageClick = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  return (
    <>
      <AppUser>
        <SearchBar onSubmit={handleFormSubmit} page={page} />
        <ImageGallery dataInfo={data} onImageClick={onImageClick} />
        {status === 'pending' && (
          <SpinnerUser>
            <Spinner radius={70} color={'#3f51b5e'} stroke={3} visible={true} />
            <p>Search {searchName} ...</p>
          </SpinnerUser>
        )}
        {(status === 'rejected' || error) && <Message>{error}</Message>}
        {buttonShow && <Button onClickLoadMore={onClickLoadMore} />}
      </AppUser>
      {largeImageURL && (
        <Modal
          alt={alt}
          largeImageURL={largeImageURL}
          onImageClick={onImageClick}
        />
      )}

      <GlobalStyle />
    </>
  );
};

export default App;
