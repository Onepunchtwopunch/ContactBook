import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
    contactList: [],
    editContactId: null,
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "SET_CONTACTLIST":
            return {
                ...state,
                contactList: action.payload,
            };
        case "ADD_CONTACT":
            return {
                ...state,
                contactList: [...state.contactList, action.payload],
            };
        case "DELETE_CONTACT":
            return {
                ...state,
                contactList: state.contactList.filter(
                    (contact) => contact.id !== action.payload
                ),
            };
        case "CHANGE_EDIT_ID":
            return {
                ...state,
                editContactId: action.payload,
            };
        case "EDIT_CONTACT":
            return {
                ...state,
                contactList: state.contactList.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };

        default:
            return state;
    }
};

export const contactContext = React.createContext();

const URL = "http://localhost:8000";

export default function ContactContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const fetchContacts = async () => {
        const response = await axios.get(`${URL}/person`);
        console.log("server data: ", response.data);

        const contacts = response.data;
        dispatch({
            type: "SET_CONTACTLIST",
            payload: contacts,
        });
    };
    const createContact = async (contact) => {
        const { data } = await axios.post(`${URL}/person`, contact);
        dispatch({
            type: "ADD_CONTACT",
            payload: data,
        });
    };
    const deleteContact = async (id) => {
        await axios.delete(`${URL}/person/${id}`);
        dispatch({
            type: "DELETE_CONTACT",
            payload: id,
        });
    };
    const changeEditId = (id) => {
        dispatch({
            type: "CHANGE_EDIT_ID",
            payload: id,
        });
    };

    const changeContactName = async (id, name) => {
        const { data } = await axios.patch(`${URL}/person/${id}`, { name });
        dispatch({
            type: "EDIT_CONTACT",
            payload: data,
        });
        changeEditId(null);
    };
    const changeContactPhone = async (id, phone) => {
        const { data } = await axios.patch(`${URL}/person/${id}`, { phone });
        dispatch({
            type: "EDIT_CONTACT",
            payload: data,
        });
        changeEditId(null);
    };
    const changeContactPic = async (id, pic) => {
        const { data } = await axios.patch(`${URL}/person/${id}`, { pic });
        dispatch({
            type: "EDIT_CONTACT",
            payload: data,
        });
        changeEditId(null);
    };

    return (
        <contactContext.Provider
            value={{
                contactList: state.contactList,
                editId: state.editContactId,
                fetchContacts,
                createContact,
                deleteContact,
                changeEditId,
                changeContactName,
                changeContactPhone,
                changeContactPic,
            }}
        >
            {props.children}
        </contactContext.Provider>
    );
}
