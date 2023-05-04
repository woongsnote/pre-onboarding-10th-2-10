import axios from 'axios';

class Cache {
  #dataMap = {};

  get(key) {
    return this.#dataMap[key];
  }

  set(key, data) {
    this.#dataMap[key] = data;
  }
}

class ApiClient {
  #options = {};
  #cache;

  constructor(options) {
    this.#options.HOST = options.HOST.replace(/(.*)(\/$)/, '$1');
    this.#cache = new Cache();
  }

  async #request(method, path, data) {
    let url = `${this.#options.HOST}/${path}`;

    const config = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    config.data = JSON.stringify(data);

    try {
      const response = await axios.request(config);
      return response;
    } catch (e) {
      if (e.response) throw e.response;
      throw e;
    }
  }

  async #get(path, cacheOptions) {
    const cachedData = this.#cache.get(cacheOptions.key);
    if (cachedData) {
      return cachedData.data;
    } else {
      const data = await this.#request('GET', path);
      this.#cache.set(cacheOptions.key, data);
      return data;
    }
  }

  async getKeyword(keyword) {
    return await this.#get(`?name=${keyword}`, {
      key: ['GET_KEYWORD', keyword],
    });
  }
}

export const apiClient = new ApiClient({
  HOST: '/api/v1/search-conditions/',
});
