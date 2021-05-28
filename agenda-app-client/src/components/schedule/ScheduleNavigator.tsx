import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setDate } from "../../redux/tasks";

/**
 * navigateur (changer semaine, avance, reculer, etc)
 */
const ScheduleNavigator = () => {
    const { currentDate } = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();

    return (
        <div id="schedule-navigator">
            <button
                onClick={(e) => {
                    dispatch(
                        setDate(
                            dayjs(currentDate)
                                .subtract(6, "days")
                                .toISOString()
                                .substring(0, 10)
                        )
                    );
                }}
            >
                ←
            </button>
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
            <button
                onClick={(e) => {
                    dispatch(
                        setDate(
                            new Date(Date.now()).toISOString().substring(0, 10)
                        )
                    );
                }}
            >
                Semaine actuelle
            </button>
            <button
                onClick={(e) => {
                    dispatch(
                        setDate(
                            dayjs(currentDate)
                                .add(8, "days")
                                .toISOString()
                                .substring(0, 10)
                        )
                    );
                }}
            >
                →
            </button>
        </div>
    );
};

export default ScheduleNavigator;
