import axios from "axios";
import * as Constants from "../Utils/Constants.jsx";

// export async function getProfileInf(userId) {
//     const params = {
//         activityId: userId
//     }
//     const url = `${Constants.URL}getProfileInf`;
//     const response = (await axios.get(url, {params}));
//     if (response.data.success) {
//         return response.data?.profile?.map((profile) => profile);
//     } else {
//         console.error(response.data);
//         return [""]
//     }
//
// }