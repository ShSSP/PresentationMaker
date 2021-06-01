$(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let key = urlParams.get('key');
    if (key) $("#PresentationKey").val(key)
    let ex = urlParams.get('ex');
    if (ex) showPopup(ex);
});

function StartLikePresenter() {
    SavePresentationKey();

    CometServer().subscription(GetPushEvent("web_SessionExists"), function(e) {
        let ex = 'Presentation with this key already exists.'
        window.location.search += `&key=${PresentationKey}&ex=${ex}`;
    });
    CometServer().web_pipe_send(GetPushEvent("web_CreateSession"), {});

    AddScriptElement('AdminChat.js');
    $('#StartPage').hide();
    $('#MainPage').show();
}

function StartLikeViewer() {
    SavePresentationKey();

    let flag = false;
    $('#StartPage').hide();

    CometServer().subscription(GetPushEvent("web_SessionExists"), function(e) {
        flag = true;
        $("#loading").hide();
        AddScriptElement('UserChat.js');
        $("#PresenterControl").remove();
        $('#MainPage').show();
    });
    CometServer().web_pipe_send(GetPushEvent("web_CreateSession"), {});

    setTimeout(function() {
        if (flag) return;
        let ex = 'No presentation with this key was found.'
        window.location.search += `&key=${PresentationKey}&ex=${ex}`;
    }, 10000);


    $("#loading").show();
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