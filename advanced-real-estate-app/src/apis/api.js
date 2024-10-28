import handleApiRequest from "./apiRequest";

export const handleApiBuilding = async (url, data, method, token) =>{
  return await handleApiRequest(url, data, method, token);
}
