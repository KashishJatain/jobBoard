import axios from "axios"
axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:3000";
export const signupApi= async(creds)=>{
    return axios.post(`${BASE_URL}/user/signup`,creds);
}
export const loginApi= async(creds)=>{
    return axios.post(`${BASE_URL}/user/login`,creds);
}
export const getJobsApi= async()=>{
    return axios.get(`${BASE_URL}/job`);
}
export const getJobBYIdApi= async(id)=>{
    return axios.get(`${BASE_URL}/job/${id}`);
}
export const postJobApi= async(creds)=>{
    return axios.post(`${BASE_URL}/job/create`,creds);
}
export const trackJobApplicationApi = async(jobId) => {
    return axios.post(`${BASE_URL}/user/track-application/${jobId}`);
  }
  
  export const getUserApplicationsApi = async() => {
    return axios.get(`${BASE_URL}/user/applications`);
  }