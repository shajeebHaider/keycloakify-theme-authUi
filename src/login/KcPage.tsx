import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { Layout } from "./Layout";
import CustomLogin from "./pages/CustomLogin";
import CustomLoginPassword from "./pages/CustomLoginPassword";
import CustomLoginUsername from "./pages/CustomLoginUsername";
import CustomLoginResetPassword from "./pages/CustomLoginResetPassword";
import CustomRegister from "./pages/CustomRegister";
import CustomLoginUpdatePassword from "./pages/CustomLoginUpdatePassword";
import logo from "../assets/logo/logo.png";
import CustomLoginVerifyEmail from "./pages/CustomLoginVerifyEmail";
import CustomLogoutConfirm from "./pages/CustomLogoutConfirm";
import CustomError from "./pages/CustomError";
import CustomLoginIdpLinkEmail from "./pages/CustomLoginIdpLinkEmail";
import CustomLoginIdpLinkConfirm from "./pages/CustomLoginIdpLinkConfirm";
import CustomLoginPageExpired from "./pages/CustomLoginPageExpired";
import CustomLoginConfigTotp from "./pages/CustomLoginConfigTotp";
import CustomLoginOtp from "./pages/CustomLoginOtp";
import CustomInfo from "./pages/CustomInfo";

// import Login from "./pages/Login";
const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                console.log(kcContext.pageId);
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLogin i18n={i18n} kcContext={kcContext} />
                            </Layout>
                        );
                    case "login-password.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginPassword i18n={i18n} kcContext={kcContext} />
                            </Layout>
                        );
                    case "login-username.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginUsername i18n={i18n} kcContext={kcContext} />
                            </Layout>
                        );
                    case "login-reset-password.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginResetPassword
                                    i18n={i18n}
                                    kcContext={kcContext}
                                />
                            </Layout>
                        );
                    case "register.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomRegister i18n={i18n} kcContext={kcContext} />
                            </Layout>
                        );
                    case "login-update-password.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginUpdatePassword
                                    i18n={i18n}
                                    kcContext={kcContext}
                                />
                            </Layout>
                        );
                    case "logout-confirm.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLogoutConfirm kcContext={kcContext} i18n={i18n} />
                            </Layout>
                        );

                    case "login-verify-email.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginVerifyEmail
                                    kcContext={kcContext}
                                    i18n={i18n}
                                />
                            </Layout>
                        );
                    case "error.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomError kcContext={kcContext} i18n={i18n} />
                            </Layout>
                        );

                    case "login-idp-link-confirm.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginIdpLinkConfirm
                                    kcContext={kcContext}
                                    i18n={i18n}
                                />
                            </Layout>
                        );
                    case "login-idp-link-email.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginIdpLinkEmail
                                    kcContext={kcContext}
                                    i18n={i18n}
                                />
                            </Layout>
                        );
                    case "login-page-expired.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginPageExpired
                                    kcContext={kcContext}
                                    i18n={i18n}
                                />
                            </Layout>
                        );
                    case "login-config-totp.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginConfigTotp
                                    kcContext={kcContext}
                                    i18n={i18n}
                                />
                            </Layout>
                        );

                    case "login-otp.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomLoginOtp kcContext={kcContext} i18n={i18n} />
                            </Layout>
                        );
                    case "info.ftl":
                        return (
                            <Layout kcContext={kcContext} i18n={i18n} logo={logo}>
                                <CustomInfo kcContext={kcContext} i18n={i18n} />
                            </Layout>
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
