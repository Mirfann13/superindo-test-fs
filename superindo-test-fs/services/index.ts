import axios from "axios";

export const getAllProducts = () => {
    return axios.get(`http://localhost:4000/api/productvariants`);
};
