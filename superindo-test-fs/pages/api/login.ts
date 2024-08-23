const axios = require("axios");

export default async (req: any, res: any) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/auth/login`,
      req.body
    );
    if (response) {
      res.status(200).json(response.data);
    } else {
      res.status(200).json({ message: "Data kosong" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
