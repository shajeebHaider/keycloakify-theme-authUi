import { Text, Link, Button, Heading } from "@primer/react";
import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import "../../assets/css/app.css";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "logout-confirm.ftl" }>;
    i18n: I18n;
};

const CustomLogoutConfirm = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <>
            <form
                className="p-4 bg-bg-inset flex flex-col justify-center w-[375px] border gap-8 rounded-2xl border-border-default"
                action={url.logoutConfirmAction}
                method="post"
            >
                <input type="hidden" name="session_code" value={logoutConfirm.code} />
                <Heading className="text-center" variant="medium">
                    {" "}
                    {msg("logoutConfirmTitle")}...
                </Heading>
                <div className="-mb-6">
                    <Text className="mb-2" as="p" color="fg.muted">
                        {msg("logoutConfirmHeader")}
                    </Text>
                    <Button className="bg-button-rest! " variant="primary" type="submit" block>
                        {msgStr("doLogout")}
                    </Button>
                </div>

                {!logoutConfirm.skipLink && client.baseUrl && (
                    <Text size="medium" className="text-center!">
                        <Link href={client.baseUrl}> {msg("backToApplication")}</Link>
                    </Text>
                )}
            </form>
        </>
    );
};

export default CustomLogoutConfirm;
