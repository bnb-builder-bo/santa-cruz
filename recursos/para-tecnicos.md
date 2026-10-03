# Para técnicos

Lo que el editor corre solo cuando le decís el oficio. Sirve para el proyector si alguien se traba, y para seguir en casa.

## Verificar

```powershell
node -v
npm install -g @bnbagent/studio-cli@latest
bag --version
bag skills install --scope user --target cursor
bun --version
```

Node 22 o más. Bun 1.3 o más entra en el deploy, no para crear el agente en local.

## Lo que arma el editor

`bag init` con testnet, Pieverse, wallet local y destino `platform`. El modelo `auto/free` no cobra. Ver el agente en local no exige tBNB ni $U.

Nombre del proyecto: empieza con letra, solo letras y números, 23 caracteres como máximo.

## Deploy

El primer `bag deploy` exitoso arranca **una** ventana de 48 horas por cuenta de GitHub. Un redeploy no la reinicia. En esa ventana caben varios agentes (el tope publicado es 10). Login sin deploy no gasta el reloj.

```powershell
bag platform login
bag deploy --provider bnb
bag deploy verify --provider bnb
bag platform credit
```

Wallet de prueba. La clave sale de la laptop al desplegar. La personal se queda afuera.

## Fondos

Hacen falta cuando el agente cobra o paga en la red.

- Gas: tBNB en BSC Testnet (chain ID 97).
- Cobro de prueba: $U `0xc70B8741B8B07A6d61E54fd4B20f22Fa648E5565`, 18 decimales.

`bag wallet show` imprime la address del agente. El envío sale de una wallet de testnet hacia esa address.

## Secuencia verificada (3 oct)

Corrida de punta a punta con `@bnbagent/studio-cli` 0.0.14 (Agent Studio v4), manejada desde el editor con `/bnbagent-studio`.

```powershell
npm install -g @bnbagent/studio-cli
bag skills install
bag --version
bag init sunombre --network bsc-testnet --llm-provider pieverse-llm --wallet-kind evm-local --storage-provider local --destination platform
cd sunombre/app/agent
bag wallet new --generate-password   # solo si init no creó la wallet
bag llm activate                     # solo si init no activó Pieverse
bag doctor
bag wallet show
bag dev
bun --version
bag platform login
bag platform credit
bag deploy prepare --provider bnb
bag deploy --provider bnb
bag deploy verify --provider bnb
bag erc8004 update-metadata --key name --value 'Nombre'
bag erc8004 update-metadata --key description --value 'Qué vende'
bag erc8004 get-metadata --key name
```

- **Contraseña.** En una terminal humana, `bag init` la genera, la guarda en `.studio/.env.local`, crea la wallet y activa Pieverse en cero. Si init lo corrió el editor (sin TTY) o con `--no-onboard`, faltan wallet y llave: van las dos líneas marcadas. Sin `bag llm activate`, `deploy prepare` se bloquea por `[llm.pieverse].key_hash`.
- **Secretos.** El `.env.local` no se pega en el chat. Claves y contraseñas no van en la línea de comandos.
- **Trabajo.** Se arma en `buildRunWork`, dentro de `app/agent/src/unifiedMain.ts`. `sellerCore.ts` es el núcleo ERC-8183 que lo llama.
- **Modelo gratis.** `auto/free` filtra su razonamiento y cierra con `</think>`. Pídanle al editor que lo saque de la entrega.
- **studio.toml.** No agreguen `description` en `[payments.b402_seller.bazaar]`: `bag dev` se cae con “bazaar.info_json must be a JSON object” y `bag doctor` no lo detecta.
- **Windows.** Al cortar `bag dev` puede quedar un `node.exe` con los puertos 9000 y 8088. Cierren la terminal o terminen el proceso.
- **Fondos.** No hacen falta para init, dev, deploy ni verify. Sí para jobs pagos ERC-8183. Bot de Telegram `@bnbchain_official_bot`: “I would like to get tBNB to my wallet <address>”, igual con U. Mínimo 0.01 tBNB y 0.3 U. El U de la sala es el de ERC-8183 (`0xc70B…5565`), no el de b402 (`0x3309…cC39`). `bag wallet fund` existe, pero hoy quedó en “queued” y falló.
- **Reloj.** El login no lo arranca. `deploy prepare` solo revisa: 0 BLOCKED y 2 WARNING de x402 es lo esperado. El reloj de 48 horas arranca en `bag deploy` (`--yes` sin interacción; no existe `--ignore-warnings`).
- **Nombre onchain.** En el trial, `verify` registra a todos como “studio-agent”. `bag erc8004 register --name` se rechaza en proyectos platform. `update-metadata` pone el nombre real; lo paga el paymaster.
- **x402 UNVERIFIED / 404.** Normal sin credenciales B402. La sala cobra por ERC-8183.
- **`erc8004 show` sin agente.** Justo después de verify el índice tarda cerca de un minuto. Ya está en la cadena: esperen y repitan.
