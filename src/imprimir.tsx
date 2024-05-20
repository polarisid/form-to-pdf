// import React, { useState } from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import { saveAs } from "file-saver";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// export default function Imprimir(
//   responses: {
//     [key: string]: { question: string; answer: string }[];
//   },
//   photos: { session: string; image: string }[]
// ) {
//   const content: any[] = [];
//   const reportTitle = [
//     {
//       text: "Relatório de garantia RAC",
//       fontSize: 15,
//       bold: true,
//       margin: [15, 20, 0, 0],
//     },
//   ];

//   for (const sectionName in responses) {
//     content.push({ text: sectionName, style: "sectionHeader" });

//     const table = {
//       table: {
//         widths: [400, "*"],
//         body: [["PERGUNTA", "RESPOSTA"]] as string[][],
//       },
//       layout: "tableExample",
//     };

//     responses[sectionName].forEach((response) => {
//       table.table.body.push([response.question, response.answer]);
//     });

//     content.push(table);
//   }

//   if (content.length > 0) {
//     content.push({ text: "", pageBreak: "before" });
//   }

//   photos.forEach((photo, index) => {
//     content.push({
//       image: photo.image,
//       width: 260,
//       alignment: "center",
//     });
//     content.push({
//       text: [photo.session + "\n\n"],
//       style: "sectionHeader",
//     });
//   });

//   const docDefinition: any = {
//     header: [reportTitle],
//     content: content, // Conteúdo do PDF
//     styles: {
//       // Definição de estilos
//       sectionHeader: {
//         bold: true,
//         fontSize: 14,
//         margin: [0, 10, 0, 10], // Adiciona margem superior e inferior
//       },
//       tableExample: {
//         margin: [0, 5, 0, 15], // Adiciona margem superior e inferior para a tabela
//       },
//     },
//     defaultStyle: {
//       fontSize: 12,
//     },
//   };

//   // Gerar o PDF
//   const pdfDoc = pdfMake.createPdf(docDefinition);

//   // Baixar o PDF
//   pdfDoc.getBlob((blob: any) => {
//     saveAs(blob, "relatorio_garantia.pdf");
//   });
// }

//
// import React from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import { saveAs } from "file-saver";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import React from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import { saveAs } from "file-saver";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// export default function Imprimir(
//   responses: { [key: string]: { question: string; answer: string }[] },
//   photos: { session: string; image: string }[]
// ) {
//   const content: any[] = [];
//   const reportTitle = [
//     {
//       text: "Relatório de garantia RAC",
//       fontSize: 15,
//       bold: true,
//       margin: [15, 20, 0, 0],
//     },
//   ];

//   for (const sectionName in responses) {
//     content.push({ text: sectionName, style: "sectionHeader" });

//     const table = {
//       table: {
//         widths: ["400", "*"],
//         body: [["PERGUNTA", "RESPOSTA"]] as any[][],
//       },
//       layout: "tableExample",
//     };

//     responses[sectionName].forEach((response) => {
//       table.table.body.push([response.question, response.answer]);
//     });

//     content.push(table);
//   }

//   if (photos.length > 0) {
//     content.push({
//       text: "Evidências",
//       style: "sectionHeader",
//       pageBreak: "before",
//     });
//   }

//   photos.forEach((photo) => {
//     content.push({
//       image: photo.image,
//       width: 260,
//       alignment: "center",
//       margin: [0, 10, 0, 10],
//     });
//     content.push({
//       text: photo.session,
//       style: "sectionHeader",
//     });
//   });

//   const docDefinition: any = {
//     header: [reportTitle],
//     content: content,
//     styles: {
//       sectionHeader: {
//         bold: true,
//         fontSize: 14,
//         margin: [0, 10, 0, 10],
//       },
//       tableExample: {
//         margin: [0, 5, 0, 15],
//       },
//     },
//     defaultStyle: {
//       fontSize: 12,
//     },
//   };

//   // Gerar o PDF
//   const pdfDoc = pdfMake.createPdf(docDefinition);

//   // Baixar o PDF
//   pdfDoc.getBlob((blob: any) => {
//     saveAs(blob, "relatorio_garantia.pdf");
//   });
// }

// import React from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import { saveAs } from "file-saver";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// export default function Imprimir(
//   responses: { [key: string]: { question: string; answer: string }[] },
//   photos: { session: string; image: string }[]
// ) {
//   const content: any[] = [];
//   const reportTitle = [
//     {
//       text: "Relatório de garantia RAC",
//       fontSize: 15,
//       bold: true,
//       margin: [15, 20, 0, 0],
//     },
//   ];

//   const sanitizeData = (data: any) => {
//     // Function to sanitize data
//     if (typeof data === "number" && !Number.isFinite(data)) {
//       return data.toString();
//     }
//     return data;
//   };

//   for (const sectionName in responses) {
//     content.push({ text: sectionName, style: "sectionHeader" });

//     const table = {
//       table: {
//         widths: ["*", "*"],
//         body: [["PERGUNTA", "RESPOSTA"]] as any[][],
//       },
//       layout: "lightHorizontalLines",
//     };

//     responses[sectionName].forEach((response) => {
//       table.table.body.push([
//         sanitizeData(response.question),
//         sanitizeData(response.answer),
//       ]);
//     });

//     content.push(table);
//   }

//   if (photos.length > 0) {
//     content.push({
//       text: "Evidências",
//       style: "sectionHeader",
//       pageBreak: "before",
//     });
//   }

//   photos.forEach((photo) => {
//     content.push({
//       image: photo.image,
//       width: 260,
//       alignment: "center",
//       margin: [0, 10, 0, 10],
//     });
//     content.push({
//       text: photo.session,
//       style: "sectionHeader",
//     });
//   });

//   const docDefinition: any = {
//     header: [reportTitle],
//     content: content,
//     styles: {
//       sectionHeader: {
//         bold: true,
//         fontSize: 14,
//         margin: [0, 10, 0, 10],
//       },
//       tableExample: {
//         margin: [0, 5, 0, 15],
//       },
//     },
//     defaultStyle: {
//       fontSize: 12,
//     },
//   };

//   // Gerar o PDF
//   const pdfDoc = pdfMake.createPdf(docDefinition);

//   // Baixar o PDF
//   pdfDoc.getBlob((blob: any) => {
//     saveAs(blob, "relatorio_garantia.pdf");
//   });
// }

import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { saveAs } from "file-saver";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Imprimir(
  responses: { [key: string]: { question: string; answer: string }[] },
  photos: { session: string; image: string }[]
) {
  const content: any[] = [];
  const reportTitle = [
    {
      text: "Relatório de garantia RAC",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 0],
    },
  ];

  const sanitizeData = (data: any) => {
    if (typeof data === "number" && !Number.isFinite(data)) {
      return data.toString();
    }
    return data;
  };

  for (const sectionName in responses) {
    content.push({ text: sectionName, style: "sectionHeader" });

    const table = {
      table: {
        widths: [400, "*"],
        body: [["PERGUNTA", "RESPOSTA"]] as any[][],
      },
      layout: "tableExample",
    };

    responses[sectionName].forEach((response) => {
      table.table.body.push([
        sanitizeData(response.question),
        sanitizeData(response.answer),
      ]);
    });

    content.push(table);
  }

  if (photos.length > 0) {
    content.push({
      text: "Evidências",
      style: "sectionHeader",
      pageBreak: "before",
    });
  }

  photos.forEach((photo) => {
    content.push({
      image: photo.image,
      width: 260,
      alignment: "center",
      margin: [0, 10, 0, 10],
    });
    content.push({
      text: photo.session,
      style: "sectionHeader",
      alignment: "center",
    });
  });

  const docDefinition: any = {
    header: [reportTitle],
    content: content,
    styles: {
      sectionHeader: {
        bold: true,
        fontSize: 14,
        margin: [0, 10, 0, 10],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
    },
    defaultStyle: {
      fontSize: 12,
    },
  };

  // Gerar o PDF
  const pdfDoc = pdfMake.createPdf(docDefinition);

  // Baixar o PDF
  pdfDoc.getBlob((blob: any) => {
    saveAs(blob, "relatorio_garantia.pdf");
  });
}
