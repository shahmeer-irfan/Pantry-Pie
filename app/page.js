// app/page.tsx
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col justify-center bg-yellow-50 text-black min-h-screen itehms-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-7xl font-bold text-center p-2">
          Welcome to PantryPie
        </h1>
        <h2 className="text-xl font-semibold">
          Never Worry About Your Pantry Storage Again!
        </h2>
        <p className="text-center font-normal">
          Start your journey with PantryPal today and take control of your
          kitchen like never before.
        </p>
      </div>

      <div className="flex flex-col items-center pt-6">
        <Link href="/sign-up" passHref>
          <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg font-semibold duration:300 hover:scale-110 my-2">
            Get Started
          </button>
        </Link>
        <p className="text-sm font-mono">Already have an account?</p>{" "}
        <Link href="/sign-in" passHref>
          <button className="text-sm hover:scale-110 font-sans hover:font-bold">
            Sign In
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
