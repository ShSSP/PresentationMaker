$(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let key = urlParams.get('key');
    if (key) $("#PresentationKey").val(key);
});

function StartLikePresenter() {
    let pKey = $("#PresentationKey").val();
    if (PKeyValidation(pKey)) return;

    SavePresentationKey(pKey);

    CometServer().subscription(GetPushEvent("web_SessionExists"), function(e) {
        let msg = 'Presentation with this key already exists. Enter private key to continue:'
        let control = $('<div>');
        control.append(`<p>${msg}</p>`);
        control.append($('<input>').attr({
            id: 'privatKeyInput',
            type: 'text'
        }));
        control.append($('<button>').attr({
            onclick: 'PrivatKeyCheck()'
        }).html('Continue'));
        showPopupControl(control, function() {
            window.location.search += `&key=${PresentationKey}`;
        });
    });
    CometServer().web_pipe_send(GetPushEvent("web_CreateSession"), {});

    AddScriptElement('AdminChat.js');
    $('#StartPage').hide();
    $('#MainPage').show();
}

function StartLikeViewer() {
    let pKey = $("#PresentationKey").val();
    if (PKeyValidation(pKey)) return;

    SavePresentationKey(pKey);

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

function SavePresentationKey(pKey) {
    PresentationKey = pKey;
}

function PKeyValidation(pKey) {
    return !pKey;
}

function AddScriptElement(src) {
    let head = $('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'js/' + src;

    head.append(script);
}

function PrivatKeyCheck() {
    let key = $('#privatKeyInput').val();
    CometServer().subscription(GetPushEvent("web_KeyApproved"), function(e) {
        let msg = 'Key approved.';
        showPopup(msg, () => {});
    });
    CometServer().subscription(GetPushEvent("web_KeyRejected"), function(e) {
        let ex = 'Key rejected.';
        showPopup(ex, function() {
            window.location.search += `&key=${PresentationKey}`;
        });
    });

    CometServer().web_pipe_send(GetPushEvent("web_CheckPrivatKey"), { 'key': key });
}