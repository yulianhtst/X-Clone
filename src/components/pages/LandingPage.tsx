import { Box, Button, Typography, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { useModal } from "@/src/context/ModalContextProvider";
import { useRouter } from "next/router";

type ModalType = "signup" | "signin" | null;

export default function LandingPage() {
    const { openModal } = useModal();

    const handleModalOpen = (type: ModalType) => {
        openModal(type);
        window.history.pushState(null, "", `/auth/flow/${type}`);
    };

    return (
        <Box
            display={"flex"}
            width={"100vw"}
            height={"100vh"}>
            <ContentWrapper sx={{ minWidth: "45vw" }}>
                <Image
                    // src={logo}
                    alt={"logo"}
                />
            </ContentWrapper>
            <ContentWrapper flex={1}>
                <Box>
                    <Box>
                        <Typography variant="h2">
                            Everything start from here
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>Join today</Typography>
                    </Box>
                    <AuthBox>
                        <AuthButton onClick={() => handleModalOpen("signup")}>
                            Create account
                        </AuthButton>

                        <Box display="flex">
                            <Line />
                            <Typography>&nbsp;or&nbsp;</Typography>
                            <Line />
                        </Box>

                        <AuthButton onClick={() => handleModalOpen("signin")}>
                            Login to account
                        </AuthButton>
                        <TermsAndConditions />
                    </AuthBox>
                </Box>
            </ContentWrapper>
        </Box>
    );
}

const TermsAndConditions = () => (
    <Typography
        color="#808080"
        fontSize="0.55rem">
        By signing up, you agree to the
        <span style={{ color: "lightblue" }}>Terms of Service</span>
        and Privacy Policy, including
        <span style={{ color: "lightblue" }}>Cookie Use</span>.
    </Typography>
);
const Line = () => (
    <Box
        display="flex"
        flex={1}
        alignItems="center">
        <Box
            display="flex"
            sx={{
                height: "1px",
                backgroundColor: "white",
                width: "100%",
            }}></Box>
    </Box>
);

const AuthButton = styled(Button)({
    backgroundColor: "white",
    borderRadius: "20px",
    width: "100%",
});
const ContentWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
});

const AuthBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: "300px",
});
