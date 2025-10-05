import { TextInput, FormControl, Button, Stack, Heading, Text } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useState } from "react";
import "../../assets/css/app.css";
import { DeviceMobileIcon } from "@primer/octicons-react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-otp.ftl" }>;
    i18n: I18n;
};

const CustomLoginOtp = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { url, otpLogin, messagesPerField } = kcContext;

    const { msgStr } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <>
            {" "}
            <div className="bg-bg-inset  flex flex-col w-[375px] justify-center border rounded-2xl border-border-default p-4 gap-6">
                <Heading variant="medium" className="text-center">
                    {" "}
                    Enter your Otp
                </Heading>
                <form
                    onSubmit={() => {
                        setIsSubmitting(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                >
                    <div className="-mt-2">
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 border rounded-xl border-border-default">
                                    <input
                                        id={`kc-otp-credential-${index}`}
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                    />
                                    <DeviceMobileIcon />
                                    <Text as="label" htmlFor={`kc-otp-credential-${index}`} className="text-center text-sm" tabIndex={index}>
                                        {otpCredential.userLabel}
                                    </Text>
                                </div>
                            ))}
                        </div>

                        <FormControl className="mb-4">
                            <FormControl.Label>One-time code</FormControl.Label>
                            <TextInput aria-invalid={messagesPerField.existsError("totp")} block type="email" name="username" />
                            {messagesPerField.existsError("totp") && (
                                <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("totp"))}</FormControl.Validation>
                            )}
                        </FormControl>
                    </div>
                    <Stack gap="condensed" className="text-center!">
                        <Button className="bg-button-rest!" variant="primary" type="submit" block disabled={isSubmitting}>
                            {msgStr("doLogIn")}
                        </Button>
                    </Stack>
                </form>
            </div>
        </>
    );
};

export default CustomLoginOtp;
