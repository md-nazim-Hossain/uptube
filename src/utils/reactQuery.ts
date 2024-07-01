import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { QueryFunctionContext } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "./api";
import { GetInfinitePagesInterface } from "@/types";

type QueryKeyT = [string, object | undefined];

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: Pick<
  QueryFunctionContext<QueryKeyT>,
  "pageParam" | "queryKey"
>): Promise<T> => {
  const [url, params] = queryKey;
  return api
    .get<T>(url, { params: { ...params, pageParam } })
    .then((res) => res.data);
};

export const useLoadMore = <T>(
  url: string | null,
  params?: object,
  initialData?: any[],
) => {
  const context = useInfiniteQuery<
    GetInfinitePagesInterface<T>,
    Error,
    GetInfinitePagesInterface<T>,
    QueryKeyT
  >({
    queryKey: [url!, params],
    queryFn: ({ queryKey, pageParam }) => fetcher({ queryKey, pageParam }),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage?.previousId ?? false,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextId ?? false;
    },
    // initialData: { pageParams: [1], pages: initialData ?? [] },
  });

  return context;
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>({
      queryKey: [url, params],
      queryFn: ({ queryKey }) => fetcher({ queryKey }),
    });
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, AxiosError<any, any>, T, QueryKeyT>,
) => {
  const context = useQuery<T, AxiosError<any, any>, T, QueryKeyT>({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
    ...config,
  });

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>({
    mutationFn: func,
    onMutate: async (data: T | S) => {
      await queryClient.cancelQueries({
        queryKey: [url!, params],
      });

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err: any, _: any, context: any) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [url!, params],
      });
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T,
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`),
    url,
    params,
    updater,
  );
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data),
    url,
    params,
    updater,
  );
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch<S>(url, data),
    url,
    params,
    updater,
  );
};
