import {callApi} from "../callApi";
import {ANALYTICS_ENDPOINT} from "../../services/app/endpoint.constant";

export const getListDataAnalyticsByMetric = () => {
  return callApi(ANALYTICS_ENDPOINT.GET_LIST_OF_METRICS_DATA, "GET", null)
}