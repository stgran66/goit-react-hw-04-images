import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { StyledApp } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    totalHits: 0,
    query: '',
  };

  handleQuerySubmit = (data, query) => {
    this.setState({
      images: data.hits,
      totalHits: data.totalHits,
      query: query,
    });
  };

  render() {
    return (
      <StyledApp>
        <SearchBar onSubmit={this.handleQuerySubmit} />
        <ImageGallery images={this.state.images} />
      </StyledApp>
    );
  }
}
