import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind
} from "jsx-email";
import type { PropsWithChildren, ReactNode } from "react";
import "../assets/css/app.css";

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
    const logoUrl = "https://cdn.onedesk.so/logo/logo-with-bg.png";

    return (
        <Html lang={locale}>
            <Head />
            <Preview>{preview}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                default: "#ffffff",
                                text: "#1F2328",
                                email: "#f6f8fa",
                                textmuted: "#59646e",
                                bordermuted: "#d1d9e0"
                            }
                        }
                    }
                }}
            >
                <Body className="p-10 bg-email leading-5 text-text font-sans text-sm">
                    <Container className="mx-auto mb-8" alignment="center">
                        <Img width={189} height={40} src={logoUrl} alt="onedesk logo" />
                    </Container>
                    <Container
                        className="p-10 bg-default mx-auto mb-16 rounded-2xl text-left"
                        alignment="left"
                        style={{
                            border: "1px solid #d1d9e0"
                        }}
                    >
                        <Section className="p-0">{children}</Section>
                        <p className="text-text mt-0 text-left">
                            Best regards,
                            <br />
                            The Onedesk team
                        </p>
                    </Container>
                    <Container className="mx-auto text-center" alignment="center">
                        <Text className="mb-10 text-text">
                            This email was sent to{" "}
                            <Link href={`mailto:${userEmail}`}>{userEmail}</Link>
                        </Text>
                        <Img
                            className="mb-6"
                            width={189}
                            height={40}
                            src={logoUrl}
                            alt="Keycloakify"
                        />
                        <Text className="text-textmuted mb-4 mt-0">
                            2810 North Church Street, PMB 38894
                            <br />
                            Wilmington, DE 19802, United States
                        </Text>
                        <Container className="text-center mx-auto">
                            <Link className="mr-2" href="https://onedesk.so">
                                Contact us
                            </Link>

                            <span className="text-bordermuted opacity-70">|</span>
                            <Link className="ml-2" href="https://onedesk.so">
                                Privacy Policy
                            </Link>
                        </Container>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};
