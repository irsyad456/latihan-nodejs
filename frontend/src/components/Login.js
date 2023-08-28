import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/masyarakat/login",
        {
          username: username,
          pass: password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
      setError("An Error Occured :(");
    }
  };

  return (
    <div class="columns is-centered mt-5">
      <div class="column is-one-third">
        <form onSubmit={handleLogin}>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                type="text"
                class="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan Username"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                type="password"
                class="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                required
              />
            </div>
          </div>
          {error && <p class="has-text-danger">{error}</p>}
          <div class="field">
            <div class="control">
              <button type="submit" class="button is-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
