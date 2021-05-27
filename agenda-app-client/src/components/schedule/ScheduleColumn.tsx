import { FunctionComponent } from "react";
import { ITask } from "../../redux/tasks";
import ScheduleItem from "./ScheduleItem";

interface ScheduleColumnProps {
    dayIdentifier: string;
    tasks: ITask[];
}

const ScheduleColumn: FunctionComponent<ScheduleColumnProps> = ({
    dayIdentifier,
    tasks,
}) => {
    return (
        <div id={`${dayIdentifier}-column`} className="schedule-column">
            {dayIdentifier} <br />
            {tasks.map((task) => {
                return <ScheduleItem key={task.id} task={task} />;
            })}
        </div>
    );
};

export default ScheduleColumn;
