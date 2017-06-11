/**
 * API for CRUDding Crowdflower Configs
 * (Create/Read/Update/Delete)
 */

const app = require('../../app');
const cf_config = app.db.get('cf_config');


/**
 * GET-Method for retrieving all Configs
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getAllConfigs = async ctx => {
    try {
        ctx.body = await cf_config.find({});
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
module.exports.getConfig = async ctx => {
    try {
        ctx.body = await cf_config.findOne({"_id": ctx.params.id});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

/**
 * POST-Method for adding/creating Configs
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.addConfig = async ctx => {
    console.log(ctx.request.fields);
    console.log(cf_config);
    try {
        await cf_config.insert(ctx.request.fields);
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
module.exports.updateConfig = async ctx => {
    try {
        ctx.body = await cf_config.findOneAndUpdate({"_id": ctx.params.id}, {
            'key': ctx.request.fields.key,
            'name': ctx.request.fields.name,
            'updatedAt': new Date()
        });
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

/**
 * DELETE-Method for deleting specific config
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.deleteConfig = async ctx => {
    try {
        ctx.body = "Successfully deleted:\n"
            + JSON.stringify(await cf_config.findOneAndDelete({"_id": ctx.params.id}), null, 4);
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

