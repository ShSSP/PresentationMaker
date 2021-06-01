let PresentationKey = "";

function GetPushEvent(event) {
    return `${event}_key_${PresentationKey}`;
}

function HtmlEncode(s) {
    let el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}

function AddImg(imgPath, index) {
    let imgElem = document.createElement("img");
    imgElem.src = imgPath;
    imgElem.style.display = 'none';
    imgElem.setAttribute("id", "img_" + index);
    $("#ImagesBox").append(imgElem).scrollTop(999999);
}

function showPopup(msg) {
    let popup = $("#popup");
    popup.children(".popup-content").append(`<p>${msg}</p>`);
    popup.show();
}

$(function() {
    $('body').on('click', '.popup-close', function() {
        $("#popup").hide();
        var modal = $(this).parents('.popup-content');
        modal.children("p").remove();
    }).on('mousedown', '.popup', function(e) {
        if (e.target !== this) return;
        $('.popup-close').trigger('click');
    });
});