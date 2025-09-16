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
        <svg className="h-4 w-4 fill-primary hover:fill-primary-dark transition-colors">
          <use href="/icons.svg#icon-favourite-active" />
        </svg>
      ) : (
        <svg className="h-4 w-4 fill-primary-dark/40 hover:fill-primary-dark transition-colors">
          <use href="/icons.svg#icon-favourite" />
        </svg>
      )}
    </button>
  );
};
