import { get, post } from "./apiMethods";

export const getAppliedJob = () => get(`/application`);
export const applyJob = (data) => post(`/application/apply`, data);