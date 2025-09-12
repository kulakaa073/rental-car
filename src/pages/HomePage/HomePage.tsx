import { Button } from '../../components/ui/Button/Button';

export const HomePage = () => {
  return (
    <div
      className={`bg-[url(/src/assets/hero_image.jpg)] bg-cover bg-no-repeat bg-center h-full`}
    >
      <div className="max-w-ds flex items-center flex-col">
        <h1 className="text-white font-bold text-6xl/18 text-center mb-4 ds:pt-110 xl:pt-100 md:pt-50">
          Find your perfect rental car
        </h1>
        <h2 className="text-white text-2xl/8 text-center mb-10">
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Button variant="primary" className="w-69">
          View Catalog
        </Button>
      </div>
    </div>
  );
};
