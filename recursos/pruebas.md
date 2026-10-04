# Pruebas onchain

Lo que se hizo después de la sesión, el 4 de octubre de 2026. BSC Testnet (chain ID 97), Agent Studio v4 con `@bnbagent/studio-cli` 0.0.14, trial de 48 horas en la plataforma.

Cada hash abre la transacción en BscScan.

## Los dos agentes

Los runtimes del trial vencen el 5 de octubre de 2026 a las 13:26 UTC. Después de esa hora el agent card y el endpoint dejan de responder. Las identidades ERC-8004 y las transacciones quedan en la cadena.

Registro ERC-8004: [`0x8004A818BFB912233c491871b3D84c89A494BD9e`](https://testnet.bscscan.com/address/0x8004A818BFB912233c491871b3D84c89A494BD9e)

### Detective de wallets

Lee una address de BSC Testnet y escribe un informe en español simple. Desplegado el 3 de octubre.

| Dato | Valor |
| --- | --- |
| ERC-8004 agent_id | 2552 |
| Wallet | [`0xab258Ee3A13279bd5c8D362E1697EEDDDf93fEa7`](https://testnet.bscscan.com/address/0xab258Ee3A13279bd5c8D362E1697EEDDDf93fEa7) |
| Runtime | `01M40Z1V8ASGZQQ6T1QSZRSYBQ` |
| Agent card | [agent-card.json](https://bnbagent-api.bnbchain.world/v1/rt/01M40Z1V8ASGZQQ6T1QSZRSYBQ/.well-known/agent-card.json) |

### Explicador de transacciones

Recibe un hash de transacción y explica en español qué pasó.

| Dato | Valor |
| --- | --- |
| ERC-8004 agent_id | 2557 |
| Wallet | [`0x8F61CD9AD2F3a643efB321162009dbA77426fbEB`](https://testnet.bscscan.com/address/0x8F61CD9AD2F3a643efB321162009dbA77426fbEB) |
| Runtime | `01M446JQX9P8KCDTHGDTR90M3Y` |
| Agent card | [agent-card.json](https://bnbagent-api.bnbchain.world/v1/rt/01M446JQX9P8KCDTHGDTR90M3Y/.well-known/agent-card.json) |
| Metadata `name` | [`0x33575c38…582ee0`](https://testnet.bscscan.com/tx/0x33575c38f9e3cd7105eccded47835c2fa20f273b09a6ad0474f0d72db1582ee0) |
| Metadata `description` | [`0x1555b080…640c3c`](https://testnet.bscscan.com/tx/0x1555b080070dbdc75a49c840f60f328222821ceba830d2a1d897d2b5ae640c3c) |

Las dos actualizaciones de metadata las pagó el paymaster.

## Pagos entre agentes (ERC-8183)

Un agente contrata al otro y paga en U.

- Token U: [`0xc70B8741B8B07A6d61E54fd4B20f22Fa648E5565`](https://testnet.bscscan.com/address/0xc70B8741B8B07A6d61E54fd4B20f22Fa648E5565)
- Contrato de escrow: [`0xa206c0517B6371C6638CD9e4a42Cc9f02A33B0DE`](https://testnet.bscscan.com/address/0xa206c0517B6371C6638CD9e4a42Cc9f02A33B0DE)

### Job 1403: el Explicador contrata al Detective

Comprador: Explicador. Vendedor: Detective. Precio: 0.1 U. Tarea: “Analiza la wallet 0x8F61…fbEB”.

| Paso | Transacción |
| --- | --- |
| create | [`0x00893ae3…59e9d0`](https://testnet.bscscan.com/tx/0x00893ae3d3b1697432e1b070d478d654162febd340d41f6dfae339f61059e9d0) |
| register | [`0x9e355ade…0717cd`](https://testnet.bscscan.com/tx/0x9e355ade119bc321a2d31c64be0cc1155e2ce5a3a60b71f80b085802010717cd) |
| setBudget | [`0x1a6615fc…e389c3`](https://testnet.bscscan.com/tx/0x1a6615fcf04320984200dc020d1d0264cd475ada58b9baa1404dcc40cee389c3) |
| fund | [`0xc3ef6e92…8bfd1a`](https://testnet.bscscan.com/tx/0xc3ef6e926f3a443537bc153e6645b2c46a5f142853720d415f6b8e50ce8bfd1a) |
| Settle | [0x35213b84…71f190](https://testnet.bscscan.com/tx/0x35213b84da75894f6787937fbfb87579d416c65e2d89f480cfdafd714271f190) · COMPLETED |

Quedó en SUBMITTED cerca de un minuto después del fund.

[Entrega](https://bnbagent-api.bnbchain.world/v1/deliverables/sha256/61b72e4640e5912b71ea6bef6ecdfbcf93afd11b31cef58b183e62a8e6583b1e.json), extracto:

> Wallet activa. No es contrato y el nonce 9 confirma movimientos previos. Saldos: 0.049219 tBNB y 0.9 de U.

### Job 1404: el Detective contrata al Explicador

Comprador: Detective. Vendedor: Explicador. Precio: 0.1 U. Tarea: explicar la transacción fund del job 1403.

| Paso | Transacción |
| --- | --- |
| create | [`0xfef34675…8e514d`](https://testnet.bscscan.com/tx/0xfef3467593b5b0cdc3a22e5f5e7594e05755d9f3fb65423a27bf0d16c78e514d) |
| register | [`0xdd740a3f…9f0e18`](https://testnet.bscscan.com/tx/0xdd740a3f90e8553f87c0b3c12cdbb6587b5517f8a93e0e7554ac73b9791f0e18) |
| setBudget | [`0x1d73d45d…0928ac`](https://testnet.bscscan.com/tx/0x1d73d45dd38f8729e36f78cf8cf35b1ccb13ae1e6ca2aedae1977124200928ac) |
| fund | [`0xe4dad344…199646`](https://testnet.bscscan.com/tx/0xe4dad3441b8366f4d4bf125606e6209bbc04f8edffe36fe09945c9df9a199646) |
| Settle | [0x9dec4cf9…fe1633](https://testnet.bscscan.com/tx/0x9dec4cf96b2621a7efee0c0fe6537916558d65e28ab4f2e16b5850a4fdfe1633) · COMPLETED |

Quedó en SUBMITTED en menos de un minuto.

Extracto de la entrega:

> Esta transacción tuvo éxito… ejecutando el método “fund”… se registró una transferencia de 0.1 tokens U desde el remitente hacia el contrato.

## Cómo se hizo la compra entre agentes

Los agentes del trial publican A2A solo detrás de OAuth. Por eso `bag erc8183 buy --agent-id` falla. Esta secuencia sí funcionó:

1. **Credencial del vendedor.** En el proyecto del agente que vende: `bag platform invoke-client new`. El `client_secret` se muestra una sola vez. No va en el chat ni en el repo.
2. **Token.** POST a `https://bnbagent-api.bnbchain.world/v1/oauth/token` con `grant_type=client_credentials` como cuerpo de formulario y `scope=invoke:<runtime del vendedor>`. Sin HTTP Basic.
3. **Cotización.** A2A `message/send` a `https://bnbagent-api.bnbchain.world/v1/rt/<runtime>/a2a` con una parte de tipo data:

   ```json
   {
     "skill": "negotiate",
     "task_description": "...",
     "terms": {
       "deliverables": "...",
       "quality_standards": "...",
       "currency": "0xc70B8741B8B07A6d61E54fd4B20f22Fa648E5565"
     }
   }
   ```

   Sin `terms.currency`, el buy se niega con “quote request currency is missing”.
4. **Compra.** Guarden `result.parts[0].data` como `quote.json`. Desde el proyecto del comprador:

   ```powershell
   bag erc8183 buy --provider <wallet del vendedor> --quote-json quote.json --budget-usd 0.10 --task "..."
   ```

   La cotización vale 15 minutos.
5. **Aviso.** A2A con `{"skill": "notify_funded", "job_id": <id>}`.
6. **Seguimiento.** `bag erc8183 status <id>` y `bag erc8183 fetch <id>`.
7. **Cierre.** Pasada la ventana optimista de 15 minutos, el comprador corre `bag erc8183 settle <id>`.

El gas aparece como 0 tBNB en el trial: está patrocinado o con precio de gas cero. No lo lean como “siempre gratis”.
