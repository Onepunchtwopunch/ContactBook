import React, { useContext } from "react";
import { contactContext } from "../../ContactContext";
import cancelImg from "../../assets/icons/cancel.svg";
import editImg from "../../assets/icons/pencil.svg";
import classes from "../contact.module.css";

const ContactItem = (props) => {
    const { name, phone, pic, id } = props.data;

    const { deleteContact, changeEditId } = useContext(contactContext);

    const handleDelete = () => {
        deleteContact(id);
    };

    return (
        <li>
            <img className={classes.avatar} src={pic} alt="avatar" />
            <h3>
                {name} {phone}
            </h3>
            <img
                onClick={handleDelete}
                className={classes.cancelIcon}
                src={cancelImg}
                alt="cancel-img"
            />
            <img
                onClick={() => changeEditId(id)}
                className={classes.editIcon}
                src={editImg}
                alt="edit-img"
            />
        </li>
    );
};

export default ContactItem;
