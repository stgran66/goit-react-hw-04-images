import { Component } from 'react';
import { nanoid } from 'nanoid';
import { getImages } from 'services/pixabayApi';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: null,
    page: null,
    totalPages: null,
    perPage: 12,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const newQuery = this.props.query;

    if (prevQuery !== newQuery) {
      this.setState({ status: 'pending' });

      setTimeout(async () => {
        try {
          const data = await getImages(newQuery, this.state.perPage);

          if (data.hits.length > 0) {
            this.setState({
              images: data.hits,
              page: 1,
              totalPages: Math.ceil(data.totalHits / this.state.perPage),
              status: 'resolved',
            });
          } else {
            this.setState({
              error: "Sorry, we couldn't find anything by your query",
              status: 'rejected',
            });
          }
        } catch (error) {
          this.setState({ error, status: 'rejected' });
        }
      }, 3000);
    }
  }

  render() {
    const { images, status, error } = this.state;
    return (
      <GalleryList>
        {status === 'resolved' &&
          images.map(image => (
            <ImageGalleryItem key={nanoid()} image={image} />
          ))}

        {status === 'rejected' && <p>{error}</p>}

        {status === 'pending' && <Loader />}
      </GalleryList>
    );
  }
}
