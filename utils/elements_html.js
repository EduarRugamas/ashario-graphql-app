const createElementHtml = (Tagelement) => {
    return document.createElement(Tagelement);
}

const appendElementHtml = (fatherElement, childElement) =>  {
    return fatherElement.appendChild(childElement);
}


export {
    createElementHtml,
    appendElementHtml
};
