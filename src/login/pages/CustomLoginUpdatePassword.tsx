//import type { JSX } from "keycloakify/tools/JSX";
//import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Stack, FormControl, TextInput, Button, Checkbox } from "@primer/react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>;
    i18n: I18n;
};

export default function CustomLoginUpdatePassword(props: PageProps) {
    const { kcContext, i18n } = props;

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

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
                action={url.loginAction}
                method="post"
            >
                <Box sx={{ mb: 2 }}>
                    <Stack direction="horizontal" justify="space-between" align="center">
                        <FormControl.Label htmlFor="password-new">{msg("passwordNew")}</FormControl.Label>
                    </Stack>

                    <TextInput
                        block
                        name="password-new"
                        type="password"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        sx={{ mt: 1 }}
                    />

                    {messagesPerField.existsError("password") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("password"))}</FormControl.Validation>
                    )}
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Stack direction="horizontal" justify="space-between" align="center">
                        <FormControl.Label htmlFor="passwordConfirm">{msg("passwordConfirm")}</FormControl.Label>
                    </Stack>

                    <TextInput
                        block
                        name="password-confirm"
                        type="password"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        sx={{ mt: 1 }}
                    />

                    {messagesPerField.existsError("password-confirm") && (
                        <FormControl.Validation variant="error">
                            {kcSanitize(messagesPerField.getFirstError("password-confirm"))}
                        </FormControl.Validation>
                    )}
                </Box>
                <FormControl sx={{ mb: 3 }}>
                    <Checkbox value="on" name="logout-sessions" defaultChecked={true} />
                    <FormControl.Label>{msg("logoutOtherSessions")}</FormControl.Label>
                </FormControl>
                <Button variant="primary" type="submit" block>
                    {msgStr("doSubmit")}
                </Button>
                {isAppInitiatedAction && (
                    <Button type="submit" name="cancel-aia" value="true">
                        {msg("doCancel")}
                    </Button>
                )}
            </Box>
        </>
    );
}

// function PasswordWrapper(props: { i18n: I18n; passwordInputId: string; children: JSX.Element }) {
//     const { i18n, passwordInputId, children } = props;

//     const { msgStr } = i18n;

//     const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

//     return (
//         <Box>
//             {children}
//             <Button
//                 type="button"
//                 aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
//                 aria-controls={passwordInputId}
//                 onClick={toggleIsPasswordRevealed}
//             >
//                 <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
//             </Button>
//         </Box>
//     );
// }
