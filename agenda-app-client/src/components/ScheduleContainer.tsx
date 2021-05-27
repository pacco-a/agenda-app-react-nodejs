import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchCurrentDateTasks } from "../redux/tasks";

interface ScheduleContainerProps {
    selectedDate: string;
    testCounter: number;
}

const ScheduleContainer: FunctionComponent<ScheduleContainerProps> = ({
    selectedDate,
    testCounter,
}) => {
    const { currentTasks } = useSelector((state: RootState) => {
        return state.tasks;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentDateTasks(selectedDate));
    }, [selectedDate, dispatch]);

    return (
        <div id="schedule-container">
            {new Date(selectedDate).toISOString().substring(0, 10)} |||{" "}
            {testCounter}
            <br />
            <br />
            {currentTasks.map((task) => {
                return <div key={task.id}>{task.resume}</div>;
            })}
        </div>
    );
};

export default ScheduleContainer;
