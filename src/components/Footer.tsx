import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-4 text-center text-gray-600">
            Open source ❤️ |{" "}
            <Link href="/contributors">Contributors</Link>
            {" "}|{" "}
            <Link href="https://github.com/vansh-codes/Gityzer" target="_blank" rel="noreferrer noopener">
                Gityzer
            </Link>
        </footer>
    );
}