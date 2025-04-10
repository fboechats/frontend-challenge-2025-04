import { User } from "@/types/user";
import {
    Calendar,
    Mail,
    MapPin,
    Phone,
    Star,
    StarOff
} from "lucide-react";

type Props = {
    user: User;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
};

export default function UserCard({ user, isFavorite, onToggleFavorite }: Props) {
    const fullName = `${user.name.first} ${user.name.last}`;
    const location = `${user.location.city}, ${user.location.state}, ${user.location.country}`;
    const birthDate = new Date(user.dob.date);
    const birthFormatted = birthDate.toLocaleDateString("en-GB");
    const age = user.dob.age;

    return (
        <div className="relative bg-white p-6">
            <button
                onClick={() => onToggleFavorite(user.login.uuid)}
                className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 transition cursor-pointer"
                aria-label="Toggle Favorite"
            >
                {isFavorite ? <Star fill="currentColor" /> : <StarOff />}
            </button>

            <div className="flex items-center gap-5">
                <img
                    src={user.picture.large}
                    alt={fullName}
                    className="w-20 h-20 rounded-full object-cover"
                />

                <div className="flex-1">
                    <h2 className="text-xl font-semibold">{fullName}</h2>
                    <p className="text-sm text-gray-500">{user.login.username}</p>
                </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{location}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{user.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{birthFormatted} ({age} years old)</span>
                </div>
            </div>
        </div>
    );
}