type Props = {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
    return (
        <div className="flex justify-center gap-2 mt-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm rounded bg-gray-100 disabled:opacity-50"
            >
                Prev
            </button>
            <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm rounded bg-gray-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}