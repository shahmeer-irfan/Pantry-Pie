import "./globals.css";

import Header from "../components/Header"; // Import the Header component
import Footer from "../components/Footer"; // Import the Footer component
import { Analytics } from "@vercel/analytics/react";

// Make sure the image path is correct if you're using a local image
 // Adjust path if needed

export const metadata = {
  title: "PantryPie",
  description: "Track your pantry items and generate recipes with PantryPie.",
  keywords: "pantry, recipes, tracking, food, inventory",
  author: "Your Name",
  openGraph: {
    title: "PantryPie",
    description:
      "Track your pantry items and generate recipes with PantryPie's AI.",
    url: "https://pantry-pie-beta.vercel.app", // Update to your actual URL
    image:
      "https://pantry-pie-beta.vercel.ap/logo.png", // Update with the path to your white cart image
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicons and other meta tags */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Sora:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Track your pantry items and generate recipes with PantryPie's AI."
        />
        <meta
          name="keywords"
          content="pantry, recipes, tracking, food, inventory"
        />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="PantryPie" />
        <meta
          property="og:description"
          content="Track your pantry items and generate recipes with PantryPie."
        />
        <meta property="og:url" content="https://pantry-pie-beta.vercel.app" />
        <meta
          property="og:image"
          content="https://pantry-pie-beta.vercel.app/logo.png"
        />
        <meta property="og:type" content="website" />
      </head>
      <body className="w-ful">
        <Header />
        <main className="flex flex-1 justify-center items-center flex-col bg-yellow-100">{children}</main>
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
