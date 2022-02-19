import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import { dateFormatHandler } from "./commonAction";

const inventoryListAction = (type) => async (dispatch) => {
  let id;
  let res;
  if (type === "software")
    res = await getResponse(apipaths.softwareInventoryList);
  else res = await getResponse(apipaths.hardwareInventoryList);

  const { data, status } = res;
  if (status === 200) {
    data.data.inventory.map((data) => {
      data.assigned_on =
        data.assigned_on &&
        dateFormatHandler(new Date(data.assigned_on).getTime());
    });
    let payload = {
      inventory: data.data.inventory,
      inventoryType: type,
      ...data.data,
    };

    payload[
      type === "software" ? "softwareSampleImport" : "hardwareSampleImport"
    ] = data.data.sampleImport;
    dispatch({
      type: "ADD_INVENTORY_ACTION",
      payload,
    });
  }
};

export { inventoryListAction };
