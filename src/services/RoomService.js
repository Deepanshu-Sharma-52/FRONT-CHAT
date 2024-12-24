import { httpClient } from "../config/AxiosHelper"

export const createRoomApi=async (roomDetail)=>{

    const respone = await httpClient.post(`/api/rooms`, roomDetail, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      return respone.data;
};

export const joinChatApi=async(roomId) => {

    const response=await httpClient.get(`/api/rooms/${roomId}`)
    return response.data;
};

export const getMessages=async(roomId,size=50,page=0)=>{
  const respone=await httpClient.get(`/api/rooms/${roomId}/messages?size=${size}&page=${page}`);
  return respone.data;
}