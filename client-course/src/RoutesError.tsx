import React from "react";
import { Link } from "react-router";

const RoutesError: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <h1>Error 404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <p>Please go back to the home page or try a different link.</p>
      <Link to={"/dashboard"}> Back to dashboard </Link>
    </div>
  );
};

export default RoutesError;
