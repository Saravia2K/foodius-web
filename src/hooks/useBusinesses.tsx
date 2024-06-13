import { APIRequest } from "@/utils";
import getWeekDay from "@/utils/getWeekDay";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchBusinesses = () =>
  APIRequest<BusinessesResponse>(
    `businesses/${getWeekDay()}/${new Date().getTime()}`,
    "GET"
  );

export default function useBusinesses() {
  const { data, isLoading } = useQuery({
    queryKey: ["business"],
    queryFn: fetchBusinesses,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return {
    businesses: data?.data ?? [],
    businessesLoading: isLoading,
  };
}

export type BusinessesResponse = {
  name: string;
  banner: string;
  slug: string;
}[];
