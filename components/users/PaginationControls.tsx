type Props = {
    page: number;
    setPage: (page: number) => void;
    disabled: boolean;
}

export default function PaginationControls({ page, setPage, disabled }: Props) {
    return (
        <div className="flex justify-center mt-4 space-x-4">
            <button
                aria-label="Previous"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
                Previous
            </button>
            <span className="px-4 py-2">{`Page ${page}`}</span>
            <button
                aria-label="Next"
                onClick={() => setPage(page + 1)}
                disabled={disabled}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
                Next
            </button>
        </div>
    );
};
