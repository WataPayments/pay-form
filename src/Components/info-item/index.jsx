import "./styles.css";


const InfoItem = ({ title, value, className }) => {
    return (
        <div className={"root"}>
            <h3 className={"title"}>{title}</h3>
            <h2 className={`${className}`}>{value}</h2>
        </div>
    )
}

export default InfoItem