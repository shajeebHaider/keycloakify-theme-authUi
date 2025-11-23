import { Container, Link, Text, render } from "jsx-email";
import { EmailLayout } from "../layout";
import * as Fm from "keycloakify-emails/jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import ButtonConfirm from "../component/ButtonConfirm";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

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
        <Text>
            <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
                <Text className="-mt-4">
                    Hello {exp("firstName")} {exp("lastName")},
                </Text>
            </Fm.If>
            <Text>
                You have an invitation to join {exp("organization.name")}. Click on the
                button below to accept the invitation:
                {/* <Link href={exp("link")}>this link</Link> to join. */}
            </Text>
        </Text>
        <Container>
            <ButtonConfirm href={exp("link")} text="Accept Invitation" />
        </Container>
        <Text>
            This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
            If you didn&apos;t expect this invitation, you can safely ignore this email or
            if you think this is an abuse, please report to{" "}
            <Link href="mailto:support@onedesk.so">support@onedesk.so</Link>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "You are invited to join {0} .";
};
