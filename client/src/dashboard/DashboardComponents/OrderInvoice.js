import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import { IconButton } from "@mui/material";
import html2pdf from "html2pdf.js/dist/html2pdf";
import React from "react";
import ReactDOMServer from "react-dom/server";
import InvoicePDF from "../../helpers/Exports/PDF/InvoicePDF";
import CustomButton from "./../../components/controls/CustomButton";
import DashboardOrderDetails from "./DashboardOrderDetails";

const OrderInvoice = ({ setOpen, row }) => {
  const opt = {
    margin: 1,
    filename: `Invoice-${row?.original?.orderID}.pdf`,
    image: { type: "pdf", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const printHandler = () => {
    const invoice = ReactDOMServer.renderToString(InvoicePDF(row));
    html2pdf().set(opt).from(invoice).save();
  };

  return (
    <div className="orderInvoice">
      <div className="orderInvoice__container">
        <div className="orderInvoice__header">
          <h2 className="orderInvoice__title">Order Details</h2>

          <CustomButton
            className="btn-root small__btn btn__dark"
            text="Download"
            onClick={printHandler}
            startIcon={<GetAppIcon />}
          />

          <div className="orderInvoice__close">
            <IconButton
              size="small"
              aria-label="close"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>

        <DashboardOrderDetails row={row} />
      </div>
    </div>
  );
};

export default OrderInvoice;
