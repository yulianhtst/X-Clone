import { useContext, useState, createContext } from "react";

type ModalType = "signup" | "signin" | null;

interface ModalState {
    isOpen: boolean;
    type: ModalType;
}

interface ModalContextValue {
    isOpen: boolean;
    modalType: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalContextProvider = ({ children }: any) => {
    const [state, setState] = useState<ModalState>({
        isOpen: false,
        type: null,
    });

    const openModal = (type: ModalType) => {
        setState({ isOpen: true, type });
    };

    const closeModal = () => {
        setState({ isOpen: false, type: null });
    };

    return (
        <ModalContext.Provider
            value={{
                isOpen: state.isOpen,
                modalType: state.type,
                openModal,
                closeModal,
            }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within ModalProvider");
    }
    return context;
};
