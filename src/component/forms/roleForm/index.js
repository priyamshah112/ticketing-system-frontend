import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputFeild from "../InputFeild";
import $ from "jquery";

function RoleForm(props) {

    const { submitHandler, setModal, urole } = props;
    const [role, setRole] = useState({ access: [] });
    const managers = useSelector(state => state.managers);

    const managerHandler = (id) => {
        let data = [];
        managers.map(m => {
            if ($(`#manager_${m.id}`).prop("checked")) {
                data.push({ manager_id: m.id, mode: $(`#manager_mode_${m.id}`).val() })
            }
        })
        setRole({ ...role, access: data })
    }

    useEffect(() => {
        if (urole) {
            const { access } = urole;
            managers.map(m => {
                access.map(a => {
                    if (m.id === a.manager_id) {
                        $(`#manager_mode_${m.id}`).val(a.mode)
                    }
                })
            })    
            managerHandler();
            return setRole(urole)
        }
    }, [urole])

    return (
        <form onSubmit={(e) => { e.preventDefault(); submitHandler(role) }}>
            <div className="row">
                <div className="col-12 mt-3">
                    <InputFeild
                        type="text"
                        label={<label>Role Name<span className="text-danger">*</span></label>}
                        value={role.role_name}
                        onChange={(e) => setRole({ ...role, role_name: e.target.value })}
                    />
                </div>

                <div className="col-lg-12 col-md-12 col-12 mt-4">
                    <label className="mb-2">Managers<span className="text-danger">*</span></label>
                    {
                        managers && managers.map((m, i) => {
                            return (
                                <div className="row mt-1 align-items-center mb-4">
                                    <div className="col-lg-6 col-md-6 col-6">
                                        <label>
                                            <input onChange={() => managerHandler()} id={`manager_${m.id}`} type="checkbox" name="name" />
                                            <span className="pl-2">{m.manager_name}</span>
                                        </label>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-6">
                                        <select className="form-control" id={`manager_mode_${m.id}`} onChange={(e) => managerHandler()}>
                                            <option value={"V"}>View</option>
                                            <option value={"E"}>Write</option>
                                        </select>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-12">
                    <div className="pull-right">
                        <button className="btn btn-success" type="submit">Submit</button>
                        <button className="btn btn-danger ml-4" type="button" onClick={() => { setModal(false) }}>Close</button>
                    </div>
                </div>
            </div>

        </form>
    )

}

export default RoleForm;