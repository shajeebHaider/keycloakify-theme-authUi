import { KcContext } from "keycloakify/login/KcContext";
import { TemplateProps } from "keycloakify/login/TemplateProps";
import { PropsWithChildren } from "react";
import { BaseStyles, Box, Text, ThemeProvider } from "@primer/react";
import "../theme/app.css";
import customTheme from "../theme/theme";
import { I18n } from "./i18n";

type LayoutProps = Omit<
    TemplateProps<KcContext, I18n>,
    "doUseDefaultCss" | "headerNode"
> & {
    title: string;
};

export const Layout = ({
    children,
    kcContext,
    title
}: PropsWithChildren<LayoutProps>) => {
    return (
        <ThemeProvider theme={customTheme}>
            <BaseStyles>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                    bg="canvas.default"
                    p={4}
                >
                    <Text mb={4} fontSize={4}>
                        {title}
                    </Text>
                    {children}
                </Box>
            </BaseStyles>
        </ThemeProvider>
    );
};
