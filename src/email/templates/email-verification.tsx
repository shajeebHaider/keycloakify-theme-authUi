import { Button, Container, Link, Text, render } from "jsx-email";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import * as Fm from "keycloakify-emails/jsx-email";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const paragraph = {
    color: "#1F2328",
    fontSize: "14px",
    lineHeight: "20px",
    textAlign: "left" as const
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "vanilla"
};

export const templateName = "Email Verification";

const { exp, v } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`Someone has created an account with your email address`}
        locale={locale}
    >
        <Text style={paragraph}>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <p style={{ marginTop: "-16px", color: "#1F2328" }}>
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </p>
            </Fm.If>
            <p style={{ color: "#1F2328" }}>
                Thank you for signing up for OneDesk! Please confirm your email address by
                clicking the button below:
            </p>
        </Text>
        <Container>
            <Button
                height={32}
                width={130}
                href={exp("link")}
                align="left"
                fontSize={14}
                borderRadius={6}
                style={{
                    backgroundColor: "#0969DA",
                    color: "#FFFFFF"
                }}
            >
                Confirm Email
            </Button>
        </Container>
        <Text style={paragraph}>
            <p style={{ color: "#1F2328" }}>
                This helps us keep your account secure and ensure that you receive
                important updates.
            </p>
        </Text>
        <Text style={paragraph}>
            <p style={{ color: "#1F2328" }}>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}. If you didn&apos;t
                create this account, you can safely ignore this email or if you think this
                is an abuse, please report to{" "}
                <Link href="mailto:support@onedesk.so">support@onedesk.so</Link>
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Verify Your Email Address";
};
