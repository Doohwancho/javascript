import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';

import { Person } from './Person';

const initialUrl = 'https://swapi.dev/api/people/';

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery(['sw-people'], ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
      getNextPageParam: (lastPage, allPage) => lastPage.next || undefined,
    });
    //query-key
    //  쿼리 키 : 문자열 or 배열, 캐싱 처리에 있어서 중요한 개념
    // .❗️중요❗️ 다른 컴포넌트에서 같은 키로 요청하면, 캐싱을 같이 처리하는데, 같은 컴포넌트에서 다른 키로 여러번 요청하면, 캐싱을 다르게 처리한다. 
    //  ex. sw-people: unique key for caching and tracking the query
    //getNextPageParam: A function that returns the URL for the next page of data (or undefined if there is no next page).

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <Fragment>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map(({ name, hairColor, eyeColor }) => {
            return <Person name={name} hairColor={hairColor} eyeColor={eyeColor} />;
          });
        })}
      </InfiniteScroll>
    </Fragment>
  );
}