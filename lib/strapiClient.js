import axios from 'axios';
export default class StrapiClient {
  constructor() {}

  async fetchData(path) {
    const requestUrl = `http://localhost:1337/api/${path}`;
    const response = await axios.get(requestUrl, {
      headers: {
        authorization: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      },
    });
    const data = await response.data;
    return data;
  }
}
