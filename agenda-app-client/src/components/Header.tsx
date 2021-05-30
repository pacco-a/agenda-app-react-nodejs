import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleAddTaskPopup } from "../redux/ui";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <header>
            <h1>Agenda App</h1>
            <Button
                variant="outlined"
                onClick={(e) => {
                    dispatch(toggleAddTaskPopup());
                }}
            >
                Ajouter une tâche
            </Button>
        </header>
    );
};

export default Header;
