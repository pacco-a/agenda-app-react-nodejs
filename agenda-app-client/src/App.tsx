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
            <ScheduleContainer selectedDate={new Date(currentDate)} />
            <button
                onClick={(e) => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() + 1);
                    dispatch(setDate(newDate.toISOString()));
                }}
            >
                Date++
            </button>
        </div>
    );
}

export default App;
