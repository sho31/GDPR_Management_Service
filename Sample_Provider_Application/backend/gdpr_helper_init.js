var personalData = require("./model/personalData.js");
var user = require("./model/user.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const gdpr_helper_init = () => {
    user.find({}, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            users.forEach(user => {
                console.log(user.username);
                fetch(process.env.GDPRMS_ADDRESS + '/dataSubject/create', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({data_subject_id_ref : user._id})
                }).then(async response => {
                    let DataSubjectRes = await response.json();
                    console.log(DataSubjectRes);
                    personalData.find({ user_id: user._id }, (err, personalDatas) => {
                        if (err) {
                            console.log(err);
                        } else {
                            personalDatas.forEach(personalData => {
                                fetch(process.env.GDPRMS_ADDRESS + '/data/create', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({data_ID_ref : personalData._id, attributeName : 'content', dataTypeID : 4, dataSubjectID : DataSubjectRes.data.dataSubjectID})
                                })                            });

                        }
                    });
                }).catch(err => {console.log(err);});
            });
        }
    })
}
module.exports = gdpr_helper_init;