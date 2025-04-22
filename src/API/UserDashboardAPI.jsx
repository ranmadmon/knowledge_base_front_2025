import axios from "axios";

export const getUserDashboard = async (userId) => {
    const response = await axios.get(`http://localhost:8080/dashboard/user/${userId}`);
    return response.data;
};