const paging = (data, page) => {
  if (!data.length) {
    return {
      results: data,
      page: 0,
      total_pages: 0,
    };
  }
  // results per page = 20
  const results = data.slice(20 * (page - 1), 20 * page);

  //total page
  const totalPage = Math.ceil(data.length / 20);

  if (page > totalPage) {
    return {
      errorMessage: `Your page request is over limit total ${totalPage} pages. Please change params and try again!`,
    };
  }

  return {
    results: results,
    page: page,
    total_pages: totalPage,
  };
};

module.exports = paging;
