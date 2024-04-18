import { axiosPrivate } from "../../../lib/axios/axiosInstance";

export const getAllCountries = async () => {
  const res = await axiosPrivate.get(`/api/v1/countries`);
  return await res.data;
};
