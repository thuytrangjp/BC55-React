import React, {useEffect, useState} from 'react';
export default function UserCreateEdit( { pageTitle, mode, selectedUser,
                                            handleBoxMode, handleCreateUser, handleEditUser }) {
    const emptyValues = {
        id: "",
        fullName: "",
        telephone: "",
        email: "",
    }

    const [ formValues, setFormValues] =  useState(emptyValues);

    useEffect(() => {
        if (mode !== "edit" || !selectedUser) return;
        setFormValues(selectedUser);
    },[selectedUser, mode]);

    const handleOnChange = (e) => {
        let values = {};
        switch (e.target.name) {
            case "id": values = { ...formValues, id: e.target.value }; break;
            case "fullName": values = { ...formValues, fullName: e.target.value }; break;
            case "telephone": values = { ...formValues, telephone: e.target.value }; break;
            case "email": values = { ...formValues, email: e.target.value }; break;
            default: break;
        }
        setFormValues(values);
    }

    const handleOnClick = () => {
        const datetime = new Date();
        const data = { ...formValues, created_at: datetime };
        (mode === "edit") ? handleEditUser(data) : handleCreateUser(data);
        setFormValues(emptyValues);
        handleBoxMode("search");
    }

    return (
        <div className="search-box mb-5" id="user-search-box">
            <div className="card card-body">
                <div className="row g-0 justify-content-between align-items-center border-bottom px-2 pb-3 mb-4" id="page-info">
                    <div className="col-6 card_title" id="page-title">
                        <h4 className="mb-0">{pageTitle} - {mode === "edit" ? "Edit" : "Create"} Mode</h4>
                    </div>
                    <div className="col-6 row g-0 gap-3 card_buttons justify-content-end" id="page-action-buttons">
                        <button className="col-3 btn btn-success" onClick={() => handleBoxMode("search")}>
                            <i className="bi bi-search pe-2"></i>To Search
                        </button>
                    </div>
                </div>
                <div className="row g-0 justify-content-between border-bottom pb-2 mb-3" id="search-box">
                    <div className="row g-0 mb-3 px-3">
                        <div className="col-6 row g-0">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label>Std. No</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="id"
                                           value={formValues.id}
                                           onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger pt-1">
                                    <p className="pb-0 mb-0 ps-2" id="idErr">Error Message</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row g-0 justify-content-end">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label>Full Name</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="fullName"
                                           value={formValues.fullName}
                                           onChange={handleOnChange}
                                        />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger pt-1">
                                    <p className="pb-0 mb-0 ps-2" id="fullNameErr">Error Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 mb-3 px-3">
                        <div className="col-6 row g-0">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label>Tel Phone</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="telephone"
                                           value={formValues.telephone}
                                           onChange={handleOnChange}
                                        />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger pt-1">
                                    <p className="pb-0 mb-0 ps-2" id="telephoneErr">Error Message</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row g-0 justify-content-end">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label>Email</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="email"
                                           value={formValues.email}
                                           onChange={handleOnChange}
                                        />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger pt-1">
                                    <p className="pb-0 mb-0 ps-2" id="emailErr">Error Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-0 card_buttons justify-content-end px-1" id="page-action-buttons">
                    <div className="col-6 row g-0 gap-3"></div>
                    <div className="col-6 row g-0 gap-3 justify-content-end">
                        <button className="col-3 btn btn-primary"
                                onClick={handleOnClick}
                        ><i className="bi bi-plus pe-2"></i>{mode === "edit" ? "Edit" : "Create"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}