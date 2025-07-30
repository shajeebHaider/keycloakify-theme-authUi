import { Stack, Text, TextInput, FormControl, Link, Button, Heading } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useState } from "react";
import googleIcon from "../../assets/svg/googleIcon.svg";

type PageProps = { kcContext: Extract<KcContext, { pageId: "login-username.ftl" }>; i18n: I18n };

const CustomLoginUsername = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { social, realm, url, usernameHidden, login, messagesPerField } = kcContext;

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
                {" "}
                <Heading variant="medium"> Sign in to your OneDesk account</Heading>
                <div className="-mt-2">
                    {!usernameHidden && (
                        <FormControl>
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
                </div>
                {/* {realm.rememberMe && !usernameHidden && (
                    <FormControl sx={{ mb: 3 }}>
                        <Checkbox value="default" name="rememberMe" defaultChecked={!!login.rememberMe} />
                        <FormControl.Label>{msg("rememberMe")}</FormControl.Label>
                    </FormControl>
                )} */}
                <Stack gap="condensed" className="text-center!">
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
        </>
    );
};

export default CustomLoginUsername;
