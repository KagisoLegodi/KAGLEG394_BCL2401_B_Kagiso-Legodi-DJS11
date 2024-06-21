import { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

export default function FileInput({ accept, id, fileHandleFnc, text }) {
  const [fileSelected, setFileSelected] = useState("");
 
  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
      >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}

FileInput.propTypes = {
  accept: PropTypes.string,      // accept should be a string
  id: PropTypes.string,          // id should be a string
  fileHandleFnc: PropTypes.func, // fileHandleFnc should be a function
  text: PropTypes.string         // text should be a string
};
