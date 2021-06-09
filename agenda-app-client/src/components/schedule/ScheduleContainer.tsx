import { Paper } from "@material-ui/core";
import dayjs from "dayjs";
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

    const { isLogIn } = useSelector((state: RootState) => {
        return state.users;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLogIn) {
            dispatch(fetchCurrentDateTasks(currentDate));
        }
    }, [currentDate, isLogIn, dispatch]);

    /**
     * renvoi le petit (05/11) a coté du jour
     */
    const getDayInfo = (dayIndex: number): string => {
        if (dayjs(`${currentDate.substring(0, 10)} 00:00`).day() !== 0) {
            return `${dayjs(`${currentDate.substring(0, 10)} 00:00`)
                .day(dayIndex)
                .format("DD/MM")}`;
        } else {
            return `${dayjs(`${currentDate.substring(0, 10)} 00:00`)
                .subtract(1, "day")
                .day(dayIndex)
                .format("DD/MM")}`;
        }
    };

    return (
        <Paper variant="outlined" id="schedule-container">
            <ScheduleColumn
                dayIdentifier={`Lundi ${getDayInfo(1)}`}
                tasks={currentTasks.filter((task) => {
                    return (
                        dayjs(`${task.date.substring(0, 10)} 00:00`).day() === 1
                    );
                })}
            />
            <ScheduleColumn
                dayIdentifier={`Mardi ${getDayInfo(2)}`}
                tasks={currentTasks.filter((task) => {
                    return (
                        dayjs(`${task.date.substring(0, 10)} 00:00`).day() === 2
                    );
                })}
            />
            <ScheduleColumn
                dayIdentifier={`Mercredi ${getDayInfo(3)}`}
                tasks={currentTasks.filter(
                    (task) =>
                        dayjs(`${task.date.substring(0, 10)} 00:00`).day() === 3
                )}
            />
            <ScheduleColumn
                dayIdentifier={`Jeudi ${getDayInfo(4)}`}
                tasks={currentTasks.filter(
                    (task) =>
                        dayjs(`${task.date.substring(0, 10)} 00:00`).day() === 4
                )}
            />
            <ScheduleColumn
                dayIdentifier={`Vendredi ${getDayInfo(5)}`}
                tasks={currentTasks.filter(
                    (task) =>
                        dayjs(`${task.date.substring(0, 10)} 00:00`).day() === 5
                )}
            />
            <ScheduleColumn
                dayIdentifier={`Autre`}
                tasks={currentTasks.filter(
                    (task) =>
                        dayjs(`${task.date.substring(0, 10)} 00:00`).day() ===
                            6 ||
                        dayjs(`${task.date.substring(0, 10)} 00:00`).day() === 0
                )}
            />
        </Paper>
    );
};

export default ScheduleContainer;
