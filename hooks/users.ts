import { useEffect, useRef, useState } from "react";

let u: any[] = [];

const useUsers = () => {
    const refFetched = useRef(false);
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (u.length) {
            setUsers(u);
            return;
        }
        if (!refFetched.current) {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.json())
                .then((json) => {
                    setUsers(json);
                    u = json;
                })
                .catch((error) => setError(error));
            refFetched.current = true;
        }
    }, []);

    return {
        users,
        isLoading: users.length === 0 && !error,
        error,
    };
};

export default useUsers;
