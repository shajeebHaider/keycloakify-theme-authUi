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

export const Layout = ({ children, logo }: PropsWithChildren<LayoutProps>) => {
    return (
        <ThemeProvider theme={customTheme}>
            <BaseStyles>
                <div className="flex flex-col items-center justify-center bg-bg-default min-h-screen">
                    <img className="mb-10" alt="logo" src={logo} />
                    <div className="w-[375px]  flex flex-col gap-10">{children}</div>
                </div>
            </BaseStyles>
        </ThemeProvider>
    );
};
