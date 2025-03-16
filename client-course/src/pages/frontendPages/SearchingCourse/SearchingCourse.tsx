import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useGetCoursesQuery } from "@/redux/baseApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import { Label } from "@/components/ui/label";
import { ICourse } from "@/interface";

export default function CoursePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilters, setOpenFilters] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const query = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const priceRange = searchParams.get("price") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const rating = searchParams.get("rating") || "";

  // Get values from URL, defaulting to page 1 & limit 10
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    // Ensure URL stays updated with current page & limit
    setSearchParams({
      q: query, 
      page: String(page),
      limit: String(limit),
      category: category,
      price: priceRange,
      difficulty: difficulty,
      rating: rating,
      sort: sortBy,
    });
  }, [page,query, limit, category, priceRange, difficulty, rating, sortBy, setSearchParams]);
  

  const {
    data: Courses,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetCoursesQuery({
    limit,
    page,
    search: query,
    sort: sortBy,
    category,
    price: priceRange,
    difficulty,
    rating,
  });

  const updateFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      if (value === "") prev.delete(key);
      else prev.set(key, value);
      return prev;
    });
  };

  const clearFilter = (key: string) => {
    setSearchParams((prev) => {
      prev.delete(key);
      return prev;
    });
  };

  const filterOptions = [
    {
      title: "Category",
      key: "category",
      options: ["web-development", "design", "marketing"],
      selected: category,
    },
    {
      title: "Sort By",
      key: "sort",
      options: ["popularity", "newest", "highest-rated"],
      selected: sortBy,
    },
    {
      title: "Price Range",
      key: "price",
      options: ["free", "paid", "under-50", "under-100", "above-100"],
      selected: priceRange,
    },
    {
      title: "Difficulty Level",
      key: "difficulty",
      options: ["beginner", "intermediate", "advanced"],
      selected: difficulty,
    },
    {
      title: "Rating",
      key: "rating",
      options: ["4+", "3+", "2+"],
      selected: rating,
    },
  ];

  const visibleFilters = showAllFilters ? filterOptions : filterOptions.slice(0, 3);

  const selectedFilters = filterOptions.filter(
    (filter) => filter.selected !== ""
  );
  const FilterComponent = () => (
    <Accordion type="multiple" defaultValue={["category", "sort","price"]} className="w-full">
    {visibleFilters.map((filter) => (
      <AccordionItem key={filter.key} value={filter.key}>
        <AccordionTrigger className="text-lg font-semibold">
          {filter.title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {filter.options.map((value) => (
              <Label key={value} className="flex items-center space-x-2">
                <Checkbox
                  checked={filter.selected === value}
                  onCheckedChange={() => updateFilter(filter.key, value)}
                />
                <span>{value.replace("-", " ")}</span>
              </Label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}

    {/* See More Button */}
    {!showAllFilters && filterOptions.length > 3 && (
      <Button
        variant="outline"
        className="mt-2 w-full"
        onClick={() => setShowAllFilters(true)}
      >
        See More
      </Button>
    )}
  </Accordion>
  );
  
  return (
    <div className="container">
      <div className="">
        {/* Course List */}
        <CardTitle className="text-3xl">
          {Courses?.data?.data?.length} results for {`"${query}"`}
        </CardTitle>

        {/* Selected Filters Display */}
        <div className="flex flex-wrap gap-2 mt-6">
          {selectedFilters.length > 0 && (
            <>
              <span className="font-semibold">Selected Filters:</span>
              {selectedFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="outline"
                  className="flex items-center space-x-2 px-3 py-1"
                >
                  <span>{filter.selected.replace("-", " ")}</span>
                  <button onClick={() => clearFilter(filter.key)}>
                    <X size={14} className="ml-1 cursor-pointer" />
                  </button>
                </Badge>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 mt-4 lg:grid-cols-4 gap-5">
        {/* Mobile Sidebar */}
        <div className="lg:hidden col-span-1">
          <Sheet open={openFilters} onOpenChange={setOpenFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                Show Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white dark:black text-gray-900 dark:text-gray-100">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-2">{FilterComponent()}</div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <CardTitle className="text-2xl">Filter</CardTitle>
          {FilterComponent()}
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {isLoading || isFetching || isUninitialized ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="shadow-md rounded-lg">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-4 w-[200px] mt-2" />
                  <Skeleton className="h-4 w-full mt-1" />
                </Card>
              ))
            ) : Courses?.data?.data?.length > 0 ? (
              Courses?.data?.data?.map((course :ICourse) => (
                <Link key={course._id} to={`/course/${course?.slug}`}>
                                <Card className="flex gap-2 shadow-none">
                  <img
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-48 h-40 object-cover rounded-l-lg"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{course?.title}</h3>
                    <p className="text-sm text-gray-600">
                      {course?.description}
                    </p>
                  </CardContent>
                </Card>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No courses found.
              </p>
            )}
          </div>
          
      <div>
        {/* Reusable Pagination Component */}
        <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(Courses?.data?.totalData / limit)}
          onPageChange={(newPage) => {
            setSearchParams({ page: String(newPage), limit: String(limit) });
          }}
        />
      </div>
        </div>
      </div>

    </div>
  );
}
