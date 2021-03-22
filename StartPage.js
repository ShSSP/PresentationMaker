function StartLikePresenter() {
    AddScriptElement('AdminChat.js');
    SelfRemove();
}

function StartLikeViewer() {
    AddScriptElement('UserChat.js');
    document.getElementById("PresenterControl").remove();
    SelfRemove();
}

function AddScriptElement(src) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;

    head.appendChild(script);
}

function SelfRemove() {
    document.getElementById("StartPage").remove();

    let mainElement = document.getElementById('MainPage');
    mainElement.style.display = '';

    removejscssfile("StartPage.js", "js");
}

function removejscssfile(filename, filetype) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}