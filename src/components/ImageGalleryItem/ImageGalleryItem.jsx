import { Component } from 'react';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { image, onOpen } = this.props;

    return (
      <StyledGalleryItem onClick={onOpen} id={image.id}>
        <img src={image.webformatURL} alt={image.tags} />
      </StyledGalleryItem>
    );
  }
}
