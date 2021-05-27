import { FunctionComponent } from "react";
import { ITask } from "../../redux/tasks";

interface ScheduleItemProps {
    task: ITask;
}

/**
 * représente une tâche (un seul item dans une colonne)
 */
const ScheduleItem: FunctionComponent<ScheduleItemProps> = ({ task: item }) => {
    return <div className="schedule-item">resume : {item.resume}</div>;
};

export default ScheduleItem;
