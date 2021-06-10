import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.sass";
import AddTaskFormContainer from "./components/AddTaskFormContainer";
import Header from "./components/Header";
import LoginPopupContainer from "./components/LoginPopupContainer";
import ScheduleContainer from "./components/schedule/ScheduleContainer";
import ScheduleNavigator from "./components/schedule/ScheduleNavigator";
import TaskItemPopupContainer from "./components/TaskItemPopupContainer";
import { RootState } from "./redux/store";
import { setLoginPopupOn } from "./redux/ui";
import { setIsLogin } from "./redux/users";

function App() {
    const dispatch = useDispatch();

    const { addTaskPopupOn, taskItemPopupOn, loginPopupOn } = useSelector(
        (state: RootState) => {
            return state.ui;
        }
    );

    // Checker s'il existe un cookie utilisateur, si oui
    // - setter l'utilisateur courant dans les states, sinon
    // - afficher le formulaire de login.
    useEffect(() => {
        const checkIfConnected = async () => {
            const isLogin = (await axios.get("/api/users/islogin")).data;

            if (isLogin) {
                dispatch(setLoginPopupOn(false));
                dispatch(setIsLogin(true));
            } else {
                dispatch(setLoginPopupOn(true));
                dispatch(setIsLogin(false));
            }
        };

        checkIfConnected();
    }, [dispatch]);

    return (
        <div className="App">
            {loginPopupOn && <LoginPopupContainer />}
            {/* container-popup pour le formulaire d'ajout de tâche */}
            {addTaskPopupOn && <AddTaskFormContainer />}
            {/* container-popup pour un item selectionné */}
            {taskItemPopupOn && <TaskItemPopupContainer />}

            <div id="main-container">
                <Header />
                <ScheduleNavigator />
                <ScheduleContainer />
            </div>
        </div>
    );
}

export default App;
