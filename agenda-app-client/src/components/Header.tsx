import { useDispatch } from "react-redux";
import { toggleAddTaskPopup } from "../redux/ui";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Agenda App</h1>
            <button
                onClick={(e) => {
                    dispatch(toggleAddTaskPopup());
                }}
            >
                Ajouter une tâche
            </button>
        </div>
    );
};

export default Header;