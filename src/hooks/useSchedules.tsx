import { API_URL } from "@/utils/consts";
import { TSchedule } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchSchedules = (businessId: number) =>
  fetch(`${API_URL}/schedules/business/${businessId}`).then((res) =>
    res.json()
  );

export default function useSchedules(businessId: number) {
  const { data, isLoading, refetch } = useQuery<TSchedule[]>({
    queryKey: ["business", "schedules", "dashboard", businessId],
    refetchOnMount: true,
    staleTime: Infinity,
    queryFn: () => fetchSchedules(businessId),
    placeholderData: keepPreviousData,
  });

  return {
    schedules: data,
    schedulesLoading: isLoading,
    reloadSchedules: refetch,
  };
}
