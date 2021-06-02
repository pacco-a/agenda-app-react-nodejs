import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addOneTask, ITask } from "../redux/tasks";
import { toggleAddTaskPopup } from "../redux/ui";
import ColorSelector from "./ColorSelector";

interface Inputs {
    resume: string;
    date: string;
    details: string;
}

const AddTaskFormContainer = () => {
    const { register, handleSubmit } = useForm<Inputs>();

    const { currentDate } = useSelector((state: RootState) => state.tasks);

    const dispatch = useDispatch();

    const [taskColor, setTaskColor] = useState("blue");

    // events

    const newSubmitHandler: SubmitHandler<Inputs> = (data) => {
        const newTask: ITask = {
            resume: data.resume,
            date: data.date,
            details: data.details,
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
            <form onSubmit={handleSubmit(newSubmitHandler)}>
                <input
                    type="text"
                    placeholder="nom de la tâche"
                    defaultValue=""
                    {...register("resume")}
                />
                <input
                    type="date"
                    defaultValue={currentDate}
                    {...register("date")}
                />
                <textarea
                    placeholder="details de la tache"
                    defaultValue={""}
                    {...register("details")}
                ></textarea>
                <ColorSelector
                    customOnClick={(color) => {
                        setTaskColor(color);
                    }}
                    initColor={taskColor}
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddTaskFormContainer;
