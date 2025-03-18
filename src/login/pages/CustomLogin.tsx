import { Box, Text, TextInput, FormControl, Link, Button, Stack, Checkbox } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useState } from "react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
    i18n: I18n;
};

const CustomLogin = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { social, realm, url, usernameHidden, login, auth, messagesPerField } = kcContext;

    console.log({ kcContext });
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

                <Box sx={{ mb: 2 }}>
                    <Stack direction="horizontal" justify="space-between" align="center">
                        <FormControl.Label htmlFor="password">{msg("password")}</FormControl.Label>

                        {realm.resetPasswordAllowed && (
                            <Link
                                sx={{
                                    fontSize: "small"
                                }}
                                href={url.loginResetCredentialsUrl}
                            >
                                {msg("doForgotPassword")}
                            </Link>
                        )}
                    </Stack>

                    <TextInput
                        block
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={messagesPerField.existsError("username", "password")}
                        sx={{ mt: 1 }}
                    />

                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                        <FormControl.Validation variant="error">
                            {kcSanitize(messagesPerField.getFirstError("username", "password"))}
                        </FormControl.Validation>
                    )}
                </Box>

                {realm.rememberMe && !usernameHidden && (
                    <FormControl sx={{ mb: 3 }}>
                        <Checkbox value="default" name="rememberMe" defaultChecked={!!login.rememberMe} />
                        <FormControl.Label>{msg("rememberMe")}</FormControl.Label>
                    </FormControl>
                )}

                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
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
                {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                    <Text fontSize={1} mb={2}>
                        <Link href={social.providers.find(p => p.providerId === "google")?.loginUrl}>Sign in with Google</Link>
                    </Text>
                )}

                <Text fontSize={1}>
                    New to OneDesk? <Link href={url.registrationUrl}>{msg("doRegister")}</Link>
                </Text>
            </Box>
        </>
    );
};

export default CustomLogin;
