import { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import { Text, Heading } from "@primer/react";
import { CheckCircleFillIcon } from "@primer/octicons-react";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "info.ftl" }>;
    i18n: I18n;
};

const CustomInfo = (props: PageProps) => {
    const { kcContext } = props;

    console.log(kcContext.message?.type);

    return (
        <div className="bg-bg-default border rounded-2xl border-border-default max-w-[375px] w-full overflow-hidden">
            <div className="flex items-center justify-center border-b border-border-muted gap-4 p-4">
                <div className="flex items-center justify-center w-8 h-8 border-2 border-bg-success-muted rounded-full">
                    <CheckCircleFillIcon className="text-bg-success-emphasis" size={24} />
                </div>

                <Heading as="h2" variant="medium" className="text-left flex-1">
                    A password reset link has been sent to your address
                </Heading>
            </div>
            <div className="p-4 bg-bg-inset rounded-b-2xl border-border-transparent">
                <Text size="medium">
                    Please click on the link that has just been sent to your email account to reset your password and continue the process.
                </Text>
            </div>
        </div>
    );
};

export default CustomInfo;
