import { Container, Link, Text, render } from "jsx-email";
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

const containerStyle = {
    padding: "0px 16px 0px 16px",
    backgroundColor: "#F6F8FA",
    border: "1px solid #D1D9E0B2",
    borderRadius: "8px",
    marginBottom: "24px",
    marginTop: "24px"
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "vanilla"
};

export const templateName = "Password Reset";

const { exp, v } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`Someone just requested to change your account's credentials`}
        locale={locale}
    >
        <Text style={paragraph}>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <p style={{ marginTop: "-16px", color: "#1F2328" }}>
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </p>
            </Fm.If>
            <p style={{ color: "#1F2328" }}>
                Someone just requested to change your {exp("realmName")} account&apos;s
                credentials. If this was you, click on{" "}
                <Link href={exp("link")}>this link</Link> to reset them.
            </p>
            <p style={{ color: "#1F2328" }}>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}. If you don&apos;t want
                to reset your credentials, just ignore this message and nothing will be
                changed.
            </p>
        </Text>
        <Container style={containerStyle}>
            <p style={{ color: "#1F2328", textAlign: "left" }}>
                If you have any concerns, please take a look at the current{" "}
                <Link href="#">Support Policy</Link>, which contains detailed information
                on how to get access to our Customer Support Team.
            </p>
        </Container>
    </EmailLayout>
);
export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Reset password";
};
