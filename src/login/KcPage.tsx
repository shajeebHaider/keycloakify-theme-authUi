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
// import Login from "./pages/Login";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

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
                            <Layout
                                kcContext={kcContext}
                                i18n={i18n}
                                title="Sign in to OneDesk"
                            >
                                <CustomLogin i18n={i18n} kcContext={kcContext} />
                            </Layout>
                        );
                    case "login-password.ftl":
                        return (
                            <Layout
                                kcContext={kcContext}
                                i18n={i18n}
                                title="Sign in to OneDesk"
                            >
                                <CustomLoginPassword i18n={i18n} kcContext={kcContext} />
                            </Layout>
                        );
                    case "login-username.ftl":
                        return (
                            <Layout
                                kcContext={kcContext}
                                i18n={i18n}
                                title="Sign in to OneDesk"
                            >
                                <CustomLoginUsername i18n={i18n} kcContext={kcContext} />
                            </Layout>
                        );
                    case "login-reset-password.ftl":
                        return (
                            <Layout
                                kcContext={kcContext}
                                i18n={i18n}
                                title="Forgot Your Password?"
                            >
                                <CustomLoginResetPassword
                                    i18n={i18n}
                                    kcContext={kcContext}
                                />
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
