// import { filterNonNull } from "neetocist";
// import { Pagination } from "neetoui";
// import { routes } from "routes";
// import { buildUrl } from "utils/url";

// import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constant";
import Header from "./Header";
import List from "./List";

export const News = () => (
  // const params = {
  //   page: DEFAULT_PAGE_INDEX,
  // };

  // const handlePageNavigation = page =>
  //   history.replace(
  //     buildUrl(
  //       routes.productivity.news,
  //       filterNonNull({
  //         ...params,
  //         page,
  //       })
  //     )
  //   );

  <div className="mx-10 my-2 flex flex-col gap-y-20">
    <div className="flex flex-col">
      <Header />
      <List />
    </div>
    <div className="h-4 w-10 self-end bg-gray-700">{/* <Pagination /> */}</div>
  </div>
);
