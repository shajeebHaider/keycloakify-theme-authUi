import { KcContext } from "keycloakify/login/KcContext";
import { TemplateProps } from "keycloakify/login/TemplateProps";
import { PropsWithChildren } from "react";
import { BaseStyles, ThemeProvider } from "@primer/react";
import customTheme from "../theme/theme";
import "../assets/css/app.css";
import { I18n } from "./i18n";

type LayoutProps = Omit<
    TemplateProps<KcContext, I18n>,
    "doUseDefaultCss" | "headerNode"
> & {
    logo: string;
};

type PropertiesWithMyAppUrl = {
    MY_APP_URL: string;
    [key: string]: unknown;
};

export const Layout = ({
    children,
    logo,
    kcContext
}: PropsWithChildren<
    LayoutProps & { kcContext: { properties: PropertiesWithMyAppUrl } }
>) => {
    const myUrl = kcContext.properties.MY_APP_URL;

    return (
        <ThemeProvider theme={customTheme}>
            <BaseStyles>
                <div className="flex flex-col items-center justify-center bg-bg-default min-h-screen md:p-10 p-6">
                    <div className="flex flex-col items-center gap-10">
                        <a href={myUrl}>
                            <img className="mb-0" alt="logo" src={logo} />
                        </a>
                        <div className="flex flex-col gap-10">{children}</div>
                    </div>
                </div>
            </BaseStyles>
        </ThemeProvider>
    );
};
