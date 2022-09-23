import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { StyledApp } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './ImageGallery/Loader/Loader';

export class App extends Component {
  state = {
    images: null,
    query: '',
    page: null,
    totalPages: null,
    perPage: 20,
    status: 'idle',
  };

  handleQuerySubmit = (data, query) => {
    this.setState({ status: 'pending' });
    if (data.hits.length > 0) {
      setTimeout(
        this.setState({
          images: data.hits,
          query: query,
          page: 1,
          totalPages: Math.ceil(data.totalHits / data.hits.length),
        }),
        5000
      );
    } else {
      setTimeout(
        this.setState({
          images: [],
          query: query,
          page: null,
          totalPages: null,
        }),
        5000
      );
    }
    this.setState({ status: 'idle' });
  };

  handleMoreImages = data => {
    this.setState(({ images, page }) => ({
      images: [...images, ...data.hits],
      page: page + 1,
    }));
  };

  render() {
    const { page, perPage, images, query, totalPages, status } = this.state;
    return (
      <StyledApp>
        <SearchBar onSubmit={this.handleQuerySubmit} perPage={perPage} />

        {images && <ImageGallery images={images} />}
        {page && (
          <LoadMoreBtn
            query={query}
            page={page + 1}
            onQuery={this.handleMoreImages}
            totalPages={totalPages}
          />
        )}
        {status === 'pending' && <Loader />}
      </StyledApp>
    );
  }
}
