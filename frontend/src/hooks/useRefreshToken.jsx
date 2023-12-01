import axios from "../api/axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/user/token", {
      withCredentials: true,
    });
    const data = response.data;
    if (data.success) {
      return data.data.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
