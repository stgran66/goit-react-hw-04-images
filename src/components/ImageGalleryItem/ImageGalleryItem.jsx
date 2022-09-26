import PropTypes from 'prop-types';
import { Component } from 'react';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired,
  };
  render() {
    const { image, onOpen } = this.props;

    return (
      <StyledGalleryItem onClick={onOpen} id={image.id}>
        <img src={image.webformatURL} alt={image.tags} />
      </StyledGalleryItem>
    );
  }
}
