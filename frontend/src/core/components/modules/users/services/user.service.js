import axios from "../../../../api/axios.instance";
import { API_BASE_URL } from "../../../../utils/constants";
import { getAuthHeader } from "../../auth/services/auth.utils";

const USER_API = `${API_BASE_URL}/users`;

export const changePassword = async (currentPassword, newPassword) => {
  const response = await axios.put(
    `${USER_API}/change-password`,
    { currentPassword, newPassword },
    { headers: getAuthHeader() },
  );

  return response.data;
};

export const changeEmail = async (currentPassword, newEmail) => {
  const response = await axios.put(
    `${USER_API}/change-email`,
    { currentPassword, newEmail },
    { headers: getAuthHeader() },
  );
  return response.data;
};
