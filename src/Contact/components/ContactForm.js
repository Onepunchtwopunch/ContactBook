import React, { useContext, useState } from "react";
import { contactContext } from "../../ContactContext";
import classes from "../contact.module.css";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [pic, setPic] = useState("");

    const { createContact } = useContext(contactContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            phone,
            pic,
        };
        console.log(data);
        createContact(data);
        setName("");
        setPhone("");
        setPic("");
    };

    return (
        <div className={classes.formWrapper}>
            <h1>Contact Book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    required
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                />
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={phone}
                />
                <input
                    onChange={(e) => setPic(e.target.value)}
                    required
                    type="text"
                    name="ava"
                    placeholder="URL..."
                    value={pic}
                />
                <button>SAVE</button>
            </form>
        </div>
    );
};

export default ContactForm;
