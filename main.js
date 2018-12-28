let checkbox = $("[name='my-checkbox']");
let b = checkbox.bootstrapSwitch();

$('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
    if(state){
        chrome.tabs.query({active:true, currentWindow:true}, function (tab) {//获取当前tab
            //向tab发送请求
            chrome.tabs.sendMessage(tab[0].id, {
                action: "send"
            }, function (response) {
                console.log(response);
            });
        });
    }
});

