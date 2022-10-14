import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledImageModal } from './Modal.styled';

export const ImageModal = ({ onClose, imageURL, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdorpClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return (
    <StyledImageModal onClick={handleBackdorpClick}>
      <div className="modal">
        <img src={imageURL} alt={tags} />
      </div>
    </StyledImageModal>
  );
};

ImageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
};
