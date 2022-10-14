import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getImages } from 'services/pixabayApi';
import { createPortal } from 'react-dom';
import { ImageModal } from 'components/Modal/Modal';
import { GalleryList, ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';

export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [perPage] = useState(12);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (query !== '') {
      setStatus('pending');
      setImages(null);

      const getImagesByQuery = async query => {
        try {
          const data = await getImages(query, perPage);

          setImages(data.hits);
          setPage(1);
          setTotalPages(Math.ceil(data.totalHits / perPage));
          setStatus('resolved');
        } catch (error) {
          setError(error.message);
          setStatus('rejected');
        }
      };

      getImagesByQuery(query);
    }
  }, [query, perPage]);

  const onLoadMore = data => {
    setImages(prevState => [...prevState, ...data.hits]);
    setPage(prevState => prevState + 1);
  };

  const setStatusPending = () => {
    setStatus('pending');
  };

  const setStatusResolved = () => {
    setStatus('resolved');
  };

  const openModal = e => {
    const imageId = Number(e.currentTarget.id);
    const activeImage = images.find(image => image.id === imageId);

    setActiveImage(activeImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImageGalleryContainer>
      <GalleryList>
        {images &&
          images.length > 0 &&
          images.map(image => (
            <ImageGalleryItem key={image.id} image={image} onOpen={openModal} />
          ))}

        {images && images.length === 0 && (
          <p>Sorry :( we couldn't find anything by your query</p>
        )}

        {status === 'rejected' && <p>{error}</p>}
      </GalleryList>

      {status === 'pending' && <Loader />}
      {status === 'resolved' && images.length > 0 && (
        <LoadMoreBtn
          query={query}
          page={page + 1}
          totalPages={totalPages}
          perPage={perPage}
          onQuery={onLoadMore}
          whileLoading={setStatusPending}
          afterLoading={setStatusResolved}
        />
      )}
      {isModalOpen &&
        createPortal(
          <ImageModal
            onClose={closeModal}
            imageURL={activeImage.largeImageURL}
            tags={activeImage.tags}
          />,
          document.querySelector('#modal-container')
        )}
    </ImageGalleryContainer>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
