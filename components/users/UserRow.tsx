import { TableCell, TableRow } from "@/components/ui/Table";
import { User } from "@/types/user";
import { Star, StarOff } from "lucide-react";

type Props = {
    isFavorite: (uuid: string) => boolean;
    onToggleFavorite: (user: User) => void;
    onSelectUser: (user: User) => void
    user: User
};

export default function UserRow({ user, isFavorite, onToggleFavorite, onSelectUser }: Props) {
    const isFavoriteUser = isFavorite(user.login.uuid);

    return (
        <TableRow
            onClick={() => onSelectUser(user)}
            className="cursor-pointer hover:bg-gray-50 transition"
        >
            <TableCell>
                <img
                    src={user.picture.thumbnail}
                    alt="user"
                    className="w-10 h-10 rounded"
                />
            </TableCell>
            <TableCell>
                {user.name.first} {user.name.last}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.location.country}</TableCell>
            <TableCell>
                {new Date(user.dob.date).toLocaleDateString("en-GB")}
            </TableCell>
            <TableCell>
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        onToggleFavorite(user)
                    }}
                    className="text-yellow-500 hover:text-yellow-600 transition cursor-pointer"
                    title={isFavoriteUser ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavoriteUser ? <Star fill="currentColor" /> : <StarOff />}
                </button>
            </TableCell>
        </TableRow>
    );
}