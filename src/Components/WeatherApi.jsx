import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "../Styles/Weather.module.css";
import axios from "axios";

export default function WeatherApi() {
  const [data, setdata] = useState("");
  const [show, setShow] = useState([]);
  const [other, setOther] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleClick = (id) => {
    setOther(id);
  };

  var x = other;

  useEffect(() => {
    const delayfunction = setTimeout(() => {
      getdata();
    }, 2000);
    return () => clearTimeout(delayfunction);
  }, [data]);

  const getdata = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${data.weather}&appid=d6e76a8f725d3fd5770ee4195870321e`
      )
      .then((res) => {
        setShow(res.data.list);
        console.log(res);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className={styles.maindiv}>
        <div className={styles.searchbardiv}>
          <img className={styles.imgstyle} src="place.png" />
          <input
            className={styles.inputtag}
            type="text"
            placeholder="Search"
            name="weather"
            onChange={(e) => handleChange(e)}
          ></input>
          <img className={styles.imgstyle1} src="search.png" />
        </div>
        <div className={styles.weatherinformation}>
          {show &&
            show.slice(0, 7).map(
              (
                {
                  dt_txt,
                  dt,
                  main: { humidity, pressure, temp },
                  weather: {
                    0: { main, description, icon },
                  },
                },
                index
              ) => {
                var outputCelsius = Math.floor(temp - 273.15);
                var imageUrl = "";
                if (main == "Clouds") {
                  imageUrl = "Cloud.png";
                }
                if (main == "Clear") {
                  imageUrl = "Sun.png";
                }
                return (
                  <div>
                    <div
                      onClick={() => handleClick(dt)}
                      className={styles.maincontent}
                    >
                      <strong>
                        {new Intl.DateTimeFormat("en-IN", {
                          hour: "2-digit",
                          weekday: "short",
                        }).format(new Date(dt_txt))}
                      </strong>
                      <br />
                      <strong>
                        {outputCelsius + " " + "\u00B0"}
                      </strong>
                      <br />
                      <img className={styles.imgtag} src={imageUrl} />
                      <br />
                      <strong>{main}</strong>
                      <br />
                    </div>
                    <br />
                  </div>
                );
              }
            )}
        </div>
        <div className={styles.otherinformation}>
          {show &&
            show
              .filter((e) => e.dt == x)
              .map(
                ({
                  main: {
                    humidity,
                    pressure,
                    temp,
                    grnd_level,
                    sea_level,
                    temp_max,
                    temp_min,
                  },
                  wind: { speed, deg },
                  weather: {
                    0: { main, description, icon },
                  },
                }) => {
                  var outputCelsius = Math.floor(temp - 273.15);
                  var min_temp = Math.floor(temp_min - 273.15);
                  var max_temp = Math.floor(temp_max - 273.15);
                  var imageUrl = "";
                  if (main == "Clouds") {
                    imageUrl = "Cloud.png";
                  }
                  if (main == "Clear") {
                    imageUrl = "Sun.png";
                  }
                  return (
                    <div>
                      <div className={styles.othermaininformation}>
                        <h1 style={{ fontSize: "45px" }}>
                          {outputCelsius + "" + "\u00B0" + "C"}
                        </h1>
                        <img
                          className={styles.imgtagss}
                          src={imageUrl}
                        />
                      </div>
                      <div className={styles.extrainformation}>
                        <div className={styles.humidity}>
                          <h2>Humidity</h2>
                          <h3>{humidity}</h3>
                        </div>
                        <div className={styles.humidity}>
                          <h2>Pressure</h2>
                          <h3>{pressure}</h3>
                        </div>
                      </div>
                      <div className={styles.extrainformation}>
                        <div className={styles.humidity}>
                          <h2>Minimum Temp</h2>
                          <h3>{min_temp + " " + "\u00B0"}</h3>
                        </div>
                        <div className={styles.humidity}>
                          <h2>Maximum Temp</h2>
                          <h3>{max_temp + " " + "\u00B0"}</h3>
                        </div>
                      </div>
                      <div className={styles.extrainformation}>
                        <div className={styles.humidity}>
                          <h2>Sea Level</h2>
                          <h3>{sea_level}</h3>
                        </div>
                        <div className={styles.humidity}>
                          <h2>Ground Level</h2>
                          <h3>{grnd_level}</h3>
                        </div>
                      </div>
                      <div className={styles.extrainformation}>
                        <div className={styles.humidity}>
                          <h2>Wind Speed</h2>
                          <h3>{speed + " " + "m/s"}</h3>
                        </div>
                        <div className={styles.humidity}>
                          <h2>Degree</h2>
                          <h3>{deg + " " + "\u00B0"}</h3>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
}
