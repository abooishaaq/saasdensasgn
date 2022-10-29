import { useEffect, useRef, useState } from "react";

const cache = new Map();

const usePhoto = (id: number) => {
    const [photo, setPhoto] = useState<any>(null);
    const reqSentRef = useRef<{ [k: number]: boolean }>({});

    useEffect(() => {
        if (cache.has(id)) {
            setPhoto(cache.get(id));
            return;
        }

        if (!reqSentRef.current[id]) {
            fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
                .then((response) => response.json())
                .then((json) => {
                    setPhoto(json);
                    cache.set(id, json);
                })
                .catch(console.log);
            reqSentRef.current[id] = true;
        }
    }, [id]);

    return { url: photo?.url };
};

export default usePhoto;
