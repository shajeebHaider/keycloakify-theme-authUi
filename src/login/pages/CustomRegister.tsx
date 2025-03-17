import { Box, TextInput, FormControl, Link, Button, Text } from "@primer/react";
//import type { JSX } from "keycloakify/tools/JSX";

import { useState } from "react";
//import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
//import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
//import { clsx } from "keycloakify/tools/clsx";
//import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
//import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useUserProfileForm } from "keycloakify/login/lib/useUserProfileForm";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
    i18n: I18n;
};

export default function CustomRegister(props: PageProps) {
    const { kcContext, i18n } = props;

    const { messageHeader, url, messagesPerField } = kcContext;
    //const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    const { msg, msgStr } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword: false
    });

    console.log({ formFieldStates });

    return (
        <>
            <Box
                as="form"
                // onSubmit={() => {
                //     setIsFormSubmittable(true);
                //     return true;
                // }}
                bg="canvas.subtle"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="100%"
                maxWidth="400px"
                p={5}
                borderRadius={7}
                mb={4}
                action={url.registrationAction}
                method="post"
            >
                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label required htmlFor="firstName">
                        {msg("firstName")}
                    </FormControl.Label>
                    <TextInput aria-invalid={messagesPerField.existsError("firstName")} name="firstName" block />
                    {messagesPerField.existsError("firstName") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("firstName"))}</FormControl.Validation>
                    )}
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label required htmlFor="lastName">
                        {msg("lastName")}
                    </FormControl.Label>
                    <TextInput aria-invalid={messagesPerField.existsError("lastame")} type="lastName" name="lastName" block />
                    {messagesPerField.existsError("lastName") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("lastName"))}</FormControl.Validation>
                    )}
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label required htmlFor="email">
                        {msg("email")}
                    </FormControl.Label>
                    <TextInput aria-invalid={messagesPerField.existsError("email")} type="email" name="email" autoComplete="email" block />
                    {messagesPerField.existsError("email") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("email"))}</FormControl.Validation>
                    )}
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label required htmlFor="password">
                        {msg("password")}
                    </FormControl.Label>
                    <TextInput
                        aria-invalid={messagesPerField.existsError("password")}
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        block
                    />
                    {messagesPerField.existsError("password") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("password"))}</FormControl.Validation>
                    )}
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label required htmlFor="password-confirm">
                        {msg("passwordConfirm")}
                    </FormControl.Label>
                    <TextInput
                        aria-invalid={messagesPerField.existsError("password-confirm")}
                        type="password"
                        name="password-confirm"
                        autoComplete="new-password"
                        block
                    />
                    {messagesPerField.existsError("password-confirm") && (
                        <FormControl.Validation variant="error">
                            {kcSanitize(messagesPerField.getFirstError("password-confirm"))}
                        </FormControl.Validation>
                    )}
                </FormControl>
                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label htmlFor="username"></FormControl.Label>
                    <TextInput
                        aria-invalid={messagesPerField.existsError("username", "password")}
                        block
                        type="email"
                        name="username"
                        autoComplete="username"
                    />
                    {messagesPerField.existsError("username", "password") && (
                        <FormControl.Validation variant="error">
                            {kcSanitize(messagesPerField.getFirstError("username", "password"))}
                        </FormControl.Validation>
                    )}
                </FormControl>

                <input type="hidden" id="id-hidden-input" />
                <Button variant="primary" type="submit" block>
                    {msgStr("doRegister")}
                </Button>
            </Box>
            <Box width="100%" maxWidth="400px" textAlign="center">
                <Text fontSize={1}>
                    By creating an account, you agree to the <Link href="#">Terms of Service</Link>. See the <Link href="#">Privacy Policy</Link> for
                    more details.
                </Text>
            </Box>
        </>
    );
}
