//import type { JSX } from "keycloakify/tools/JSX";
//import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Heading, Text, FormControl, TextInput, Button, Checkbox } from "@primer/react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>;
    i18n: I18n;
};

export default function CustomLoginUpdatePassword(props: PageProps) {
    const { kcContext, i18n } = props;

    const { msg } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <>
            <div></div>
            <form
                className="flex gap-2 flex-col justify-center p-4 border rounded-2xl border-border-default bg-bg-inset w-full"
                action={url.loginAction}
                method="post"
            >
                <Heading variant="medium">Reset your passowrd</Heading>
                <Text className="mb-4" color="fg.muted" size="medium">
                    Your identity has been verified. Please insert the new credentials.
                </Text>

                <FormControl className="mb-2" required>
                    <FormControl.Label htmlFor="password-new">{msg("passwordNew")}</FormControl.Label>
                    <TextInput
                        className="mb-1"
                        placeholder="enter your new password"
                        block
                        name="password-new"
                        type="password"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                    />
                    <Text className="text-fg-attention" size="small">
                        Your password should be 8 characters minimum, and contain an uppercase letter along with a number
                    </Text>

                    {messagesPerField.existsError("password") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("password"))}</FormControl.Validation>
                    )}
                </FormControl>
                <FormControl className="mb-4" required>
                    <FormControl.Label htmlFor="passwordConfirm">{msg("passwordConfirm")}</FormControl.Label>

                    <TextInput
                        block
                        placeholder="confirm new password"
                        name="password-confirm"
                        type="password"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                    />

                    {messagesPerField.existsError("password-confirm") && (
                        <FormControl.Validation variant="error">
                            {kcSanitize(messagesPerField.getFirstError("password-confirm"))}
                        </FormControl.Validation>
                    )}
                </FormControl>

                <FormControl>
                    <Checkbox value="on" name="logout-sessions" defaultChecked={true} />
                    <FormControl.Label>{msg("logoutOtherSessions")}</FormControl.Label>
                </FormControl>
                <Button className="bg-button-rest!" variant="primary" type="submit" block>
                    Reset Password
                    {/* {msgStr("doSubmit")} */}
                </Button>
                {isAppInitiatedAction && (
                    <Button type="submit" name="cancel-aia" value="true">
                        {msg("doCancel")}
                    </Button>
                )}
            </form>
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
