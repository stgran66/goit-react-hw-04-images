import { Component } from 'react';
import { StyledImageModal } from './Modal.styled';

export class ImageModal extends Component {
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
    console.log(e.currentTarget === e.target);
    if (e.currentTarget === e.target) {
      console.log('hi');
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
