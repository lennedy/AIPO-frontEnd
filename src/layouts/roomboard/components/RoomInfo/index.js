import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

const RoomInfo = ({ image, name, codigo }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{codigo}</MDTypography>
    </MDBox>
  </MDBox>
);

// Setting default props for the Header
RoomInfo.defaultProps = {
  name: "",
  codigo: "",
};

// Typechecking props for the Header
RoomInfo.propTypes = {
  image: PropTypes.string,
  codigo: PropTypes.string,
  name: PropTypes.string,
};

export default RoomInfo;
