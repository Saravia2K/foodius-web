import { API_URL } from "@/utils/consts";

export const addSchedule = async (
  busineddId: number,
  day: string,
  from: Date,
  to: Date
) => {
  try {
    const fetchRes = await fetch(`${API_URL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_business: busineddId,
        day,
        from: from.getTime(),
        to: to.getTime(),
      }),
    });

    return fetchRes.status == 201;
  } catch (error: any) {
    return false;
  }
};

export const updateSchedule = async (
  scheduleId: number,
  from: Date,
  to: Date
) => {
  try {
    const fetchRes = await fetch(`${API_URL}/schedules/${scheduleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from.getTime(),
        to: to.getTime(),
      }),
    });

    return fetchRes.ok;
  } catch (error: any) {
    return false;
  }
};

export const deleteSchedule = async (scheduleId: number) => {
  try {
    const fetchRes = await fetch(`${API_URL}/schedules/${scheduleId}`, {
      method: "DELETE",
    });

    return fetchRes.ok;
  } catch (error: any) {
    return false;
  }
};
