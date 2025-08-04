import { del, get, post } from "./apiMethods";

export const getAppliedJob = () => get(`/application`);
export const applyJob = (data) => post(`/application/apply`, data);


export const getSavedJob = () => get(`/savejob`);
export const saveJob = (data) => post(`/savejob/save`, data);
export const unSaveJob = (id) => del(`/savejob/unsave/${id}`);