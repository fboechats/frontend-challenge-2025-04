"use client";

import { SearchBar, ToggleFavoritesOnly, UserDetailsModal, UserQuantitySelector } from "@/components/users";
import UserTable from "@/components/users/UserTable";
import { useFavorites } from "@/hooks/useFavorites";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

async function fetchUsers(quantity: number) {
  const res = await fetch(`https://randomuser.me/api/?results=${quantity}`);
  const data = await res.json();
  return data.results;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    isFavorite,
    toggleFavorite,
    favoriteUsers,
  } = useFavorites();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users", quantity],
    queryFn: () => fetchUsers(quantity),
  });

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
        onSelectUser={setSelectedUser}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </main>
  );
}