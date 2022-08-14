import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      user_id: '',
      openPersonalDataModal: false,
      openPersonalDataEditModal: false,
      id: '',
      name: '',
      desc: '',
      content: '',
      discount: '',
      file: '',
      fileName: '',
      page: 1,
      search: '',
      personalDatas: [],
      pages: 0,
      loading: false,
      apiKey : ''
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token, user_id : user_id }, () => {
        this.getPersonalData();
        this.getGDPRMS_API_Key();
      });
    }
  }
''
  getPersonalData = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`http://localhost:2000/get-personalData${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, personalDatas: res.data.personalDatas, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, personalDatas: [], pages: 0 },()=>{});
    });
  }

  deletePersonalData = (id) => {
    axios.post('http://localhost:2000/delete-personalData', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getPersonalData();
    });
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getPersonalData();
      });
    }
  };
  getGDPRMS_API_Key = () => {
    axios.get(`http://localhost:2000/get-apiKey`, {
      headers: {
        'token': this.state.token
      }
    }).then(async (response) => {
      this.setState({apiKey: response.data.apiKey});
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }
  openGDPRPage = () => {
    console.log(this.state)
    fetch( process.env.REACT_APP_GDPRMS_API_ADDRESS+ '/dataSubject/getByIdRef/' + this.state.user_id, {
      method: 'GET',
      headers: {'api-key': this.state.apiKey},
    }).then(async (response) => {
      const res = await response.json()
      console.log(res.data)
      window.open(process.env.REACT_APP_GDPRMS_CLIENT_ADDRESS+'/user/' + res.data.dataSubjectID);
    }).catch((err) => {
        console.log(err);
    });
  }
  addPersonalData = () => {
    const file = new FormData();
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('content', this.state.content);

    axios.post('http://localhost:2000/add-personalData', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handlePersonalDataClose();
      this.setState({ name: '', desc: '', discount: '', price: '', file: null, page: 1 }, () => {
        this.getPersonalData();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handlePersonalDataClose();
    });

  }

  updatePersonalData = () => {
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('content', this.state.content);

    axios.post('http://localhost:2000/update-personalData', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handlePersonalDataEditClose();
      this.setState({ name: '', desc: '', content: '', }, () => {
        this.getPersonalData();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handlePersonalDataEditClose();
    });

  }

  handlePersonalDataOpen = () => {
    this.setState({
      openPersonalDataModal: true,
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      fileName: ''
    });
  };

  handlePersonalDataClose = () => {
    this.setState({ openPersonalDataModal: false });
  };

  handlePersonalDataEditOpen = (data) => {
    this.setState({
      openPersonalDataEditModal: true,
      id: data._id,
      name: data.name,
      desc: data.desc,
      price: data.price,
      discount: data.discount,
      fileName: data.image
    });
  };

  handlePersonalDataEditClose = () => {
    this.setState({ openPersonalDataEditModal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Dashboard</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handlePersonalDataOpen}
          >
            Add PersonalData
          </Button>
          <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              onClick={this.openGDPRPage}
          >
            Manage GDPR rights
          </Button>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit PersonalData */}
        <Dialog
          open={this.state.openPersonalDataEditModal}
          onClose={this.handlePersonalDataClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit PersonalData</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="PersonalData Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Description"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Price"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={this.state.discount}
              onChange={this.onChange}
              placeholder="Discount"
              required
            /><br /><br />
            <Button
              variant="contained"
              component="label"
            > Upload
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handlePersonalDataEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.desc == '' || this.state.discount == '' || this.state.price == ''}
              onClick={(e) => this.updatePersonalData()} color="primary" autoFocus>
              Edit PersonalData
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add PersonalData */}
        <Dialog
          open={this.state.openPersonalDataModal}
          onClose={this.handlePersonalDataClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add PersonalData</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="PersonalData Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Description"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              placeholder="Content"
              required
            /><br /><br />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handlePersonalDataClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.desc == '' || this.state.content == ''}
              onClick={(e) => this.addPersonalData()} color="primary" autoFocus>
              Add PersonalData
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <TextField
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by personalData name"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Content</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.personalDatas.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.desc}</TableCell>
                  <TableCell align="center">{row.content}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        </TableContainer>

      </div>
    );
  }
}