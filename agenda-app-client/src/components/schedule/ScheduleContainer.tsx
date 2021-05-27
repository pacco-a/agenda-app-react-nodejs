import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCurrentDateTasks } from "../../redux/tasks";
import ScheduleColumn from "./ScheduleColumn";

/**
 * conteneur des colonnes de tâches
 */
const ScheduleContainer: FunctionComponent = () => {
    const { currentTasks, currentDate } = useSelector((state: RootState) => {
        return state.tasks;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentDateTasks(currentDate));
    }, [currentDate, dispatch]);

    return (
        <div id="schedule-container">
            <ScheduleColumn
                dayIdentifier="mon"
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 1
                )}
            />
            <ScheduleColumn
                dayIdentifier="tue"
                tasks={currentTasks.filter((task) => {
                    return new Date(task.date).getDay() === 2;
                })}
            />
            <ScheduleColumn
                dayIdentifier="wed"
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 3
                )}
            />
            <ScheduleColumn
                dayIdentifier="thu"
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 4
                )}
            />
            <ScheduleColumn
                dayIdentifier="fri"
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 5
                )}
            />
            <ScheduleColumn
                dayIdentifier="other"
                tasks={currentTasks.filter(
                    (task) =>
                        new Date(task.date).getDay() === 6 ||
                        new Date(task.date).getDay() === 0
                )}
            />
        </div>
    );
};

export default ScheduleContainer;
