import axios from 'axios';

export function axiosSearchImages(name, page) {
  return axios
    .get(
      `https://pixabay.com/api/?key=31270894-f030383025237e7d53b6441a5&q=${name}&page=${page}&per_page=12&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(promise => {
      const newData = promise.data.hits.map(
        ({ id, largeImageURL, tags, webformatURL }) => ({
          id,
          largeImageURL,
          tags,
          webformatURL,
        })
      );
      return {
        data: newData,
        totalHits: promise.data.totalHits,
      };
    });
}
