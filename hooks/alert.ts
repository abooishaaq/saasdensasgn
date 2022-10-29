import { useState } from "react";

const useAlert = () => {
    const [alert, setAlert] = useState<any>();

    return { alert, setAlert };
};

export default useAlert;
