"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var ethers = require("ethers");
var fs = require("fs");
var app = express();
app.use(express.json());
app.use(cors());
var port = 3333;
app.get("/api/balanceEthers/:address", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var address, provider, balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = req.params.address;
                provider = new ethers.JsonRpcProvider('http://localhost:5556');
                return [4 /*yield*/, provider.getBalance(address)];
            case 1:
                balance = _a.sent();
                res.json({ address: address, balance: (Number(balance) / Math.pow(10, 18)),
                    fecha: new Date().toISOString() });
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/balance/:address", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var address, retorno, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = req.params;
                return [4 /*yield*/, fetch('http://localhost:5556/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            jsonrpc: "2.0",
                            method: "eth_getBalance",
                            params: [
                                address,
                                "latest"
                            ],
                            id: 1
                        })
                    })];
            case 1:
                retorno = _a.sent();
                return [4 /*yield*/, retorno.json()];
            case 2:
                data = _a.sent();
                res.json({ address: address, balance: (Number(data.result) / Math.pow(10, 18)),
                    fecha: new Date().toISOString() });
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/faucet/:address/:amount", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, address, amount, provider, ruta, rutaData, wallet, WalletConnected, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, address = _a.address, amount = _a.amount;
                provider = new ethers.JsonRpcProvider('http://localhost:5556');
                ruta = "../nodo/datos/keystore//Users/jona/Desktop/Master Ingeniero Blockchain/01 web2.5/Projects/Proyecto Faucet 2024/GitHub/faucet-2024/nodo/datos/keystore/UTC--2024-11-13T00-56-05.443999007Z--fe799446261d082ee8aa9cc6418a040ee3627c41";
                rutaData = fs.readFileSync(ruta, "utf-8");
                console.log(rutaData);
                return [4 /*yield*/, ethers.Wallet.fromEncryptedJson(rutaData, "123456")];
            case 1:
                wallet = _b.sent();
                WalletConnected = wallet.connect(provider);
                return [4 /*yield*/, WalletConnected.sendTransaction({
                        to: address,
                        value: ethers.parseEther(amount)
                    })];
            case 2:
                tx = _b.sent();
                return [4 /*yield*/, tx.wait()];
            case 3:
                _b.sent();
                res.json({ address: address, amount: amount, fecha: new Date().toISOString() });
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port ${port}");
});
