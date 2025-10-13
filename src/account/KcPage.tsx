import DefaultPage from "keycloakify/account/DefaultPage";
import { useI18n } from "./i18n";
import type { KcContext } from "./KcContext";
import Template from "keycloakify/account/Template";
import { Suspense } from "react";
import CustomAccount from "./pages/CustomAccount";

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    let content: React.ReactNode;

    if (kcContext.pageId === "account.ftl") {
        content = <CustomAccount kcContext={kcContext} />;
    } else {
        content = (
            <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                Template={Template}
                doUseDefaultCss={true}
            />
        );
    }

    return <Suspense>{content}</Suspense>;
}
