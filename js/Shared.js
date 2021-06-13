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

let popupAfterClose = () => {};

function showPopup(msg, afterClose) {
    showPopupControl($(`<p>${msg}</p>`), afterClose);
}

function showPopupControl(control, afterClose) {
    let popup = $("#popup");
    popup.children(".popup-content").children('.popup-msg').children().remove();
    popupAfterClose = afterClose ? afterClose : () => {};
    popup.children(".popup-content").children('.popup-msg').append(control);
    popup.show();
}

$(function() {
    $('body').on('click', '.popup-close', function() {
        $("#popup").hide();
        if (popupAfterClose)
            popupAfterClose();
        var modal = $(this).parents('.popup-content');
        modal.children("popup-msg").children().remove();
    }).on('mousedown', '.popup', function(e) {
        if (e.target !== this) return;
        $('.popup-close').trigger('click');
    });
});
$(function() {
    $('body').on('click', '.chat-close', function() {
        $('.Chat').show();
        $('#OpenColseChat').addClass('chat-open').removeClass('chat-close');
    });
    $('body').on('click', '.chat-open', function() {
        $('.Chat').hide();
        $('#OpenColseChat').addClass('chat-close').removeClass('chat-open');
    });
});