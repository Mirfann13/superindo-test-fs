import React from "react";
import fs from "fs";
import pdf from "html-pdf";
import Receipt from "../components/Receipt";

export default async (req, res) => {
    const html = <Receipt />;
    const pdfOptions = { format: "Letter" };

    pdf.create(html, pdfOptions).toFile("output.pdf", (err, response) => {
        if (err) return console.log(err);
        const pdfBuffer = fs.readFileSync("output.pdf");
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);
    });
};
