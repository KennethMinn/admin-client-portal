import { axiosPrivate } from "./../../../lib/axios/axiosInstance";
import {
  HigherDepartmentCreateFormValues,
  HigherDepartmentEditFormValues,
  LowerDepartmentCreateFormValues,
  LowerDepartmentEditFormValues,
} from "../types";

export const getAllHigherDepartment = async () => {
  const res = await axiosPrivate.get("/api/v1/departments");
  return await res.data;
};

export const getHigherDepartment = async (id: string) => {
  const res = await axiosPrivate.get(`/api/v1/departments/by-id?id=${id}`);
  return await res.data;
};

export const getLowerDepartment = async (id: string) => {
  const res = await axiosPrivate.get(`/api/v1/sub-departments/search?id=${id}`);
  return await res.data;
};

export const getLowerDepartmentsByParentId = async (id: string) => {
  const res = await axiosPrivate.get(
    `/api/v1/sub-departments/search?parentDepartmentId=${id}`
  );
  return await res.data;
};

//create
export const createHigherDepartment = async (
  data: HigherDepartmentCreateFormValues
) => {
  return await axiosPrivate.post("/api/v1/departments", data);
};

export const createLowerDepartment = async (
  data: LowerDepartmentCreateFormValues
) => {
  return await axiosPrivate.post("/api/v1/sub-departments", data);
};

//update
export const updateHigherDepartment = async (
  data: HigherDepartmentEditFormValues
) => {
  return await axiosPrivate.put(`/api/v1/departments`, data);
};

export const updateLowerDepartment = async (
  data: LowerDepartmentEditFormValues
) => {
  return await axiosPrivate.put(`/api/v1/sub-departments`, data);
};

//delete
export const deleteHigherDepartment = async (id: string) => {
  return await axiosPrivate.delete(`/api/v1/departments?id=${id}`);
};

export const deleteLowerDepartment = async (id: string) => {
  return await axiosPrivate.delete(`/api/v1/sub-departments?id=${id}`);
};
