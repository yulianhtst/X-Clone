import SignInModal from "./SignInModal/SignInModal";
import SignUpModal from "./SignUpModal/SignUpModal";

export const modalRegistry: Record<string, React.ComponentType> = {
    signup: SignUpModal,
    signin: SignInModal,
};
