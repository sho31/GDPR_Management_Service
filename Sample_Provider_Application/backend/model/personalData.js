var mongoose = require('mongoose');
var Schema = mongoose.Schema;

personalDataSchema = new Schema( {
	name: String,
	desc: String,
	content : String,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
personalData = mongoose.model('personalData', personalDataSchema);

module.exports = personalData;