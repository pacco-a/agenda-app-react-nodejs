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
                                .subtract(7, "days")
                                .format("YYYY-MM-DD")
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
                    dispatch(setDate(dayjs(Date.now()).format("YYYY-MM-DD")));
                }}
            >
                Semaine actuelle
            </button>
            <button
                onClick={(e) => {
                    dispatch(
                        setDate(
                            dayjs(currentDate)
                                .add(7, "days")
                                .format("YYYY-MM-DD")
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
