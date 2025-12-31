import { MOCK_NEWS } from "../mocks/news.mock";
import { GetNewsListRequestDto, GetNewsListResponseDto } from "./news.dto";

export const getNews = async (
  params: GetNewsListRequestDto
): Promise<GetNewsListResponseDto> => {
  // 1. Destructure và gán giá trị mặc định
  const {
    page = 1,
    pageSize = 10,
    isUnpaged = false,
    filter,
    sortBy = "publishedAt",
    sortOrder = "desc",
  } = params;

  // 2. Giả lập delay mạng (0.8s)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Clone mảng để không ảnh hưởng dữ liệu gốc
  let result = [...MOCK_NEWS];

  // 3. Xử lý Filtering (Tìm kiếm)
  if (filter?.search) {
    const searchTerm = filter.search.toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.summary.toLowerCase().includes(searchTerm) ||
        // Tìm trong cả mảng coin liên quan (ví dụ search "BTC" sẽ ra)
        item.relatedCoins.some((coin) =>
          coin.toLowerCase().includes(searchTerm)
        )
    );
  }

  // 4. Xử lý Sorting (Sắp xếp)
  result.sort((a, b) => {
    let valA: any = a[sortBy];
    let valB: any = b[sortBy];

    // Xử lý đặc biệt cho ngày tháng để so sánh chính xác
    if (sortBy === "publishedAt") {
      valA = new Date(a.publishedAt).getTime();
      valB = new Date(b.publishedAt).getTime();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // 5. Xử lý Pagination (Phân trang)
  const total = result.length;
  let items = result;

  if (!isUnpaged) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    items = result.slice(startIndex, endIndex);
  }

  return {
    items,
    total,
    page: isUnpaged ? 1 : page,
    pageSize: isUnpaged ? total : pageSize,
  };
};
