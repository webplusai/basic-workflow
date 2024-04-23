const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const globalSchemaProps = require("./globalSchemaProps");

const ParamSchema = new mongoose.Schema({
  key: String,
  value: String
});

const schema = new mongoose.Schema({
  ...globalSchemaProps,
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  trigger: {
    eventType: {
      type: String,
      enum: ["INCOMING_API_CALL"]
    },
    triggerSlug: String,
    webhookURL: String
  },
  actions: [
    {
      type: {
        type: String,
        enum: ["EXTERNAL_GET_API_CALL"]
      },
      url: String,
      params: [ParamSchema]
    }
  ]
})
schema.plugin(mongoosePaginate);

// Clear all mongoose models
Object.keys(mongoose.connection.models).forEach(modelName => {
  delete mongoose.connection.models[modelName];
});

module.exports = mongoose.model('Workflows', schema);
