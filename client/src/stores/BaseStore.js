import UserStore from '../stores/UserStore';

var prepareFetchOptions = function(opts) {

  let AuthHeaders = {
    'Content-Type': 'application/json',
    'Authorization': '36dc1091afd7d2f09d041c90f6c4e885',
    'AuthenticationToken': localStorage['authentication-token']
  }

  opts['body'] = JSON.stringify(opts['body'])

  if (!opts['headers'])
    opts['headers'] = new Headers(AuthHeaders)

  if (!opts['method'])
    opts['method'] = 'GET'

  return opts
}

class BaseStore {

  constructor() {
    this.fetch.bind(this)
  }

  fetch (endpoint, opts = {}) {
    return new Promise((resolve, reject) => {

      opts = prepareFetchOptions(opts)

      window.fetch(endpoint, opts)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    })
  }

}

export default new BaseStore();
