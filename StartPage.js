function StartLikePresenter() {
    SavePresentationKey();
    AddScriptElement('AdminChat.js');
    SelfHide();
}

function StartLikeViewer() {
    SavePresentationKey();
    AddScriptElement('UserChat.js');
    $("#PresenterControl").remove();
    SelfHide();
}

function SavePresentationKey() {
    PresentationKey = $("#PresentationKey").val();
}

function AddScriptElement(src) {
    let head = $('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;

    head.append(script);
}

function SelfHide() {
    $("#StartPage").hide();
    $('#MainPage').show();
}