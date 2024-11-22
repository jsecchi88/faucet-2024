# faucet-2024

BACK
Paquetes
npm i dotenv

Para lanzar el back: 
npx ts-node index.ts

INIT NODO
docker run -v ./genesis.json:/gen.json -v ./datos:/data ethereum/client-go:latest \
> init --datadir /data /gen.json

DOCKER RUN
docker run --rm \
-v ./pwd.txt:/p.txt \
-v ./datos:/data \
-p 5556:8545 \
ethereum/client-go:latest \
--datadir /data \
--unlock fe799446261d082ee8aa9cc6418a040ee3627c41 \
--allow-insecure-unlock \ (esta linea se elimina si el nodo es solo miner)
--mine \
--miner.etherbase fe799446261d082ee8aa9cc6418a040ee3627c41 \
--password /p.txt \
--nodiscover \ (para no estar buscando vecinos)
--http \
--http.addr "0.0.0.0" \
--http.api "admin,eth,debug,miner,net,txpool,personal,web3" \
--http.corsdomain "*"