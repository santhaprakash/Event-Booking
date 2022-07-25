import { Button } from "@mui/material";
import React, { useState, useRef } from "react";
import styles from "../styles/Contact.module.css";
import emailjs from "emailjs-com";

function Contact() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const form = { useRef };
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_r6yy8ib",
        "template_u350fml",
        form.current,
        "user_nOaMpicfl8w5ryUcymy4W"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName(" ");
    setMail(" ");
    setMessage(" ");
  };
  return (
    <div className={styles.root}>
      <h2>Contact</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputbox}
        ></input>
        <br />
        <label>Email id</label>
        <br />
        <input
          type="email"
          name="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className={styles.inputbox}
        ></input>
        <br />
        <label>Message</label>
        <br />
        <textarea
          type="textbox"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputbox}
        ></textarea>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "#F4511E" }}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </div>
      </form>
      <h4 style={{ textAlign: "center", marginTop: "70px", fontWeight: "500" }}>
        @developed by santha
      </h4>
    </div>
  );
}

export default Contact;
