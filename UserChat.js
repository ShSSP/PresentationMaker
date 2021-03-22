let shownImg = 0;

$(document).ready(function() {});

$(document).ready(function() {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    let msg = 'User entered the chat with brouser size: ' + vw + 'x' + vh;
    let name = 'System Ntification';

    CometServer().web_pipe_send("web_NewUserEntered", { "text": msg, "name": name });
});

$(document).ready(function() {

    CometServer().subscription("web_PresentationImages", function(msg) {
        console.log(["msg web_PresentationImages", msg]);

        $("#ImagesBox").empty();

        let imgPaths = JSON.parse(msg.data.images);
        imgPaths.forEach((imgPath, index) => AddImg(imgPath, index));
        showElement("img_" + shownImg);
    });

    CometServer().subscription("web_SelectedImage", function(msg) {
        console.log(["msg web_SelectedImage", msg]);
        let selectedImg = msg.data.selected;
        showElement("img_" + selectedImg, "img_" + shownImg);
        shownImg = selectedImg;
    });
});