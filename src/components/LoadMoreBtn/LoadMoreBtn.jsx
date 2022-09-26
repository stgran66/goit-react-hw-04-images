import PropTypes from 'prop-types';
import { StyledBtn } from './LoadMoreBtn.styled';
import { getMoreImages } from 'services/pixabayApi';

export const LoadMoreBtn = ({
  query,
  page,
  onQuery,
  totalPages,
  perPage,
  whileLoading,
  afterLoading,
}) => {
  const isLastPage = page > totalPages;
  return (
    <StyledBtn
      type="button"
      disabled={isLastPage}
      onClick={async () => {
        whileLoading();
        const data = await getMoreImages(query, page, perPage);
        onQuery(data);
        afterLoading();
      }}
    >
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
  whileLoading: PropTypes.func.isRequired,
  afterLoading: PropTypes.func.isRequired,
};
