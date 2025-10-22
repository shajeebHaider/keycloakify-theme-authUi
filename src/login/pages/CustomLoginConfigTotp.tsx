import { Button, FormControl, Heading, Link, Text, TextInput } from "@primer/react";
import type { KcContext } from "../KcContext";
import { I18n } from "../i18n";
import "../../assets/css/app.css";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "login-config-totp.ftl" }>;
    i18n: I18n;
};

const CustomLoginConfigTotp = (props: PageProps) => {
    const { kcContext, i18n } = props;

    const myaccountUrl = kcContext.properties.ACCOUNT_SETTING_URL;

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <div className="bg-bg-inset w-[445px] flex flex-col justify-center border rounded-2xl border-border-default">
            <div className="border-b border-border-default p-4 pr-2">
                <Heading className="text-center!" variant="medium">
                    {/* {msg("loginTotpTitle")} */}
                    Connect to an authenticator app
                </Heading>
            </div>
            <div className="p-4 pb-0 flex flex-col gap-6">
                <div>
                    <Text color="fg.muted" size="medium">
                        1. {msg("loginTotpStep1")}
                    </Text>
                    <div className="ml-5 mt-2">
                        {totp.supportedApplications.map(app => (
                            <Text color="fg.muted" size="medium" weight="semibold" as="p" key={app}>
                                {advancedMsg(app)}
                            </Text>
                        ))}
                    </div>
                </div>

                {mode == "manual" ? (
                    <>
                        <div>
                            <Text color="fg.muted" size="medium" as="p">
                                2. {msg("loginTotpManualStep2")}
                            </Text>
                            <div className="ml-5 mt-2">
                                <Text color="fg.muted" size="medium" as="p">
                                    <span>{totp.totpSecretEncoded}</span>
                                </Text>
                                <Text color="fg.muted" size="medium" as="p">
                                    <Link href={totp.qrUrl}>{msg("loginTotpScanBarcode")}</Link>
                                </Text>
                            </div>
                        </div>
                        <div>
                            <Text color="fg.muted" size="medium" as="p">
                                3. {msg("loginTotpManualStep3")}
                            </Text>
                            <div className="ml-5 mt-2">
                                <Text color="fg.muted" as="p" size="medium" weight="semibold">
                                    {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                </Text>
                                <Text color="fg.muted" as="p" size="medium" weight="semibold">
                                    {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                </Text>
                                <Text color="fg.muted" as="p" size="medium" weight="semibold">
                                    {msg("loginTotpDigits")}: {totp.policy.digits}
                                </Text>
                                {totp.policy.type === "totp" ? (
                                    <Text color="fg.muted" as="p" size="medium" weight="semibold">
                                        {msg("loginTotpInterval")}: {totp.policy.period}
                                    </Text>
                                ) : (
                                    <Text color="fg.muted" as="p" size="medium" weight="semibold">
                                        {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                    </Text>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <Text color="fg.muted" size="medium">
                            {" "}
                            2. {msg("loginTotpStep2")}
                        </Text>
                        <img className="mt-2 ml-5" src={`data:image/png;base64, ${totp.totpSecretQrCode}`} alt="Figure: Barcode" />
                        <Text className="mt-2 ml-5" color="fg.muted" size="medium">
                            <Link href={totp.manualUrl} id="mode-manual">
                                {msg("loginTotpUnableToScan")}
                            </Link>
                        </Text>
                    </div>
                )}
            </div>
            <div>
                <form action={url.loginAction} method="post">
                    <div className="p-4 pt-6!">
                        <Text color="fg.muted" size="medium">
                            3. {msg("loginTotpStep3")}
                        </Text>
                        <FormControl className="ml-5 mt-2 mb-6" required>
                            <FormControl.Label>{msg("authenticatorCode")}</FormControl.Label>
                            <TextInput block id="totp" name="totp" autoComplete="off" />
                            {messagesPerField.existsError("totp") && (
                                <FormControl.Validation variant="error">
                                    <span
                                        id="input-error-otp-code"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.get("totp"))
                                        }}
                                    />
                                </FormControl.Validation>
                            )}
                            <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                            {mode && <input type="hidden" id="mode" value={mode} />}
                        </FormControl>
                        <Text color="fg.muted" size="medium">
                            4. {msg("loginTotpStep3DeviceName")}
                        </Text>
                        <FormControl className="ml-5 mt-2" {...(totp.otpCredentials.length >= 1 && { isRequired: true })}>
                            <FormControl.Label>{msg("loginTotpDeviceName")}</FormControl.Label>
                            <TextInput block id="userLabel" name="userLabel" autoComplete="off" />
                            {messagesPerField.existsError("userLabel") && (
                                <FormControl.Validation variant="error">
                                    <span
                                        id="input-error-otp-label"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.get("userLabel"))
                                        }}
                                    />
                                </FormControl.Validation>
                            )}
                        </FormControl>
                        <LogoutOtherSessions i18n={i18n} />
                    </div>
                    <div className="p-4 border-t border-border-default flex justify-end">
                        {isAppInitiatedAction ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <Button variant="primary" className="bg-button-rest!" type="submit" id="saveTOTPBtn">
                                        {msgStr("doSubmit")}
                                    </Button>
                                    <Button as="a" href={myaccountUrl} type="submit" id="cancelTOTPBtn" name="cancel-aia" value="true">
                                        {msg("doCancel")}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2">
                                    <Button variant="primary" className="bg-button-rest!" type="submit" id="saveTOTPBtn">
                                        {msgStr("doSubmit")}
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomLoginConfigTotp;

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (
        <div>
            <div className="ml-5 mt-4">
                <label className="flex items-center gap-1">
                    <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                    <Text size="medium" className="ml-2">
                        {msg("logoutOtherSessions")}
                    </Text>
                </label>
            </div>
        </div>
    );
}
