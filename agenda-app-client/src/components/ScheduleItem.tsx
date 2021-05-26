import { FunctionComponent } from "react";

interface ScheduleItemProps {
    item: {
        id: number;
        resume: string;
        details: string;
    };
}

const ScheduleItem: FunctionComponent<ScheduleItemProps> = ({ item }) => {
    return <div className="schedule-item">resume : {item.resume}</div>;
};

export default ScheduleItem;
