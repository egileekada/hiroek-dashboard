import React from 'react'
import { useQuery } from 'react-query'
// import { AxiosError } from 'axios';
// import { toast } from 'react-toastify';
import lodash from 'lodash';
import httpService from '../utils/httpService';

interface Props {
  url: string,
  filter?: string,
  limit: number,
  newdata?: any,
  array?: any,
  name?: any,
  search?: string,
  refetchInterval?: number,
  paramsObj?: any
}

function InfiniteScrollerComponent(props: Props) {
  const {
    url,
    filter,
    limit, 
    name,
    search,
    refetchInterval,
    paramsObj = {}
  } = props

  const [size, setSize] = React.useState(limit)
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [results, setResults] = React.useState([] as any)
  const intObserver: any = React.useRef<IntersectionObserver>(null);

  function cleanup(obj: any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
      if (obj[propName] === "location") {
        for (var propName in obj?.location) {
          if (obj?.location[propName] === null || obj?.location[propName] === undefined || obj?.location[propName] === "") {
            delete obj?.location[propName];
          }
        }
      }
    }
    return obj
  }

  const check = () => {
    if (paramsObj !== null || paramsObj !== undefined) {
      return Object?.keys(cleanup(paramsObj)).length === 0 ? [] : Object?.values(cleanup(paramsObj))
    } else {
      return []
    }
  }
  
  const { data, isLoading, refetch, isRefetching, isError } = useQuery(name ? [name, url, search, ...check(), size] : [url, ...check()], () => httpService.get(`${url}`, {
    params: {
      pageSize: size,
      ...paramsObj
    }
  }), {
    refetchInterval: refetchInterval ? refetchInterval : false,
    onSuccess: (data: any) => {
      if (isRefetching) {
        if (size === limit) {
          setResults(lodash.uniqBy(data?.data?.notifications?.data, filter ? filter : "id"));
          // return
        } else if (size !== limit) {
          results.push(...data?.data?.notifications?.data);
          setResults(lodash.uniqBy(results, filter ? filter : "id"));
        }
      } else {
        setResults(lodash.uniqBy(data?.data?.notifications?.data, filter ? filter : "id"));
      } 
      
      setHasNextPage((size > data?.data?.notifications?.totalCount) ? false : true);
      window.scrollTo(0, window.innerHeight);
      //   setData(data.data.content);
    }
  })



  const ref = React.useCallback((post: any) => {
    if (isLoading && isRefetching) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && hasNextPage && !isRefetching) {
        setSize(prev => prev + limit);
        refetch()
      }
    });
    if (post) intObserver.current.observe(post);
  }, [isLoading, hasNextPage, setSize, isRefetching, refetch, limit]);

  return {
    data,
    isLoading,
    refetch,
    results,
    ref,
    isRefetching,
    isError
  }
}

export default InfiniteScrollerComponent
