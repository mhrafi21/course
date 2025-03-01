import React from "react";
import { Link } from "react-router";
import { Button } from "./components/ui/button";

const RoutesError: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-y-6">
      <h1 className = "text-3xl font-bold text-red-500">Error 404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <p>Please go back to the home page or try a different link.</p>
      <Link to={"/"}> <Button >Back to dashboard</Button> </Link>
    </div>
  );
};

export default RoutesError;
