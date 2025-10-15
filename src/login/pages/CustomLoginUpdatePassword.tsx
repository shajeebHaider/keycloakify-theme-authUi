import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Heading, Text, FormControl, TextInput, Button, Checkbox, IconButton } from "@primer/react";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";
import { useState } from "react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>;
    i18n: I18n;
};

export default function CustomLoginUpdatePassword(props: PageProps) {
    const { kcContext, i18n } = props;

    const { msg } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    return (
        <>
            <form
                className="flex gap-2 flex-col justify-center p-4 border rounded-2xl border-border-default bg-bg-inset w-[375px]"
                action={url.loginAction}
                onSubmit={() => {
                    setIsButtonDisabled(true);
                    return true;
                }}
                id="kc-update-password-form"
                method="post"
            >
                <Heading variant="medium">Reset your password</Heading>
                <Text className="mb-4" color="fg.muted" size="medium">
                    Your identity has been verified. Please insert the new credentials.
                </Text>

                <FormControl className="mb-2" required>
                    <FormControl.Label htmlFor="password-new">{msg("passwordNew")}</FormControl.Label>
                    <div className="relative w-full">
                        <TextInput
                            className="mb-1 w-full"
                            placeholder="enter your new password"
                            name="password-new"
                            type={showNewPassword ? "text" : "password"}
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                        <IconButton
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            icon={showNewPassword ? EyeClosedIcon : EyeIcon}
                            size="small"
                            variant="invisible"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                        />
                    </div>

                    <Text className="text-fg-attention" size="small">
                        Your password should be 8 characters minimum, and contain an uppercase letter along with a number
                    </Text>

                    {messagesPerField.existsError("password") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("password"))}</FormControl.Validation>
                    )}
                </FormControl>

                <FormControl className="mb-4" required>
                    <FormControl.Label htmlFor="passwordConfirm">{msg("passwordConfirm")}</FormControl.Label>
                    <div className="relative w-full">
                        <TextInput
                            className="w-full"
                            placeholder="confirm new password"
                            name="password-confirm"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                        />
                        <IconButton
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            icon={showConfirmPassword ? EyeClosedIcon : EyeIcon}
                            size="small"
                            variant="invisible"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        />
                    </div>

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
                <Button disabled={isButtonDisabled} className="bg-button-rest!" variant="primary" type="submit" block>
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
