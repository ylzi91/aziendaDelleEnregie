import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(()=> {
    let token = localStorage.getItem('mytoken')
    if(token != '')
      navigate('/profilo')
  },[])

  const loginFetch = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if(!response.ok)
        throw new Error('Errore nella fetch')
      const token = await response.json()
      localStorage.setItem('myToken', token.accessToken)  
      navigate('/profilo')
    } catch (error) {
        console.log('Error', error)
    }
  };

  return (
    <>
      <Form
        onSubmit={loginFetch}
        className=" w-25 mx-auto mt-4 bg-body-secondary p-3 rounded-3"
      >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
