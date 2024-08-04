// app/page.tsx
import Link from "next/link";

const Home = () => {
  return (
    <main className=" flex flex-col justify-center bg-yellow-100 text-green-800 min-h-screen items-center px-6">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="sm:text-7xl text-6xl font-bold text-center p-2">
          Welcome to PantryPie
        </h1>
        <h2 className="text-xl text-center font-semibold text-green-700">
          Manage, Track, and Create!
        </h2>
        <p className="text-center font-normal text-green-700">
          Start your journey with PantryPie today and take control of your
          kitchen like never before.
        </p>
      </div>

      <div className="flex flex-col items-center pt-6">
        <Link href="/sign-up" passHref>
          <button className="bg-orange-400 hover:bg-orange-300 text-green-800 text-sm px-4 py-2 rounded-lg font-semibold duration:300  my-2">
            Get Started
          </button>
        </Link>
        <p className="text-sm font-mono">Already have an account?</p>{" "}
        <Link href="/sign-in" passHref>
          <button className="text-sm  hover:font-bold">Sign In</button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
