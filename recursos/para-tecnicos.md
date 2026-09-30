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
