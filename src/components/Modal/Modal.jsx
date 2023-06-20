import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalCont } from './Modal.styled';

const Modal = ({ image, onClose }) => {
  const { largeImageURL, tags } = image || {};
  return (
    <Overlay onClick={onClose}>
      <ModalCont>
        <img src={largeImageURL} alt={tags} />
      </ModalCont>
    </Overlay>
  );
};

export default Modal;

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),

  onClose: PropTypes.func.isRequired,
};
