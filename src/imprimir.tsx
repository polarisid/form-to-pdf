import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export default function Imprimir(props: any) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  console.log(typeof props);
  const reportTitle = [
    {
      text: "Relatório de garantia RAC",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 0],
    },
  ];

  const details: any = [
    { text: "Relatório de garantia RAC", style: "header" },
    ,
    {
      text: "A simple table (no headers, no width specified, no spans, no styling)",
      style: "subheader",
    },
    {
      style: "tableExample",
      table: {
        widths: [, "*"],

        body: [
          ["Column 1", "Status"],
          ["One value goes here", props["Q3"]],
        ],
      },
    },
  ];
  const rodape: any = [];
  const docDefinitions: any = {
    pageSize: "A4",
    pageMargins: [15, 20, 0, 45],
    header: [reportTitle],
    content: [details],
    footer: [rodape],
  };

  pdfMake.createPdf(docDefinitions).download();
}
