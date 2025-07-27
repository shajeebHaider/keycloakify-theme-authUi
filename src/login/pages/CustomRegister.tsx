import { Heading, TextInput, FormControl, Link, Button, Text, Stack } from "@primer/react";
//import type { JSX } from "keycloakify/tools/JSX";

//import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
//import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
//import { clsx } from "keycloakify/tools/clsx";
//import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
//import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useUserProfileForm } from "keycloakify/login/lib/useUserProfileForm";
// import { useUserProfileForm } from "keycloakify/login/lib/useUserProfileForm";
import googleIcon from "../../assets/svg/googleIcon.svg";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
    i18n: I18n;
};

export default function CustomRegister(props: PageProps) {
    const { kcContext, i18n } = props;

    const { url, messagesPerField, social } = kcContext;
    console.log(kcContext);

    //const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    const { msgStr, advancedMsg } = i18n;

    const {
        formState: { formFieldStates }
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword: false
    });

    console.log({ kcContext });

    return (
        <>
            <form
                className="p-4 bg-bg-inset flex flex-col justify-center w-full border gap-4 rounded-2xl border-border-default"
                action={url.registrationAction}
                method="post"
            >
                <Heading className="mb-4!" variant="medium">
                    Create an OneDesk Account <span className="text-fg-sponsors!">for free</span>
                </Heading>

                <FormControl>
                    <FormControl.Label htmlFor="username" required>
                        {advancedMsg("${username}")}
                    </FormControl.Label>
                    <TextInput
                        aria-invalid={messagesPerField.existsError("username")}
                        defaultValue={formFieldStates.find(f => f.attribute.name === "username")?.valueOrValues}
                        block
                        type="text"
                        name="username"
                        autoComplete="username"
                    />

                    {messagesPerField.existsError("username") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("username"))}</FormControl.Validation>
                    )}
                </FormControl>
                <FormControl>
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

                <FormControl>
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

                <FormControl>
                    <FormControl.Label required htmlFor="email">
                        {advancedMsg("${email}")}
                    </FormControl.Label>
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

                <FormControl>
                    <FormControl.Label required htmlFor="password">
                        {advancedMsg("${password}")}
                    </FormControl.Label>
                    <TextInput
                        className="mb-1"
                        aria-invalid={messagesPerField.existsError("password")}
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        block
                    />
                    <Text className="text-fg-attention" size="small">
                        Your password should be 8 characters minimum, and contain an uppercase letter along with a number
                    </Text>
                    {messagesPerField.existsError("password") && (
                        <FormControl.Validation variant="error">{kcSanitize(messagesPerField.getFirstError("password"))}</FormControl.Validation>
                    )}
                </FormControl>

                <FormControl className="mb-4">
                    <FormControl.Label required htmlFor="password-confirm">
                        {advancedMsg("${passwordConfirm}")}
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
                <Stack className="mb-4" gap="condensed">
                    <input type="hidden" id="id-hidden-input" />
                    <Button className="bg-button-rest!" variant="primary" type="submit" block>
                        {msgStr("doRegister")}
                    </Button>
                    <Text className="text-center!" size="small">
                        or
                    </Text>
                    <div className="relative">
                        <img src={googleIcon} className="absolute top-1/2 left-[2px] translate-y-[-50%] w-7 h-7" />
                        <Button
                            as="a"
                            href={social?.providers?.find(p => p.providerId === "google")?.loginUrl}
                            className="flex! bg-button-rest!"
                            variant="primary"
                        >
                            Sign in with Google
                        </Button>
                    </div>
                </Stack>
                <Text size="small" className="text-center">
                    By Clicking Sign in, I accept the <Link>terms and conditions</Link> and <Link>privacy policy</Link> by OneDesk
                </Text>
            </form>
            <Text className="w-full! text-center! flex flex-col" fontSize={1}>
                already have an account? <Link href={url.loginUrl}>Login here</Link>
            </Text>
        </>
    );
}
