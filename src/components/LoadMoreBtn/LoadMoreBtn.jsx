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
