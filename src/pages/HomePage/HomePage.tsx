import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/Button/Button';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-[url(/src/assets/hero_image.jpg)] bg-cover bg-no-repeat bg-center min-h-screen`}
    >
      <div className="w-ds flex items-center flex-col mr-auto ml-auto ds:pt-127 xl:pt-117 md:pt-67 pb-12">
        <h1 className="text-white font-bold text-6xl/18 text-center mb-4">
          Find your perfect rental car
        </h1>
        <h2 className="text-white text-2xl/8 text-center mb-10">
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Button
          variant="primary"
          className="w-69"
          onClick={() => navigate('/catalog')}
        >
          View Catalog
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
