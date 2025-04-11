"use client";

import { SearchBar, ToggleFavoritesOnly, UserQuantitySelector } from "@/components/users";
import UserTable from "@/components/users/UserTable";
import { useFavorites } from "@/hooks/useFavorites";
import { fetchUsers } from "@/lib/fetch-users";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [page, setPage] = useState(1);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const router = useRouter();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users", quantity, page],
    queryFn: () => fetchUsers(quantity, page),
  });

  const {
    isFavorite,
    toggleFavorite,
    favoriteUsers,
  } = useFavorites(users);

  const mergedUsers = useMemo(() => {
    const userMap = new Map<string, User>();
    users.forEach(user => userMap.set(user.login.uuid, user));
    Object.values(favoriteUsers).forEach(user => userMap.set(user.login.uuid, user));
    return Array.from(userMap.values());
  }, [users, favoriteUsers]);

  const filteredUsers = useMemo(() => {
    return mergedUsers
      .filter((user: User) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      })
      .filter((user: User) =>
        showOnlyFavorites ? isFavorite(user.login.uuid) : true
      ).sort((a, b) => {
        const aFav = isFavorite(a.login.uuid);
        const bFav = isFavorite(b.login.uuid);
        return Number(bFav) - Number(aFav); // Favorites first
      });
  }, [mergedUsers, query, showOnlyFavorites, isFavorite]);

  if (error) return <div className="p-4 text-red-500">Error loading users.</div>;

  return (
    <main className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">User Directory</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <SearchBar query={query} setQuery={setQuery} />
        <UserQuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <ToggleFavoritesOnly
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
        />
      </div>

      <UserTable
        isLoading={isLoading}
        users={filteredUsers}
        onSelectUser={(user) => router.push(`/user/${user.login.uuid}`)}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </main>
  );
}