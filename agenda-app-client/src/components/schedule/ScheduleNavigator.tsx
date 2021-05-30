import { Button, TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setDate } from "../../redux/tasks";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

/**
 * navigateur (changer semaine, avance, reculer, etc)
 */
const ScheduleNavigator = () => {
    const { currentDate } = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();

    return (
        <div id="schedule-navigator">
            <Button
                variant="contained"
                onClick={(e) => {
                    dispatch(
                        setDate(
                            dayjs(`${currentDate.substring(0, 10)} 00:00`)
                                .subtract(7, "days")
                                .format("YYYY-MM-DD")
                        )
                    );
                }}
            >
                <AiOutlineArrowLeft />
            </Button>

            <DatePicker
                format="DD/MM/YYYY"
                value={dayjs(currentDate)}
                onChange={(targetdate) => {
                    // si la date est invalide, skip
                    if (!targetdate) {
                        return;
                    }

                    dispatch(setDate(targetdate.format("YYYY-MM-DD")));
                }}
            />

            <Button
                onClick={(e) => {
                    dispatch(setDate(dayjs(Date.now()).format("YYYY-MM-DD")));
                }}
                variant="contained"
            >
                Semaine actuelle
            </Button>

            <Button
                variant="contained"
                onClick={(e) => {
                    dispatch(
                        setDate(
                            dayjs(`${currentDate.substring(0, 10)} 00:00`)
                                .add(7, "days")
                                .format("YYYY-MM-DD")
                        )
                    );
                }}
            >
                <AiOutlineArrowRight />
            </Button>
        </div>
    );
};

export default ScheduleNavigator;
