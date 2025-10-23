import { Container, Link, Text, render } from "jsx-email";
import { EmailLayout } from "../layout";
import * as Fm from "keycloakify-emails/jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";

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
    marginBottom: "24px"
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "vanilla"
};

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`Here is a preview`}
        locale={locale}
    >
        <Text style={paragraph}>
            <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
                <p style={{ marginTop: "-16px", color: "#1F2328" }}>
                    Hello {exp("firstName")} {exp("lastName")},
                </p>
            </Fm.If>
            <p style={{ color: "#1F2328" }}>
                You were invited to join the {exp("organization.name")} organization.
                Click on <Link href={exp("link")}>this link</Link> to join.
            </p>
            <p style={{ color: "#1F2328" }}>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}. If you don&apos;t want
                to join the organization, just ignore this message.
            </p>
            <Container style={containerStyle}>
                <p style={{ color: "#1F2328", textAlign: "left" }}>
                    If you have any concerns, please take a look at the current{" "}
                    <Link href="#">Support Policy</Link>, which contains detailed
                    information on how to get access to our Customer Support Team.
                </p>
            </Container>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Invitation to join the {0} organization";
};
