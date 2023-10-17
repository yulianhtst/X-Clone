import { Modal, Box, Typography, Button, TextField, IconButton } from "@mui/material"
import ModalButton from "../../Common/ModalButton"
import { useRef } from 'react'
import { API } from "@/Constants"

export default function FourthModalStep({ onClickHandler }) {
    const inputRef = useRef('')
    console.log(inputRef);

    const onNextClickFetch = async () => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Action": "Verify-PIN"
            },
            body: JSON.stringify(inputRef)
        }

        const res = await fetch(API + "mailer", options)
        const resJson = await res.json()
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
                    Enter your PIN
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
                    ref={inputRef}
                    onChange={(e) => inputRef.current = e.target.value}
                    label="PIN"
                    name="pin"
                    sx={{
                        margin: '10px 0'
                    }}
                />
                {/* <Button sx={{ bgcolor: 'lightblue', borderRadius: '20px', m: "auto 0 50px 0", height: '50px' }} onClick={onClickHandler}>Next </Button> */}
                <ModalButton onClickHandler={() => {
                    onNextClickFetch()
                    onClickHandler()
                }} />
            </Box>
        </>
    )
}