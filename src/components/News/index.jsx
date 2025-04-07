import SpinnerWrapper from "components/common/SpinnerWrapper";
import { useNewsFetch } from "hooks/reactQuery/useNewsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constant";
import Header from "./Header";
import List from "./List";

const News = () => {
  const {
    page,
    searchTerm = "",
    dateFrom = null,
    dateTo = null,
    source = null,
    category = null,
  } = useQueryParams();
  const history = useHistory();

  const params = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    dateFrom,
    dateTo,
    source,
    category,
  };

  const { data: { articles, totalResults } = {}, isFetching } = useNewsFetch({
    q: searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    from: dateFrom,
    to: dateTo,
    sources: source,
    category: Array.isArray(category)
      ? category.map(item => item).join(",")
      : category,
  });

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.productivity.news,
        filterNonNull({
          ...params,
          page,
        })
      )
    );

  const updateQueryParams = useFuncDebounce(updatedValue => {
    const updatedParam = {
      ...params,
      ...updatedValue,
    };

    console.log("updatedParam", updatedParam);

    history.push(
      isEmpty(updatedParam.searchTerm)
        ? buildUrl(routes.productivity.news)
        : buildUrl(routes.productivity.news, filterNonNull(updatedParam))
    );
  });

  return (
    <div className="mx-10 flex h-full flex-col">
      <Header
        {...{
          updateQueryParams,
          searchTerm,
          dateFrom,
          dateTo,
          source,
          category,
          totalResults,
        }}
      />
      {isFetching ? (
        <SpinnerWrapper />
      ) : (
        <List {...{ articles, searchTerm, dateFrom, dateTo }} />
      )}
      <div className="mt-10 self-end">
        <Pagination
          className="neetix-pagination"
          count={totalResults || 1}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default News;
