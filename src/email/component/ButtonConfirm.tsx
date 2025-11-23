import { Button } from "jsx-email";

interface ButtonConfirmProps {
    href: string;
    text: string;
}

const ButtonConfirm = ({ href, text }: ButtonConfirmProps) => {
    return (
        <>
            <Button
                height={32}
                width={130}
                href={href}
                align="left"
                fontSize={14}
                borderRadius={6}
                style={{
                    backgroundColor: "#0969DA",
                    color: "#FFFFFF"
                }}
            >
                {text}
            </Button>
        </>
    );
};

export default ButtonConfirm;
