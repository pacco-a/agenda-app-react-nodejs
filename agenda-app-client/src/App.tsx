import { useSelector } from "react-redux";
import "./App.sass";
import AddTaskFormContainer from "./components/AddTaskFormContainer";
import Header from "./components/Header";
import ScheduleContainer from "./components/schedule/ScheduleContainer";
import ScheduleNavigator from "./components/schedule/ScheduleNavigator";
import { RootState } from "./redux/store";

function App() {
    const { addTaskPopupOn } = useSelector((state: RootState) => {
        return state.ui;
    });

    return (
        <div className="App">
            {/* container-popup pour le formulaire d'ajout de tâche */}
            {addTaskPopupOn && <AddTaskFormContainer />}

            <Header />
            <ScheduleNavigator />
            <ScheduleContainer />
        </div>
    );
}

export default App;
