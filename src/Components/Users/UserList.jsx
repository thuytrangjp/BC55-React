import React from 'react';
export default function UserList({users, handleBoxMode, handleSelectedUser, handleDeleteUser}) {
    const handleOnEditClick = (user) => {
        handleBoxMode("edit");
        handleSelectedUser(user);
    }
    const handleOnDeleteClick = (user) => {
        handleDeleteUser(user);
    }
    return (
        <div className="list mb-5" id="users-list">
            <table className="list__header table mb-3">
                <thead>
                    <tr>
                        <th className="text-center">Std No.</th>
                        <th>Full Name</th>
                        <th>Tel Phone</th>
                        <th>Email</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                {users && (
                <tbody className="list__records">
                    {users.map(user => {
                        const { id, code, fullName, telephone, email } = user;
                        return (
                            <tr key={id} className="align-middle">
                                <td className="text-center">{code}</td>
                                <td>{fullName}</td>
                                <td>{telephone}</td>
                                <td>{email}</td>
                                <td>
                                    <div className="row g-0 gap-3">
                                        <button className="btn btn-primary col"
                                                onClick={() => handleOnEditClick(user)}
                                        >Edit</button>
                                        <button className="btn btn-danger col"
                                                onClick={() => handleOnDeleteClick(user)}
                                        >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    )}
                </tbody>
                )}
            </table>
            {!users && (<div className="list__no-records text-center"><p>No Records</p></div>)}
        </div>
    );
}