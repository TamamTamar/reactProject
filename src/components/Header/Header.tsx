import { useTheme } from "../../hooks/useTheme";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";

function Header() {
  const { theme } = useTheme();
  return (
    <header className="bg-pink-200 dark:bg-gray-900 p-5 text-white text-5xl font-extralight h-40 text-center">
      <Navbar  />
    </header>
  );
}

export default Header;
