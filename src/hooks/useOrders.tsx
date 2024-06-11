import { API_URL } from "@/utils/consts";
import { TOrderState } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchOrders = (businessId: number) =>
  fetch(`${API_URL}/businesses/${businessId}/orders`).then((res) => res.json());

export default function useOrders(businessId: number) {
  const { data, isLoading, refetch } = useQuery<Response>({
    queryKey: ["business", "dashboard", "orders", businessId],
    staleTime: Infinity,
    refetchOnMount: true,
    queryFn: () => fetchOrders(businessId),
    placeholderData: keepPreviousData,
  });

  return {
    orders: data,
    ordersLoading: isLoading,
    reloadOrders: refetch,
  };
}

export type TOrder = {
  id: number;
  client: string;
  datetime: string;
  state: TOrderState;
  service: number;
  total: number;
  details: TOrderDetail[];
};

export type TOrderDetail = {
  name: string;
  amount: number;
  price: number;
};

type Response = Record<string, TOrder>;
