import { GridLoader } from 'react-spinners';

interface LoaderProps {
  isLoading: boolean;
}
export const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <>
      <GridLoader
        color="var(--primary-color)"
        loading={isLoading}
        margin={2}
        size={20}
        speedMultiplier={0.75}
      />
    </>
  );
};
