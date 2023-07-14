const getRamdomColor = () => {
    let x = parseInt(Math.random() * 256);
    let y = parseInt(Math.random() * 256);
    let z = parseInt(Math.random() * 256);
    let color = `rgb(${x},${y},${z})`;
    return color;
};

export default getRamdomColor;