import { Modal, Box, Typography, Button, TextField, IconButton, InputAdornment } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModalButton from "../../../Common/ModalButton"
import { sendEmailCS } from "@/services/ClientSide/registerCS";
import { useErrorManager } from "@/hooks/useErrorManager";

type ThirdModalStepProps = {
    formData: any
    onClickHandler: () => void,
    onFocusHandler: () => void,
}

export default function ThirdModalStep({ onClickHandler, onFocusHandler, formData }: ThirdModalStepProps) {

    const { setCustomError } = useErrorManager()
    const onNextClickFetch = async () => {
        try {
            const { sessionToken } = await sendEmailCS(formData)
            window.sessionStorage.setItem('SignInSession', sessionToken)
        } catch (error: any) {
            setCustomError("emailError", error.message, error)
        }
    }

    return (
        <>
            <Box
                sx={{
                    mb: '20px'
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Create your account
                </Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    height: '100%',
                    ">*": {
                        width: '100%',

                    }
                }}
            >
                <TextField
                    onClick={onFocusHandler}
                    value={formData.name}
                    focused
                    label="Name"
                    name="name"
                    color="success"
                    sx={{
                        bgcolor: 'rgba(3, 216, 31, 0.1)',
                        margin: '10px 0'
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <CheckCircleOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    variant="outlined"
                    onClick={onFocusHandler}
                    value={formData.email}
                    label="Email"
                    name="email"
                    color="success"
                    focused
                    sx={{
                        bgcolor: 'rgba(3, 216, 31, 0.1)',
                        margin: '10px 0'
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <CheckCircleOutlineIcon />
                            </InputAdornment>
                        ),
                    }}

                />
                <ModalButton content={'Next'}
                    handler={() => {
                        onNextClickFetch()
                        onClickHandler()
                    }} />
            </Box>
        </>
    )
}