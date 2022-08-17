import axios from 'axios';
export default class StrapiClient {
  constructor() {}

  async fetchData(path) {
    const requestUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${path}`;
    const response = await axios.get(requestUrl, {
      headers: {
        authorization: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      },
    });
    const data = await response.data;
    return data;
  }
}
