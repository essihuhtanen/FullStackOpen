import axios from "axios";
const URL = "http://localhost:3001/persons";

export const getNumbers = () => {
  return axios.get(URL).then((res) => res.data);
};

export const addNumber = (newNumber) => {
  return axios.post(URL, newNumber).then((res) => res.data);
};

export const deleteNumber = (id) => {
  return axios.delete(`${URL}/${id}`).then((res) => res.data);
};

export const updateNumber = (updatedPerson) => {
  return axios
    .put(`${URL}/${updatedPerson.id}`, updatedPerson)
    .then((res) => res.data);
};
