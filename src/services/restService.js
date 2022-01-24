import axios from "axios";

const send= (options) => new Promise((resolve, reject) => {
    axios.request({
      method: options.method,
      url: options.url,
      // headers: {
      //   Authorization: token,
      // },
      data: options.data,
      params: options.params
    })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log("Error Send===>", error);
          reject(error);
        });
  });

export { send };
