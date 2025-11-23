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

export const templateName = "Email Verification";

const { exp, v } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`Someone has created an account with your email address`}
        locale={locale}
    >
        <Text>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <Text className="-mt-4">
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </Text>
            </Fm.If>
            <Text>
                Thank you for signing up for OneDesk! Please confirm your email address by
                clicking the button below:
            </Text>
        </Text>
        <Container>
            <ButtonConfirm href={exp("link")} text="Confirm Email" />
        </Container>
        <Text>
            This helps us keep your account secure and ensure that you receive important
            updates.
        </Text>
        <Text>
            This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
            If you didn&apos;t create this account, you can safely ignore this email or if
            you think this is an abuse, please report to{" "}
            <Link href="mailto:support@onedesk.so">support@onedesk.so</Link>
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Verify Your Email Address";
};
