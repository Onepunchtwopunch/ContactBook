import React, { useContext, useEffect } from "react";
import { contactContext } from "../../ContactContext";
import classes from "../contact.module.css";
import ContactEdit from "./ContactEdit";
import ContactItem from "./ContactItem";

const ContactList = () => {
    const { contactList, fetchContacts, editId } = useContext(contactContext);

    useEffect(() => {
        fetchContacts();
    }, []);
    console.log(contactList);

    return (
        <ul className={classes.contactList}>
            <h1>Contacts</h1>
            {contactList.map((contact) =>
                contact.id === editId ? (
                    <ContactEdit data={contact} key={contact.id} />
                ) : (
                    <ContactItem data={contact} key={contact.id} />
                )
            )}
        </ul>
    );
};

export default ContactList;
