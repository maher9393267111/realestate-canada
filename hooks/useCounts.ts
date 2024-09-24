import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import Router from "next/router";

const fetcher = (url: string) => axios.get(url).then(({ data }: any) => data);

export default function useCounts({
    
} = {}) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/counts`,
    fetcher,
    {
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,

    isLoading: isLoading,
    error: error,
    mutate: mutate,
  };
}
