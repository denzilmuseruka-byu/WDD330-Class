function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

function writeToLS(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}

function removeFromLS(key) {
    localStorage.removeItem(key);
}

export {
    readFromLS,
    writeToLS,
    removeFromLS
}