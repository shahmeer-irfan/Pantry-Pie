import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  return (
    <header className="w-full bg-green-700 text-yellow-100 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <ShoppingCartIcon className="text-3xl" />
            <h1 className="font-bold text-yellow-100 sm:text-4xl text-3xl ml-2">
              PantryPie
            </h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/shahmeer-irfan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-100 hover:scale-110"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/shahmeer-irfan-4a3175301"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-100 hover:scale-110"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
