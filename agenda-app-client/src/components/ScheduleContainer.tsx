import React, { FunctionComponent } from "react";

interface ScheduleContainerProps {
    selectedDate: Date;
}

const ScheduleContainer: FunctionComponent<ScheduleContainerProps> = ({
    selectedDate,
}) => {
    return (
        <div id="schedule-container">
            {selectedDate.toISOString().substring(0, 10)}
        </div>
    );
};

export default ScheduleContainer;
