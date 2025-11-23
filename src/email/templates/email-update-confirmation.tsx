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

export const templateName = "Email Update Confirmation";

const { exp, v } = createVariablesHelper("email-update-confirmation.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`To update your account, please confirm your email address`}
        locale={locale}
    >
        <Text>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <Text className="-mt-4">
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </Text>
            </Fm.If>
            <Text>
                We received a request to change your {exp("realmName")} account email to{" "}
                {exp("newEmail")}. To confirm this change, click the button below:
            </Text>
        </Text>
        <Container>
            <ButtonConfirm href={exp("link")} text="Update Now" />
        </Container>
        <Text>
            This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
            If you didn&apos;t request this update, please report to{" "}
            <Link href="mailto:support@onedesk.so">support@onedesk.so</Link>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Confirm your new email address";
};
