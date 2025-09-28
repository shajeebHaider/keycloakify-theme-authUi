import { Button, Heading, Link, Stack, Text } from "@primer/react";
import type { KcContext } from "../KcContext";
import { I18n } from "../i18n";
import "../../assets/css/app.css";
import { Banner } from "@primer/react/experimental";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>;
    i18n: I18n;
};

const CustomLoginIdpLinkConfirm = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { url, idpAlias, message } = kcContext;

    const { msg } = i18n;

    return (
        <div className="p-4 bg-bg-inset flex flex-col justify-center w-full border rounded-2xl border-border-default">
            <form id="kc-register-form" action={url.loginAction} method="post">
                <div className="text-center mb-4">
                    <Heading variant="medium">{msg("confirmLinkIdpTitle")}</Heading>
                </div>
                <div className="mb-4">
                    {message?.type === "error" && <Banner hideTitle title="Error" variant="critical" description={message?.summary} />}
                    {message?.type === "info" && <Banner hideTitle title="Information" variant="info" description={message?.summary} />}
                    {message?.type === "success" && <Banner hideTitle title="Success" variant="success" description={message?.summary} />}
                    {message?.type === "warning" && <Banner hideTitle title="Warning" variant="warning" description={message?.summary} />}
                </div>

                <Stack className="text-center" gap="condensed">
                    <Button
                        variant="primary"
                        className="bg-button-rest!"
                        type="submit"
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                        block
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>

                    <Text size="small" className="text-center">
                        Need help? <Link href="mailto:support@onedesk.so">Contact Support</Link>
                    </Text>
                </Stack>
            </form>
        </div>
    );
};

export default CustomLoginIdpLinkConfirm;
