import { Box, Modal, styled } from "@mui/material";
import { useRouter } from "next/router";
import { modalRegistry } from "../modals/modalRegistry";
import { useModal } from "@/src/context/ModalContextProvider";

export default function ModalLayout() {
    const { isOpen, modalType, closeModal } = useModal();

    const router = useRouter();
    
    if (!isOpen || !modalType) return null;

    const ModalContent = modalRegistry[modalType];

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                closeModal();
                //TODO: Maybe Redundant 
                router.push("/");
            }}>
            <ModalBody>
                <ModalContent />
            </ModalBody>
        </Modal>
    );
}

const ModalBody = styled(Box)({
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "600px",
    height: "550px",
    padding: "0 80px ",
    backgroundColor: "white",
    border: "2px solid #000",
    borderRadius: "5%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    color: "black",
});
