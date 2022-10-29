import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="grid grid-cols-5 overflow-hidden">
            <div className="col-span-1">
                <Nav />
            </div>
            <div className="col-span-4 h-screen overflow-scroll">
            <Component {...pageProps} />
            </div>
        </div>
    );
}
