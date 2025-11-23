import { Container, Link, render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import * as Fm from "keycloakify-emails/jsx-email";
import { ReactNode } from "react";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";
import ButtonConfirm from "../component/ButtonConfirm";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

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
        <Text>
            <Fm.If condition={`${v("user.firstName")}?? && ${v("user.lastName")}??`}>
                <Text className="-mt-4">
                    Hello {exp("user.firstName")} {exp("user.lastName")},
                </Text>
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
        </Text>
        <Text>
            Click on <Link href={exp("link")}>the button below</Link> to start this
            process.
        </Text>
        <Container>
            <ButtonConfirm href={exp("link")} text="Start Now" />
        </Container>
        <Text>
            This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
            If you are unaware that your administrator has requested this, just ignore
            this message and nothing will be changed.
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Update Your Account";
};
