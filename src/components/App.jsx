import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './SearchBar/SearchBar';
import { StyledApp } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './ImageGallery/Loader/Loader';

export class App extends Component {
  state = {
    query: '',
  };

  handleQuerySubmit = query => {
    this.setState({ query });
  };

  handleMoreImages = data => {
    this.setState(({ images, page }) => ({
      images: [...images, ...data.hits],
      page: page + 1,
    }));
  };

  render() {
    return (
      <StyledApp>
        <SearchBar onSubmit={this.handleQuerySubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery query={this.state.query} />
        {/* {page && (
          <LoadMoreBtn
            query={query}
            page={page + 1}
            onQuery={this.handleMoreImages}
            totalPages={totalPages}
          />
        )}
        {status === 'pending' && <Loader />} */}
      </StyledApp>
    );
  }
}
