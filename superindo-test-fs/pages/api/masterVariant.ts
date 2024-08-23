import axios from "axios";

export default async (req: any, res: any) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const response = await axios.get(`http://localhost:4000/api/productvariants`);
                if (response) {
                    res.status(200).json(response.data);
                } else {
                    res.status(200).json({ message: "Data tidak ditemukan" });
                }
            } catch (error) {
                res.status(500).json(error);
            }
            break;

        case "POST":
            try {
                const postResponse = await axios.post(
                    `http://localhost:4000/api/productvariants`,
                    req.body
                );
                if (postResponse) {
                    res.status(200).json(postResponse.data);
                } else {
                    res.status(200).json({ message: "Gagal menambahkan data" });
                }
            } catch (error) {
                res.status(500).json(error);
            }
            break;

        case "PUT":
            try {
                const putResponse = await axios.put(
                    `http://localhost:4000/api/products/${req.query.id}`,
                    req.body
                );
                if (putResponse) {
                    res.status(200).json(putResponse.data);
                } else {
                    res.status(200).json({ message: "Gagal mengupdate data" });
                }
            } catch (error) {
                res.status(500).json(error);
            }
            break;

        case "DELETE":
            try {
                const deleteResponse = await axios.delete(
                    `http://localhost:4000/api/productvariants/${req.query.id}`
                );
                if (deleteResponse) {
                    res.status(200).json({ message: "Data berhasil dihapus" });
                } else {
                    res.status(200).json({ message: "Gagal menghapus data" });
                }
            } catch (error) {
                res.status(500).json(error);
            }
            break;

        default:
            res.status(405).json({ message: "Metode HTTP tidak valid" });
            break;
    }
};
