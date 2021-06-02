$(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let key = urlParams.get('key');
    if (key) $("#PresentationKey").val(key);
});

function StartLikePresenter() {
    SavePresentationKey();

    CometServer().subscription(GetPushEvent("web_SessionExists"), function(e) {
        let ex = 'Presentation with this key already exists.'
        showPopup(ex, function() {
            window.location.search += `&key=${PresentationKey}`;
        });
    });
    CometServer().web_pipe_send(GetPushEvent("web_CreateSession"), {});

    AddScriptElement('AdminChat.js');
    $('#StartPage').hide();
    $('#MainPage').show();
}

function StartLikeViewer() {
    SavePresentationKey();

    let sessionExists = false;
    $('#StartPage').hide();

    CometServer().subscription(GetPushEvent("web_SessionExists"), function(e) {
        sessionExists = true;
        $("#loading").hide();
        AddScriptElement('UserChat.js');
        $("#PresenterControl").remove();
        $('#MainPage').show();
    });
    CometServer().web_pipe_send(GetPushEvent("web_CreateSession"), {});

    setTimeout(function() {
        if (sessionExists) return;
        $("#loading").hide();
        let ex = 'No presentation with this key was found.'
        showPopup(ex, function() {
            window.location.search += `&key=${PresentationKey}`;
        });
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
    script.src = 'js/' + src;

    head.append(script);
}