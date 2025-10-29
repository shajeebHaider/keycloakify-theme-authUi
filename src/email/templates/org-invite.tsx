import { Button, Container, Link, Text, render } from "jsx-email";
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

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "vanilla"
};

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`You have an invitation to join ${exp("organization.name")} `}
        locale={locale}
    >
        <Text style={paragraph}>
            <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
                <p style={{ marginTop: "-16px", color: "#1F2328" }}>
                    Hello {exp("firstName")} {exp("lastName")},
                </p>
            </Fm.If>
            <p style={{ color: "#1F2328" }}>
                You have an invitation to join {exp("organization.name")}. Click on the
                button below to accept the invitation:
                {/* <Link href={exp("link")}>this link</Link> to join. */}
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
                Accept Invitation
            </Button>
        </Container>
        <Text style={paragraph}>
            <p style={{ color: "#1F2328" }}>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}. If you didn&apos;t
                expect this invitation, you can safely ignore this email or if you think
                this is an abuse, please report to{" "}
                <Link href="mailto:support@onedesk.so">support@onedesk.so</Link>
            </p>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "You are invited to join {0} .";
};
