import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import Router from "next/router";

interface Query {
  page?: string | number;

  search?: string;
  country?:string
}

interface BookDetails {
  id: string;
  title: string;
  author: string;
  story: string;
  price: number;
  image: string;
}

const fetcher = (url: string) => axios.get(url).then(({ data }: any) => data);

export default function useBlogs({
  page = 1,
  search="",
  country="",

}: Query = {}) {
  // console.log(">C<>" , category)
  const { data, isLoading, error, mutate } = useSWR(

    `/api/blog/main/?page=${page}&search=${search}&country=${country}`,
    fetcher
    
    ,

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
