  // 🔹 Handles sorting dynamically
  export const getSortQuery = (sortBy?: string): Record<string, any> => {
    const sortOptions: Record<string, any> = {
      latest: { createdAt: -1 },
      popular: { enrolledStudents: -1 },
      "highest-rated": { rating: -1 },
    };
    return sortOptions[sortBy || "latest"];
  };