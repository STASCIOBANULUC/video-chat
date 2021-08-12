console.log('Hi');


var usernameInput = document.querySelector('#username');

var btnJoin = document.querySelector('#btn-join');

var username;

var webSocket;

function webSocketOnMessage(event){
    var parsedData = JSON.parse(event.data);
    var message = parsedData['message'];

    console.log('message:', message);


}



btnJoin.addEventListener('click', () => {
    username = usernameInput.value;

    console.log('username:', username);

    if (username == ''){
        return;
    }



    usernameInput.value = '';
    usernameInput.disabled = true;
    usernameInput.style.visibility = "hidden";

    btnJoin.disabled = true;
    btnJoin.style.visibility = "hidden";

    var labelUsername = document.querySelector('#label-username');
    labelUsername.innerHTML = username;

    var loc = window.location;
    var wsStart = 'ws://';

    if(loc.protocol == 'https:'){
        wsStart = 'ws://';
    }
    var endPoint = wsStart + loc.host + loc.pathname;

    console.log('endPoint:', endPoint);

    webSocket = new WebSocket(endPoint);

    webSocket.addEventListener('open', (e) => {

        console.log('CONNECTION OPENED!!!');

        var jsonStr = JSON.stringify({
            'message:': 'THIS IS MESSAGE',
        });

        webSocket.send(jsonStr);

    });

    webSocket.addEventListener('message', webSocketOnMessage);
    webSocket.addEventListener('close', (e) => {

        console.log('CONNECTION CLOSED!!!');
        });
    webSocket.addEventListener('error', (e) => {

        console.log('ERROR!!!');
        });


});

var localStream = new MediaStream();

const constrains = {
    "video": true,
    "audio": true

};

const localVideo = document.querySelector('#local-video');

var userMedia = navigator.mediaDevices.getUserMedia(constrains)
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = localStream;
        localVideo.mated = true;
    })
    .catch(error => {
        console.log('ERROR: MEDIA DEVICES', error)
    })