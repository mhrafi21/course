import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Input } from "../ui/input";
import { useGetCoursesQuery } from "@/redux/baseApi";
import { ICourse } from "@/interface";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import {  SearchIcon , X } from "lucide-react";
import debounce from "lodash.debounce";
import { motion } from "framer-motion";


interface SearchForm {
  search: string;
}

const MobileSearch = () => {
  const navigate = useNavigate();
  const { register, watch, reset } = useForm<SearchForm>({
    defaultValues: { search: "" },
  });

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const searchQuery: string = watch("search");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const debouncedHandler = debounce(
      (query: string) => setDebouncedSearch(query),
      300
    );
    debouncedHandler(searchQuery);
    return () => debouncedHandler.cancel();
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

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`
      );
      reset(); // Clear input field after searching
      setIsDropdownOpen(false);
      setIsOpen(false); // Close search bar
    }
  };

  const handleSelectResult = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    reset(); // Clear input
    setIsDropdownOpen(false);
    setIsOpen(false); // Close search UI
  };

  return (
    <div>
      {isOpen ? (
        <div className="absolute top-0 right-0 bottom-0 h-screen bg-white z-30 left-0 w-full">
          {/* <div className="flex items-center justify-between px-3 py-3 border-b">
                
            <Button
            className="w-full"
              onClick={() => { 
                navigate(1);
                reset();
                setIsOpen(false);
                setIsDropdownOpen(false);
              }}
            >
              <ArrowLeft className="mr-2" /> Go Back
            </Button>
          </div> */}
          <form onSubmit={handleSearchSubmit} className="space-y-6 mt-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full flex items-center"
            >
              <SearchIcon className="absolute left-2" height={"20px"} />
              <Input
                className=" px-11 h-10 w-full"
                id="search"
                type="text"
                {...register("search")}
                placeholder="Search for courses..."
                autoComplete="off"
              />
              <button
                className="absolute right-2"
                onClick={() => {
                  navigate(1);
                  reset();
                  setIsOpen(false);
                  setIsDropdownOpen(false);
                }}
              >
                <X className='mr-2'/>
              </button>
            </motion.div>
          </form>

          {isDropdownOpen && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              ref={dropdownRef}
              className="absolute top-10 z-50 mt-2 w-full bg-white dark:bg-black max-h-[600px] overflow-y-auto hide-scrollbar"
            >
              <Card
                onClick={() => handleSelectResult(searchQuery)}
                className="p-3 border-none shadow-none cursor-pointer"
              >
                <CardTitle className="flex gap-4 items-center tracking-tighter">
                  <SearchIcon height={"20px"} /> Searching for...{" "}
                  {debouncedSearch}
                </CardTitle>
              </Card>

              {courses?.data?.data &&
                courses?.data?.data?.slice(0, 10).map((course: ICourse) => (
                  <Card
                    key={course._id}
                    className="p-3 border-none shadow-none cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectResult(course?.title)}
                  >
                    <CardTitle className="flex items-center tracking-tighter font-medium gap-5">
                      <SearchIcon height={"20px"} /> {course?.title}
                    </CardTitle>
                  </Card>
                ))}

              {courses?.data?.data &&
                courses?.data?.data?.slice(0, 5).map((course: ICourse) => (
                  <Card
                    key={course._id}
                    className="px-3 mb-3 py-2 border-none shadow-none cursor-pointer flex hover:bg-gray-100"
                    onClick={() => handleSelectResult(course?.title)}
                  >
                    <div className="w-10 h-10">
                      <img
                        className="w-full h-full object-cover"
                        src={course?.thumbnail}
                        alt={course?.title}
                      />
                    </div>
                    <CardContent className="p-0 ml-4">
                      Master New
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
      ) : (
        <span onClick={() => setIsOpen(true)}>
          <SearchIcon />
        </span>
      )}
    </div>
  );
};

export default MobileSearch;
