import { useModal } from "@/src/context/ModalContextProvider";
import { useEffect } from "react";

export default function SignUp() {
    const { openModal } = useModal();

    useEffect(() => {
        openModal("signup");
    }, []);

    return null;
}
