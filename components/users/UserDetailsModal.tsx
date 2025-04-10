import { User } from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import UserCard from "./UserCard";

type Props = {
    user: User;
    isFavorite: (uuid: string) => boolean;
    toggleFavorite: (user: User) => void;
    onClose: () => void;
};

export default function UserDetailsModal({
    user,
    isFavorite,
    toggleFavorite,
    onClose,
}: Props) {

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition cursor-pointer"
                        aria-label="Close"
                    >
                        <X size={22} />
                    </button>

                    <div className="pt-2">
                        <UserCard
                            user={user}
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}