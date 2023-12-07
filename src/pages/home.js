import React from "react";
import styles from "./home.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1566342088293-38debd381c63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.box}>
        <h1 style={{ color: "white" }}>Accredian Task</h1>
        {localStorage.getItem("userData") ? (
          <div>
            <h1 style={{color:'white',fontFamily:'sans-serif'}}>
              Welcome {JSON.parse(localStorage.getItem("userData")).username.toUpperCase()}
            </h1>
            <Button variant="outlined" onClick={() => {
              localStorage.removeItem('userData')
              navigate("/")}}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className={styles.buttons}>
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
            <Button variant="outlined" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        )}
        {/* https://source.unsplash.com/random?wallpapers */}
      </div>
    </div>
  );
};

export default Home;
