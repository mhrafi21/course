import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Search: React.FC = () => {
  return (
    <div>
      {/* Search & Auth Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        <Input placeholder="Search courses..." className="w-48" />
        <Button variant="outline">Login</Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Search;
