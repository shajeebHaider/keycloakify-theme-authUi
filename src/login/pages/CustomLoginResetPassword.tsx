import { TextInput, FormControl, Button, Text, Heading } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

type PageProps = { kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>; i18n: I18n };

const CustomLoginResetPassword = (props: PageProps) => {
    const { kcContext } = props;

    const { url, messagesPerField } = kcContext;
    console.log({ kcContext });
    //const { msg } = i18n;

    return (
        <>
            <form
                className="flex gap-2 flex-col justify-center p-4 border rounded-2xl border-border-default bg-bg-inset w-full"
                action={url.loginAction}
                method="post"
            >
                <Heading variant="medium">Forgot your passowrd?</Heading>
                <Text className="mb-4" color="fg.muted" size="medium">
                    Provide your account’s email for which you want to reset your password
                </Text>
                <FormControl className="mb-2">
                    <FormControl.Label htmlFor="username">
                        {/* {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")} */}
                        Email
                    </FormControl.Label>
                    <TextInput type="text" id="username" name="username" autoFocus aria-invalid={messagesPerField.existsError("username")} block />
                    {messagesPerField.existsError("username") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("username"))}</FormControl.Validation>
                    )}
                </FormControl>

                <Button className="bg-button-rest!" variant="primary" type="submit" block>
                    Send Link
                </Button>
            </form>

            {/* <Text fontSize={1} mb={2}>
                    <Link href={url.loginUrl}>{msg("backToLogin")}</Link>
                </Text> */}
        </>
    );
};

export default CustomLoginResetPassword;
