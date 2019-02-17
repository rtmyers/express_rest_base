'use strict';

let Products = require('./products.json').list;

const find = () => Products;

const findById = (id) => Products.find(product => product.id == id);

const update = (update, id) => Products.map(
      (product, index) => (product.id == id) ? { product, ...update } : product
);

const removeById = (id) => Products = Products.filter(product => product.id != id);

module.exports = {
    find,
    update,
    removeById
};
