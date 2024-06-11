import { API_URL } from "@/utils/consts";

export const deleteFood = async (id: number) => {
  try {
    const fetchRes = await fetch(`${API_URL}/food/${id}`, {
      method: "DELETE",
    });

    return fetchRes.ok;
  } catch (error: any) {
    return false;
  }
};

export const changeFoodAviability = async (
  foodId: number,
  available: boolean
) => {
  try {
    return (
      await fetch(`${API_URL}/food/${foodId}/aviability`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ available }),
      })
    ).ok;
  } catch (error: any) {
    return false;
  }
};

export const createFood = async (form: FormData) => {
  try {
    return (
      (
        await fetch(`${API_URL}/food`, {
          method: "POST",
          body: form,
        })
      ).status == 201
    );
  } catch (error: any) {
    return false;
  }
};

export const updateFood = async (id: number, form: FormData) => {
  try {
    return (
      await fetch(`${API_URL}/food/${id}`, {
        method: "PATCH",
        body: form,
      })
    ).ok;
  } catch (error: any) {
    return false;
  }
};

export const createCategory = async (
  bussinesId: number,
  name: string,
  description: string
) => {
  try {
    return (
      await fetch(`${API_URL}/foodCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_business: bussinesId, name, description }),
      })
    ).ok;
  } catch (error: any) {
    return false;
  }
};
