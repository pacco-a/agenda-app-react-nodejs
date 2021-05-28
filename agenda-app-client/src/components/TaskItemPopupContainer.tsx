import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTaskItemPopup } from "../redux/ui";

const TaskItemPopupContainer = () => {
    const { taskItemPopup } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();

    // form states
    const [taskResume, setTaskResume] = useState(taskItemPopup.resume);
    const [taskDate, setTaskDate] = useState(
        taskItemPopup.date.substring(0, 10)
    );
    const [taskDetails, setTaskDetails] = useState(taskItemPopup.details);
    const [taskColor, setTaskColor] = useState(taskItemPopup.color);

    /**
     * pour enlever la popup en cas de clique hors du formulaire
     */
    const onMouseDownContainer: React.MouseEventHandler<HTMLDivElement> = (
        ev
    ) => {
        if ((ev.target as HTMLElement).id === "taskitem-popup-container") {
            dispatch(toggleTaskItemPopup());
        }
    };

    return (
        <div onClick={onMouseDownContainer} id="taskitem-popup-container">
            <form id="taskitem-popup">
                <input
                    type="text"
                    name="resume"
                    placeholder="nom de la tâche"
                    value={taskResume}
                    onChange={(e) => setTaskResume(e.target.value)}
                />
                <input
                    type="date"
                    name="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                />
                <textarea
                    name="details"
                    placeholder="details de la tache"
                    value={taskDetails}
                    onChange={(e) => setTaskDetails(e.target.value)}
                ></textarea>
                <select
                    name="color"
                    value={taskColor}
                    onChange={(e) => setTaskColor(e.target.value)}
                >
                    <option value="blue">Bleu</option>
                    <option value="orange">Orange</option>
                    <option value="green">Vert</option>
                    <option value="red">Rouge</option>
                    <option value="pink">Rose</option>
                </select>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default TaskItemPopupContainer;
