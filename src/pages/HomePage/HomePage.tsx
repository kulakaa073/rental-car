import { Button } from '../../components/ui/Button/Button';

export const HomePage = () => {
  return (
    <div className="bg-hero bg-cover bg-no-repeat bg-center h-full flex items-center flex-col">
      <h1 className="text-white font-bold text-6xl/18 text-center mb-4 ds:pt-110 xl:pt-100 md:pt-50">
        Find your perfect rental car
      </h1>
      <h2 className="text-white text-2xl/8 text-center mb-10">
        Reliable and budget-friendly rentals for any journey
      </h2>
      <Button variant="primary">View Catalog</Button>
    </div>
  );
};
