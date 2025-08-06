import { get, post } from "./apiMethods";

export const getJobs = (page, limit, search) => get(`/jobs?page=${page}&limit=${limit}&search=${search}`);
export const getJob = (id) => get(`/jobs/${id}`);
export const createJob = (data) => post(`/jobs/create`, data);

export const updateJobs = (data) => post(`/jobs/update`, data);