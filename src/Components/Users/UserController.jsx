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

    const handleBoxMode = (mode, reload) => {
        if (reload) toast.success("Fake data reloaded! \nSorry but this is just a beta 😣", {icon: "⚡️"});
        setMode(mode);
    }
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
        fetchUsers().then();
    }, [debounceSearchTerm, displayLimit]);

    const fetchUsers = async (excludeId) => {
        try {
            const params = {
                code_like: debounceSearchTerm.code || undefined,
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
                //Do this to fake the result of the creating process
                //Remove the last user to keep the list length as same as the current display limit
                let modifiedUsers = [...users];
                modifiedUsers.pop();
                //Append the new user to the start of the list
                res.data.id = users[0].id + 1;
                setUsers([res.data, ...modifiedUsers] );
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
            // Fake a success status and skip calling axios if userId above 30
            // Since the typicode.com services will return 404 in this case
            const res = (user.id > 30) ?
                { status: 200 } :
                await axios.delete(`${BASE_URL}/users/${user.id}`)

            if ( res.status >= 200 && res.status < 300 ) {
                await handleDeleteAndGetNewLastUser(user);
                toast.success("Successfully deleted! 😄 (Temporary...)");
            } else {
                toast.error("Failed to delete 😢");
            }
        } catch (e) {
            toast.error("Something went wrong... 😥", e);
        }
    }

    const handleDeleteAndGetNewLastUser = async (user) => {
        //Do this to fake the result of the deleting process
        //Not working in some testcases (for now)
        let modifiedUsers = [...users];
        let nextLastUserId = modifiedUsers[modifiedUsers.length - 1].id - 1;

        //If the next user is in the available list of typicode then continue
        //If the next user is in the fake list created by JS, then just assign the next id to 30 to avoid 404 error
        if (nextLastUserId <= 30) {
            let targetIndex = users.findIndex(target => target.id === user.id);

            //Delete the target out of the list
            modifiedUsers.splice(targetIndex, 1);
            setSelectedUser("");
        } else {
            nextLastUserId = 30;
        }

        if (nextLastUserId > 0) {
            //Append the next user into the end of the list if still available from the server
            const res = await axios.get(`${BASE_URL}/users/${nextLastUserId}`);
            setUsers([...modifiedUsers, res.data] );
        } else {
            //No more available users from the server, so just show the left records
            setUsers([...modifiedUsers] );
        }
    }
    return (
        <div className="management-page" id="user-management">
            <Toaster position="top-right" />
            { mode === "search" && ( <UserSearchBox pageTitle={PAGE_NAME + " - Search Mode"}
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
                    <select className="form-select" name="userLimit" id="userLimit" value={displayLimit} onChange={handleUserLimit}>
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