import { Button, FormControl, Heading, Stack, TextInput } from "@primer/react";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

import type { I18n } from "../i18n";
import { useUserProfileForm } from "keycloakify/login/lib/useUserProfileForm";

type IdpReviewUserProfileProps = {
    kcContext: Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>;
    i18n: I18n;
};

const CustomIdpReviewUserProfile = (props: IdpReviewUserProfileProps) => {
    const { kcContext, i18n } = props;

    const { msg, msgStr, advancedMsg } = i18n;

    const { url, messagesPerField } = kcContext;

    const {
        formState: { formFieldStates }
    } = useUserProfileForm({ kcContext, i18n, doMakeUserConfirmPassword: false });

    return (
        <form
            className="p-4 bg-bg-inset flex w-[375px] flex-col justify-center  border gap-8 rounded-2xl border-border-default"
            action={url.loginAction}
            method="post"
        >
            <Heading variant="medium">{msg("loginIdpReviewProfileTitle")}</Heading>
            <FormControl required>
                <FormControl.Label htmlFor="email">{advancedMsg("${email}")}</FormControl.Label>
                <TextInput
                    aria-invalid={messagesPerField.existsError("email")}
                    type="email"
                    name="email"
                    defaultValue={formFieldStates.find(f => f.attribute.name === "email")?.valueOrValues}
                    autoComplete="email"
                    block
                />
                {messagesPerField.existsError("email") && (
                    <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("email"))}</FormControl.Validation>
                )}
            </FormControl>
            <Stack gap="condensed" direction="horizontal">
                <FormControl required>
                    <FormControl.Label required htmlFor="firstName">
                        {advancedMsg("${firstName}")}
                    </FormControl.Label>
                    <TextInput
                        aria-invalid={messagesPerField.existsError("firstName")}
                        name="firstName"
                        block
                        defaultValue={formFieldStates.find(f => f.attribute.name === "firstName")?.valueOrValues}
                    />
                    {messagesPerField.existsError("firstName") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("firstName"))}</FormControl.Validation>
                    )}
                </FormControl>

                <FormControl required>
                    <FormControl.Label required htmlFor="lastName">
                        {advancedMsg("${lastName}")}
                    </FormControl.Label>
                    <TextInput
                        aria-invalid={messagesPerField.existsError("lastName")}
                        type="lastName"
                        name="lastName"
                        defaultValue={formFieldStates.find(f => f.attribute.name === "lastName")?.valueOrValues}
                        block
                    />
                    {messagesPerField.existsError("lastName") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("lastName"))}</FormControl.Validation>
                    )}
                </FormControl>
            </Stack>

            <Stack gap="condensed" className="text-center!">
                <Button className="bg-button-rest!" variant="primary" type="submit" block>
                    {msgStr("doSubmit")}
                </Button>
            </Stack>
        </form>
    );
};

export default CustomIdpReviewUserProfile;
