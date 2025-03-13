import { Box, Text, TextInput, FormControl, Link, Button, Checkbox } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useState } from "react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-username.ftl" }>;
    i18n: I18n;
};

const CustomLoginUsername = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { social, realm, url, usernameHidden, login, messagesPerField } = kcContext;

    console.log({ social });

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <>
            <Box
                as="form"
                bg="canvas.subtle"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="100%"
                maxWidth="340px"
                p={5}
                borderRadius={7}
                mb={4}
                onSubmit={() => {
                    setIsLoginButtonDisabled(true);
                    return true;
                }}
                action={url.loginAction}
                method="post"
            >
                {!usernameHidden && (
                    <FormControl sx={{ mb: 3 }}>
                        <FormControl.Label htmlFor="username">
                            {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmail")
                                  : msg("email")}
                        </FormControl.Label>
                        <TextInput
                            aria-invalid={messagesPerField.existsError("username", "password")}
                            block
                            type="email"
                            name="username"
                            defaultValue={login.username ?? ""}
                            autoComplete="username"
                        />
                        {messagesPerField.existsError("username", "password") && (
                            <FormControl.Validation variant="error">
                                {kcSanitize(messagesPerField.getFirstError("username", "password"))}
                            </FormControl.Validation>
                        )}
                    </FormControl>
                )}

                {realm.rememberMe && !usernameHidden && (
                    <FormControl sx={{ mb: 3 }}>
                        <Checkbox value="default" name="rememberMe" defaultChecked={!!login.rememberMe} />
                        <FormControl.Label>{msg("rememberMe")}</FormControl.Label>
                    </FormControl>
                )}

                <Button variant="primary" type="submit" block disabled={isLoginButtonDisabled}>
                    {msgStr("doLogIn")}
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
                maxWidth="340px"
                p={3}
                borderRadius={7}
            >
                <Text fontSize={1} mb={2}>
                    <Link href="#">Sign in with Google</Link>
                </Text>
                <Text fontSize={1}>
                    New to OneDesk? <Link href={url.registrationUrl}>{msg("doRegister")}</Link>
                </Text>
            </Box>
        </>
    );
};

export default CustomLoginUsername;
