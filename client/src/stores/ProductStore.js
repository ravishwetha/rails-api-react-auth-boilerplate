import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import BaseStore from './BaseStore';

const CHANGE_EVENT = 'change';

var CachedProducts = {};

class ProductStoreClass extends EventEmitter {
  getProducts(opts = {}) {
    return new Promise(function(fulfill, reject) {
      if (Object.keys(CachedProducts).length === 0 && CachedProducts.constructor === Object) {
        return BaseStore.fetch('api/products', opts)
          .then(products => {
            CachedProducts['products'] = products.reduce(
              (map, obj) => {
                  map[obj.id] = obj
                  return map
                }, {}
              )
            fulfill(CachedProducts['products'])
          }
        )
      } else {
        fulfill(CachedProducts['products'])
      }
    }.bind(this))
  }

  getProduct(id) {

    return new Promise(function(fulfill, reject) {
      if (CachedProducts['products'] && CachedProducts['products'][id]) {
        fulfill(
          {
            product: CachedProducts['products'][id]
          }
        )
      } else {
        BaseStore.fetch(`api/products/${id}`)
          .then((xhr) => {
            if (xhr.status && xhr.status != 200) {
              reject(xhr)
            } else {
              fulfill(
                {
                  product: xhr
                }
              )
              CachedProducts['products'][id]['content'] = xhr
            }
          }
        )
      }
    }.bind(this))
  }

  cachedProducts() {
    return CachedProducts['products'];
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

const ProductStore = new ProductStoreClass();

export default ProductStore;
