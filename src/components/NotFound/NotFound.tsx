import { NavLink } from 'react-router';

export const NotFound = () => {
  return (
    <div className="min-h-full flex items-center justify-center flex-col space-y-6 p-20">
      <h2 className="text-gray-900 font-semibold text-3xl">
        Sorry, car not found :/
      </h2>
      <NavLink
        to={'/catalog'}
        className="text-primary-dark underline font-medium text-xl"
      >
        Go back
      </NavLink>
    </div>
  );
};
