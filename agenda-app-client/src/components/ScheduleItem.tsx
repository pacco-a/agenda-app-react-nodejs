import { FunctionComponent } from "react";
import { ITask } from "../redux/tasks";

interface ScheduleItemProps {
    task: ITask;
}

const ScheduleItem: FunctionComponent<ScheduleItemProps> = ({ task: item }) => {
    return <div className="schedule-item">resume : {item.resume}</div>;
};

export default ScheduleItem;
