import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router";
import { Input } from "../ui/input";
import { useGetCoursesQuery } from "@/redux/baseApi";
import { ICourse } from "@/interface";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { SearchIcon } from "lucide-react";
import debounce from "lodash.debounce";
import { motion } from "framer-motion";

interface SearchForm {
  search: string;
}

const Search = () => {
  const navigate = useNavigate();
  const { register, watch } = useForm<SearchForm>({
    defaultValues: { search: "" },
  });

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const searchQuery: string = watch("search");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Debounce search input
  useEffect(() => {
    const debouncedHandler = debounce(
      (query: string) => setDebouncedSearch(query),
      300
    );
    debouncedHandler(searchQuery);
    return () => debouncedHandler.cancel(); // Cleanup on unmount
  }, [searchQuery]);

  const { data: courses } = useGetCoursesQuery(
    { search: debouncedSearch || undefined, limit: 30 },
    { skip: !debouncedSearch }
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsDropdownOpen(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`
      );
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="relative flex items-center">
        <SearchIcon className="absolute left-2" height={"20px"}/>
        <Input
          className="rounded-full px-10 h-10 w-full"
          id="search"
          type="text"
          {...register("search")}
          placeholder="Search for courses..."
          onFocus={() => setIsDropdownOpen(true)} // Show dropdown on input focus
          autoComplete="off"
        />
        </div>
      </form>

      {isDropdownOpen && searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full bg-white dark:bg-black overflow  max-h-[600px] overflow-y-auto hide-scrollbar"
        >
          {/* <div className="flex justify-end p-2">
            <button onClick={() => setIsDropdownOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div> */}

          <Card
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              setIsDropdownOpen(false);
            }}
            className="p-3 border-none rounded-none shadow-none"
          >
            <CardTitle className="flex gap-4 items-center tracking-tighter">
              <SearchIcon height={"20px"}></SearchIcon> Searching for...{" "}
              {debouncedSearch}
            </CardTitle>
          </Card>

          {courses?.data?.data &&
            courses?.data?.data?.length > 0 &&
            courses?.data?.data?.slice(0, 10)?.map((course: ICourse) => (
              <Card
                key={course._id}
                className="p-3 border-none shadow-none cursor-pointer hover:bg-gray-100 rounded-none lg:shadow"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(course?.title)}`);
                  setIsDropdownOpen(false);
                }}
              >
                <CardTitle className="flex items-center tracking-tighter font-medium gap-5">
                  <SearchIcon height={"20px"} /> {course?.title}
                </CardTitle>
              </Card>
            ))}
          {courses?.data?.data &&
            courses?.data?.data?.length > 0 &&
            courses?.data?.data?.slice(0, 5)?.map((course: ICourse) => (
              <Card
                key={course._id}
                className=" px-3 mb-3 py-2 border-none shadow-none cursor-pointer flex 
                 hover:bg-gray-100"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(course?.title)}`);
                  setIsDropdownOpen(false);
                }}
              >
                <div className="w-10 h-10">
                  <img
                    className="w-full h-full object-cover"
                    src={course?.thumbnail}
                    alt=""
                  />
                </div>
                <CardContent className="p-0 ml-4">
                  <CardTitle className="flex items-center tracking-tighter font-medium gap-5">
                    {course?.title}
                  </CardTitle>
                  <CardDescription>
                    {course?.description?.slice(0, 30)}...
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
        </motion.div>
      )}
    </div>
  );
};

export default Search;
