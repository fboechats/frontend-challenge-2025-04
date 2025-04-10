type Props = {
    query: string;
    setQuery: (value: string) => void;
};

export default function SearchBar({ query, setQuery }: Props) {
    return (
        <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}