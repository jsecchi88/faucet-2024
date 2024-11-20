# faucet-2024

INIT NODO
docker run -v ./genesis.json:/gen.json -v ./datos:/data ethereum/client-go:latest \
> init --datadir /data /gen.json