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
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/dashboard");
      } else if (response.status === 401) {
        setError(response.data.msg);
      }
      console.log(response)
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-one-third">
        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan Username"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                required
              />
            </div>
          </div>
          {error && <p className="has-text-danger">{error}</p>}
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
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
