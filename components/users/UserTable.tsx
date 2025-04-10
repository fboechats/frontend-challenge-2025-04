import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { User } from "@/types/user";
import UserRow, { SkeletonRow } from "./UserRow";

type UserTableProps = {
    isLoading: boolean;
    users: User[];
    onSelectUser: (user: User) => void;
    isFavorite: (uuid: string) => boolean;
    toggleFavorite: (user: User) => void;
}

export default function UserTable({
    isLoading,
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
            {!isLoading && users.length === 0 ? (
                <tbody>
                    <tr>
                        <td colSpan={6} className="text-center text-muted-foreground py-6">
                            No users found.
                        </td>
                    </tr>
                </tbody>
            ) : (
                <TableBody>
                    {isLoading
                        ? [...Array(10)].map((_, i) => <SkeletonRow key={i} />)
                        : users.map((user) => (
                            <UserRow
                                key={user.login.uuid}
                                user={user}
                                isFavorite={isFavorite}
                                onToggleFavorite={toggleFavorite}
                                onSelectUser={onSelectUser}
                            />
                        ))}
                </TableBody>
            )}
        </Table>
    );
}