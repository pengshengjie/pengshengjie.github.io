const { createDiffieHellman } = require("crypto");
const { generate } = require("escodegen");

// 客户端

const client = createDiffieHellman(521);
const clientKeys = client.generateKeys();
const generator = client.getGenerator();
const prime = client.getPrime();

// 服务器端

const server = createDiffieHellman(prime, generator);
const serverKeys = server.generateKeys();

// 交换临时密钥Key

const clientSecret = client.computeSecret(serverKeys).toString("hex");
const serverSecret = server.computeSecret(clientKeys).toString("hex");

console.log(clientSecret);
console.log(serverSecret);

console.log("验证通过", clientSecret === serverSecret);

van - overlay;

const style = document.createElement("style");
style.innerHTML = `.buy_parent,
.van-overlay {
display: none !important;
}`;
document.getElementsByTagName("head")[0].appendChild(style);
setInterval(() => {
  document.querySelector(".dplayer-video-current").pause = () => false;
}, 100);


const isVisibel = true;
if(isVisibel) {
  
}