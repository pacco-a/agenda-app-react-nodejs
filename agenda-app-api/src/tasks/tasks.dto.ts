class CreateTaskDTO {
    public color: string;
    public date: string;
    public details: string;
    public resume: string;
}

class EditTaskDTO {
    public color: string;
    public date: string;
    public details: string;
    public resume: string;
    public done: boolean;
    /**
     * la date a laquelle le client était lors
     * de l'envoi de la requête, on le redirige en
     * conséquence.
     */
    public todate: string;
}

export { CreateTaskDTO, EditTaskDTO };
