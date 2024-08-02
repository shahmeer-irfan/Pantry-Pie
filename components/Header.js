import React from "react";

import  IconButton  from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";  // Ensure you still have MUI icons if you want to use them

export default function Header() {
  return (
    <div className="w-full sticky top-0 flex items-center p-4 justify-between">
      <h1 className="font-bold sm:text-6xl text-3xl">Pantry Pie</h1>
   <IconButton aria-label="logout" size="large">
        <PersonIcon fontSize="large" />
        </IconButton>
    </div>
  );
}
