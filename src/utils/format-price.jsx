const formatPrice = (price) => {
    let sub = "";
    let newPrice = price;
    if (price % 1 !== 0) {
        sub = String(price % 1).slice(1);
        newPrice = Math.floor(price);
    }
    const arrNum = String(newPrice).split("").reverse();
    const result = arrNum.map((num, index) =>
        !(index % 3 === 0) || index === 0 ? num : num + ","
    );
    return (
        result.reverse().join("") + String(Math.round(+sub * 100) / 100).slice(1, 4)
    );
};

export default formatPrice;