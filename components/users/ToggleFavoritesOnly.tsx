type Props = {
    showOnlyFavorites: boolean;
    setShowOnlyFavorites: (val: boolean) => void;
};

export default function ToggleFavoritesOnly({
    showOnlyFavorites,
    setShowOnlyFavorites,
}: Props) {
    return (
        <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <input
                type="checkbox"
                checked={showOnlyFavorites}
                onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                className="accent-yellow-500 w-4 h-4"
            />
            <span>Show Favorites Only</span>
        </label>
    );
}