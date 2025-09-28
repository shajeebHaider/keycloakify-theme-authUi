import { Text, Link, Button, Stack, Heading } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import "../../assets/css/app.css";
import { AlertIcon, BlockedIcon, InfoIcon } from "@primer/octicons-react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "error.ftl" }>;
    i18n: I18n;
};

const CustomError = (props: PageProps) => {
    const { kcContext } = props;

    const { message, client, skipLink } = kcContext;

    console.log("kcContext", kcContext);

    //const { msg } = i18n;

    const getErrorType = (errorMessage: string) => {
        if (errorMessage.includes("Invalid username or password")) {
            return "auth_failed";
        }
        if (errorMessage.includes("Account is not fully set up")) {
            return "account_incomplete";
        }
        if (errorMessage.includes("Account is temporarily disabled")) {
            return "account_disabled";
        }
        if (errorMessage.includes("Too many failed attempts")) {
            return "rate_limited";
        }
        return "generic";
    };

    const errorType = message?.summary ? getErrorType(message.summary) : "generic";

    const getCustomErrorContent = (type: string) => {
        switch (type) {
            case "auth_failed":
                return {
                    title: "Sign-in Failed",
                    description: "The email or password you entered is incorrect. Please try again.",
                    actionText: "Try Again"
                };
            case "account_incomplete":
                return {
                    title: "Account Setup Required",
                    description: "Your account needs to be completed before you can sign in.",
                    actionText: "Complete Setup"
                };
            case "account_disabled":
                return {
                    title: "Account Temporarily Disabled",
                    description: "Your account has been temporarily disabled. Please contact support for assistance.",
                    actionText: "Contact Support"
                };
            case "rate_limited":
                return {
                    title: "Too Many Attempts",
                    description: "Too many failed sign-in attempts. Please wait a few minutes before trying again.",
                    actionText: "Try Again Later"
                };
            default:
                return {
                    title: "Something went wrong",
                    description: message?.summary ? kcSanitize(message.summary) : "An unexpected error occurred. Please try again.",
                    actionText: "Go Back"
                };
        }
    };

    const errorContent = getCustomErrorContent(errorType);

    return (
        <div className="p-4 bg-bg-inset flex flex-col justify-center w-full border rounded-2xl border-border-default">
            <div className="text-center mb-4">
                <div className="flex justify-center mb-2">
                    {errorType === "auth_failed" && <AlertIcon size={32} />}
                    {errorType === "account_disabled" && <BlockedIcon size={32} />}
                    {(errorType === "generic" || errorType === "account_incomplete" || errorType === "rate_limited") && <InfoIcon size={32} />}
                </div>
                <Heading variant="medium" className="mb-4">
                    Something Went Wrong
                </Heading>

                <Text
                    size="medium"
                    color="fg.muted"
                    className=" mb-6 max-w-md mx-auto"
                    dangerouslySetInnerHTML={{
                        __html: typeof errorContent.description === "string" ? errorContent.description : errorContent.description
                    }}
                />
                <Button className="mt-2" as="a" href={kcContext.url.loginUrl} variant="default" block>
                    Back to Sign In
                </Button>
            </div>

            <Stack gap="condensed" className="text-center">
                {!skipLink && client?.baseUrl && (
                    <Button as="a" href={client.baseUrl} className="bg-button-rest!" variant="primary" block>
                        {errorContent.actionText}
                    </Button>
                )}

                {errorType === "auth_failed" && (
                    <Button as="a" href={kcContext.url.loginUrl} variant="default" block>
                        Back to Sign In
                    </Button>
                )}

                {errorType === "account_disabled" && (
                    <Text size="small" className="text-center">
                        Need help? <Link href="mailto:support@onedesk.com">Contact Support</Link>
                    </Text>
                )}
            </Stack>

            {/* Debug information (only in development) */}
            {/* {process.env.NODE_ENV === "development" && (
                <details className="mt-4 p-2 bg-gray-100 rounded text-xs">
                    <summary>Debug Info</summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                        {JSON.stringify(
                            {
                                errorType,
                                message: message?.summary,
                                client: client?.clientId
                            },
                            null,
                            2
                        )}
                    </pre>
                </details>
            )} */}
        </div>
    );
};

export default CustomError;
