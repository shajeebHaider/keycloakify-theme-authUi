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

// const containerStyle = {
//     padding: "0px 16px 0px 16px",
//     backgroundColor: "#F6F8FA",
//     border: "1px solid #D1D9E0B2",
//     borderRadius: "8px",
//     marginBottom: "24px",
//     marginTop: "24px"
// };

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
        <Text style={paragraph}>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <p style={{ marginTop: "-16px", color: "#1F2328" }}>
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </p>
            </Fm.If>
            <p style={{ color: "#1F2328" }}>
                We received a request to reset your password for your {exp("realmName")}{" "}
                account. Click the button below to choose a new password:
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
                Reset Password
            </Button>
        </Container>
        <Text style={paragraph}>
            <p style={{ color: "#1F2328" }}>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}. If you didn&apos;t
                request this, please report to{" "}
                <Link href="mailto:support@onedesk.so">support@onedesk.so</Link>
            </p>
        </Text>
    </EmailLayout>
);
export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Password Reset Requested";
};
