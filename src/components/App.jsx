import React, { useEffect, useRef, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from './service/request';

import Modal from './Modal/Modal';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isShowButton, setIsShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const abortController = useRef(null);
  const per_page = 12;

  const handleSubmit = search => {
    setPage(1);
    setImages([]);
    setQuery(`${Date.now()}/${search}`);
  };

  const handleClick = () => {
    setPage(previosState => previosState + 1);
  };

  useEffect(() => {
    if (query !== '') {
      if (abortController.current) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();

      getImages(query, page, abortController.current)
        .then(response => {
          const data = response.data;

          if (page === 1) {
            setImages(data.hits);
          } else {
            setImages(prevState => [...prevState, ...data.hits]);
          }

          const totalHits = data.totalHits;
          const totalPages = Math.ceil(totalHits / per_page);

          if (page < totalPages) {
            setIsShowButton(true);
          } else {
            setIsShowButton(false);
          }
        })
        .catch(error => {
          console.log(error);
        });

      return () => {
        if (abortController.current) {
          abortController.current.abort();
        }
      };
    }
  }, [query, page]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        setShowModal(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleImageClick = image => {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onItemClick={handleImageClick} />
      )}
      {isShowButton && <Button onClick={handleClick} />}

      {showModal && selectedImage && (
        <Modal image={selectedImage} onClose={handleModalClose} />
      )}
    </>
  );
};
export default App;
