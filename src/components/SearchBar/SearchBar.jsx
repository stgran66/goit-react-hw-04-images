import { Component } from 'react';
import { toast } from 'react-toastify';
import { StyledSearchBar } from './SearchBar.styled';
import 'react-toastify/dist/ReactToastify.css';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  onChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
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
