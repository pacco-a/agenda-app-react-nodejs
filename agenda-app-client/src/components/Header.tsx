import { Button } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoginPopupOn, toggleAddTaskPopup } from "../redux/ui";
import { setIsLogin } from "../redux/users";

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
            <Button
                variant="outlined"
                color="secondary"
                onClick={(e) => {
                    axios
                        .get("/api/users/logout")
                        .then(() => {
                            dispatch(setIsLogin(false));
                            dispatch(setLoginPopupOn(true));
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }}
            >
                Deconnexion
            </Button>
        </header>
    );
};

export default Header;
