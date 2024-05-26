import { MouseEvent } from "react";
import Link from "next/link";
import "./styles.module.css";

type Props = {
    title: string;
    href?: string;
    disabled?: boolean;
    className?: string;
    blank?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
                    title,
                    href,
                    disabled,
                    className,
                    blank,
                    onClick,
                }: Props) => {
    if (href) {
        return (
            <Link
                href={href}
                target={blank ? "_blank" : "_self"}
                className={`root ${disabled && "disabled"} ${className}`}
            >
                {title}
            </Link>
        );
    }

    return (
        <button
            className={`root ${disabled && "disabled"} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;