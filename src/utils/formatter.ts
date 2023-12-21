export const generatePagesToDisplay = (page: number, total_page: number) => {
  const maxPagesToShow = 5;
  let pagesToDisplay: (number | string)[] = [page];

  if (total_page <= maxPagesToShow) {
    pagesToDisplay = [...Array(total_page).keys()].map((page) => page + 1);
  } else if (page <= 3) {
    pagesToDisplay = [1, 2, 3, 4, "...", total_page];
  } else if (page >= total_page - 2) {
    pagesToDisplay = [
      1,
      "...",
      total_page - 3,
      total_page - 2,
      total_page - 1,
      total_page,
    ];
  } else {
    pagesToDisplay = [1, "...", page - 1, page, page + 1, "...", total_page];
  }

  return pagesToDisplay;
};

export const formatPrice = (price: number | undefined): string => {
  if (price !== undefined) {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  } else {
    return "Undefined Price";
  }
};
