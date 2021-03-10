import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert';
import Popup from './Popup';

class Clients extends Component {

  constructor(props) {
    super(props);
    this.keys = 1;
    this.id_cin = "";
    this.cin = "";
    this.id_email = "";
    this.email = "";
    this.id_name = "";
    this.name = "";
    this.id_phone = "";
    this.phone = "";
    this.state = {
      Clientsdt: []
    }
  }

  resetData() {
    axios.get("http://localhost:5001/readData").then((res) => {
      this.setState({ Clientsdt: res.data });
    });
  }

  deleted(id) {
    swal({
      title: "Confirme plz",
      text: "Delete Client ?",
      buttons: true
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.post("http://localhost:5001/delClient", { "cin": id }).then(() => {
            axios.get("http://localhost:5001/readData").then((res) => {
              this.setState({ Clientsdt: res.data });
            });
            swal("Succes!", "Deleted", "success", { timer: 1500, buttons: false });
          });
        }
      });
    return;
  }

  updated(cin, name, email, phone, Pinscrit, Prole) {
    if (this.id_cin === "" || this.id_cin !== cin)
      this.id_cin = cin;
    if (this.name === "" || this.id_name !== cin)
      this.name = name;
    if (this.email === "" || this.id_email !== cin)
      this.email = email;
    if (this.phone === "" || this.id_phone !== cin)
      this.phone = phone;
    swal({
      title: "Confirm Pls",
      text: "Update Client Data ?",
      buttons: true
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.post("http://localhost:5001/update", { "cin": cin, "name": this.name, "email": this.email, "phone": this.phone }).then(() => {
            axios.get("http://localhost:5001/readData").then((res) => {
              this.setState({ Clientsdt: res.data });
            });
            swal("Succes!", "Updated", "success", { timer: 1500, buttons: false });
          });
        }
      });
  }

  componentDidMount() {
    axios.get("http://localhost:5001/readData").then((res) => {
      this.setState({ Clientsdt: res.data });
    })
  }

  update_input_name(id, e) {
    this.name = e.target.value;
    this.id_name = id;
  }

  update_input_email(id, e) {
    this.email = e.target.value;
    this.id_email = id;
  }

  update_input_phone(id, e) {
    this.phone = e.target.value;
    this.id_phone = id;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <br />
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Clients
                            </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col" >CIN</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody key={this.keys++}>
                    {this.state.Clientsdt.map(client =>
                      <tr key={this.keys++}>
                        <th>{client.cin}</th>
                        <th><Input type="text" name="nom" placeholder={client.name} onChange={this.update_input_name.bind(this, client.cin)} key={this.keys++} /></th>
                        <th><Input type="text" name="email" placeholder={client.email} onChange={this.update_input_email.bind(this, client.cin)} key={this.keys++} /></th>
                        <th><Input type="number" name="tel" placeholder={client.phone} onChange={this.update_input_phone.bind(this, client.cin)} key={this.keys++} /></th>
                        <td key={this.keys++}>
                          <Button key={this.keys++} size="sm" color="btn-color" onClick={this.resetData.bind(this)}>Reset</Button><span>   </span>
                          <Button key={this.keys++} size="sm" color="success" onClick={this.updated.bind(this, client.cin, client.name, client.email, client.phone)}>Update</Button><span>   </span>
                          <Button size="sm" color="danger" onClick={this.deleted.bind(this, client.cin)}>Delete</Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Popup key={this.keys++} />
        <center>
          <span>refresh after you add a client :)</span>
          <br/>
          <Button key={this.keys++} size="lg" color="btn-color" className="btn-pill" aria-pressed="true" style={{ maxWidth: "100%", width: "200px" }}onClick={this.resetData.bind(this)}>Refresh</Button><span>   </span>
        </center>
      </div>
    )
  }
}

export default Clients;
