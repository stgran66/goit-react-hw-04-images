import { StyledBtn } from './LoadMoreBtn.styled';
import { getMoreImages } from 'services/pixabayApi';

export const LoadMoreBtn = ({ query, page, onQuery, totalPages }) => {
  const isLastPage = page > totalPages;
  return (
    <StyledBtn
      type="button"
      disabled={isLastPage}
      onClick={async () => {
        console.log(query);
        console.log(page);
        const data = await getMoreImages(query, page);
        console.log(data);
        onQuery(data);
      }}
    >
      {isLastPage ? 'There is no more image' : 'Load More'}
    </StyledBtn>
  );
};
