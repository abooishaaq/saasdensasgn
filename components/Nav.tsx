import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";

const Nav = () => {
    const router = useRouter();
    const { pathname } = router;

    const Icon = (p: string) => (p == pathname ? faCircleDot : faCircle);
    const Color = (p: string) => (p == pathname ? "bg-sky-700" : "");

    return (
        <nav className="bg-sky-600 text-white min-h-screen text-lg pt-12">
            <ul className="flex flex-col justify-center items-center">
                <li className="bg-sky-800 w-full text-center pr-14 py-4 my-8">
                    DashBoard
                </li>
                <li className={`w-full my-2 py-4 pl-16 ${Color("/")}`}>
                    <Link href="/" className="h-full w- hover:underline">
                        <FontAwesomeIcon icon={Icon("/")} size="1x" />
                        <span className="ml-4">Home</span>
                    </Link>
                </li>
                <li className={`w-full my-2 py-4 pl-16 ${Color("/users")}`}>
                    <Link href="/users" className="h-full w-full hover:underline">
                        <FontAwesomeIcon icon={Icon("/users")} size="1x" />
                        <span className="ml-4">Users</span>
                    </Link>
                </li>
                <li className={`w-full my-2 py-4 pl-16 ${Color("/groups")}`}>
                    <Link href="/groups" className="h-full w-full hover:underline">
                        <FontAwesomeIcon icon={Icon("/groups")} size="1x" />
                        <span className="ml-4">Groups</span>
                    </Link>
                </li>
                <li className="mt-4">
                    <p>More features coming soon!</p>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
