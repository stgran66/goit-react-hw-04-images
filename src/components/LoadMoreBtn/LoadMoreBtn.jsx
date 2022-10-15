import PropTypes from 'prop-types';
import { StyledBtn } from './LoadMoreBtn.styled';
import { getImages } from 'services/pixabayApi';

export const LoadMoreBtn = ({
  query,
  page,
  onQuery,
  totalPages,
  perPage,
  showLoading,
  closeLoading,
}) => {
  const isLastPage = page > totalPages;

  const onLoadMore = async () => {
    showLoading();
    const data = await getImages(query, perPage, page);
    onQuery(data);
    closeLoading();
  };

  return (
    <StyledBtn type="button" disabled={isLastPage} onClick={onLoadMore}>
      {isLastPage ? 'There is no more image' : 'Load More'}
    </StyledBtn>
  );
};

LoadMoreBtn.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onQuery: PropTypes.func.isRequired,
  showLoading: PropTypes.func.isRequired,
  closeLoading: PropTypes.func.isRequired,
};
