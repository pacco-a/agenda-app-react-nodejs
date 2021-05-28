import React from "react";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { ITask } from "../../redux/tasks";
import { setTaskItem, toggleTaskItemPopup } from "../../redux/ui";

interface ScheduleItemProps {
    task: ITask;
}

/**
 * représente une tâche (un seul item dans une colonne)
 */
const ScheduleItem: FunctionComponent<ScheduleItemProps> = ({ task }) => {
    const dispatch = useDispatch();

    const handleOnItemClick: React.MouseEventHandler<HTMLDivElement> = (ev) => {
        dispatch(setTaskItem(task));
        dispatch(toggleTaskItemPopup());
    };

    return (
        <div
            onClick={handleOnItemClick}
            className={`schedule-item color-${task.color}`}
        >
            resume : {task.resume}
        </div>
    );
};

export default ScheduleItem;
