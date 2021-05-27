const AddTaskFormContainer = () => {
    return (
        <div id="addtask-form-container">
            <form>
                <input
                    type="text"
                    name="resume"
                    placeholder="nom de la tâche"
                />
                <input type="date" name="date" />
                <textarea
                    name="details"
                    placeholder="details de la tache"
                ></textarea>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddTaskFormContainer;
