import * as RestService from './restService';
import Constants from "../util/Constants";

const server = "http://localhost:3000/";
const url = "devices";
const {PUT, DELETE} = Constants;

const buildOptions = (method, data) => {
    return {
        url: method===DELETE || method===PUT?`${server}${url}/${data.id}`:`${server}${url}`,
        method,
        data,
    }
};

const execute =({data, method})=> new Promise((resolve, reject) => {
    RestService.send(buildOptions(method, data))
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
});

export {execute};
