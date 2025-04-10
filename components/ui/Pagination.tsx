import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
    const prevDisabled = page <= 1;
    const nextDisabled = page >= totalPages;

    return (
        <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
            <span>
                Page {page} of {totalPages}
            </span>

            <div className="flex gap-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={prevDisabled}
                    className="flex items-center gap-1 rounded-md border px-3 py-1.5 shadow-sm disabled:opacity-50"
                >
                    <ChevronLeft size={16} /> Prev
                </button>

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={nextDisabled}
                    className="flex items-center gap-1 rounded-md border px-3 py-1.5 shadow-sm disabled:opacity-50"
                >
                    Next <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}