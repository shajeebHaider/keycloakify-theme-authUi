import { Container, Link, render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import * as Fm from "keycloakify-emails/jsx-email";
import { ReactNode } from "react";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";

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

// Helper component to create a Freemarker expression for the list
const FmList = (props: { value: string; itemAs: string; children: ReactNode }) => (
    <>
        <Fm.Tag name="list" attributes={props.value}>
            <Fm.Tag name="items" attributes={`as ${props.itemAs}`}>
                {props.children}
            </Fm.Tag>
        </Fm.Tag>
    </>
);

const { exp, v } = createVariablesHelper("executeActions.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userEmail={exp("user.email")}
        preview={`Your administrator has requested that you update your account`}
        locale={locale}
    >
        <Text style={paragraph}>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <p style={{ marginTop: "-16px", color: "#1F2328" }}>
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </p>
            </Fm.If>
            Your administrator has just requested that you update your {exp("realmName")}{" "}
            account by performing the following action(s):
            <Fm.If condition="requiredActions??">
                <ul>
                    <FmList value="requiredActions" itemAs="reqActionItem">
                        <li>
                            <Fm.If condition={`reqActionItem == 'UPDATE_PASSWORD'`}>
                                Update Password
                            </Fm.If>
                            <Fm.If condition={`reqActionItem == 'UPDATE_PROFILE'`}>
                                Update Profile
                            </Fm.If>
                            <Fm.If condition={`reqActionItem == 'TERMS_AND_CONDITIONS'`}>
                                Terms and Conditions
                            </Fm.If>
                            <Fm.If condition={`reqActionItem == 'CONFIGURE_TOTP'`}>
                                Configure OTP
                            </Fm.If>
                            <Fm.If condition={`reqActionItem == 'VERIFY_EMAIL'`}>
                                Verify Email
                            </Fm.If>
                            <Fm.If
                                condition={`reqActionItem == 'CONFIGURE_RECOVERY_AUTHN_CODES'`}
                            >
                                Generate Recovery Codes
                            </Fm.If>
                        </li>
                    </FmList>
                </ul>
            </Fm.If>
            <p style={{ color: "#1F2328" }}>
                Click on <Link href={exp("link")}>this link</Link> to start this process.
            </p>
            <p style={{ color: "#1F2328" }}>
                This link will expire within{" "}
                {exp("linkExpirationFormatter(linkExpiration)")}. If you are unaware that
                your administrator has requested this, just ignore this message and
                nothing will be changed.
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
    return "Update Your Account";
};
