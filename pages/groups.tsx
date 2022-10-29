import Head from "next/head";
import useGroups from "../hooks/groups";

const Groups = () => {
    const { groups } = useGroups();

    console.log(groups);

    return (
        <>
            <Head>
                <title>Groups</title>
            </Head>
            <div>
                <div className="flex flex-col mx-auto my-4 justify-center items-center w-1/2">
                    <h1 className="text-sky-700 text-3xl">Groups</h1>
                    <div className="flex flex-col justify-start w-full">
                        {Object.keys(groups).map((key) => {
                            const group = groups[key];
                            return (
                                <div key={key} className="my-4">
                                    <h2 className="text-xl">{key}</h2>
                                    {group.map((user: any) => {
                                        return (
                                            <p key={user.username}>
                                                {user.username}
                                            </p>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Groups;
