import { Text, Link, Button, Stack, Heading } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import "../../assets/css/app.css";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "info.ftl" }>;
    i18n: I18n;
};

const CustomInfo = (props: PageProps) => {
    const { i18n, kcContext } = props;

    const myUrl = kcContext.properties.MY_APP_URL;

    console.log(kcContext);

    const { advancedMsgStr, msg } = i18n;

    const { message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <div className="p-4 bg-bg-inset flex flex-col justify-center w-[375px] border rounded-2xl border-border-default">
            <div className="text-center mb-4">
                <Heading variant="medium" className="mb-4">
                    Information
                </Heading>

                <Text size="medium" color="fg.muted" className="mb-6 max-w-md mx-auto">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(
                                (() => {
                                    let html = message.summary?.trim();

                                    if (requiredActions) {
                                        html += " <b>";

                                        html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                        html += "</b>";
                                    }

                                    return html;
                                })()
                            )
                        }}
                    />
                </Text>
            </div>

            <Stack gap="condensed" className="text-center">
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <Button as={Link} href={pageRedirectUri} variant="primary" className="w-full bg-button-rest!">
                                {msg("backToApplication")}
                            </Button>
                        );
                    }
                    if (actionUri) {
                        return (
                            <Button as={Link} href={actionUri} variant="primary" className="w-full bg-button-rest!">
                                {msg("proceedWithAction")}
                            </Button>
                        );
                    }

                    if (client.baseUrl) {
                        return <Link href={myUrl}>{msg("backToApplication")}</Link>;
                    }
                })()}
            </Stack>
        </div>
    );
};

export default CustomInfo;
