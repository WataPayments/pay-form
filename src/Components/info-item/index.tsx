import "/styles.css";

type Props = {
    title: string
    value: string
    className: string
}

const InfoItem = ({ title, value, className }: Props) => {
    return (
        <div className={"root"}>
            <h3 className={"title"}>{title}</h3>
            <h2 className={`${className}`}>{value}</h2>
        </div>
    )
}

export default InfoItem