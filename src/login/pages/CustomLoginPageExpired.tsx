import { Heading, Link, Text } from "@primer/react";
import type { KcContext } from "../KcContext";
import { I18n } from "../i18n";
import "../../assets/css/app.css";
import { Banner } from "@primer/react/experimental";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-page-expired.ftl" }>;
    i18n: I18n;
};

const CustomLoginPageExpired = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { url, message } = kcContext;

    const { msg } = i18n;

    return (
        <div className="p-4 bg-bg-inset flex flex-col justify-center w-[375px] border rounded-2xl border-border-default">
            <Heading className="text-center! mb-4!" variant="medium">
                {msg("pageExpiredTitle")}
            </Heading>
            {message?.type === "error" && <Banner className="mb-2" hideTitle title="Error" variant="critical" description={message?.summary} />}

            <div className="text-center">
                <Text as="p" size="medium" color="fg.muted">
                    {msg("pageExpiredMsg1")} <Link href={url.loginRestartFlowUrl}>{msg("doClickHere")}</Link>
                </Text>
            </div>
        </div>
    );
};

export default CustomLoginPageExpired;
