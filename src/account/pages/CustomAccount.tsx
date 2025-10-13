import { KcContext } from "../KcContext";

type PageProps = {
    kcContext: Extract<KcContext, { pageId: "account.ftl" }>;
};

const CustomAccount = (props: PageProps) => {
    const { kcContext } = props;

    const myUrl = kcContext.properties.MY_APP_URL;

    return (window.location.href = myUrl);
};

export default CustomAccount;
