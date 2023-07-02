import axios from "axios";

const BASEURL = "https://studies.cs.helsinki.fi/restcountries/api";

export const getAllCountries = () => {
  return axios.get(`${BASEURL}/all`).then((res) => res.data);
};

export const getCountry = (name) => {
  return axios.get(`${BASEURL}/name/${name}`).then((res) => res.data);
};
