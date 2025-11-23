import { Container, Link, Text, render } from "jsx-email";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import * as Fm from "keycloakify-emails/jsx-email";
import ButtonConfirm from "../component/ButtonConfirm";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "vanilla"
};

export const templateName = "Password Reset";

const { exp, v } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`We received a request to reset your password`}
        locale={locale}
    >
        <Text>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <Text className="-mt-4">
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </Text>
            </Fm.If>
            <Text>
                We received a request to reset your password for your {exp("realmName")}{" "}
                account. Click the button below to choose a new password:
            </Text>
        </Text>
        <Container>
            <ButtonConfirm href={exp("link")} text="Reset Password" />
        </Container>
        <Text>
            This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
            If you didn&apos;t request this, please report to{" "}
            <Link href="mailto:support@onedesk.so">support@onedesk.so</Link>
        </Text>
    </EmailLayout>
);
export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Password Reset Requested";
};
