var express = require("express");
var app = express();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var multer = require('multer'),
  bodyParser = require('body-parser'),
  path = require('path');
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:T7E2ys45X6JZZIDM@cluster0.apbdg.mongodb.net/personalDataDB?retryWrites=true&w=majority\n");
var fs = require('fs');
var personalData = require("./model/personalData.js");
var user = require("./model/user.js");
var gdpr_helper_init = require("./gdpr_helper_init.js");
//gdpr_helper_init(); //Execute only once
var dir = './uploads';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()
var upload = multer({
  storage: multer.diskStorage({

    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, './uploads');
    },
    filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(/*res.end('Only images are allowed')*/ null, false)
    }
    callback(null, true)
  }
});
app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));
app.get("/getContent", (req, res) => {
  try{
    if (req.query.dataType === "personalData") {
      console.log(req.query)
      personalData.findById(req.query.id, (err, data) => {
        console.log(data)

        if (err) {
          res.status(400).json({
            status: false,
            errorMessage: err,
          });
        } else if (data !== null) {
          res.json({
            status: true,
            data: data[req.query.attributeName],
          });
        }else {
            res.status(400).json({
                status: false,
                errorMessage: "No data found",
            });
        }
      });
    }else{
      console.log("dataType not found");
      res.status(400).json({
        status: false,
        errorMessage: 'provide dataType',
      });
    }
  }catch (e) {
    console.log(e);
    res.json(e)
  }

  //Repeat for all tables
});
app.get("/processAnswers", (req, res) => {
  console.log("Processing answers");
  try {
    let myHeaders = new Headers();
    console.log(process.env.GDPRMS_API_KEY)
    myHeaders.append("api-key", process.env.GDPRMS_API_KEY);
    let myInit = { method: 'GET',
      headers: myHeaders,
    };
    fetch('http://localhost:3000/dataRequestAnswer/getAllUnprocessedDataRequestAnswers', {
      method: 'GET',
      headers: myHeaders,
    }).then(async response => {
      res = await response.json();
      res.data.forEach(answer => {
        console.log(answer)
        if(Boolean(answer.acceptedRequest)){
          const reqType = answer.gdpr_datarequest.dataReqType;
          let myHeadersPUT = myHeaders
          myHeadersPUT.append("Content-Type", "application/json");
          myHeadersPUT.append("api-key", process.env.GDPRMS_API_KEY);
          let myInitPUT = { method: 'PUT',
            headers: myHeadersPUT,
          };
          switch (reqType) {
            case 'RECTIFICATION':
              personalData.findOne({ _id: answer.gdpr_datarequest.gdpr_data.data_ID_ref }, (err, personalData) => {
                if (err) {
                  console.log(err);
                } else if (personalData !== null) {
                  personalData[answer.gdpr_datarequest.gdpr_data.attributeName] = answer.gdpr_datarequest.newValue;
                  personalData.save();
                  //Notify GDPR Helper that the answer has been processed
                  fetch('http://localhost:3000/dataRequestAnswer/process/' + answer.dataRequestAnswerId, myInitPUT)
                }
              });
              break;
            case 'DELETION':
              let myHeaders = new Headers();
              console.log(process.env.GDPRMS_API_KEY)
              myHeaders.append("api-key", process.env.GDPRMS_API_KEY);
              let myInit = { method: 'GET',
                headers: myHeaders,
              };
              personalData.deleteOne({ _id: answer.gdpr_datarequest.gdpr_data.data_ID_ref }, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('deleted');
                  //Notify GDPR Helper that the answer has been processed
                  fetch('http://localhost:3000/dataRequestAnswer/process/' + answer.dataRequestAnswerId, myInitPUT)
                }
              });
          }
        }


      });
    });
  }catch (e) {
    console.log("error processing answers",e );
  }

  res.status(200).json({
    status: true,
    title: 'processed answers'
  });
});
app.use("/", (req, res, next) => {
  console.log(req.method, req.url);
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          req.user = decoded;
          next();
          /*return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });*/
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
});
//Route to get the data subject api key from the frontend in a way that only logged in user can access it
app.get("/get-apiKey", (req, res) => {
  try {
    let myHeaders = new Headers();
    console.log(process.env.GDPRMS_API_KEY)
    myHeaders.append("api-key", process.env.GDPRMS_API_KEY);
    let myInit = { method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.GDPRMS_API_ADDRESS +'/dataSubject/getByIdRef/' + req.user.id, {
      method: 'GET',
      headers: myHeaders,
    }).then(async response => {
      res = await response.json();
      const userApiKey = await
          res.status(200).json({
            status: true,
            apiKey: res.data.apiKey
          });
    }).catch(err => {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    })

  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});
/* login api */
app.post("/login", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {

          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {

            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }

        } else {
          res.status(400).json({
            errorMessage: 'Username or password is incorrect!',
            status: false
          });
        }
      })
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});

/* register api */
app.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {

      user.find({ username: req.body.username }, (err, data) => {

        if (data.length == 0) {

          let User = new user({
            username: req.body.username,
            password: req.body.password
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false
              });
            } else {

              fetch('http://localhost:3000/dataSubject/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data_subject_id_ref : data._id})
              }).catch(err => {console.log(err);})
              res.status(200).json({
                status: true,
                title: 'Registered Successfully.'
              });
            }
          });

        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false
          });
        }

      });

    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.json({
        message: 'Login Successfully.',
        token: token,
        status: true,
        user_id : data._id
      });
    }
  });
}

/* Api to add PersonalData */
app.post("/add-personalData", upload.any(), (req, res) => {
  try {
    if (req.files && req.body && req.body.name && req.body.desc && req.body.content) {

      let new_personalData = new personalData();
      new_personalData.name = req.body.name;
      new_personalData.desc = req.body.desc;
      new_personalData.content = req.body.content;
      new_personalData.user_id = req.user.id;
      new_personalData.save((err, data) => {
        if (err) {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        } else {
          fetch('http://localhost:3000/dataSubject/getByIdRef/' + req.user.id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            }).then(async (response) => {
            res = await response.json()
            console.log(res.data);
            fetch('http://localhost:3000/data/create', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                data_ID_ref: data._id,
                attributeName: 'content',
                dataTypeID: 4,
                dataSubjectID: res.data.dataSubjectID
              })
            }).then((response) => {
            })
          })

          res.status(200).json({
            status: true,
            title: 'PersonalData Added successfully.'
          });
        }
      });

    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
    console.log(e)
  }
});

/* Api to update PersonalData */
app.post("/update-personalData", upload.any(), (req, res) => {
  try {
    if (req.files && req.body && req.body.name && req.body.desc && req.body.price &&
      req.body.id && req.body.discount) {

      personalData.findById(req.body.id, (err, new_personalData) => {

        // if file already exist than remove it
        if (req.files && req.files[0] && req.files[0].filename && new_personalData.image) {
          var path = `./uploads/${new_personalData.image}`;
          fs.unlinkSync(path);
        }

        if (req.files && req.files[0] && req.files[0].filename) {
          new_personalData.image = req.files[0].filename;
        }
        if (req.body.name) {
          new_personalData.name = req.body.name;
        }
        if (req.body.desc) {
          new_personalData.desc = req.body.desc;
        }
        if (req.body.price) {
          new_personalData.price = req.body.price;
        }
        if (req.body.discount) {
          new_personalData.discount = req.body.discount;
        }

        new_personalData.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false
            });
          } else {
            res.status(200).json({
              status: true,
              title: 'PersonalData updated.'
            });
          }
        });

      });

    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

/* Api to delete PersonalData */
app.post("/delete-personalData", (req, res) => {
  try {
    if (req.body && req.body.id) {
      personalData.findByIdAndUpdate(req.body.id, { is_delete: true }, { new: true }, (err, data) => {
        if (data.is_delete) {
          res.status(200).json({
            status: true,
            title: 'PersonalData deleted.'
          });
        } else {
          res.status(400).json({
            errorMessage: err,
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

/*Api to get and search personalData with pagination and search by name*/
app.get("/get-personalData", (req, res) => {
  try {
    var query = {};
    query["$and"] = [];
    query["$and"].push({
      user_id: req.user.id
    });
    if (req.query && req.query.search) {
      query["$and"].push({
        name: { $regex: req.query.search }
      });
    }
    var perPage = 5;
    var page = req.query.page || 1;
    personalData.find(query, {name: 1, id: 1, desc: 1, content : 1})
      .skip((perPage * page) - perPage).limit(perPage)
      .then((data) => {
        personalData.find(query).count()
          .then((count) => {

            if (data && data.length > 0) {
              res.status(200).json({
                status: true,
                title: 'PersonalData retrived.',
                personalDatas: data,
                current_page: page,
                total: count,
                pages: Math.ceil(count / perPage),
              });
            } else {
              res.status(400).json({
                errorMessage: 'There is no personalData!',
                status: false
              });
            }

          });

      }).catch(err => {
        res.status(400).json({
          errorMessage: err.message || err,
          status: false
        });
      });
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }

});


app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
