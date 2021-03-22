function HtmlEncode(s) {
    let el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}

function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    return false;
}

function AddImg(imgPath, index) {
    let imgElem = document.createElement("img");
    imgElem.src = imgPath;
    imgElem.style.display = 'none';
    imgElem.setAttribute("id", "img_" + index);
    $("#ImagesBox").append(imgElem).scrollTop(999999);
}

function showElement(shown, hidden) {
    let hiddenElement = document.getElementById(hidden);
    if (hiddenElement) {
        hiddenElement.style.display = 'none';
    }
    let shownElement = document.getElementById(shown);
    if (shownElement) {
        shownElement.style.display = 'block';
    }
    return false;
}