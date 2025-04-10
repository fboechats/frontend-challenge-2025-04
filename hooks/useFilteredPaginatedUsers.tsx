import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useFavorites } from "./useFavorites";

async function fetchUsers(quantity: number): Promise<User[]> {
  const res = await fetch(`https://randomuser.me/api/?results=${quantity}`);
  const data = await res.json();
  return data.results;
}

export function useFilteredPaginatedUsers(fetchSize: number = 50) {
  const [query, setQuery] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { getFavoriteUsers } = useFavorites();

  const {
    data: fetchedUsers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", fetchSize],
    queryFn: () => fetchUsers(fetchSize),
  });

  const allFavorites = getFavoriteUsers();

  const mergedUsers = useMemo(() => {
    const favoriteMap = Object.fromEntries(
      allFavorites.map((user) => [user.login.uuid, user])
    );

    const combined = [
      ...fetchedUsers.filter((u) => !favoriteMap[u.login.uuid]),
      ...allFavorites,
    ];

    return combined;
  }, [fetchedUsers, allFavorites]);

  const filteredUsers = useMemo(() => {
    return mergedUsers
      .filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      })
      .filter((user) => {
        return showOnlyFavorites ? !!allFavorites.find(fav => fav.login.uuid === user.login.uuid) : true;
      });
  }, [mergedUsers, query, showOnlyFavorites, allFavorites]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, page, perPage]);

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return {
    users: paginatedUsers,
    query,
    setQuery,
    showOnlyFavorites,
    setShowOnlyFavorites,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    isLoading,
    error,
  };
}