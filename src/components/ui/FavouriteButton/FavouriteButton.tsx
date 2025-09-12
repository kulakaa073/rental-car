interface FavouriteButtonProps {
  isFavourite: boolean;
  onToggle: () => void;
  className?: string;
}

export const FavouriteButton = ({
  isFavourite,
  onToggle,
  className,
}: FavouriteButtonProps) => {
  return (
    <button
      type="button"
      aria-pressed={isFavourite}
      onClick={onToggle}
      className={className}
    >
      {isFavourite ? (
        <svg className="h-4 w-4 fill-primary">
          <use href="/icons.svg#icon-favourite-active" />
        </svg>
      ) : (
        <svg className="h-4 w-4 fill-gray-200">
          <use href="/icons.svg#icon-favourite" />
        </svg>
      )}
    </button>
  );
};
