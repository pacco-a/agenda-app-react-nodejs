import { useSelector } from "react-redux";
import "./App.sass";
import AddTaskFormContainer from "./components/AddTaskFormContainer";
import Header from "./components/Header";
import ScheduleContainer from "./components/schedule/ScheduleContainer";
import ScheduleNavigator from "./components/schedule/ScheduleNavigator";
import TaskItemPopupContainer from "./components/TaskItemPopupContainer";
import { RootState } from "./redux/store";

function App() {
    const { addTaskPopupOn, taskItemPopupOn } = useSelector(
        (state: RootState) => {
            return state.ui;
        }
    );

    return (
        <div className="App">
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
