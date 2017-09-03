"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var Auditlogs = new Schema({
    id: ObjectId,
    service: { type: String, default: 'hahaha' },
    model: { type: Number, min: 18, index: true },
    object: { type: String, match: /[a-z]/ },
    object_pk: { type: Date, default: Date.now },
});
