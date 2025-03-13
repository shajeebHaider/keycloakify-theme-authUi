import { Box, TextInput, FormControl, Button, Text, Link } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>;
    i18n: I18n;
};

const CustomLoginResetPassword = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { url, realm, messagesPerField } = kcContext;

    const { msg } = i18n;

    return (
        <>
            <Box
                as="form"
                bg="canvas.subtle"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="100%"
                maxWidth="600px"
                p={5}
                borderRadius={7}
                action={url.loginAction}
                method="post"
                mb={3}
            >
                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label htmlFor="username">
                        {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                    </FormControl.Label>
                    <TextInput type="text" id="username" name="username" autoFocus aria-invalid={messagesPerField.existsError("username")} block />
                    {messagesPerField.existsError("username") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("username"))}</FormControl.Validation>
                    )}
                </FormControl>

                <Button variant="primary" type="submit" block>
                    Send password reset email
                </Button>
            </Box>
            <Box
                border="1px solid"
                borderColor="border.subtle"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                maxWidth="600px"
                p={3}
                borderRadius={7}
            >
                <Text fontSize={1} mb={2}>
                    <Link href={url.loginUrl}>{msg("backToLogin")}</Link>
                </Text>
                <Text sx={{ textAlign: "center" }} fontSize={1}>
                    {" "}
                    Enter your username or email address and we will send you instructions on how to create a new password.
                </Text>
            </Box>
        </>
    );
};

export default CustomLoginResetPassword;
