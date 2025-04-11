"use client";

import { UserCard } from "@/components/users";
import { useFavorites } from "@/hooks/useFavorites";
import { fetchUsers } from "@/lib/fetch-users";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

interface UserPageProps {
    params: Promise<{ uuid: string }>;
}

export default function UserPage({ params }: UserPageProps) {
    const { uuid } = use(params);

    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ["users", 100, 1],
        queryFn: () => fetchUsers(100, 1),
    });

    const { isFavorite, toggleFavorite } = useFavorites(users);

    if (isLoading) return <div className="p-6 text-center">Loading user...</div>;
    if (error) return <div className="p-6 text-red-500 text-center">Error loading user.</div>;

    const user = users?.find((u) => u.login.uuid === uuid);

    if (!user) return notFound();

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
                ← Back to User Directory
            </Link>

            <UserCard
                user={user}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
            />
        </div>
    );
}