import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { User } from "@/types/user";
import UserRow from "./UserRow";

type UserTableProps = {
    users: User[];
    onSelectUser: (user: User) => void;
    isFavorite: (uuid: string) => boolean;
    toggleFavorite: (user: User) => void;
}

export default function UserTable({
    users,
    onSelectUser,
    isFavorite,
    toggleFavorite,
}: UserTableProps) {

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
                        isFavorite={isFavorite}
                        onToggleFavorite={toggleFavorite}
                        onSelectUser={onSelectUser}
                    />
                ))}
            </TableBody>
        </Table>
    );
}