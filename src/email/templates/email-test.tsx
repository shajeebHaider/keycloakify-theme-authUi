import { render, Img, Container, Link } from "jsx-email";
import { EmailLayout } from "../layout";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";

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

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

const baseUrl = import.meta.isJsxEmailPreview ? "/assets" : "${url.resourcesUrl}";

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={"Here is a preview"}
        locale={locale}
    >
        <Container>
            <Img src={`${baseUrl}/kc-logo.png`} alt="KC Logo" width="83" height="75" />
        </Container>
        <p style={paragraph}>This is a test message from {exp("realmName")}</p>
        <p style={paragraph}>
            This is the current value of MY_ENV: {exp("properties.MY_ENV")}
        </p>
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
    return "[KEYCLOAK] - SMTP test message";
};
