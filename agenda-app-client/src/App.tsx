import "./App.sass";
import { useDispatch, useSelector } from "react-redux";
import ScheduleContainer from "./components/ScheduleContainer";
import { RootState } from "./redux/store";
import { setDate } from "./redux/tasks";

function App() {
    const { currentDate } = useSelector((state: RootState) => {
        return state.tasks;
    });

    const dispatch = useDispatch();

    return (
        <div className="App">
            <input
                onChange={(e) => {
                    // si la date est invalide, skip
                    if (isNaN(Date.parse(e.target.value))) {
                        return;
                    }

                    dispatch(setDate(e.target.value));
                }}
                value={currentDate}
                type="date"
            />

            <ScheduleContainer
                selectedDate={new Date(currentDate).toISOString()}
            />
            <button
                onClick={(e) => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() + 1);
                    dispatch(setDate(newDate.toISOString().substring(0, 10)));
                }}
            >
                Date++
            </button>
        </div>
    );
}

export default App;
