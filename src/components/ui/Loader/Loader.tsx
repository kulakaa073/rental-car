import { GridLoader } from 'react-spinners';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-center py-8">
      <GridLoader
        color="var(--color-primary)"
        loading={true}
        margin={2}
        size={20}
        speedMultiplier={0.75}
      />
    </div>
  );
};
