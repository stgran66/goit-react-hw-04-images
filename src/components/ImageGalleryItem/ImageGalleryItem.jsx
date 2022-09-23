import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ImageModal } from 'components/Modal/Modal';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { image, isModalOpen, onOpen, onClose } = this.props;

    return (
      <StyledGalleryItem onClick={onOpen}>
        <img src={image.webformatURL} alt={image.tags} />
        {isModalOpen &&
          createPortal(
            <ImageModal
              onClose={onClose}
              imageURL={image.largeImageURL}
              tags={image.tags}
            />,
            document.querySelector('#modal-container')
          )}
      </StyledGalleryItem>
    );
  }
}
