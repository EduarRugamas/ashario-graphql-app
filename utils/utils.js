const FadeOut = (ElementHtml) => {
    ElementHtml.style.opacity = 1;
    (function fade() {
       if ((ElementHtml.style.opacity -= 0.1) < 0) {
           ElementHtml.style.display = 'none';
       }else {
           requestAnimationFrame(fade);
       }
    })();
}

const FadeIn = (ElementHtml) => {
    ElementHtml.style.opacity = 0;
    ElementHtml.style.display='block';
    (function fade() {
        let valor = parseFloat(ElementHtml.style.opacity);
        if (!(valor += 0.005) > 1) {
            ElementHtml.style.opacity = valor;
            requestAnimationFrame(fade);
        }
    })();
}

exports = {
    FadeOut,
    FadeIn
}
