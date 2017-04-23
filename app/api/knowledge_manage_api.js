/**
 * API for CRUDding Knowledge
 * (Create/Read/Update/Delete)
 */

const app           = require('../../app');
const knowledge     = app.db.get('knowledge');

/**
 * GET-Method for retrieving all Knowledge-Objects in the DB
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getAllKnowledge = async ctx => {
    try {
        ctx.body = await knowledge.find({});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

/**
 * GET-Method for retrieving all Knowledge-Objects-IDs in the DB
 * These IDs should be sorted by time of creation; new to old
 * @param ctx
 * @returns {Promise.<void>}
 */
module.exports.getKnowledgeIds = async ctx => {
    try {
        ctx.body = await knowledge.find({}, '_id', {sort: {'_id': -1}});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

module.exports.getSingleKnowledge = async ctx => {
    try {
        ctx.body = await knowledge.findOne({'_id': ctx.params.id});
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

module.exports.deleteKnowledge = async ctx => {
    try {
        ctx.body = "Successfully deleted:\n"
            + JSON.stringify(await knowledge.findOneAndDelete({"_id": ctx.params.id}), null, 4);
        ctx.status = 200;
    }
    catch (err) {
        ctx.throw(404, err)
    }
};

