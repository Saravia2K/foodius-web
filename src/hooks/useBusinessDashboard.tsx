import { API_URL } from "@/utils/consts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchBusinessDashboard = (id: number) =>
  fetch(`${API_URL}/businesses/${id}/dashboard`).then((res) => res.json());

export default function useBusinessDashboard(id: number) {
  const { data, isLoading, refetch } = useQuery<Response>({
    queryKey: ["business", "dashboard", id],
    staleTime: Infinity,
    refetchOnMount: true,
    queryFn: () => fetchBusinessDashboard(id),
    placeholderData: keepPreviousData,
  });

  return {
    business: data,
    businessIsLoading: isLoading,
    reloadBusiness: refetch,
  };
}

type Response = {
  name: string;
  location: string;
  satisfied: number;
};
