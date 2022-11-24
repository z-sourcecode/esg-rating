import $ from "jquery";

class ApiHandler {
  _api_ep;
  _headers = []; // use to save the headers for the request - pass the user_auth teder token - there
  _resources = []; // the resources of the RESTFUL API - /artist /login /....

  constructor(api_ep, resources) {
    this._api_ep = api_ep;
    this._resources = resources;

    // console.log("Init API Handler")
    // console.log(api_ep)
  }

  setDefaultHeaders = () => {
    this.setHeaders([
      {
        key: "Accept",
        value: "application/json",
      },
      {
        key: "Content-Type",
        value: "application/json",
      },
    ]);
  };

  getResourceUrl = (resource_name) => {
    return (this._api_ep + "/" + resource_name);
  };

  setHeaders = (headers) => {
    for (const i in headers) {
      this._headers.push([headers[i].key, headers[i].value]);
    }
  };

  toUrlParams = (url_params) => {
    var result = "";
    url_params.forEach((param) => {
      result += param.key + "=" + param.value + "&";
    });
    return result.substring(0, result.length - 1);
  };

  get_resource = (resource_name, api_method, body_params, url_params, resource_params="") => {
    // console.log("Inside get_resource");
    var url = this.getResourceUrl(resource_name);

    if (!url_params===null) {
      url = url + "?" + this.toUrlParams(url_params);
    }

    if (resource_params.length>0)
    {
      url = url + "/" + resource_params
    }
    // console.log(url);
    try {
      return new Promise((resolve, reject) => {
        // console.log("Inside get_resource tryyy");
        console.log(url);
        // console.log(body_params);
       
        $.ajax({
          url: url,
          headers: this._headers,
          type: api_method, // can be GET/POST/PUT/etc..
          data: JSON.stringify(body_params),
          beforeSend: function(){
            document.getElementById('spinner').style.display = 'inline-block';
            document.getElementById('root').classList.add('overlay');
          },
          success: function (result) {
            console.log("ajax call success")
            console.log("api ---- result", result)
            // console.log("enable this only on your local please!")
            resolve(result);
          },
          error: function (xhr, status, error) {
            console.log("ajax call error");

            console.log(error);
            reject(error);
          },
          complete: function(){
             document.getElementById('spinner').style.display = 'none'; 
             document.getElementById('root').classList.remove('overlay');
          }
        });
      });
    } catch (e) {
      //   console.log("Inside get_resource catch");

      //   console.log(e);
      throw new Error("Error making API Request " + e);
    }
  };
}

export default ApiHandler;
