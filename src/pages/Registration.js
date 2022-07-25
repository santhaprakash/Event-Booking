import { Button } from "@mui/material";
import {
  addDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Joi from "joi-browser";
import styles from "../styles/Registration.module.css";
import { technical, registereddata } from "../tool/firebase";
import axios from "axios";
import emailjs from "emailjs-com";

function Registration() {
  const { id } = useParams();
  const [value, setValue] = useState("solo");
  const form =  useRef();
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  const [topic, setTopic] = useState("");
  const [dataid, setDataid] = useState("");
  const [registered, setRegistered] = useState(0);

  //query for that single data
  const na = query(technical, where("EventName", "==", id));
  useEffect(() => {
    onSnapshot(na, technical, (e) => {
      const temp = [];
      e.docs.map((s) => {
        temp.push({ ...s.data(), id: s.id });
        setTopic(s.data().EventName);
        setDataid(s.id);
        setRegistered(s.data().Registered);
      });
      setData(temp);
    });
  }, []);
  
  // input for form
  const [formdata, setFormdata] = useState({
    name: "",
    emailid: "",
    department: "",
    member1name: "",
    member2name: "",
    member1dept: "",
    member2dept: "",
    title: "",
  });


  //schema to check validations
  const schema = {
    name: Joi.string().required(),
    department: Joi.string().required(),
    whatsappnumber: Joi.number().required(),
    emailid: Joi.string().email().required(),
    title: Joi.string().required(),
    member1name: Joi.string().required(),
    member2name: Joi.string().required(),
    member1dept: Joi.string().required(),
    member2dept: Joi.string().required(),
  };


  // validating
  const validateProperty = (e) => {
    const { name, value } = e.target;
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  
  //Input onchange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorData = errors;
    const errorMessage = validateProperty(e);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let form = { ...formdata };
    form[name] = value;
    setFormdata(form);
    setErrors(errorData);
  };

  //after form submission validating the form

  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(formdata, schema, { abortEarly: false });
    const { error } = result;

    // if no error push it 
    if (!error) {
      const exceldata = {
        Eventname: topic,
        Name: formdata.name,
        Emailid: formdata.emailid,
        Department: formdata.department,
        whatsappnumber: formdata.whatsappnumber,
        member1name: formdata.member1name,
        member1dept: formdata.member1dept,
        member2name: formdata.member2name,
        member2dept: formdata.member2dept,
        title: formdata.title,
      };
      

      // adding to database 

      addDoc(registereddata, {
        EventName: topic,
        Emailid: formdata.emailid,
        Department: formdata.department,
        Whatsappnumber: formdata.whatsappnumber,
        member1name: formdata.member1name,
        member1dept: formdata.member1dept,
        member2name: formdata.member2name,
        member2dept: formdata.member2dept,
        title: formdata.title,
      });
      

      // updating registered count

      const updateData = doc(technical, dataid);
      updateDoc(updateData, {
        Registered: registered + 1,
      });


    //adding data to excel sheets

      axios
        .post(
          "https://sheet.best/api/sheets/84a81663-28dc-414e-8144-04370a6d6c45"
 
        )
        .then((res) => console.log(res));


    //sending mail to the registered person

      emailjs
        .sendForm(
          "service_r6yy8ib",
          "template_xnmzj0r",
          form.current,
          "user_nOaMpicfl8w5ryUcymy4W"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });


    //clearing input fields

      setFormdata({
        name: "",
        emailid: "",
        department: "",
        whatsappnumber: "",
        member1name: "",
        member2name: "",
        member1dept: "",
        member2dept: "",
        title: "",
      });

      return null;
    }
// for solo Registrations

    else if(
      errors.member1dept &&
      errors.member2dept &&
      errors.member1name &&
      errors.member2name &&
      errors.name === undefined &&
      errors.department === undefined &&
      errors.whatsappnumber === undefined &&
      errors.title === undefined
    ) {
      console.log("yeah it runs");
      console.log(registered);
      const updateData = doc(technical, dataid);
      updateDoc(updateData, {
        Registered: registered + 1,
      });

      const exceldata = {
        Eventname: topic,
        Name: formdata.name,
        Emailid: formdata.emailid,
        Department: formdata.department,
        Whatsappnumber: formdata.whatsappnumber,
        member1name: "-",
        member1dept: "-",
        member2name: "-",
        member2dept: "-",
        title: formdata.title,
      };

      addDoc(registereddata, {
        EventName: topic,
        Emailid: formdata.emailid,
        Department: formdata.department,
        whatsappnumber: formdata.whatsappnumber,
        title: formdata.title,
      });

      axios
        .post(
          "https://sheet.best/api/sheets/84a81663-28dc-414e-8144-04370a6d6c45",
          exceldata
        )
        .then((res) => console.log(res));

      emailjs
        .sendForm(
          "service_r6yy8ib",
          "template_xnmzj0r",
          form.current,
          "user_nOaMpicfl8w5ryUcymy4W"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setFormdata({
        name: "",
        emailid: "",
        department: "",
        Whatsappnumber: "",
        member1name: "",
        member2name: "",
        member1dept: "",
        member2dept: "",
        title: "",
      });
    }
    //for errors
    else {
      alert("Please Fill all Details to register");
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      // console.log(errors);
      setErrors(errorData);
      // console.log(exceldata);
      setFormdata({
        name: "",
        emailid: "",
        department: "",
        member1name: "",
        member2name: "",
        member1dept: "",
        member2dept: "",
        title: "",
        whatsappnumber: "",
      });

      return errorData;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <h3>{topic}</h3>
      <form ref={form} onSubmit={validateForm}>
        <label>Name :</label>
        <br />
        <input
          className={styles.inputbox}
          placeholder="hey123"
          name="name"
          onChange={handleChange}
          type="text"
          value={formdata.name}
        ></input>
        <br />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
        <label>Emailid :</label>
        <br />
        <input
          className={styles.inputbox}
          placeholder="hey@gmail.com"
          name="emailid"
          onChange={handleChange}
          value={formdata.emailid}
        ></input>
        <br />
        {errors.emailid && <div className={styles.error}>{errors.emailid}</div>}
        <label>Department :</label>
        <br />
        <input
          className={styles.inputbox}
          placeholder="Ece"
          name="department"
          onChange={handleChange}
          value={formdata.department}
        ></input>
        <br />
        {errors.department && (
          <div className={styles.error}>{errors.department}</div>
        )}
        <label>Whatsapp Number :</label>
        <br />
        <input
          className={styles.inputbox}
          placeholder="9751447759"
          name="whatsappnumber"
          onChange={handleChange}
          value={formdata.whatsappnumber}
        ></input>
        <br />
        {errors.whatsappnumber && (
          <div className={styles.error}>{errors.whatsappnumber}</div>
        )}
        {data.map((z) => {
          return (
            <>
              {z.Typeofevent == "solo" ? (
                <></>
              ) : (
                <>
                  <label>Participation :</label>
                  <br />
                  <select
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                      width: "300px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      height: "30px",
                    }}
                  >
                    <option value="solo">Solo</option>
                    <option value="team">Team</option>
                  </select>
                  <br />
                </>
              )}
            </>
          );
        })}
        {value === "team" ? (
          <>
            <label>Team member 1 Name :</label>
            <br />
            <input
              className={styles.inputbox}
              placeholder="hey1"
              name="member1name"
              onChange={handleChange}
              value={formdata.member1name}
            ></input>
            <br />
            {errors.member1name && (
              <div className={styles.error}>{errors.member1name}</div>
            )}
            <label>Team member 1 Department :</label>
            <br />
            <input
              className={styles.inputbox}
              placeholder="Ece"
              name="member1dept"
              onChange={handleChange}
              value={formdata.member1dept}
            ></input>
            <br />
            {errors.member1dept && (
              <div className={styles.error}>{errors.member1dept}</div>
            )}
            <label>Team member 2 Name :</label>
            <br />
            <input
              className={styles.inputbox}
              placeholder="hey2"
              name="member2name"
              onChange={handleChange}
              value={formdata.member2name}
            ></input>
            <br />
            {errors.member2name && (
              <div className={styles.error}>{errors.member2name}</div>
            )}
            <label>Team member 2 Department :</label>
            <br />
            <input
              className={styles.inputbox}
              placeholder="Ece"
              name="member2dept"
              onChange={handleChange}
              value={formdata.member2dept}
            ></input>
            <br />
            {errors.member2dept && (
              <div className={styles.error}>{errors.member2dept}</div>
            )}
          </>
        ) : (
          <></>
        )}
        <label>Your title :</label>
        <br />
        <input
          className={styles.inputbox}
          placeholder="Technology"
          name="title"
          onChange={handleChange}
          value={formdata.title}
        ></input>
        {errors.title && <div className={styles.error}>{errors.title}</div>}
        <br />
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={validateForm}
            style={{ backgroundColor: "#F4511E" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
