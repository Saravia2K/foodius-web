import { API_URL } from "@/utils/consts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TFood } from "./useBusiness";

const fetchBusinessFood = (businessId: number) =>
  fetch(`${API_URL}/businesses/${businessId}/food`).then((res) => res.json());

export default function useBusinessFood(businessId: number) {
  const { data, isLoading, refetch } = useQuery<Response>({
    queryKey: ["business", "dashboard", "food", businessId],
    queryFn: () => fetchBusinessFood(businessId),
    staleTime: Infinity,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  });

  return {
    food: data,
    foodLoading: isLoading,
    reloadFood: refetch,
  };
}

type Response = Record<
  string,
  {
    name: string;
    description: string;
    dishes: TFood[];
  }
>;
