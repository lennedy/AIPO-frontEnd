import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
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
      <Box>
        <MDBox className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <MDBox className="header"> Dados da porta </MDBox>
          <MDBox className="content" alignItems="left" lineHeight={1}>
            Nome da Sala:
            <form>
              <label htmlFor="color">
                <input type="text" name="name" />
              </label>
            </form>
          </MDBox>
          <MDBox className="content" alignItems="right" lineHeight={1}>
            Código da Sala:
            <form>
              <label htmlFor="color">
                <input type="text" name="name" />
              </label>
            </form>
          </MDBox>
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
        </MDBox>
      </Box>
    )}
  </Popup>
);
