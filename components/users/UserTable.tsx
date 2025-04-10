import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/Table";
import { useFavorites } from "@/hooks/useFavorites";
import { User } from "@/types/user";
import UserRow from "./UserRow";

export default function UserTable({
    users,
    onSelectUser
}: {
    users: User[],
    onSelectUser: (user: User) => void
}) {
    const { isFavorite, toggleFavorite } = useFavorites();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Birth Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <UserRow
                        key={user.login.uuid}
                        user={user}
                        isFavorite={isFavorite(user.login.uuid)}
                        onToggleFavorite={toggleFavorite}
                        onSelectUser={onSelectUser}
                    />
                ))}
            </TableBody>
        </Table>
    );
}