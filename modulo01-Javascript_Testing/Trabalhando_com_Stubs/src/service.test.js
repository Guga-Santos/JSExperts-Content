const Service = require('./service');
const assert = require('assert');
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

//IFEE
;(async () => {
  {
    const service = new Service();
    const data = await service.makeRequest(BASE_URL_2)
    console.log(JSON.stringify(data));
  }
})();