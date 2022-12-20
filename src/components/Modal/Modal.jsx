import React, { Component } from 'react';
import { Overlay, ModalWindow, ImageComp } from './Modal.styled';
import PropTypes from 'prop-types';
// const Modal = ({ largeImageURL, alt, onImageClick }) => {
class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', () => this.props.onImageClick(''));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', () => this.props.onImageClick(''));
  }

  handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onImageClick('');
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleBackdrop}>
        <ModalWindow>
          <ImageComp src={this.props.largeImageURL} alt={this.props.alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
