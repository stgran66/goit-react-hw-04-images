import { Component } from 'react';
import { getImages } from 'services/pixabayApi';
import { GalleryList, ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    images: null,
    page: null,
    totalPages: null,
    perPage: 12,
    status: 'idle',
    error: null,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.query;
    const newQuery = this.props.query;

    if (prevQuery !== newQuery) {
      this.setState({ status: 'pending', images: null });

      this.getImagesByQuery(newQuery);
    }
  }

  getImagesByQuery = async query => {
    try {
      const data = await getImages(query, this.state.perPage);

      this.setState({
        images: data.hits,
        page: 1,
        totalPages: Math.ceil(data.totalHits / this.state.perPage),
        status: 'resolved',
      });

      // else {
      //   this.setState({
      //     error: "Sorry, we couldn't find anything by your query",
      //     status: 'rejected',
      //   });
      // }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  onLoadMore = data => {
    this.setState(({ images, page }) => {
      return {
        images: [...images, ...data.hits],
        page: page + 1,
      };
    });
  };

  setStatusPending = () => {
    this.setState({ status: 'pending' });
  };

  setStatusResolved = () => {
    this.setState({ status: 'resolved' });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    console.log('close function');
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, status, error, isModalOpen } = this.state;
    return (
      <ImageGalleryContainer>
        <GalleryList>
          {images &&
            images.length > 0 &&
            images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onOpen={this.openModal}
                onClose={this.closeModal}
                isModalOpen={isModalOpen}
              />
            ))}

          {images && images.length === 0 && (
            <p>Sorry :(, we couldn't find anything by your query</p>
          )}

          {status === 'rejected' && <p>{error}</p>}
        </GalleryList>

        {status === 'pending' && <Loader />}
        {status === 'resolved' && images.length > 0 && (
          <LoadMoreBtn
            query={this.props.query}
            page={this.state.page + 1}
            totalPages={this.state.totalPages}
            perPage={this.state.perPage}
            onQuery={this.onLoadMore}
            whileLoading={this.setStatusPending}
            afterLoading={this.setStatusResolved}
          />
        )}
      </ImageGalleryContainer>
    );
  }
}
