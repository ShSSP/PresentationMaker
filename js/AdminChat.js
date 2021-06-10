let expiration = "600";
let presenterImgbbKey = "298d4e3595d9781d0324fe9f80b4965a";
let imagePaths = [];
let selectedImg = 0;
let privateKey = Math.random().toString(36).substring(7);

function imgIbbUrl() {
    return `https://api.imgbb.com/1/upload?expiration=${expiration}&key=${presenterImgbbKey}`;
}

$(document).ready(function() {
    CometServer().subscription(GetPushEvent("web_NewUserEntered"), function(msg) {
        PushImages();
    });

    CometServer().subscription(GetPushEvent("web_CreateSession"), function(msg) {
        CometServer().web_pipe_send(GetPushEvent("web_SessionExists"), {});
    });

    CometServer().subscription(GetPushEvent(`web_CheckPrivatKey`), function(msg) {
        msg.data.key === privateKey ?
            CometServer().web_pipe_send(GetPushEvent(`web_KeyApproved`), {}) :
            CometServer().web_pipe_send(GetPushEvent(`web_KeyRejected`), {})
    });

    comet_server_signal().connect("AddNewImages", function(msg) {
        $("#ImagesBox").empty();

        let imgPaths = JSON.parse(msg.images);
        imgPaths.forEach((imgPath, index) => AddImg(imgPath, index));
        $("#img_" + selectedImg).show();
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
        $("#img_" + selectedImg).hide();
        $("#img_" + (selectedImg + 1)).show();
        selectedImg++;
        CometServer().web_pipe_send(GetPushEvent("web_SelectedImage"), { "selected": selectedImg });
    }
}

function SelectPreviousImg() {
    if (selectedImg > 0) {
        $("#img_" + selectedImg).hide();
        $("#img_" + (selectedImg - 1)).show();
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

function ShowPrivatKey() {
    showPopup(`Private key this presentation: ${privateKey}.`)
}