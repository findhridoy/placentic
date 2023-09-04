import React from "react";
import Moment from "react-moment";

const DashboardOrderDetails = ({ row }) => {
  return (
    <div className="dashboardOrderDetails">
      <div className="dashboardOrderDetails__header">
        <div className="dashboardOrderDetails__address">
          <span className="customer">{row?.original?.customer?.name}</span>

          {row?.original?.deliveryStatus === "free" ? (
            <span className="address">__Store Pickup</span>
          ) : (
            <>
              <span className="address">
                {row?.original?.shippingAddress?.address}
              </span>
              <span className="address">
                {row?.original?.shippingAddress?.city} -{" "}
                {row?.original?.shippingAddress?.zip_code},{" "}
                {row?.original?.shippingAddress?.country}
              </span>
              <span className="address">
                {row?.original?.shippingAddress?.phone_number}
              </span>
            </>
          )}
        </div>

        <div className="dashboardOrderDetails__issue">
          <span className="order__id">
            Order ID: <strong> #{row?.original?.orderID}</strong>
          </span>
          <span className="order__date">
            Date:{" "}
            <Moment format="MMM D, YYYY" withTitle>
              {row?.original?.createdAt}
            </Moment>
          </span>

          <span className="order__id">
            Status:{" "}
            {row?.original?.paymentResult?.status === "succeeded" ? (
              <strong>Paid</strong>
            ) : (
              <strong>Athorized</strong>
            )}
          </span>
        </div>
      </div>

      <div className="dashboardOrderDetails__content">
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
              <td>
                {(
                  row?.original?.totalPrice -
                  row?.original?.shippingPrice -
                  row?.original?.taxPrice
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="4">Shipping</td>
              <td>{(row?.original?.shippingPrice).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4">Tax</td>
              <td>{(row?.original?.taxPrice).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4">Total</td>
              <td>{(row?.original?.totalPrice).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* <div className="dashboardOrderDetails__term">
        <span className="term">* Make all cheques payable to Placentic</span>
        <span className="term">
          * If you have any questions concerning this dashboardOrderDetails, contact us.
        </span>
      </div> */}

      {/* <hr /> */}

      {/* <div className="dashboardOrderDetails__footer">
        <span className="footer__text">Thanks for shopping!</span>
        <div className="footer__contact">
          <span className="contact__website">
            <LanguageIcon />
            <span>www.placentic.com</span>
          </span>
          <span className="contact__phone">
            <PhoneIcon />
            <span>+8801647550708</span>
          </span>
          <span className="contact__email">
            <EmailIcon />
            <span>placentic@gmail.com</span>
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardOrderDetails;
