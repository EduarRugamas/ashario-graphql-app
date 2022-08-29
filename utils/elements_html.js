const createElementHtml = (TagElement) => {
    return document.createElement(TagElement);
}

const appendElementHtml = (fatherElement, childElement) =>  {
    return fatherElement.appendChild(childElement);
}


export {
    createElementHtml,
    appendElementHtml
};
