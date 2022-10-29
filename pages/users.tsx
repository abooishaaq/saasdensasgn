import Head from "next/head";
import { useEffect, useState } from "react";
import useUsers from "../hooks/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faToggleOff,
    faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import usePhoto from "../hooks/photo";

const User = ({ user }: { user: any }) => {
    const { url } = usePhoto(user.id);
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-start w-3/4 my-12">
                <img src={url} alt="user" />
                <h2 className="text-xl">{user.username}</h2>
                <h3 className="text-xl">{user.email}</h3>
                <h2 className="text-xl text-grap-700">{user.phone}</h2>
            </div>
        </div>
    );
};

const Users = () => {
    const { users, isLoading, error } = useUsers();
    const [toggled, setToggled] = useState<Set<number>>(new Set());
    const [search, setSearch] = useState("");
    const [disusers, setDisusers] = useState(users);
    const [opened, setOpened] = useState(-1);

    const toggle = (id: number) => {
        const newToggled = new Set(toggled);
        newToggled.has(id) ? newToggled.delete(id) : newToggled.add(id);
        setToggled(newToggled);
    };

    const open = (id: number) => {
        if (!toggled.has(id)) setOpened(id);
    };

    const close = () => {
        setOpened(-1);
    };

    useEffect(() => {
        console.log("opended", opened);
        setTimeout(() => {
            document.body.addEventListener("click", close);
        });

        return () => document.body.removeEventListener("click", close);
    }, [opened]);

    useEffect(() => {
        const s = search.toLowerCase();
        const filtered = users.filter((u) =>
            u.username.toLowerCase().includes(s)
        );
        setDisusers(filtered);
    }, [search, users]);

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <div>
                <div className="flex mx-12 my-4 justify-center items-center">
                    <h1 className="text-sky-500 text-2xl">Users</h1>
                    <div className="flex items-center h-12 justify-around bg-gray-200 w-full max-w-3xl px-2 py-1 rounded mx-8">
                        <FontAwesomeIcon
                            icon={faSearch}
                            size="1x"
                            className="text-sky-600"
                        />
                        <input
                            type="text"
                            className="bg-gray-200 w-full px-2 py-1 max-w-2xl"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        5
                    </div>
                    <button>Search</button>
                </div>
                <div
                    className="relative z-10"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    {opened !== -1 ? (
                        <>
                            <div className="bg-grap-500/[.8] h-full w-full"></div>
                            <div className="fixed inset-0 overflow-y-auto  m-auto text-center rounded">
                                <div className="relative transform overflow-hidden rounded-lg bg-white shadow-lg text-center m-auto transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <User
                                            // can be improved by converting users into an object
                                            user={
                                                users.filter(
                                                    (u) => u.id === opened
                                                )[0]
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-start w-3/4 my-12">
                        {isLoading && <p>Loading...</p>}
                        {users.length > 0 && (
                            <h2 className="text-xl">Users List</h2>
                        )}
                        {disusers
                            .sort((a, b) => {
                                if (toggled.has(a.id)) return 1;
                                if (toggled.has(b.id)) return -1;
                                return 0;
                            })
                            .map((user) => {
                                const toggledd = toggled.has(user.id);
                                return (
                                    <div
                                        key={user.id}
                                        className="bg-gray-100 rounded my-1 p-4 w-full flex justify-between"
                                    >
                                        <h2
                                            className="text-md"
                                            onClick={() => open(user.id)}
                                        >
                                            {toggledd ? (
                                                <s>{user.username}</s>
                                            ) : (
                                                user.username
                                            )}
                                        </h2>
                                        <FontAwesomeIcon
                                            icon={
                                                toggledd
                                                    ? faToggleOff
                                                    : faToggleOn
                                            }
                                            onClick={() => toggle(user.id)}
                                            size="2x"
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
