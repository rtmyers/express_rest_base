'use strict';
const express = require('express');
const app = express();
const ProductsRouter = express.Router();
const Products = require('./products');

ProductsRouter.route('/').get(function (req, res, next) {
    try {
        return res.json(Products.find());
    } catch(err) {
        next(err);
    }
});

ProductsRouter.route('/update/:id').post(function (req, res, next) {
    try {
        return res.json(Products.update(req.body, req.params.id));
    } catch(err) {
        next(err);
    }
});

ProductsRouter.route('/delete/:id').get(function (req, res, next) {
    try {
        return res.json(Products.removeById(req.params.id));
    } catch(err) {
        next(err);
    }
});

module.exports = ProductsRouter;
