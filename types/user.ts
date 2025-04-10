// types/user.ts

export type User = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string | number;
    };
    email: string;
    login: {
        uuid: string;
        username: string;
    };
    dob: {
        date: string;
        age: number;
    };
    phone: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
};
