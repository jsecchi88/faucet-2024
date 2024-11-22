docker run --rm \
  -v ./pwd.txt:/p.txt \
  -v ./datos:/data \
  -p 5556:8545 \
  ethereum/client-go:v1.13.15 \
  --datadir /data \
  --unlock fe799446261d082ee8aa9cc6418a040ee3627c41 \
  --allow-insecure-unlock \
  --mine \
  --miner.etherbase fe799446261d082ee8aa9cc6418a040ee3627c41 \
  --password /p.txt \
  --nodiscover \
  --http \
  --http.addr "0.0.0.0" \
  --http.api "admin,eth,debug,miner,net,txpool,personal,web3" \
  --http.corsdomain "*"

