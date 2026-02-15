import { useModal } from "@/src/context/ModalContextProvider";
import { useEffect } from "react";

export default function SignIn() {
    const { openModal } = useModal();

    useEffect(() => {
        openModal("signin");
    }, []);

    return null;
}
