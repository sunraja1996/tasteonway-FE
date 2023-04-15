import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "../environment";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";

function Allusers() {

  let [data, setData] = useState([]);
  let navigate = useNavigate();



  let loadData = async () => {
    let token = sessionStorage.getItem("token");

    if (token) {
      let res = await axios.get(`${env.apiurl}/users/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.statusCode === 200) {
        console.log(res.data.message);
        setData(res.data.users);
      } else {
        console.log(res.data.message);
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } else {
      console.log("No Token Found");
      setTimeout(() => {
        logout();
      }, 3000);
    }
  };

  let deleteUser = async (id) => {
    let token = sessionStorage.getItem("token");

    if (token) {
      let res = await axios.delete(`${env.apiurl}/users/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.statusCode === 200) {
        console.log(res.data.message);
        setData(data.filter((e) => e._id !== id));
      } else {
        console.log(res.data.message);
      }
    } else {
      console.log("No Token Found");
      setTimeout(() => {
        logout();
      }, 3000);
    }
  };

  let logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>
                <Button
                  className="m-1"
                  variant="danger"
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      `Are you sure you want to delete ${e.firstName} (${e.email})?`
                    );
                    if (confirmDelete) {
                      const token = sessionStorage.getItem("token");
                      axios
                        .delete(`${env.apiurl}/users/delete-user/${e._id}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                        .then((res) => {
                          if (res.data.statusCode === 200) {
                            alert("User deleted successfully");
                            window.location.reload();
                          } else {
                            alert(res.data.message);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          alert("Internal server error");
                        });
                    }
                  }}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Allusers;
