import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName) => {
  // Convert data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Convert the workbook to a binary array
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob from the buffer
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // Use FileSaver to save the file
  saveAs(dataBlob, `${fileName}.xlsx`);
};
