import React, { Component } from "react";
import Warper from "../Warper";
import Popup from "reactjs-popup";
import { Button, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import swal from 'sweetalert';
import axios from 'axios';

const contentStyle = {
  maxWidth: "600px",
  width: "100%",
  maxHeight: "630px",
  height: "100%"
};


class CustomModal extends Component {

  constructor() {
    super()
    this.name = "";
    this.CIN = "";
    this.phone = "";
    this.email = "";
    this.keys = 1;
  }

  state = {
    isOpen: false
  }


  profileClickSwal() {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.name !== "" && this.CIN !== "" && this.phone !== "" && this.email !== "" && re.test(this.email) && this.CIN.length === 8 && this.phone.length === 8) {
      swal({
        title: "Confirme pls",
        text: "add this Clients ?",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("http://127.1.1.1:5001/add", { "cin": this.CIN, "name": this.name, "email": this.email, "phone": this.phone });
          swal("Succee!", "added succesfully", "success", { timer: 1500, buttons: false });
          //swal("ERREUR", "already existe", "error", { dangerMode: true });
          document.getElementById("page").reset();
          this.name = "";
          this.CIN = "";
          this.phone = "";
          this.email = "";
        }
      });
    } else if (this.name === "" || this.CIN === "" || this.phone === "" || this.email === "") {
      swal("ERREUR", "all fields are required!", "error", { dangerMode: true });
    } else if (this.CIN.length !== 8) {
      swal("ERREUR", "CIN required of lenght 8 digits !", "error", { dangerMode: true });
    } else if (re.test(this.email) === false) {
      swal("ERREUR", "Email invalide (exemple: aa@gmail.com)!", "error", { dangerMode: true });
    } else {
      swal("ERREUR", "CIN required of lenght 8 digits!", "error", { dangerMode: true });
    }
  }


  onDismiss() {
    this.setState({ visible: false });
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
    this.name = "";
    this.CIN = "";
    this.phone = "";
    this.email = "";
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  update_input_n(e) {
    this.name = e.target.value
  }

  update_input_c(e) {
    this.CIN = e.target.value
  }

  update_input_e(e) {
    this.email = e.target.value;
  }

  update_input_tel(e) {
    this.phone = e.target.value;
  }


  render() {
    return (
      <Popup
        trigger={
          <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" key={this.keys++}>
            <center><Button active block color="dark" className="btn-pill" aria-pressed="true" style={{ maxWidth: "100%", width: "200px" }} key={this.keys++}>Add Client</Button></center>
          </Col>
        }
        modal
        contentStyle={contentStyle}
        open={this.state.isOpen}
        onOpen={this.handleOpen}
      >

        <Row className="animated fadeIn" >
          <Col xs="12" sm="12" >
            <CardHeader style={{ backgroundColor: "#FFF" }}>
              <strong>Add a Client</strong>
            </CardHeader>
            <form id="page" >
              <CardBody >
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label>Name<span style={{ color: "red" }}>*</span></Label>
                      <Input type="text" id="Name" required placeholder="Name" onChange={this.update_input_n.bind(this)} key={this.keys++} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label>CIN<span style={{ color: "red" }}>*</span></Label>
                      <Input type="number" id="CIN" required placeholder="CIN" onChange={this.update_input_c.bind(this)} key={this.keys++} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label>Email<span style={{ color: "red" }}>*</span></Label>
                      <Input type="email" id="email" required placeholder="Email" onChange={this.update_input_e.bind(this)} key={this.keys++} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label>Phone Number<span style={{ color: "red" }}>*</span></Label>
                      <Input type="number" id="tel" required placeholder="Entrer numéro de téléphone" onChange={this.update_input_tel.bind(this)} key={this.keys++} />
                    </FormGroup>
                  </Col>
                </Row>
                <Button active color="dark" className="btn-pill" aria-pressed="true" style={{ maxWidth: '100px', width: '100%' }} onClick={this.profileClickSwal.bind(this)} >Add</Button>
                <span>              </span>
                <Button type="submit" active color="light" className="btn-pill" aria-pressed="true" style={{ maxWidth: '100px', width: '100%' }} onClick={this.handleClose} >Cancel</Button>
              </CardBody>
            </form>
          </Col>
        </Row>

      </Popup>

    );

  }
}
export default Warper(CustomModal);