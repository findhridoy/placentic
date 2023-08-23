import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React from "react";
import placentic from "../../assets/logo/placentic.png";

const OrderInvoice = ({ setOpen, row }) => {
  console.log(row?.original);
  return (
    <div className="orderInvoice">
      <div className="orderInvoice__container">
        <div className="orderInvoice__header">
          <h2 className="orderInvoice__title">Order Details</h2>
          <div className="orderInvoice__close">
            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        <div className="orderInvoice__invoice">
          <div className="invoice__header">
            <img className="logo" src={placentic} alt={placentic} />
          </div>

          <div className="invoice__address">
            <div className="address__from">
              <span className="from__title">From</span>
              <span className="from__company">Placentic Inc.</span>
              <span className="from__address">Sector #7, Uttara</span>
              <span className="from__address">Dhaka - 1320</span>
              <span className="from__address">Bangladesh</span>
              <span className="from__address">+8801647550708</span>
            </div>
            <div className="address__to">
              <span className="to__title">To</span>
              <span className="to__customer">
                {row?.original?.customer?.name}
              </span>
              <span className="to__address">
                {row?.original?.shippingAddress?.address}
              </span>
              <span className="to__address">
                {row?.original?.shippingAddress?.city} -{" "}
                {row?.original?.shippingAddress?.zip_code}
              </span>
              <span className="to__address">
                {row?.original?.shippingAddress?.country}
              </span>
              <span className="to__address">
                {row?.original?.shippingAddress?.phone_number}
              </span>
            </div>
            <div className="invoice__issue">
              <span className="invoice__title">Invoice</span>
              <span className="invoice__id">#{row?.original?.orderID}</span>
              <span className="invoice__date">
                {/* <Moment format="MMM D, YYYY" withTitle>
                  {row?.original?.createdAt}
                </Moment> */}
                July 20, 2023
              </span>
            </div>
          </div>

          <div className="invoice__content">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {row?.original?.orderItems?.map((items, index) => (
                  <tr key={items?._id}>
                    <td>{index + 1}</td>
                    <td>{items?.title}</td>
                    <td>{items?.price}</td>
                    <td>{items?.quantity}</td>
                    <td>{items?.quantity * items?.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Subtotal</td>
                  <td>{row?.original?.totalPrice}</td>
                </tr>
                <tr>
                  <td colSpan="4">Shipping</td>
                  <td>{row?.original?.shippingPrice}</td>
                </tr>
                <tr>
                  <td colSpan="4">Tax</td>
                  <td>{row?.original?.taxPrice}</td>
                </tr>
                <tr>
                  <td colSpan="4">Invoice Total</td>
                  <td>{row?.original?.totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="invoice__term">
            <span className="term">
              * Make all cheques payable to Placentic
            </span>
            <span className="term">
              * If you have any questions concerning this invoice, contact us.
            </span>
          </div>

          <hr />

          <div className="invoice__footer">
            <span className="footer__text">Thanks for shopping!</span>
            <div className="footer__contact">
              <span className="contact__website"></span>
              <span className="contact__phone"></span>
              <span className="contact__email"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
