import React, {useEffect, useRef, useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import UserList from "./UserList";
import UserSearchBox from "./UserSearchBox";
import UserCreateEdit from "./UserCreateEdit";

const PAGE_NAME = 'User List';
const BASE_URL = 'https://my-json-server.typicode.com/thuytrangjp/bc55-json';
export default function UserController() {
    const [ mode, setMode ] = useState("search");
    const [ users, setUsers ] = useState([]);
    const [ selectedUser, setSelectedUser ] = useState("");
    const [ debounceSearchTerm, setDebounceSearchTerm ] = useState({});
    const [ displayLimit, setDisplayLimit ] = useState("10");

    const timer = useRef();

    const handleBoxMode = (mode) => setMode(mode);
    const handleSelectedUser = (user) => setSelectedUser(user);
    const handleSearch = (values) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setDebounceSearchTerm(values)
        }, 300)
    };
    const handleUserLimit = (e) => {
        setDisplayLimit(e.target.value);
    }

    useEffect(() => {
        fetchUsers();
    }, [debounceSearchTerm, displayLimit]);

    const fetchUsers = async (excludeId) => {
        try {
            const params = {
                id: debounceSearchTerm.id || undefined,
                fullName_like: debounceSearchTerm.fullName || undefined,
                telephone_like: debounceSearchTerm.telephone || undefined,
                email_like: debounceSearchTerm.email || undefined,
                _limit: displayLimit || undefined,
                _sort: "id",
                _order: "desc",
                id_ne: excludeId || undefined,
            };

            const res =  await axios.get(`${BASE_URL}/users`, { params });
            setUsers(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleCreateUser = async (user) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, user);
            if ( res.status >= 200 && res.status < 300 ) {
                setUsers([res.data, ...users] );
                toast.success("Successfully created! 😄 (Temporary...)");
            } else {
                toast.error("Failed to create 😢");
            }
        } catch (e) {
            toast.error("Something went wrong... 😥");
        }
    }
    const handleEditUser = async (user) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${user.id}`, user);
            if ( res.status >= 200 && res.status < 300 ) {
                let targetIndex = users.findIndex(target => target.id === user.id);
                users.splice(targetIndex, 1, user);
                setUsers([ ...users ]);
                toast.success("Successfully edited! 😄 (Temporary...)");
            } else {
                toast.error("Failed to edit 😢");
            }
        } catch (e) {
            toast.error("Something went wrong... 😥");
        }
    }

    const handleDeleteUser = async (user) => {
        try {
            const res = await axios.delete(`${BASE_URL}/users/${user.id}`);

            if ( res.status >= 200 && res.status < 300 ) {
                fetchUsers(user.id);
                setSelectedUser("")
                toast.success("Successfully deleted! 😄 (Temporary...)");
            } else {
                toast.error("Failed to delete 😢");
            }
        } catch (e) {
            toast.error("Something went wrong... 😥");
        }
    }

    return (
        <div className="management-page" id="user-management">
            <Toaster position="top-right" />
            { mode === "search" && ( <UserSearchBox pageTitle={PAGE_NAME}
                                                    handleSearch={handleSearch}
                                                    handleBoxMode={handleBoxMode}/> ) }
            { (mode === "create" || mode === "edit")
                                && ( <UserCreateEdit pageTitle={PAGE_NAME}
                                                     mode={mode}
                                                     selectedUser={selectedUser}
                                                     handleBoxMode={handleBoxMode}
                                                     handleCreateUser={handleCreateUser}
                                                     handleEditUser={handleEditUser}/> ) }
            <div className="row g-0 align-items-center mb-2">
                <div className="col-1">
                    <p className="px-2 mb-0">Display: </p>
                </div>
                <div className="col-2">
                    <select className="form-select" name="userLimit" id="userLimit" value="10" onChange={handleUserLimit}>
                        <option value="5">5 records</option>
                        <option value="10">10 records</option>
                        <option value="20">20 records</option>
                        <option value="30">30 records</option>
                    </select>
                </div>
            </div>
            <UserList users={users} handleBoxMode={handleBoxMode}
                      handleSelectedUser={handleSelectedUser}
                      handleDeleteUser={handleDeleteUser}
            />
        </div>
    );
}