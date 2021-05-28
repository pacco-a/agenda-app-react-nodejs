import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addOneTask, ITask } from "../redux/tasks";
import { toggleAddTaskPopup } from "../redux/ui";

const AddTaskFormContainer = () => {
    const { currentDate } = useSelector((state: RootState) => state.tasks);

    const dispatch = useDispatch();

    // form states
    const [taskResume, setTaskResume] = useState("");
    const [taskDate, setTaskDate] = useState(currentDate);
    const [taskDetails, setTaskDetails] = useState("");
    const [taskColor, setTaskColor] = useState("blue");

    // events
    const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
        ev.preventDefault();
        const newTask: ITask = {
            resume: taskResume,
            date: taskDate,
            details: taskDetails,
            done: false,
            color: taskColor,
        };

        dispatch(addOneTask(newTask));
        dispatch(toggleAddTaskPopup());
    };

    // event

    /**
     * pour enlever la popup en cas de clique hors du formulaire
     */
    const onMouseDownContainer: React.MouseEventHandler<HTMLDivElement> = (
        ev
    ) => {
        if ((ev.target as HTMLElement).id === "addtask-form-container") {
            dispatch(toggleAddTaskPopup());
        }
    };

    return (
        <div onMouseDown={onMouseDownContainer} id="addtask-form-container">
            <form onSubmit={onFormSubmit}>
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

export default AddTaskFormContainer;
