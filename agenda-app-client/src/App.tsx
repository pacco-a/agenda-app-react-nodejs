import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleContainer from "./components/ScheduleContainer";
import { RootState } from "./redux/store";
import { setDate } from "./redux/tasks";

function App() {
    const { currentDate } = useSelector((state: RootState) => {
        return state.tasks;
    });

    // test state to delete
    const [testCounter, setTestCounter] = useState(0);

    const dispatch = useDispatch();

    return (
        <div className="App">
            <input
                onChange={(e) => {
                    dispatch(setDate(e.target.value));
                }}
                type="date"
            />
            <ScheduleContainer
                testCounter={testCounter}
                selectedDate={new Date(currentDate).toISOString()}
            />
            <button
                onClick={(e) => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() + 1);
                    dispatch(setDate(newDate.toISOString()));
                }}
            >
                Date++
            </button>
            <button
                onClick={(e) => {
                    setTestCounter(testCounter + 1);
                }}
            >
                Counter++
            </button>
        </div>
    );
}

export default App;
