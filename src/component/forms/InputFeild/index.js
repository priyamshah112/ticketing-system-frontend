import React from "react";

function InputFeild(props) {

    const { onChange, disabled=false, label, id="", name, type="text", value, className="form-control ", mandatory = false } = props;
    return(
        <>
            {label && <label>{label}{mandatory  && <span className="text-danger"> * </span>}</label>}
            <input id={id} disabled={disabled} onChange={(e) => onChange(e)} name={name} value={value} type={type} className={className} />
        </>
    )

}

export default InputFeild;