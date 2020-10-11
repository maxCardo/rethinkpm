import React from "react";
import PropTypes from "prop-types";

const FileInput = ({register, item}) => {

  return <input name={item.name} type="file" ref={register} />

}

FileInput.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

export default FileInput


