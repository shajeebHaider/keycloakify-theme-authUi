//@ts-nocheck
import { Text, TextInput, FormControl, Link, Button, Stack, Heading } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useState } from "react";
import googleIcon from "../../assets/svg/googleIcon.svg";

type PageProps = { kcContext: Extract<KcContext, { pageId: "login-password.ftl" }>; i18n: I18n };

const CustomLoginPassword = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { url, realm, social, messagesPerField } = kcContext;
    console.log({ kcContext });

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <>
            <form
                className="p-4 bg-bg-inset flex flex-col justify-center w-full border gap-8 rounded-2xl border-border-default"
                onSubmit={() => {
                    setIsLoginButtonDisabled(true);
                    return true;
                }}
                action={url.loginAction}
                method="post"
            >
                <Heading variant="medium"> Sign in to your OneDesk account</Heading>

                <div className="text-right -mt-2">
                    <FormControl>
                        <FormControl.Label htmlFor="password">{msg("password")}</FormControl.Label>

                        <TextInput
                            block
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={messagesPerField.existsError("password")}
                            sx={{ mt: 1 }}
                        />
                    </FormControl>

                    {realm.resetPasswordAllowed && (
                        <Link sx={{ fontSize: "small" }} href={url.loginResetCredentialsUrl}>
                            {msg("doForgotPassword")}
                        </Link>
                    )}

                    {messagesPerField.existsError("password") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("password"))}</FormControl.Validation>
                    )}
                </div>
                <Stack gap="condensed">
                    <Button className="bg-button-rest!" variant="primary" type="submit" block disabled={isLoginButtonDisabled}>
                        {msgStr("doLogIn")}
                    </Button>
                    <Text className="text-center!" size="small">
                        or
                    </Text>
                    <div className="relative mb-4">
                        <img src={googleIcon} className="absolute top-1/2 left-[2px] translate-y-[-50%] w-7 h-7" />
                        <Button
                            as="a"
                            href={social?.providers?.find(p => p.providerId === "google")?.loginUrl}
                            className="flex! bg-bg-emphasis!"
                            variant="primary"
                        >
                            Sign in with Google
                        </Button>
                    </div>
                    <Text size="small" className="text-center">
                        By Clicking Sign in, I accept the <Link>terms and conditions</Link> and <Link>privacy policy</Link> by OneDesk
                    </Text>
                </Stack>
            </form>
            <Text className="w-full! text-center! flex flex-col" fontSize={1}>
                New to OneDesk? <Link href={url.registrationUrl}>{msg("doRegister")} for free</Link>
            </Text>
            {/* {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                    <Text fontSize={1} mb={2}>
                        <Link href={social.providers.find(p => p.providerId === "google")?.loginUrl}>Sign in with Google</Link>
                    </Text>
                )} */}
        </>
    );
};

export default CustomLoginPassword;
