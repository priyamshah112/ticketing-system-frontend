import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";

function dateHandler(data) {
    let d = new Date(data);
    let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    let month = d.getMonth() + 1 < 10 ? ("0" + (parseInt(d.getMonth()) + 1)) : (d.getMonth() + 1);
    let year = d.getFullYear();
    let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    let minutes = d.getMinutes();
    return date + "/" + month + "/" + year + " " + hour + ":" + minutes;
}

function dateFormatHandler(data) {
    let d = new Date(data);
    let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    let month = d.getMonth() + 1 < 10 ? ("0" + (parseInt(d.getMonth()) + 1)) : (d.getMonth() + 1);
    let year = d.getFullYear();
    let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    let minutes = d.getMinutes();
    return month + "/" + date + "/" + year;
}

function dateFormatYYMMDD(data) {
    let d = new Date(data);
    let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    let month = d.getMonth() + 1 < 10 ? ("0" + (parseInt(d.getMonth()) + 1)) : (d.getMonth() + 1);
    let year = d.getFullYear();
    return year + "-" + month + "-" + date;
}

function capitalize(str) {
    Object.defineProperty(String.prototype, str, {
        value: function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        enumerable: false
    });
}

const unassignInventory = async (inv, type) => {
    const payload = {
        id: inv.id,
        type
    }
    let res = await getResponse(apipaths.unAssignInventory, payload);
    return res;
}

const assignInventoryToUser = (formdata) => {
    return getResponse(apipaths.assignInvToUser, formdata)

}
export { dateHandler, capitalize, assignInventoryToUser, dateFormatHandler, dateFormatYYMMDD, unassignInventory };