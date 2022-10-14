import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './SearchBar/SearchBar';
import { StyledApp } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [query, setQuery] = useState('');

  const handleQuerySubmit = query => {
    setQuery(query);
  };

  return (
    <StyledApp>
      <SearchBar onSubmit={handleQuerySubmit} />
      <ToastContainer autoClose={3000} />
      <ImageGallery query={query} />
    </StyledApp>
  );
};
