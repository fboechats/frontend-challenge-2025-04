import { User } from "@/types/user";
import { useEffect, useState } from "react";

const FAVORITES_KEY = "favorites";

function getStoredFavoriteIds(): string[] {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function useFavorites(users: User[]) {
    const [favoriteIds, setFavoriteIds] = useState<string[]>(getStoredFavoriteIds());

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    }, [favoriteIds]);

    const isFavorite = (uuid: string) => favoriteIds.includes(uuid);

    const toggleFavorite = (uuid: string) => {
        setFavoriteIds((prev) =>
            prev.includes(uuid)
                ? prev.filter((id) => id !== uuid)
                : [...prev, uuid]
        );
    };

    const favoriteUsers = users.filter((user) =>
        favoriteIds.includes(user.login.uuid)
    );

    return { isFavorite, toggleFavorite, favoriteUsers };
}
