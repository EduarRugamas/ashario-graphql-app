const createElementHtml = (element) => {
    return document.createElement(element);
}

const appendElementHtml = (elementhtml, element) =>  {
    return elementhtml.appendChild(element);
}


export {
    createElementHtml,
    appendElementHtml
};
