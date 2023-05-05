import axios from 'axios';
// TODO: extract to a separate file
class Cache {
  #dataMap = {};
  #expireTimeInSec;

  constructor(expireTimeInSec) {
    this.#expireTimeInSec = expireTimeInSec || 0;
  }

  get(key) {
    return this.#dataMap[key];
  }

  set(key, data, expireTimeInSec) {
    const cacheData = new Data(data, expireTimeInSec || this.#expireTimeInSec);
    this.#dataMap[key] = cacheData;
  }
}

class Data {
  #data;
  #expireTimeInSec;
  #createdAt;

  constructor(data, expireTimeInSec) {
    this.#data = data;
    this.#expireTimeInSec = expireTimeInSec;
    this.#createdAt = new Date();
  }

  get data() {
    return this.#data;
  }

  get isExpired() {
    const now = new Date();
    const differenceSec = (now.getTime() - this.#createdAt.getTime()) / 1000;
    return differenceSec >= this.#expireTimeInSec;
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
      console.info('calling api');
      const response = await axios.request(config);
      return response;
    } catch (e) {
      if (e.response) throw e.response;
      throw e;
    }
  }

  async #get(path, cacheOptions) {
    const cachedData = this.#cache.get(cacheOptions.key);

    if (cachedData && !cachedData.isExpired) {
      return cachedData.data;
    } else {
      const data = await this.#request('GET', path);
      this.#cache.set(cacheOptions.key, data, cacheOptions.expireTimeInSec);
      return data;
    }
  }

  async getKeyword(keyword) {
    return await this.#get(`?name=${keyword}`, {
      key: ['GET_KEYWORD', keyword],
      expireTimeInSec: 5,
    });
  }
}

export const apiClient = new ApiClient({
  HOST: '/api/v1/search-conditions/',
});
