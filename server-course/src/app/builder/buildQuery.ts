// 🔹 Builds query dynamically based on search & category

export const buildQuery = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}): Record<string, any> => {
  const query: Record<string, any> = { status: 'approved' };

  if (category && category !== 'all') {
    query.category_slug = category;
  }

  if (search) {
    const words = search.trim().split(/\s+/);
    query.$or = [
      { title: search },
      { title: { $regex: words.join('|'), $options: 'i' } },
    ];
  }

  return query;
};
