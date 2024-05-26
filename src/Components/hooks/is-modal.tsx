import { useEffect } from "react"

type Props = {
    show: boolean
}

export const useIsModal = ({ show }: Props) => {
    useEffect(() => {
        const html = document.querySelector("html") as HTMLHtmlElement
        if (show) {
            html.style.overflow = "hidden"
        } else {
            html.style.overflow = "auto"
        }

        return () => {
            html.style.overflow = "auto"
        }
    }, [show])
}