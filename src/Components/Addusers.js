import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import { env } from "../environment";
import axios from "axios";
import { useNavigate} from 'react-router-dom';

function AddUsers() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    password:'User@123'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${env.apiurl}/users/adduser`,formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.data.statusCode === 200) {
        console.log(res.data.message);
        alert('User added successfully!');
        window.location.reload();
        navigate('/dashboard');
      }
     else {
      console.log("No Token Found");
    }
  }
    
     catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-3 d-flex justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicfname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter Firstname"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasiclname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter Lastname"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicrole">
          <Form.Label>Role</Form.Label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Default Password for New User</Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="Default Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div style={{ textAlign: 'center' }}>
          <Button className="m-2" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddUsers;
