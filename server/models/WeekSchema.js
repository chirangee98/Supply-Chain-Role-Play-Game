import mongoose, { Schema } from "mongoose";

const weekSchema = new Schema({
    game:{
        type: Schema.Types.ObjectId,
        ref: 'StartGame',
    },
    status:{
        type: Boolean,
        default: false,
    },
    gameDetails:{
        type: [Schema.Types.ObjectId],
        ref: 'GameDetails',
    }
},{
    timestamps: true
})

export const Week = mongoose.model('Week', weekSchema);