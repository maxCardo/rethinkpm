import React from "react";

const FileInput = ({register, item}) => {

  return <input name={item.name} type="file" ref={register} />

}

export default FileInput


