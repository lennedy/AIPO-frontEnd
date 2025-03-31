/* import React from "react";
import Popup from "reactjs-popup";

const Modal = () => (
  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    <span> Modal content </span>
  </Popup>
);

        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>


 */
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";

export default () => (
  <Popup
    trigger={
      <MDTypography component="a" href="#" color="text">
        <Icon>more_vert</Icon>
      </MDTypography>
    }
    modal
    nested
  >
    {(close) => (
      //<MDBox display="flex" alignItems="center" lineHeight={1}></MDBox>
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {" "}
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
      //</MDBox>
    )}
  </Popup>
);
