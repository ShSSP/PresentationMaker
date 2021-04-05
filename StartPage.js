function StartLikePresenter() {
    AddScriptElement('AdminChat.js');
    SelfHide();
}

function StartLikeViewer() {
    AddScriptElement('UserChat.js');
    $("#PresenterControl").remove();
    SelfHide();
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