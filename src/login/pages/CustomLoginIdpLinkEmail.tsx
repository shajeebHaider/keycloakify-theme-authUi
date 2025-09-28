import { Heading, Link, Text } from "@primer/react";
import type { KcContext } from "../KcContext";
import { I18n } from "../i18n";
import "../../assets/css/app.css";
import { Banner } from "@primer/react/experimental";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>;
    i18n: I18n;
};

const CustomLoginIdpLinkEmail = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { url, realm, brokerContext, idpAlias, message } = kcContext;

    const { msg } = i18n;

    return (
        <div className="p-4 bg-bg-inset flex flex-col justify-center w-full border rounded-2xl border-border-default">
            <Heading className="text-center! mb-4!" variant="medium">
                {msg("emailLinkIdpTitle", idpAlias)}
            </Heading>
            <div className="flex flex-col gap-2">
                {message?.type === "error" && <Banner hideTitle title="Error" variant="critical" description={message?.summary} />}
                {message?.type === "info" && <Banner hideTitle title="Information" variant="info" description={message?.summary} />}
                {message?.type === "success" && <Banner hideTitle title="Success" variant="success" description={message?.summary} />}
                {message?.type === "warning" && <Banner hideTitle title="Warning" variant="warning" description={message?.summary} />}

                <Text as="p" size="medium" color="fg.muted">
                    {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
                </Text>
                <Text as="p" size="medium" color="fg.muted">
                    {msg("emailLinkIdp2")} <Link href={url.loginAction}>{msg("doClickHere")}</Link> {msg("emailLinkIdp3")}
                </Text>
            </div>
        </div>
    );
};

export default CustomLoginIdpLinkEmail;
