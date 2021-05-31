import React, { useContext, useState } from "react";
import { contactContext } from "../../ContactContext";
import classes from "../contact.module.css";

const ContactEdit = (props) => {
    const {
        name: contactName,
        phone: contactPhone,
        pic: contactPic,
        id: id,
    } = props.data;

    const [name, setName] = useState(contactName);
    const [phone, setPhone] = useState(contactPhone);
    const [pic, setPic] = useState(contactPic);

    const { changeContactName, changeContactPhone, changeContactPic } =
        useContext(contactContext);

    const handleEdit = (e) => {
        e.preventDefault();
        changeContactName(id, name);
        changeContactPhone(id, phone);
        changeContactPic(id, pic);
    };

    return (
        <li className={classes.editingContact}>
            <form onSubmit={handleEdit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    required
                    value={name}
                />
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    required
                    value={phone}
                />
                <input
                    onChange={(e) => setPic(e.target.value)}
                    type="text"
                    name="pic"
                    required
                    value={pic}
                />
                <button>Edit</button>
            </form>
        </li>
    );
};

export default ContactEdit;
