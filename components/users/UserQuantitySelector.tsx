type Props = {
    quantity: number;
    setQuantity: (value: number) => void;
};

export default function UserQuantitySelector({ quantity, setQuantity }: Props) {
    return (
        <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {[5, 10, 15, 20].map((num) => (
                <option key={num} value={num}>
                    Show {num} users
                </option>
            ))}
        </select>
    );
}