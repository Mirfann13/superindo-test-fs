import axios from "axios";

export default async (req: any, res: any) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get(`http://localhost:4000/api/transactions`);
        if (response) {
          res.status(200).json(response.data);
        } else {
          res.status(200).json({ message: "Data tidak ditemukan" });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;
  }
};
