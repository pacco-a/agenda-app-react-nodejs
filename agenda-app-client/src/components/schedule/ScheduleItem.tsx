import { FunctionComponent } from "react";
import { ITask } from "../../redux/tasks";

interface ScheduleItemProps {
    task: ITask;
}

/**
 * représente une tâche (un seul item dans une colonne)
 */
const ScheduleItem: FunctionComponent<ScheduleItemProps> = ({ task }) => {
    return (
        <div className={`schedule-item color-${task.color}`}>
            resume : {task.resume}
        </div>
    );
};

export default ScheduleItem;
