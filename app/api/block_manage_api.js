/**
 * API for CRUDding Blocks
 * (Create/Read/Update/Delete)
 */

const app = require('../../app');
const block = app.db.get('block');


/**
 * GET-Method for retrieving all blocks
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getAllBlocks = async ctx => {
    try {
        ctx.body = await block.find({});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};


/**
 * GET-Method for retrieving a certain block via id
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getBlock = async ctx => {
    try {
        ctx.body = await block.findOne({"_id": ctx.params.id});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

/**
 * POST-Method for adding/creating blocks
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.addBlock = async ctx => {
    try {
        await block.insert(ctx.request.fields);
        ctx.body = ctx.request.fields;

        ctx.status = 201;
    }
    catch (err) {
        ctx.throw(422, err)
    }
};


/**
 * PUT-Method for updating a certain block via id
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.updateBlock = async ctx => {
    try {
        ctx.body = await block.findOneAndUpdate({"_id": ctx.params.id}, {
            'content': ctx.request.fields.content,
            'group': ctx.request.fields.group,
            'category': ctx.request.fields.category,
            'updatedAt': new Date(),
            'knowledgeId': ctx.request.fields.knowledgeId
        });
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

/**
 * GET-Method getting all Blocks for specified Knowledge
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getBlocksForKnowledge = async ctx => {
    try {
        ctx.body = await block.find({"knowledgeId": ctx.params.id});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

/**
 * DELETE-Method for retrieving a certain block via id
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.deleteBlock = async ctx => {
    try {
        ctx.body = "Successfully deleted:\n"
            + JSON.stringify(await block.findOneAndDelete({"_id": ctx.params.id}), null, 4);
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

