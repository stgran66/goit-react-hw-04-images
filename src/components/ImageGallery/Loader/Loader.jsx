import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#3f51b5"
      wrapperStyle={{
        position: 'absolute',
        top: '20%',
        left: '50%',
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
    />
  );
};
