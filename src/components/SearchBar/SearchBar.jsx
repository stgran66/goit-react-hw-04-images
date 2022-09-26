import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { StyledSearchBar } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  onChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ query: '' });
    const query = e.currentTarget.query.value.trim();

    if (query === '') {
      toast('Please write something');
      return;
    }

    this.props.onSubmit(query);
  };

  render() {
    return (
      <StyledSearchBar>
        <form className="form" onSubmit={this.handleSubmit}>
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
            value={this.state.query}
            onChange={this.onChange}
          />
        </form>
      </StyledSearchBar>
    );
  }
}
