import io from "socket.io-client";

const socket = io.connect("http://192.168.0.165:3500");

export default socket;