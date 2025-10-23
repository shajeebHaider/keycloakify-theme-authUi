import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text
} from "jsx-email";
import type { PropsWithChildren, ReactNode } from "react";
import "../assets/css/app.css";

const main = {
    backgroundColor: "#F6F8FA",
    padding: "40px",
    fontFamily: "sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    fontColor: "#1F2328"
};

const container = {
    padding: "40px",
    backgroundColor: "#ffffff",
    margin: "0 auto",
    marginBottom: "64px",
    borderRadius: "15px",
    border: "1px solid #D1D9E0",
    textAlign: "left" as const
};

const image = {
    margin: "0 auto",
    marginBottom: "32px"
};

const box = {
    padding: "0 0",
    marginBottom: "24px"
};

const footer = {
    margin: "0 auto",
    textAlign: "center" as const,
    alignItems: "center"
};

export const EmailLayout = ({
    userEmail,
    locale,
    children,
    preview
}: PropsWithChildren<{
    preview: ReactNode;
    locale: string;
    userEmail?: string;
}>) => {
    const logoUrl = import.meta.isJsxEmailPreview ? "/assets" : "${url.resourcesUrl}";

    return (
        <Html lang={locale}>
            <Head />
            <Preview>{preview}</Preview>
            <Body style={main}>
                <Container style={image} alignment="center">
                    <Img src={`${logoUrl}/logo.png`} alt="Keycloakify" />
                </Container>
                <Container style={container} alignment="left">
                    <Section style={box}>{children}</Section>
                    <p
                        style={{
                            textAlign: "left" as const,
                            color: "#1F2328",
                            marginTop: "-14px"
                        }}
                    >
                        Best regards,
                        <br />
                        The Onedesk team
                    </p>
                </Container>
                <Container style={footer} alignment="center">
                    <Text style={{ marginBottom: "40px", color: "#1F2328" }}>
                        This email was sent to{" "}
                        <Link href={`mailto:${userEmail}`}>{userEmail}</Link>
                    </Text>
                    <Img
                        style={{ marginBottom: "8px" }}
                        src={`${logoUrl}/logo.png`}
                        alt="Keycloakify"
                    />
                    <Text
                        style={{
                            color: "#59646E",
                            marginBottom: "16px",
                            marginTop: "-8px"
                        }}
                    >
                        Wilmington, DE, US 19802-4447
                    </Text>
                    <Container
                        style={{
                            textAlign: "center",
                            margin: "0 auto"
                        }}
                    >
                        <Link style={{ marginRight: "8px" }} href="https://onedesk.so">
                            Contact us
                        </Link>
                        <span style={{ color: "#D1D9E0B2" }}>|</span>
                        <Link style={{ marginLeft: "8px" }} href="https://onedesk.so">
                            Privacy Policy
                        </Link>
                    </Container>
                </Container>
            </Body>
        </Html>
    );
};
