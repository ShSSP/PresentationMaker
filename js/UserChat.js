let shownImg = 0;

$(document).ready(function() {});

$(document).ready(function() {
    CometServer().web_pipe_send(GetPushEvent("web_NewUserEntered"), {});
});

$(document).ready(function() {

    CometServer().subscription(GetPushEvent("web_PresentationImages"), function(msg) {
        $("#ImagesBox").empty();

        let imgPaths = JSON.parse(msg.data.images);
        imgPaths.forEach((imgPath, index) => AddImg(imgPath, index));
        $("#img_" + shownImg).show();
    });

    CometServer().subscription(GetPushEvent("web_SelectedImage"), function(msg) {
        let selectedImg = msg.data.selected;
        $("#img_" + shownImg).hide();
        $("#img_" + selectedImg).show();
        shownImg = selectedImg;
    });
});