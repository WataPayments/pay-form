import { useEffect } from "react"


export const useIsModal = ({ show }) => {
    useEffect(() => {
        const html = document.querySelector("html")
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