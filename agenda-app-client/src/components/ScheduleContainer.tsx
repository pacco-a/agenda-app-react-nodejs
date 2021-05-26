import axios from "axios";
import React, { FunctionComponent, useEffect } from "react";

interface ScheduleContainerProps {
    selectedDate: string;
    testCounter: number;
}

const ScheduleContainer: FunctionComponent<ScheduleContainerProps> = ({
    selectedDate,
    testCounter,
}) => {
    useEffect(() => {
        const testFetch = async () => {
            const res = await axios.get(
                `/api/tasks/week?date=${new Date(selectedDate)
                    .toISOString()
                    .substring(0, 10)}`
            );

            console.log(res);
        };

        testFetch();
    }, [selectedDate]);

    return (
        <div id="schedule-container">
            {new Date(selectedDate).toISOString().substring(0, 10)} |||{" "}
            {testCounter}
        </div>
    );
};

export default ScheduleContainer;
