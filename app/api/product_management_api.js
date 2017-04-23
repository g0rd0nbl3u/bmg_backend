/**
 * API for CRUDding Products
 * (Create/Read/Update/Delete)
 */

const app           = require('../../app');
const product     = app.db.get('product');

/**
 * GET-Method for retrieving all Product-Objects in the DB
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getAllProducts = async ctx => {
    try {
        ctx.body = await product.find({});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

/**
 * GET-Method for retrieving all Product-Objects-IDs in the DB
 * These IDs should be sorted by time of creation; new to old
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getProductIds = async ctx => {
    try {
        ctx.body = await product.find({}, '_id', {sort: {'_id': -1}});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

module.exports.getSingleProduct = async ctx => {
    try {
        ctx.body = await product.findOne({'_id': ctx.params.id});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

module.exports.deleteProduct = async ctx => {
    try {
        ctx.body = "Successfully deleted:\n"
            + JSON.stringify(await product.findOneAndDelete({"_id": ctx.params.id}), null, 4);
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

