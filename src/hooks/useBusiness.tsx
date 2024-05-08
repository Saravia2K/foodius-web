import { APIRequest } from "@/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useBusiness(slug: string) {
  const url = `businesses/${slug}`;
  const { data, isLoading } = useQuery({
    queryKey: ["businesses", slug],
    queryFn: () => APIRequest<TBusinessResponse>(url, "GET"),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return {
    business: data?.data!,
    businessLoading: isLoading,
  };
}

export type TBusinessResponse = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
  logo: string;
  banner: string;
  slug: string;
  Schedules: [];
  FoodCategory: TFoodCategory[];
};

export type TFoodCategory = {
  name: string;
  description: string;
  Food: TFood[];
};

export type TFood = {
  id: number;
  id_food_category: number;
  name: string;
  description: string;
  price: string;
  extra_fee: string;
  img_url: string;
  is_available: boolean;
};
