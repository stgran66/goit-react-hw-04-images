import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledImageModal } from './Modal.styled';

export class ImageModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdorpClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageURL, tags } = this.props;
    return (
      <StyledImageModal onClick={this.handleBackdorpClick}>
        <div className="modal">
          <img src={imageURL} alt={tags} />
        </div>
      </StyledImageModal>
    );
  }
}
