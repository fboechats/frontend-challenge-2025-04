import { User } from "@/types/user";
import { useEffect, useState } from "react";

const FAVORITE_IDS_KEY = "favoriteIds";
const FAVORITE_USERS_KEY = "favoriteUsers";

export function useFavorites() {
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
    const [favoriteUsers, setFavoriteUsers] = useState<Record<string, User>>({});

    useEffect(() => {
        const storedIds = localStorage.getItem(FAVORITE_IDS_KEY);
        const storedUsers = localStorage.getItem(FAVORITE_USERS_KEY);

        if (storedIds) {
            setFavoriteIds(new Set(JSON.parse(storedIds)));
        }
        if (storedUsers) {
            setFavoriteUsers(JSON.parse(storedUsers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(FAVORITE_IDS_KEY, JSON.stringify(Array.from(favoriteIds)));
        localStorage.setItem(FAVORITE_USERS_KEY, JSON.stringify(favoriteUsers));
    }, [favoriteIds, favoriteUsers]);

    const toggleFavorite = (user: User) => {
        const id = user.login.uuid;
        setFavoriteIds(prev => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
                setFavoriteUsers(prevUsers => {
                    const updatedUsers = { ...prevUsers };
                    delete updatedUsers[id];
                    return updatedUsers;
                });
            } else {
                updated.add(id);
                setFavoriteUsers(prevUsers => ({
                    [id]: user,
                    ...prevUsers,
                }));
            }
            return updated;
        });
    };

    const isFavorite = (uuid: string) => favoriteIds.has(uuid);

    const favoritesList = Object.values(favoriteUsers);

    return {
        favoriteIds,
        favoriteUsers,
        favoritesList,
        toggleFavorite,
        isFavorite,
    };
}
