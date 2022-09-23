import { nanoid } from 'nanoid';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.length > 0 ? (
        images.map(image => {
          return <ImageGalleryItem key={nanoid()} image={image} />;
        })
      ) : (
        <p>Sorry, we didn't found any images for your query</p>
      )}
    </GalleryList>
  );
};
