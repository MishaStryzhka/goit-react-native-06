let initialValue = 1
const doubleClick = (onPress) => {
    console.log('initialValue', initialValue)
    if (initialValue === 2) {
        onPress();
    } else {
        setTimeout(() => {
            initialValue = 1
        }, 1000);
    }
    initialValue = initialValue + 1
};

export default doubleClick;