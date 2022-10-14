import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { StyledSearchBar } from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setQuery('');
    const query = e.currentTarget.query.value.trim();

    if (query === '') {
      toast('Please write something');
      return;
    }

    onSubmit(query);
  };

  return (
    <StyledSearchBar>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={onChange}
        />
      </form>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
