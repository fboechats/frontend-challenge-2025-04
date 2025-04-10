"use client"
import { SearchBar, ToggleFavoritesOnly, UserDetailsModal, UserQuantitySelector } from "@/components/users";
import UserTable from "@/components/users/UserTable";
import { useFavorites } from "@/hooks/useFavorites";
import { useFilteredPaginatedUsers } from "@/hooks/useFilteredPaginatedUsers";
import { User } from "@/types/user";
import { useState } from "react";

export default function HomePage() {
  const {
    users,
    isLoading,
    error,
    query,
    setQuery,
    showOnlyFavorites,
    setShowOnlyFavorites,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
  } = useFilteredPaginatedUsers(10);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading users.</div>;

  return (
    <main className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">User Directory</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <SearchBar query={query} setQuery={setQuery} />
        <UserQuantitySelector quantity={perPage} setQuantity={setPerPage} />
        <ToggleFavoritesOnly
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
        />
      </div>

      <UserTable
        users={users}
        onSelectUser={setSelectedUser}
        isFavorite={isFavorite}
      />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isFavorite={isFavorite(selectedUser.login.uuid)}
          onToggleFavorite={() => toggleFavorite(selectedUser)}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </main>
  );
}