import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateOneTask } from "../redux/tasks";
import { toggleTaskItemPopup } from "../redux/ui";
import ColorSelector from "./ColorSelector";

const TaskItemPopupContainer = () => {
    const { taskItemPopup } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();

    // form states
    const [taskResume, setTaskResume] = useState(taskItemPopup.resume);
    const [taskDate, setTaskDate] = useState(
        dayjs(`${taskItemPopup.date.substring(0, 10)} 00:00`).format(
            "YYYY-MM-DD"
        )
    );
    const [taskDetails, setTaskDetails] = useState(taskItemPopup.details);
    const [taskColor, setTaskColor] = useState(taskItemPopup.color);
    const [taskDone, setTaskDone] = useState(taskItemPopup.done);

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

    // form submit event
    const HandleFormSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
        ev.preventDefault();

        dispatch(
            updateOneTask({
                id: taskItemPopup.id,
                color: taskColor,
                date: taskDate,
                details: taskDetails,
                done: taskDone,
                resume: taskResume,
            })
        );
        dispatch(toggleTaskItemPopup());
    };

    return (
        <div onMouseDown={onMouseDownContainer} id="taskitem-popup-container">
            <form onSubmit={HandleFormSubmit} id="taskitem-popup">
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
                <ColorSelector
                    customOnClick={(color) => {
                        setTaskColor(color);
                    }}
                    initColor={taskColor}
                />
                <div>
                    <label htmlFor="done">Fini : </label>
                    <input
                        onChange={(e) => setTaskDone(e.target.checked)}
                        checked={taskDone}
                        type="checkbox"
                        name="done"
                    />
                </div>
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default TaskItemPopupContainer;
