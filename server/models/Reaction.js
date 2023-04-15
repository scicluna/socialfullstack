const { Schema, Types } = require('mongoose')

const reactionSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        reactions: []
    },
);

reactionSchema.add({ reactions: [reactionSchema] })

module.exports = reactionSchema;