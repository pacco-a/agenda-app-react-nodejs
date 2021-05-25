import axios from "axios";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        const fetchTest = async () => {
            const res = await axios.get("/api");
            console.log(res);
        };

        fetchTest();
    }, []);

    return <div className="App">Hello World React</div>;
}

export default App;
