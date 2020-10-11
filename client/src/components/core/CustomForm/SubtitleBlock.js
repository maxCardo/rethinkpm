import React from "react";

const SubtitleBlock = ({item}) => {
 return (
   <div className="formBox">
     <h4 className="form-subtitle">{item.name}</h4>
     {item.description && <p>{item.description}</p>}
   </div>
 )
}

export default SubtitleBlock;