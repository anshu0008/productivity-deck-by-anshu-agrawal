import { useQueries, useQuery } from "react-query";
import newsApi from "src/api/News";

import { QUERY_KEYS } from "../../constants/query";

export const useNewsFetch = params => {
  const categories = Array.isArray(params.category)
    ? params.category
    : [params.category];

  const response = useQueries(
    categories.map(item => ({
      queryKey: [QUERY_KEYS.NEWS, params],
      queryFn: () => newsApi.fetchList({ ...params, category: item }),
      enabled: !!params.q.trim(),
    }))
  );

  const response2 = useQuery({
    queryKey: [QUERY_KEYS.NEWS, params],
    queryFn: () => newsApi.fetchList(params),
    enabled: !!params.q.trim(),
  });

  const combinedData = response.reduce((acc, { data }) => {
    if (data) {
      acc.push(...data.articles);
    }

    return acc;
  }, []);

  if (!params.category) {
    return response2;
  }

  return {
    data: {
      articles: combinedData,
      totalResults: combinedData?.length || 0,
    },
    isFetching: response.some(({ isFetching }) => isFetching),
  };
};
