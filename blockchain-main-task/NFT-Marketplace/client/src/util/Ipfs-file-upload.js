//require('dotenv').config();

const axios = require('axios');
const FormData = require('form-data');

// const IPFS_GATEWAY_URL = "http://ipfs.localhost:8080/ipfs/";
// const SERVER_BASE_URL = "http://localhost:3001/";
const IPFS_GATEWAY_URL = "http://13.235.115.191/ipfs/";
const SERVER_BASE_URL = "http://13.235.115.191:3001/"

// This funcction uploads JSON to IPFS.
export const uploadJSONToIPFS = async(JSONBody) => {
    const url = SERVER_BASE_URL + "uploadJsonToIpfs";
    //making axios POST request to our server ⬇️
    return axios 
        .post(url, JSONBody, {
        })
        .then(function (response) {
            console.log("Response metadata::::::::::::::::: " , response);
           return {
               success: true,
               pinataURL: IPFS_GATEWAY_URL + response.data[0].hash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

// This function upload file to IPFS.
export const uploadFileToIPFS = async(file) => {
    const url = SERVER_BASE_URL + "uploadFileToIpfs";
    
    let data = new FormData();
    data.append('file', file);

    //making axios POST request to Server⬇️
    return axios({
        method: "post",
        url: url,
        data: data,
        headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}` },
      }).then(function (response) {
                console.log("image uploaded", response.data[0].hash)
                return {
                   success: true,
                   pinataURL: IPFS_GATEWAY_URL + response.data[0].hash
               };
            })
            .catch(function (error) {
                console.log(error)
                return {
                    success: false,
                    message: error.message
                }
            })
};