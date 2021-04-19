function StartLikePresenter() {
    SavePresentationKey();

    CometServer().subscription(GetPushEvent("web_SessionExists"), function(e) {
        BackToStart("Presentation with this key already exists.");
    });
    CometServer().web_pipe_send(GetPushEvent("web_CreateSession"), {});

    AddScriptElement('AdminChat.js');
    HideAndShow('#StartPage', '#MainPage');
}

function StartLikeViewer() {
    SavePresentationKey();
    AddScriptElement('UserChat.js');
    $("#PresenterControl").remove();
    HideAndShow('#StartPage', '#MainPage');
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

function BackToStart(msg) {
    alert(msg);
    PresentationKey = "";
    HideAndShow('#MainPage', '#StartPage');
    $('script').each(function() {
        if (this.src === 'AdminChat.js') {
            this.parentNode.removeChild(this);
        }
    })
}

function HideAndShow(hide, show) {
    $(hide).hide();
    $(show).show();
}