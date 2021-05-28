import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
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
    const [tasksCollapsed, setTasksCollapsed] = useState(false);
    const { currentDate } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        setTasksCollapsed(false);
    }, [currentDate]);

    return (
        <div id={`${dayIdentifier}-column`} className="schedule-column">
            <div
                onClick={(e) => {
                    setTasksCollapsed(!tasksCollapsed);
                }}
                className={`schedule-column-header ${
                    tasksCollapsed && "collapsed"
                }`}
            >
                {dayIdentifier}
            </div>
            {!tasksCollapsed &&
                tasks.map((task) => {
                    return <ScheduleItem key={task.id} task={task} />;
                })}
        </div>
    );
};

export default ScheduleColumn;
