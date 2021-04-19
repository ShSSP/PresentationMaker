let expiration = "600";
let presenterImgbbKey = "298d4e3595d9781d0324fe9f80b4965a";
let imagePaths = [];
let selectedImg = 0;

function imgIbbUrl() {
    return `https://api.imgbb.com/1/upload?expiration=${expiration}&key=${presenterImgbbKey}`;
}

$(document).ready(function() {

    CometServer().subscription(GetPushEvent("web_NewUserEntered"), function(msg) {
        console.log(["msg web_NewUserEntered", msg]);

        $("#WebChatFormForm").append("<p style='padding: 0px; margin: 0px; color: red; font-weight: bold;'><b>" +
            HtmlEncode(msg.data.name) + ": </b>" +
            HtmlEncode(msg.data.text) + "</p>"
        ).scrollTop(999999);

        PushImages();
    });

    CometServer().subscription(GetPushEvent("web_CreateSession"), function(msg) {
        CometServer().web_pipe_send(GetPushEvent("web_SessionExists"), {});
    });

    comet_server_signal().connect("AddNewImages", function(msg) {
        $("#ImagesBox").empty();

        let imgPaths = JSON.parse(msg.images);
        imgPaths.forEach((imgPath, index) => AddImg(imgPath, index));
        showElement("img_" + selectedImg);
    });
});


$('#Images').change(function() {
    let files = this.files;
    for (let i = 0; i < files.length; i++) {
        let form = new FormData();
        form.append("image", files[i]);

        let url = imgIbbUrl();
        let req = new Request(url, {
            method: 'POST',
            body: form
        });

        fetch(req)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((jsodData) => {
                let imgPath = jsodData.data.display_url;
                imagePaths.push(imgPath);
            })
            .then(() => {
                PushImages();
            })
            .catch((err) => {
                console.log('ERROR: ', err.message);
            });
    }
});

function SelectNextImg() {
    if (selectedImg < imagePaths.length - 1) {
        showElement("img_" + (selectedImg + 1), "img_" + selectedImg)
        selectedImg++;
        CometServer().web_pipe_send(GetPushEvent("web_SelectedImage"), { "selected": selectedImg });
    }
}

function SelectPreviousImg() {
    if (selectedImg > 0) {
        showElement("img_" + (selectedImg - 1), "img_" + selectedImg)
        selectedImg--;
        CometServer().web_pipe_send(GetPushEvent("web_SelectedImage"), { "selected": selectedImg });
    }
}

function PushImages() {
    let imgs = JSON.stringify(imagePaths);

    CometServer().web_pipe_send(GetPushEvent("web_PresentationImages"), { "images": imgs });
    CometServer().web_pipe_send(GetPushEvent("web_SelectedImage"), { "selected": selectedImg });
    comet_server_signal().send_emit("AddNewImages", { "images": imgs });
    comet_server_signal().send_emit("SelecteImage", { "selected": selectedImg });
}