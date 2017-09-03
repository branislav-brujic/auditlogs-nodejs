import * as mongoose from 'mongoose'

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let AuditlogsSchema = new Schema({
    id: ObjectId,
    service: {type: String, index:true, default: 'website'},
    model: {type: String},
    object: {type: String},
    object_pk: {type: Number, min: 1},
});


let AuditlogsModel = mongoose.model('AuditlogsModle', AuditlogsSchema);

export
{
    AuditlogsModel
}