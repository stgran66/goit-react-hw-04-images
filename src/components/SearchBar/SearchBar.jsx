import { Component } from 'react';
import { StyledSearchBar } from './SearchBar.styled';
import { getImages } from 'services/pixabayApi';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  onChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  render() {
    return (
      <StyledSearchBar>
        <form
          className="form"
          onSubmit={async e => {
            e.preventDefault();
            const query = e.currentTarget.query.value;
            const data = await getImages(query);
            console.log(data);
            this.props.onSubmit(data, query);
          }}
        >
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
