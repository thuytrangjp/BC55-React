import React, {useEffect, useState} from 'react';

const emptyValues = {
    code: "",
    fullName: "",
    telephone: "",
    email: "",
}
export default function UserCreateEdit( { pageTitle, mode, selectedUser,
                                            handleBoxMode, handleCreateUser, handleEditUser }) {
    const [ formValues, setFormValues] =  useState(emptyValues);
    const [ formErrors, setFormErrors] =  useState(emptyValues);

    useEffect(() => {
        setFormErrors(emptyValues);
        if (mode !== "edit" || !selectedUser) {
            setFormValues(emptyValues);
            return;
        }
        let { code, fullName, telephone, email } = selectedUser;
        setFormValues({ code, fullName, telephone, email });
    },[selectedUser, mode]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
    }
    const handleOnBlur = (e) => {
        const { name, value } = e.target;
        handleValidation(name, value);
    }

    const handleOnClick = () => {
        let isValid = true;
        let target = {...formValues};

        //Check any changed value for validation
        for (let key in target) {
            const bool = handleValidation(key, target[key]);
            isValid = isValid && !bool;
        }

        if (!isValid) return;
        // Need to send other data of user Info after destructuring
        let selectedUserInfo = (mode === "edit") ? { ...selectedUser } : {};

        //Create final object about to be sent
        const sentObj = { ...selectedUserInfo, ...formValues, created_at: new Date() };
        (mode === "edit") ? handleEditUser(sentObj) : handleCreateUser(sentObj);
    }

    const handleValidation = (key, value) => {
        let hasErrors = false;
        let errors = {};
        let oldValues = {...selectedUser};

        let keyAlt = document.querySelector(`label[for="${key}"]`).textContent;
        if (key === "code") {
            keyAlt = "Student No";
            switch (true) {
                case mode === "create" && value.trim() === "": errors.code = `${keyAlt} is a required field`; break;
                case mode === "edit" && value.trim() !== "" && value !== oldValues[key]:
                    errors.code = `Cannot edit ${keyAlt}`; break;
                default: errors.code =""; break;
            }
        }
        else if (key === "fullName") {
            switch (true) {
                case value.trim() === "": errors.fullName = `${keyAlt} is a required field`; break;
                default: errors.fullName =""; break;
            }
        }
        else if (key === "telephone") {
            const VALID_REGEX = /^[+]*[(]?[0-9]{1,3}[)]?[-\s./0-9]*$/;
            switch (true) {
                case value.trim() === "": errors.telephone = `${keyAlt} is a required field`; break;
                case !VALID_REGEX.test(value):
                            errors.telephone = `${keyAlt} only accepts any valid telephone format`; break;
                default: errors.telephone =""; break;
            }
        }
        else if (key === "email") {
            const VALID_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            switch (true) {
                case value.trim() === "": errors.email = `${keyAlt} is a required field`; break;
                case !VALID_REGEX.test(value):
                            errors.email = `${keyAlt} only accepts any valid email format`; break;
                default: errors.email =""; break;
            }
        }

        if (errors[key]) hasErrors = true;
        setFormErrors( (formErrors) => {
            return { ...formErrors, ...errors }
        })

        return hasErrors;
    }

    return (
        <div className="search-box mb-5" id="user-search-box">
            <div className="card card-body">
                <div className="row g-0 justify-content-between align-items-center border-bottom px-2 pb-3 mb-4" id="page-info">
                    <div className="col-6 card_title" id="page-title">
                        <h4 className="mb-0">
                            {pageTitle} - {mode === "edit" ? `Edit Mode - ${formValues.fullName}` : "Create Mode"}</h4>
                    </div>
                    <div className="col-6 row g-0 gap-3 card_buttons justify-content-end" id="page-action-buttons">
                        <button className="col-3 btn btn-primary" onClick={() => handleBoxMode("search", true)}>
                            <i className="bi bi-search pe-2"></i>To Search
                        </button>
                        {mode === "edit" &&
                            <button className="col-3 btn btn-success" onClick={() => handleBoxMode("create")}>
                                <i className="bi bi-plus pe-2"></i>To Create
                            </button>}
                    </div>
                </div>
                <div className="row g-0 justify-content-between border-bottom pb-2 mb-3" id="search-box">
                    <div className="row g-0 mb-3 px-3 align-items-start">
                        <div className="col-6 row g-0">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="code">Std. No</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="code"
                                           id="code"
                                           value={formValues.code}
                                           onChange={handleOnChange}
                                           onBlur={handleOnBlur}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger">
                                    { formErrors.code &&
                                        <p className="pb-0 mb-0 ps-2" id="idErr">{formErrors.code}</p> }
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row g-0 justify-content-end">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="fullName">Full Name</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="fullName"
                                           id="fullName"
                                           value={formValues.fullName}
                                           onChange={handleOnChange}
                                           onBlur={handleOnBlur}
                                        />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger">
                                    { formErrors.fullName &&
                                        <p className="pb-0 mb-0 ps-2" id="fullNameErr">{formErrors.fullName}</p> }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 mb-3 px-3 align-items-start">
                        <div className="col-6 row g-0">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="telephone">Tel Phone</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="telephone"
                                           value={formValues.telephone}
                                           onChange={handleOnChange}
                                           onBlur={handleOnBlur}
                                        />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger">
                                    { formErrors.telephone &&
                                        <p className="pb-0 mb-0 ps-2" id="telephoneErr">{formErrors.telephone}</p> }
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row g-0 justify-content-end">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="email"
                                           id="email"
                                           value={formValues.email}
                                           onChange={handleOnChange}
                                           onBlur={handleOnBlur}
                                        />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                </div>
                                <div className="col-9 text-danger">
                                    { formErrors.email &&
                                        <p className="pb-0 mb-0 ps-2" id="emailErr">{formErrors.email}</p> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-0 card_buttons justify-content-end px-1" id="page-action-buttons">
                    <div className="col-6 row g-0 gap-3"></div>
                    <div className="col-6 row g-0 gap-3 justify-content-end">
                        <button className="col-3 btn btn-secondary"
                                onClick={handleOnClick}
                        ><i className={ mode === "edit" ? "bi bi-pencil pe-2" : "bi bi-plus pe-2"}></i>
                            {mode === "edit" ? "Edit" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}