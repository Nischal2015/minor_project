import React from "react";
import Card from "../Card/Card";
import styles from "./Modal.module.scss";
import { IoCloseSharp } from "react-icons/io5";
import PostBid from "./PostBid";
import ViewBid from "./ViewBid";

const Modal = ({ open, openHandler, projectId, data }) => {
  let popupStyle = { visibility: "visible", opacity: "1" };
  let contentStyle = {
    opacity: "1",
    transform: "translate(-50%, -50%) scale(1)",
  };
  return (
    <div className={styles.popup} style={open ? popupStyle : {}}>
      <Card
        className={styles.popup__content}
        variant='boxy'
        style={open ? contentStyle : {}}
      >
        <div className={styles["popup__content--header"]}>
          <IoCloseSharp
            onClick={openHandler}
            className={styles["popup__content--close"]}
            title='Close'
          >
            Close
          </IoCloseSharp>
        </div>
        <div className={styles["popup__content--body"]}>
          {data.length === 0 ? (
            <PostBid projectId={projectId} />
          ) : (
            <ViewBid data={data[0]} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Modal;
