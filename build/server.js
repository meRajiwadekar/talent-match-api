"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_setup_1 = __importDefault(require("./server-setup"));
let port = process.env.PORT || 8081;
if (!port) {
    throw new Error('Port is required,but missing');
}
let host = '127.0.0.1';
let options = {
    port: Number(port),
    host
};
server_setup_1.default.listen(options, async (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
exports.default = server_setup_1.default;
//# sourceMappingURL=server.js.map