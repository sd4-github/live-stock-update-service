const { Socket } = require("dgram");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const randomStockObject = require("./random-stock-values")

const port = process.env.PORT || 9090;

io.of("/live")
	.on("connection", socket => {
	socket.join("stocks");
    socket.on("joinStocksRoom", room => {
    	if (room == "stocks") {
    		socket.join("stocks");
    	}
    });
    setInterval(() => {
    	io.of("/live").to("stocks").emit("livestocks",[
			randomStockObject.getAppleStockValues(),
			randomStockObject.getGoogleStockValues(),
			randomStockObject.getMicrosoftStockValues()
		])           
    }, 2000);
})

// io.on("connection", socket => {
//     getStockValues(socket);
//     setInterval(() => {
//         getStockValues(socket);
//     }, 5000);
// })

// function getStockValues(socket) {
//     socket.emit("appleStocks", randomStockObject.getAppleStockValues());
//     socket.emit("googleStocks", randomStockObject.getGoogleStockValues());
//     socket.emit("microsoftStocks", randomStockObject.getMicrosoftStockValues());

// }

http.listen(port, ()=> console.log(`the stock server is listening on port - ${port}`));