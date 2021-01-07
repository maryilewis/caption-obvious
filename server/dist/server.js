var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function () {
    console.log("server listening on 1337");
});
// create the server
const wsServer = new WebSocketServer({
    httpServer: server
});
var clients = [];
var playerNames = [];
var games = new Map();
// WebSocket server
wsServer.on('request', function (request) {
    console.log("received connection");
    // TODO check and see if it's a pre-existing conneciton that DCed
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;
    // Do initial connection stuff for this player
    // for (var i = 0; i < clients.length; i++) {
    // 	clients[i].sendUTF({"message" : "hello"});
    // }
    clients[index].sendUTF(JSON.stringify({ "players": playerNames }));
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        var _a;
        console.log("message received", message);
        if (message.type === 'utf8') {
            const messageData = JSON.parse(message.utf8Data);
            // process WebSocket message
            if (messageData.hasOwnProperty("name")) {
                clients[index].nickname = messageData.name;
                // this needs to only go to clients in the current client's game
                updatePlayerNames();
                console.log(clients[index].nickname + " has set their name");
            }
            if (messageData.hasOwnProperty("new")) {
                const code = generateGameCode();
                games.set(code, generateLobby(code, clients[index]));
                console.log(clients[index].nickname + " has created game " + code);
            }
            if (messageData.hasOwnProperty("code")) {
                console.log(clients[index].nickname + " wants to join game " + messageData.code);
                (_a = games.get(messageData.code)) === null || _a === void 0 ? void 0 : _a.players.push(clients[index]);
            }
        }
    });
    connection.on('close', function (connection) {
        console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");
        // close user connection
        // TODO don't remove, just mark as DCed
        clients.splice(index, 1);
    });
});
function updatePlayerNames() {
    const names = [];
    for (var i = 0; i < clients.length; i++) {
        names.push(clients[i].nickname);
    }
    for (var i = 0; i < clients.length; i++) {
        clients[i].sendUTF(JSON.stringify({ "players": names }));
    }
}
function generateGameCode() {
    return (games.size + 1).toString();
}
function generateLobby(code, player) {
    return {
        code: code,
        players: [player]
    };
}
//# sourceMappingURL=server.js.map