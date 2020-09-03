import axios from "axios";
import ApiRoutes from "../../constants/ApiRoutes";
import { getAccessTokenForUsageService } from "../helper/getAccessTokenForUsageService";

export async function getMyProfileService()
{   
    let token = await getAccessTokenForUsageService();

    let response = await axios.get<ResponseWithData<ProfileData>>(ApiRoutes.getMyProfile,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    console.log(response);
    return response.data;
}