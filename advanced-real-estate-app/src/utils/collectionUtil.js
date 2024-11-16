import handleAPI from "../apis/handlAPI";
import {message} from "antd";

export const collectionUtil = {

    handleCollectionId: function (id, set) {
        set(id);
    },
    handleCollectionItem: function (url, set, auth) {
        handleAPI(url, {}, "GET", auth?.token)
        .then(res => {
            set(res?.data);
        })
        .catch(error=> {
            message.error("Error: ", error);
            console.log("Error: ", error);
        });
    },
}