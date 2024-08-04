import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {

  return (
    <div className="flex justify-between items-center px-4 text-yellow-100 bg-green-700">
      <div className="w-full sticky top-0 text-yellow-100 flex items-center p-4 justify-between ">
        <Link href="/" passHref>
          <h1 className="font-bold text-yellow-100 sm:text-4xl text-3xl duration:300 ">
         <ShoppingCartIcon className="text-2xl "/>   PantryPie.
          </h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/shahmeer-irfan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-100  hover:scale-110"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/shahmeer-irfan-4a3175301 "
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-100  hover:scale-110"
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}
