import { User } from "@/types/user";
import { useEffect, useState } from "react";

const FAVORITES_KEY = "favoriteUsers";

type FavoriteUsersMap = Record<string, User>;

export function useFavorites() {
    const [favorites, setFavorites] = useState<FavoriteUsersMap>({});

    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (user: User) => {
        setFavorites((prev) => {
            const updated = { ...prev };
            const id = user.login.uuid;
            if (updated[id]) {
                delete updated[id];
            } else {
                updated[id] = user;
            }
            return updated;
        });
    };

    const isFavorite = (uuid: string) => {
        return !!favorites[uuid];
    };

    const getFavoriteUsers = (): User[] => {
        return Object.values(favorites);
    };

    return {
        isFavorite,
        toggleFavorite,
        getFavoriteUsers,
    };
}