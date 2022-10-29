import {callApi} from "../../services/callApi";
import {USER_ENDPOINT} from "../../services/app/endpoint.constant";
import {UserDataModel, UserPayloadModel} from "../../src/models/UsersDTO";

export const createNewAUser = (payload: UserPayloadModel) => {
  return callApi(USER_ENDPOINT.CREATE, "POST", payload);
}

export const getListOfUser = () => {
  return callApi(USER_ENDPOINT.GET_LIST, "GET", null)
}

export const updateUserById = (payloadUpdate: UserDataModel) => {
  return callApi(USER_ENDPOINT.UPDATE + payloadUpdate.id, "PUT", payloadUpdate)
}

export const deleteUserById = (id: string) => {
  return callApi(USER_ENDPOINT.DELETE + id, "DELETE", null)
}