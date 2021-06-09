import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginPopupContainer = () => {
    const [errorMess, setErrorMess] = useState("");

    const { register, handleSubmit } = useForm<LoginFormInputs>();

    const loginFormSubmitHandler: SubmitHandler<LoginFormInputs> = async (
        data
    ) => {
        try {
            await axios.post("/api/login", {
                username: data.username,
                password: data.password,
            });

            setErrorMess("");
        } catch (error) {
            setErrorMess(
                "Une erreur est survenue, est-ce la bonne combinaison login/mot de passe ?"
            );
        }
    };

    return (
        <div id="login-popup-container">
            <form onSubmit={handleSubmit(loginFormSubmitHandler)}>
                <p>
                    Entrez un login et un mot de passe pré-existant pour accèder
                    a vos tâches.
                </p>
                <p>
                    Entrez un nouveau login et mot de passe pour créer votre
                    agenda electronique.
                </p>
                <p>
                    NOTE : les mots de passe ne sont pas chiffrés dans la base
                    de donnée, pensez utiliser un mot de passe unique.
                </p>

                {errorMess}

                <input
                    type="text"
                    placeholder="LOGIN"
                    {...register("username")}
                />
                <input
                    type="password"
                    placeholder="MOT DE PASSE"
                    {...register("password")}
                />
                <button type="submit">Go</button>
            </form>
        </div>
    );
};

export default LoginPopupContainer;
