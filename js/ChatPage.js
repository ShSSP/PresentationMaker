$(document).ready(function() {
    CometServer().start({ dev_id: 3402, user_id: 1, user_key: "userHash", node: "app.comet-server.ru" });

    CometServer().subscription("web_PageChat", function(msg) {
        console.log(["msg web_MainPageChat", msg]);
        $("#WebChatForm").append(
            ChatMsgSpan(msg.data.name, msg.data.text)
        ).scrollTop(999999);
    });

    comet_server_signal().connect("AddToMainPageChat", function(msg) {
        console.log(["msg AddToMainPageChat", msg]);
        $("#WebChatForm").append(
            ChatMsgSpan(msg.name, msg.text)
        ).scrollTop(999999);
    });
});

function web_send_msg() {
    // Sending a message in the chat channel
    CometServer().web_pipe_send("web_MainPageChat", { "text": text, "name": name });

    // Notify other tabs that we have added a chat message
    comet_server_signal().send_emit("AddToMainPageChat", { "text": text, "name": name })
}

function webSendMsg() {
    // Getting values of input elements.
    var text = $("#WebChatTextID").val();
    var name = $("#WebChatNameID").val();

    // Cleaning mold
    $("#WebChatTextID").val("");

    CometServer().web_pipe_send("web_PageChat", { "text": text, "name": name });

    comet_server_signal().send_emit("AddToMainPageChat", { "text": text, "name": name })
};

function ChatMsgSpan(name, text) {
    return "<div class='ChatMsg'><span><b>" +
        HtmlEncode(name) + ": </b>" +
        HtmlEncode(text) + "</span></div>"
}