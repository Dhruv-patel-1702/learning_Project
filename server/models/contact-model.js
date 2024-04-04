const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});
//  This creates our model from the above schema, giving us access to it's functions and properties.
const Contact = new model("Contact", contactSchema);
module.exports = Contact;
