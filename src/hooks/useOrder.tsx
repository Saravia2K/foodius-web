import { APIRequest } from "@/utils";
import { ORDER_STATES } from "@/utils/enums";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useOrder(token: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", token],
    queryFn: () => APIRequest<OrderStateResponse>(`orders/${token}`, "GET"),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return {
    orderState: data?.data,
    orderLoading: isLoading,
  };
}

type OrderStateResponse = {
  state: ORDER_STATES;
  cancellationMessage: string;
};
