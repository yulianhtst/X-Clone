import { Box, Typography, TextField, styled } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/router";

import { useValidateFields } from "@/src/hooks/useValidateFields";
import { AuthContext } from "@/src/context/AuthContext";
import { useErrorManager } from "@/src/hooks/useErrorManager";
import { login } from "@/src/services";

import ModalButton from "../../buttons/ModalButton/ModalButton";
import CloseButton from "../../buttons/CloseButton/CloseButton";
import { useModal } from "@/src/context/ModalContextProvider";

interface LoginForm {
    email: string;
    password: string;
}

export default function SignInModal() {
    const { userAuth } = useContext(AuthContext);
    const { closeModal } = useModal();
    const router = useRouter();

    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const { error, setCustomError } = useErrorManager();
    const { validateEmail } = useValidateFields(setCustomError);

    const { email } = form;

    validateEmail(email);

    const updateFormValue = (name: string, value: string | boolean) => {
        setForm((state) => ({ ...state, [name]: value }));
    };

    const onSignInClickHandler = async () => {
        try {
            const user = await login(form);
            userAuth(user);
            if (user) router.replace("/explore");
        } catch (error) {
            setCustomError(
                "loginError",
                "Please enter valid credentials",
                error as Error,
            );
        }
    };

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        updateFormValue(name, value);
    };

    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        updateFormValue(name, value);
    };

    return (
        <>
            <Box display="flex">
                <CloseButton handleClose={() => closeModal()} />
            </Box>
            <Box marginBottom={"20px"}>
                <Typography
                    variant="h4"
                    fontWeight="bold">
                    Sign In
                </Typography>
            </Box>
            <InputsWrapper>
                <TextField
                    onChange={onChangeEmailHandler}
                    error={Boolean(error.emailError)}
                    helperText={error.emailError}
                    name="email"
                    label="Email"
                />
                <TextField
                    onChange={onChangePasswordHandler}
                    error={Boolean(error.passwordError)}
                    helperText={error.passwordError}
                    name="password"
                    label="Password"
                    type="password"
                />

                {error.customErrors && (
                    <Typography>{error.loginError}</Typography>
                )}
                <ModalButton
                    content={"Sign In"}
                    handler={onSignInClickHandler}
                />
            </InputsWrapper>
        </>
    );
}

const InputsWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    ">*": {
        width: "100%",
        margin: "10px 0",
    },
});
