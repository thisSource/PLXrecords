import Link from "next/link";
import Navbar from "./navbar";
import Logo from "./logo";

export default function Layout({ children }) {
  return (
    <div className="">
      <header className="fixed top-5 left-5 right-10 flex flex-row justify-between">
        <Logo />
        <Navbar />
      </header>
      <div>{children}</div>

      <footer className="bg-gray-300 flex flex-row item-center justify-center">
        <p>© 2021 PLX</p>
      </footer>
    </div>
  );
}
