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
import { useToast } from "@/components/ui/use-toast";

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
  updaterQueryKey?: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined,
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const queryKey = updaterQueryKey
    ? [updaterQueryKey, undefined]
    : [url, params];
  return useMutation<AxiosResponse, AxiosError, T | S>({
    mutationFn: func,
    onMutate: async (data: T | S) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<T>(queryKey, (oldData) => {
        return updater ? updater(oldData!, data as S) : ({ data } as T);
      });

      return previousData;
    },
    onError: (err: any, _: any, context: any) => {
      queryClient.setQueryData(queryKey, context);
      toast({
        title: "Failed",
        description: err?.data?.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};

export const useDelete = <T>(
  url: string,
  updaterQueryKey?: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T,
) => {
  const queryKey = params ? makeQueryKey(params) : "";

  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}${queryKey}`),
    url,
    updaterQueryKey,
    params,
    updater,
  );
};

export const usePost = <T, S>(
  url: string,
  updaterQueryKey?: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data),
    url,
    updaterQueryKey,
    params,
    updater,
  );
};

export const useUpdate = <T, S>(
  url: string,
  updaterQueryKey?: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch<S>(url, data),
    url,
    updaterQueryKey,
    params,
    updater,
  );
};

const makeQueryKey = (params: object) => {
  let queryKey = "";
  Object.keys(params).forEach((key) => {
    if (queryKey) {
      queryKey += `&${key}=${(params as any)[key]}`;
    } else {
      queryKey += `?${key}=${(params as any)[key]}`;
    }
  });
  return queryKey;
};
