import React, {useEffect, useState} from 'react';
export default function UserSearchBox( { pageTitle, handleSearch, handleBoxMode }) {
    const emptyValues = {
        code: "",
        fullName: "",
        telephone: "",
        email: "",
    }
    const [ searchTerm, setSearchTerm ] = useState(emptyValues);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSearchTerm((searchTerm) => {
            return { ...searchTerm, [name]: value}
        });
    }

    const handleOnClear = () => {
        setSearchTerm(emptyValues);
    }
    const handleClickModeBtn = (mode) => {
        handleOnClear();
        setTimeout(() => handleBoxMode(mode), 300);
    }

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm])


    return (
        <div className="search-box mb-5" id="user-search-box">
            <div className="card card-body">
                <div className="row g-0 justify-content-between align-items-center border-bottom px-2 pb-3 mb-4" id="page-info">
                    <div className="col-6 card_title" id="page-title"><h4 className="mb-0">{pageTitle}</h4></div>
                    <div className="col-6 row g-0 gap-3 card_buttons justify-content-end" id="page-action-buttons">
                        <button className="col-3 btn btn-success" onClick={() => handleClickModeBtn("create")}>
                            <i className="bi bi-plus pe-2"></i>To Create
                        </button>
                    </div>
                </div>
                <div className="row g-0 justify-content-between border-bottom pb-2 mb-3" id="search-box">
                    <div className="row g-0 mb-3 px-3">
                        <div className="col-6 row g-0">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="searchByCode">Std. No</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="code"
                                           id="searchByCode"
                                           value={searchTerm.code}
                                           onChange={handleOnChange}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row g-0 justify-content-end">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="searchByFullName">Full Name</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="fullName"
                                           id="searchByFullName"
                                           value={searchTerm.fullName}
                                           onChange={handleOnChange}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 mb-3 px-3">
                        <div className="col-6 row g-0">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="searchByTelephone">Tel Phone</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="telephone"
                                           id="searchByTelephone"
                                           value={searchTerm.telephone}
                                           onChange={handleOnChange}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row g-0 justify-content-end">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <label htmlFor="searchByEmail">Email</label>
                                </div>
                                <div className="col-9">
                                    <input type="text" className="form-control"
                                           name="email"
                                           id="searchByEmail"
                                           value={searchTerm.email}
                                           onChange={handleOnChange}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-0 card_buttons justify-content-end px-1" id="page-action-buttons">
                    <div className="col-6 row g-0 gap-3"></div>
                    <div className="col-6 row g-0 gap-3 justify-content-end">
                        <button className="col-3 btn btn-secondary" onClick={handleOnClear}>
                            <i className="bi bi-x pe-2"></i>Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}