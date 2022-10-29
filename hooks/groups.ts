import { useMemo } from "react";
import useUsers from "./users";

const useGroups = () => {
    const { users } = useUsers();

    const groups: { [key: string]: any } = {};
    users.forEach((user) => {
        const domain = user.website.split(".")[1] as string;
        if (!groups[domain]) {
            groups[domain] = [];
        }
        groups[domain].push(user);
    });

    return { groups };
};

export default useGroups;
