import React from "react";

function InputFeild(props) {

    const { onChange, disabled=false, label, id="", name, type="text", value, className="form-control" } = props;

    return(
        <>
            {label && <label>{label}</label>}
            <input id={id} disabled={disabled} onChange={(e) => onChange(e)} name={name} value={value} type={type} className={className} />
        </>
    )

}

export default InputFeild;