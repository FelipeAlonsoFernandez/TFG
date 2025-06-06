import axios from "axios";

export default axios.create({
  baseURL: "/",
  headers: {
    "Content-type": "application/json",
  },
});


/*
import axios from "axios";

export default axios.create({
  baseURL: "http://213.130.147.163:8000/",
  headers: {
    "Content-type": "application/json",
  },
});*/