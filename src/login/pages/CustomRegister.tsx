import { Box, Text, TextInput, FormControl, Link, Button } from "@primer/react";
import type { JSX } from "keycloakify/tools/JSX";

import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function CustomRegister(props: RegisterProps) {
    const { kcContext, i18n } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, messagesPerField, termsAcceptanceRequired } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <>
            <Box
                as="form"
                onSubmit={() => {
                    setIsFormSubmittable(true);
                    return true;
                }}
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
                    <FormControl.Label>Email</FormControl.Label>
                    <TextInput aria-invalid={errors.email ? "true" : "false"} block type="email" {...register("email")} />
                    {errors.email && <FormControl.Validation variant="error">{errors.email.message}</FormControl.Validation>}
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label>Password</FormControl.Label>
                    <TextInput aria-invalid={errors.password ? "true" : "false"} block type="password" {...register("password")} />
                    {errors.password && <FormControl.Validation variant="error">{errors.password.message}</FormControl.Validation>}
                    <Text fontSize={1} color="fg.muted">
                        Password should be at least 8 characters, include a number and a lowercase letter.
                    </Text>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                    <FormControl.Label>Username</FormControl.Label>
                    <TextInput aria-invalid={errors.username ? "true" : "false"} block {...register("username")} />
                    {errors.username && <FormControl.Validation variant="error">{errors.username.message}</FormControl.Validation>}
                    <Text fontSize={1} color="fg.muted">
                        Username may only contain alphanumeric characters or single hyphens and cannot begin or end with a hyphen.
                    </Text>
                </FormControl>

                <Button variant="primary" type="submit" block>
                    Continue
                </Button>
                <Text fontSize={1} textAlign="center" mt={2}>
                    Already have an account?
                    <Link as={RouterLink} to={paths.login}>
                        Sign In
                    </Link>
                </Text>
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
