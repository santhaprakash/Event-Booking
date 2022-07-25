import { onSnapshot, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../styles/Events.module.css";
import { technical } from "../tool/firebase";
import moment from "moment";
import { Button } from "@mui/material";
function Events() {
  const [tech, setTech] = useState([]);
  const [nontech, setNontech] = useState([]);
  const techquery = query(technical, where("Mode", "==", "Technical"));
  const nontechquery = query(technical, where("Mode", "==", "NonTechnical"));

  //fetching all events like technical,nontechnical

  useEffect(() => {
    onSnapshot(techquery, technical, (e) => {
      const data = [];
      e.docs.map((s) => {
        data.push({ ...s.data(), id: s.id });
      });
      setTech(data);
    });

    onSnapshot(nontechquery, technical, (e) => {
      const data = [];
      e.docs.map((s) => {
        data.push({ ...s.data(), id: s.id });
      });
      setNontech(data);
    });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Technical
          </h2>
          <div className={styles.root}>
            {tech.map((e, i) => {
              return (
                <div
                  ke={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    boxShadow: "0 0 5px 2px #e6e6e6",
                  }}
                >
                  <img
                    src={e.img}
                    style={{ width: "250px", height: "250px" }}
                  ></img>
                  <h3>{e.EventName}</h3>
                  <div></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-12px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500", textAlign: "left" }}>
                      Type of Event :{" "}
                    </h5>
                    <h5 style={{ fontWeight: "650" }}> {e.Typeofevent}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-20px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>Theme : </h5>
                    <h5 style={{ fontWeight: "650" }}> {e.Theme}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-20px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>Prize : </h5>
                    <h5 style={{ fontWeight: "650" }}> {e.PrizeMoney}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-23px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>Venue : </h5>
                    <h5 style={{ fontWeight: "650" }}>{e.venue}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-23px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>Date : </h5>
                    <h5 style={{ fontWeight: "650" }}>
                      {moment(e.Date.toDate()).format("LLLL")}
                    </h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-23px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>ContactNo : </h5>
                    <h5 style={{ fontWeight: "650" }}>{e.ContactNo}</h5>
                  </div>

                  {e.Registered < e.MaxLimit ? (
                    <>
                      <Link
                        to={`/${e.EventName}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "50px",
                              backgroundColor: "green",
                              color: "white",
                              marginBottom: "10px",
                            }}
                          >
                            <p
                              style={{ textAlign: "center", fontSize: "13px" }}
                            >
                              Open
                            </p>
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#F4511E",
                                zIndex: "1",
                              }}
                            >
                              Register
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "60px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      <p style={{ textAlign: "center", fontSize: "16px" }}>
                        Closed
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Non-Technical
          </h2>
          <div className={styles.root}>
            {nontech.map((e, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    padding: "23px",
                    boxShadow: "0 0 5px 2px #e6e6e6",
                  }}
                >
                  <img
                    src={e.img}
                    style={{ width: "250px", height: "250px" }}
                  ></img>
                  <h3>{e.EventName}</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-12px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500", textAlign: "left" }}>
                      Type of Event :{" "}
                    </h5>
                    <h5 style={{ fontWeight: "650" }}> {e.Typeofevent}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-23px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>Prize : </h5>
                    <h5 style={{ fontWeight: "650" }}> {e.PrizeMoney}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-23px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>Venue : </h5>
                    <h5 style={{ fontWeight: "650" }}>{e.venue}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-23px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>Date : </h5>
                    <h5 style={{ fontWeight: "650" }}>
                      {moment(e.Date.toDate()).format("LLLL")}
                    </h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-23px",
                    }}
                  >
                    <h5 style={{ fontWeight: "500" }}>ContactNo : </h5>
                    <h5 style={{ fontWeight: "650" }}>{e.ContactNo}</h5>
                  </div>
                  {e.Registered < e.MaxLimit ? (
                    <>
                      <Link
                        to={`/${e.EventName}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "50px",
                              backgroundColor: "green",
                              color: "white",
                              marginBottom: "10px",
                            }}
                          >
                            <p
                              style={{ textAlign: "center", fontSize: "13px" }}
                            >
                              Open
                            </p>
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#F4511E",
                                zIndex: "1",
                              }}
                            >
                              Register
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "60px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      <p style={{ textAlign: "center", fontSize: "13px" }}>
                        Closed
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
