const SW = 13.333;
const SH = 7.5;
const INK = "#0B0E11";
const GOLD = "#F0B90B";
const WHITE = "#FFFFFF";
const SOFT = "#16181C";

function logo(tone, x, y, h) {
  h = h || 0.36;
  return { t: "i", x: x == null ? 0.55 : x, y: y == null ? 0.28 : y, w: h * (137 / 24), h, src: tone === "yellow" ? "assets/lockup-yellow.png" : "assets/lockup-ink.png" };
}
function heading(text, y) {
  return tx(0.55, y, 12.2, 0.55, text, { pt: 32, bold: 1, color: INK });
}
function tx(x, y, w, h, text, o) {
  return Object.assign({ t: "tx", x, y, w, h, text }, o || {});
}
function r(x, y, w, h, fill, rad) {
  return { t: "r", x, y, w, h, fill, rad: rad == null ? 0.16 : rad };
}
function im(x, y, w, h, src) {
  return { t: "i", x, y, w, h, src };
}
function badge(n, x, y) {
  return [r(x, y, 0.42, 0.42, GOLD, 0.21), tx(x, y, 0.42, 0.42, String(n), { pt: 15, bold: 1, color: INK, mid: 1, center: 1 })];
}
function codeBox(x, y, w, h, text, pt) {
  return [r(x, y, w, h, INK), tx(x + 0.28, y + 0.18, w - 0.52, h - 0.34, text, { pt: pt || 15, color: WHITE, mono: 1 })];
}
function step(n, title, flip, body) {
  const gutter = 0.28;
  const panelW = 4.05;
  const panelX = flip ? SW - panelW - gutter : gutter;
  const els = [r(panelX, gutter, panelW, SH - gutter * 2, INK, 0.22)];
  if (flip) els.push(logo("ink"));
  else els.push(logo("yellow", panelX + 0.32, 0.5, 0.36));
  const labelY = 2.05;
  els.push(
    tx(panelX + 0.38, labelY, panelW - 0.76, 0.32, "PASO", { pt: 14, bold: 1, color: GOLD }),
    tx(panelX + 0.32, labelY + 0.38, panelW - 0.64, 1.45, String(n), { pt: 80, bold: 1, color: GOLD }),
    tx(panelX + 0.38, labelY + 1.95, panelW - 0.76, 1.6, title, { pt: 26, bold: 1, color: WHITE })
  );
  return els.concat(body);
}

const slides = [
  {
    dark: 1,
    notes: "Esto ya es el evento. No anuncies Luma. Las tres láminas siguientes son solo el problema. No nombres Agent Studio todavía.",
    els: [
      logo("yellow", 0.6, 0.48, 0.52),
      tx(0.6, 1.55, 12, 0.32, "BUILDER SESSION", { pt: 14, bold: 1, color: GOLD }),
      tx(0.6, 2.05, 12, 2.15, "Hoy armamos\nel agente.", { pt: 54, bold: 1, color: WHITE }),
      r(0.55, 5.35, 8.6, 1.55, SOFT),
      tx(0.85, 5.55, 8.05, 1.15, "Santa Cruz   ·   sábado 3 de octubre   ·   11:30 a 15:00\nUNICEN   ·   Agent Studio", { pt: 18, color: WHITE, mid: 1 }),
    ],
  },
  {
    notes: "Parate en el paso 4. Una API key llega hasta el plan. Preguntá qué hace falta para pagar el hotel. Quedate con la tarjeta. Todavía no ofrezcas la salida.",
    els: [
      logo("ink"),
      heading("El plan está. El pago, no.", 0.88),
      tx(0.55, 1.52, 12.2, 0.36, "Un asistente de hoy llega bien hasta esta puerta.", { pt: 18, color: INK }),
    ].concat(
      [
        ["1", "El pedido", "Un viaje a Brasil."],
        ["2", "El asistente", "Arma la ruta. Puede dejar la reserva."],
        ["3", "La puerta", "Hay que pagar el hotel."],
        ["4", "Quién paga", "Alguien de la sala, con su tarjeta."],
      ].flatMap((item, i) => {
        const y = 2.1 + i * 1.15;
        return [r(0.55, y, 12.2, 1.02, INK)]
          .concat(badge(item[0], 0.78, y + 0.28))
          .concat([
            tx(1.45, y + 0.14, 3.3, 0.74, item[1], { pt: 22, bold: 1, color: GOLD, mid: 1 }),
            tx(4.9, y + 0.14, 7.5, 0.74, item[2], { pt: 22, color: WHITE, mid: 1 }),
          ]);
      })
    ),
  },
  {
    notes: "Salí del viaje y entrá al negocio de la sala. El asistente escribe algo útil y el cliente igual le paga a una persona.",
    els: [
      logo("ink"),
      heading("Si el trabajo sirve, igual salís vos.", 0.88),
      tx(0.55, 1.52, 12.2, 0.36, "El asistente espera. El mostrador lo atiende una persona.", { pt: 18, color: INK }),
    ].concat(
      [
        ["Cotiza", "Un flete, un presupuesto, un informe."],
        ["Espera", "El siguiente mensaje, en el chat o en el WhatsApp."],
        ["Cobra", "La persona. El cliente no le paga al asistente."],
      ].flatMap((item, i) => {
        const y = 2.15 + i * 1.5;
        return [
          r(0.55, y, 12.2, 1.35, INK),
          tx(0.9, y + 0.28, 3.1, 0.8, item[0], { pt: 28, bold: 1, color: GOLD, mid: 1 }),
          tx(4.2, y + 0.28, 8.1, 0.8, item[1], { pt: 24, color: WHITE, mid: 1 }),
        ];
      })
    ),
  },
  {
    notes: "Tercera traba, sin solución. El asistente te conoce y vive en otra plataforma. Pausá. La lámina que sigue nombra Agent Studio.",
    els: [
      logo("ink"),
      heading("Ese asistente vive en otra casa.", 0.88),
      tx(0.55, 1.52, 12.2, 0.36, "El hilo es de ustedes. El producto, no.", { pt: 18, color: INK }),
      r(0.55, 2.15, 12.2, 4.55, INK),
      tx(0.95, 2.5, 11.4, 0.6, "Gemini. Claude. ChatGPT.", { pt: 28, bold: 1, color: GOLD }),
      tx(0.95, 3.4, 11.4, 2.7, "Te conocen.\nLa conversación queda en su plataforma.\nDe afuera no hay a quién contratar\nni a quién pagarle.", { pt: 28, color: WHITE }),
    ],
  },
  {
    notes: "Recién acá hay solución. Wallet es la caja. Identidad es a quién encuentran. Pagos es el mostrador.",
    els: [
      logo("ink"),
      heading("De ahí sale Agent Studio.", 0.88),
      tx(0.55, 1.52, 12.2, 0.38, "Wallet, identidad, pagos, nube y modelo. El trabajo lo ponen ustedes.", { pt: 18, color: INK }),
    ].concat(
      [
        ["1", "Wallet", "La del agente.\nCon límites."],
        ["2", "Identidad", "Queda registrada\nen BSC."],
        ["3", "Pagos", "Cobra un trabajo,\no sale gratis."],
        ["4", "Nube", "Corre fuera\nde la laptop."],
        ["5", "Modelo", "Se recarga solo\nsi hay saldo."],
      ].flatMap((item, i) => {
        const x = 0.55 + i * 2.482;
        return [r(x, 2.12, 2.3, 2.55, INK)]
          .concat(badge(item[0], x + 0.16, 2.3))
          .concat([
            tx(x + 0.16, 2.88, 1.98, 0.42, item[1], { pt: 18, bold: 1, color: GOLD }),
            tx(x + 0.16, 3.38, 1.98, 1.0, item[2], { pt: 14, color: WHITE }),
          ]);
      }),
      [
        ["Lo encuentran", "ERC-8004"],
        ["Lo contratan", "ERC-8183"],
        ["Le pagan", "x402"],
      ].flatMap((item, i) => {
        const x = 0.55 + i * 4.143;
        return [
          r(x, 4.9, 3.94, 1.85, INK),
          tx(x + 0.28, 5.12, 3.45, 0.48, item[0], { pt: 22, bold: 1, color: WHITE }),
          tx(x + 0.28, 5.7, 3.45, 0.5, item[1], { pt: 18, color: GOLD, mono: 1 }),
        ];
      })
    ),
  },
  {
    notes: "Veinte segundos de historia. El oficio tiene que poder encontrarse, cobrarse y pagar a otro. El camino de la sala es el trial de 48 horas en testnet.",
    els: [
      logo("ink"),
      heading("Trabajamos con la v4.", 0.88),
      tx(0.55, 1.52, 12.2, 0.38, "Salió el 22 de septiembre. Cada pocas semanas entra algo nuevo.", { pt: 18, color: INK }),
    ].concat(
      [
        ["1", "v1", "1 jul", "Un prompt"],
        ["2", "v2", "13 ago", "Ya cobra"],
        ["3", "v3", "3 sep", "Más wallets"],
      ].flatMap((item, i) => {
        const x = 0.55 + i * 3.15;
        return [r(x, 2.05, 2.95, 1.55, INK)]
          .concat(badge(item[0], x + 0.18, 2.2))
          .concat([
            tx(x + 0.68, 2.18, 2.05, 0.42, item[1], { pt: 20, bold: 1, color: GOLD, mid: 1 }),
            tx(x + 0.2, 2.72, 2.55, 0.3, item[2], { pt: 14, color: WHITE }),
            tx(x + 0.2, 3.05, 2.55, 0.4, item[3], { pt: 16, bold: 1, color: WHITE }),
          ]);
      }),
      [r(9.85, 2.05, 2.95, 1.55, INK)],
      badge("4", 10.02, 2.2),
      [
        tx(10.52, 2.18, 2.05, 0.42, "v4", { pt: 20, bold: 1, color: GOLD, mid: 1 }),
        tx(10.05, 2.72, 2.55, 0.3, "22 sep", { pt: 14, color: WHITE }),
        tx(10.05, 3.05, 2.55, 0.4, "Esta", { pt: 18, bold: 1, color: WHITE }),
      ],
      [
        ["Oficio", "Uno que cobre, se deje encontrar y pueda pagar a otro."],
        ["Máquina", "Lo ven responder antes de subir nada."],
        ["Trial", "URL de prueba. 48 horas. Solo testnet."],
      ].flatMap((item, i) => {
        const x = 0.55 + i * 4.143;
        return [
          r(x, 4.15, 3.94, 2.55, INK),
          tx(x + 0.28, 4.4, 3.45, 0.48, item[0], { pt: 22, bold: 1, color: GOLD }),
          tx(x + 0.28, 5.05, 3.45, 1.25, item[1], { pt: 16, color: WHITE }),
        ];
      })
    ),
  },
  {
    notes: "No avances mientras falte alguien. Editor: Cursor, Claude, OpenCode, Codex o Antigravity. Node 22 o más. Wallet en BSC Testnet. GitHub para el trial. Bun 1.3 o más al desplegar.",
    els: [
      logo("ink"),
      heading("Esto tiene que estar listo.", 0.82),
      tx(0.55, 1.42, 12.2, 0.34, "Nos quedamos acá hasta que toda la sala lo tenga.", { pt: 16, color: INK }),
      r(0.5, 1.92, 12.33, 2.28, INK),
      tx(0.78, 2.12, 4.1, 0.42, "Editor", { pt: 24, bold: 1, color: GOLD }),
      tx(0.78, 2.62, 4.15, 0.95, "Para escribir el agente.\nCualquiera de estos. El plan gratis alcanza.", { pt: 15, color: WHITE }),
    ].concat(
      [
        ["cursor-tile.png", "Cursor"],
        ["claude-tile.png", "Claude"],
        ["opencode-tile.png", "OpenCode"],
        ["openai-tile.png", "Codex"],
        ["antigravity-tile.png", "Antigravity"],
      ].flatMap((item, i) => {
        const x = 5.15 + i * 1.48;
        return [
          r(x, 2.1, 1.28, 1.28, WHITE, 0.14),
          im(x + 0.1, 2.2, 1.08, 1.08, "assets/" + item[0]),
          tx(x - 0.08, 3.44, 1.38, 0.42, item[1], { pt: 12, bold: 1, color: WHITE, center: 1 }),
        ];
      }),
      [
        ["nodedotjs-tile.png", null, "Node.js", "Corre bag.", "node -v · 22 o más"],
        ["metamask-tile.png", "trust-tile.png", "Wallet", "Recibe tBNB y $U.", "BSC Testnet"],
        ["github-tile.png", null, "GitHub", "Entra al trial.", "Una cuenta"],
        ["bun-tile.png", null, "Bun", "Despliega el agente.", "1.3 o más"],
      ].flatMap((item, i) => {
        const x = 0.5 + i * 3.12;
        const base = [
          r(x, 4.4, 2.96, 2.58, INK),
          tx(x + 0.16, 5.68, 2.64, 0.34, item[2], { pt: 16, bold: 1, color: GOLD, center: 1 }),
          tx(x + 0.14, 6.04, 2.68, 0.32, item[3], { pt: 13, color: WHITE, center: 1 }),
          tx(x + 0.14, 6.38, 2.68, 0.32, item[4], { pt: 13, bold: 1, color: GOLD, center: 1 }),
        ];
        if (item[1]) {
          base.push(
            r(x + 0.32, 4.54, 1.08, 1.08, WHITE, 0.12),
            r(x + 1.5, 4.54, 1.08, 1.08, WHITE, 0.12),
            im(x + 0.4, 4.62, 0.92, 0.92, "assets/" + item[0]),
            im(x + 1.58, 4.62, 0.92, 0.92, "assets/" + item[1])
          );
        } else {
          base.push(r(x + 0.9, 4.54, 1.16, 1.16, WHITE, 0.14), im(x + 0.98, 4.62, 1.0, 1.0, "assets/" + item[0]));
        }
        return base;
      })
    ),
  },
  {
    notes: "Chain ID 97. Contrato de $U de testnet, 18 decimales. Vos les pasás tBNB y $U cuando muestren la address. Los QR son respaldo.",
    els: [
      logo("ink"),
      heading("Testnet, tBNB y $U.", 0.88),
      r(0.55, 1.65, 6.3, 5.15, INK),
    ].concat(
      [
        ["Red", "BSC Testnet"],
        ["RPC", "https://bsc-testnet-dataseed.bnbchain.org"],
        ["Chain ID", "97"],
        ["Símbolo", "tBNB"],
        ["Explorer", "testnet.bscscan.com"],
        ["$U", "0xc70B8741B8B07A6d61E54fd4B20f22Fa648E5565"],
      ].flatMap((row, i) => {
        const y = 1.88 + i * 0.78;
        return [
          tx(0.85, y, 5.7, 0.26, row[0], { pt: 13, bold: 1, color: GOLD }),
          tx(0.85, y + 0.26, 5.7, 0.36, row[1], { pt: 14, color: WHITE, mono: 1 }),
        ];
      }),
      [
        r(7.05, 1.65, 5.75, 2.45, INK),
        tx(7.35, 1.85, 5.15, 0.5, "Yo se los paso.", { pt: 26, bold: 1, color: GOLD }),
        tx(7.35, 2.45, 5.15, 1.4, "Muestren la address de la wallet en esta red. Les mando tBNB y $U de testnet.\n\ntBNB es el gas. $U es el saldo con el que opera el agente.", { pt: 15, color: WHITE }),
      ],
      [
        ["assets/qr-tbnb.png", "tBNB", "t.me/bnbchain_official_bot"],
        ["assets/qr-u.png", "$U", "united-coin-u.github.io/u-faucet"],
      ].flatMap((item, i) => {
        const x = 7.05 + i * 2.92;
        return [
          r(x, 4.3, 2.75, 2.5, INK),
          im(x + 0.6, 4.48, 1.5, 1.5, item[0]),
          tx(x + 0.12, 6.05, 2.5, 0.28, item[1], { pt: 14, bold: 1, color: GOLD, center: 1 }),
          tx(x + 0.1, 6.32, 2.55, 0.32, item[2], { pt: 10, color: WHITE, center: 1 }),
        ];
      })
    ),
  },
  {
    notes: "Dos addresses distintas. La del agente es nueva y desechable. Al desplegar, la clave de prueba sale de la laptop.",
    els: [
      logo("ink"),
      heading("Dos wallets. Las dos en testnet.", 0.9),
    ].concat(
      [
        ["La suya", "MetaMask, Trust Wallet u otra.\nLa configuran en BSC Testnet.\nAhí reciben tBNB y $U."],
        ["La del agente", "La crea el proyecto.\nEs nueva y desechable.\nAhí tienen que terminar los dos saldos."],
      ].flatMap((col, i) => {
        const x = 0.55 + i * 6.4;
        return [
          r(x, 1.85, 6.1, 4.55, INK),
          tx(x + 0.4, 2.2, 5.3, 0.6, col[0], { pt: 28, bold: 1, color: GOLD }),
          tx(x + 0.4, 3.15, 5.3, 2.5, col[1], { pt: 20, color: WHITE }),
        ];
      })
    ),
  },
  {
    notes: "Señalá el orden y pasá a la terminal. Si alguien se traba, se resuelve sobre el paso en el que está la sala.",
    els: [
      logo("ink"),
      heading("De acá hasta verlo responder.", 0.9),
    ].concat(
      [
        ["1", "Instalar", "Que bag responda."],
        ["2", "Crear", "Proyecto y wallet del agente."],
        ["3", "Fondos", "tBNB y $U en esa wallet."],
        ["4", "Trabajo", "Lo editan en su agent."],
        ["5", "Local", "Responde en su máquina."],
        ["6", "Trial", "URL en testnet, 48 horas."],
      ].flatMap((stepItem, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 0.55 + col * 4.2;
        const y = 1.85 + row * 2.5;
        return [r(x, y, 3.95, 2.25, INK)]
          .concat(badge(stepItem[0], x + 0.28, y + 0.32))
          .concat([
            tx(x + 0.88, y + 0.28, 2.75, 0.48, stepItem[1], { pt: 22, bold: 1, color: WHITE, mid: 1 }),
            tx(x + 0.28, y + 1.15, 3.4, 0.7, stepItem[2], { pt: 16, color: WHITE }),
          ]);
      })
    ),
  },
  {
    notes: "Hacelo primero en el proyector. El paquete es @bnbagent/studio-cli. Si skills pregunta alcance, usuario.",
    els: step(1, "Instalar", false, [
      tx(4.65, 0.95, 8.28, 0.7, "Meta: bag --version imprime un número.", { pt: 18, color: INK }),
    ].concat(codeBox(4.65, 1.77, 8.28, 1.6, "node -v\nnpm install -g @bnbagent/studio-cli\nbag skills install\nbag --version", 15), [
      tx(4.65, 3.59, 8.28, 3.2, "bag skills install le enseña al editor a manejar esta versión.\nSi node -v queda por debajo de 22, primero Node. No sigan.", { pt: 16, color: INK }),
    ])),
  },
  {
    notes: "Nombre: letra primero, solo letras y números, máximo 23. La contraseña no se proyecta. La wallet es nueva.",
    els: step(2, "Crear el proyecto", true, [
      tx(0.5, 0.95, 8.22, 0.7, "Meta: una carpeta nueva y la wallet del agente.", { pt: 18, color: INK }),
    ].concat(
      codeBox(0.5, 1.77, 8.22, 2.24, "bag init sunombre\n  --network bsc-testnet\n  --llm-provider pieverse-llm\n  --wallet-kind evm-local\n  --storage-provider local\n  --destination platform", 15),
      [tx(0.5, 4.23, 8.22, 2.6, "Es un solo comando. sunombre: letra primero, solo letras y números, máximo 23.\nLa contraseña se escribe en su terminal. No se proyecta.\nLa wallet que aparece es nueva. No es la de MetaMask.", { pt: 16, color: INK })]
    )),
  },
  {
    notes: "bag wallet show imprime la address del agente. El envío sale de la wallet de ellos. No proyectes la clave.",
    els: step(3, "Pasar tBNB y $U", false, [
      tx(4.65, 0.95, 8.28, 0.7, "Meta: los dos saldos, en la address del agente.", { pt: 18, color: INK }),
    ].concat(codeBox(4.65, 1.77, 8.28, 0.96, "bag wallet show\nbag wallet balance", 15), [
      tx(4.65, 2.95, 8.28, 3.6, "Copien la address 0x que imprime.\nDesde su wallet de testnet manden tBNB y $U ahí.\nSi me muestran esa address, se los mando directo.\n$U tiene que estar agregado como token. Si no, el saldo llega y no se ve.", { pt: 16, color: INK }),
    ])),
  },
  {
    notes: "El editor hace la edición. El oficio, en una oración: que otro pueda encontrarlo, pagarle y, si falta una pieza, que este pague a otro. La firma no se recorre.",
    els: step(4, "El trabajo", true, [
      tx(0.5, 0.95, 8.22, 0.45, "Meta: el agente deja de entregar el texto genérico.", { pt: 18, color: INK }),
    ].concat(codeBox(0.5, 1.5, 8.22, 0.72, "app/agent/src/sellerCore.ts", 16), [
      ["Cobrar", "Un trabajo con precio. La plata es del agente."],
      ["Publicar", "Otro agente lo encuentra y lo contrata."],
      ["Pagar", "Si falta una pieza, contrata a otro agente."],
    ].flatMap((job, i) => {
      const y = 0.95 + 1.48 + i * 1.15;
      return [
        r(0.5, y, 8.22, 1.02, INK),
        tx(0.72, y + 0.12, 7.78, 0.32, job[0], { pt: 16, bold: 1, color: GOLD }),
        tx(0.72, y + 0.46, 7.78, 0.42, job[1], { pt: 14, color: WHITE }),
      ];
    }), [
      tx(0.5, 5.95, 8.22, 0.4, "Abran la carpeta en su editor. El cambio vive en runWork.", { pt: 15, color: INK }),
    ])),
  },
  {
    notes: "Corré bag dev y leé la URL. A2A escucha en el puerto 9000. La agent card confirma que el proceso está vivo.",
    els: step(5, "Verlo en su máquina", false, [
      tx(4.65, 0.95, 8.28, 0.7, "Meta: el agente responde delante de ustedes.", { pt: 18, color: INK }),
    ].concat(codeBox(4.65, 1.77, 8.28, 0.96, "bag dev\ncurl http://localhost:9000/.well-known/agent-card.json", 15), [
      tx(4.65, 2.95, 8.28, 3.4, "Cuando la terminal imprima la dirección, ábranla.\nLa tarjeta del agente confirma que el proceso está vivo.\nSi no levanta, comparen Node, la carpeta y si init terminó.", { pt: 16, color: INK }),
    ])),
  },
  {
    notes: "Bun 1.3 o más. El reloj de 48 horas arranca en el primer deploy exitoso, una ventana por cuenta de GitHub. Wallet desechable. No corras destroy.",
    els: step(6, "Desplegar el trial", true, [
      tx(0.5, 0.95, 8.22, 0.7, "Meta: una URL de prueba en testnet. Dura 48 horas.", { pt: 18, color: INK }),
    ].concat(
      codeBox(0.5, 1.77, 8.22, 1.92, "bun --version\nbag platform login\nbag platform credit\nbag deploy --provider bnb\nbag deploy verify --provider bnb", 15),
      [tx(0.5, 3.91, 8.22, 2.8, "Login con GitHub: la terminal da un código y ellos lo completan en el browser.\nBun tiene que estar antes de este paso. La identidad onchain entra en verify.", { pt: 16, color: INK })]
    )),
  },
  {
    notes: "Usala cuando alguien muestre un error, no como pausa.",
    els: [
      logo("ink"),
      heading("Si la terminal dice otra cosa.", 0.9),
    ].concat(
      [
        ["node -v bajo de 22", "Instalan Node y vuelven a abrir la terminal."],
        ["bag no se reconoce", "Cierran la terminal, la abren de nuevo, y repiten bag --version."],
        ["Chain ID distinto de 97", "La red es BSC Testnet. No mainnet, no opBNB."],
        ["$U no aparece", "Agregan el contrato. El saldo puede haber llegado igual."],
        ["El agente sigue en cero", "Los fondos están en MetaMask, no en la address de bag wallet show."],
        ["El deploy no arranca", "Falta Bun, o el código de GitHub no se completó."],
      ].flatMap((row, i) => {
        const col = i % 2;
        const rr = Math.floor(i / 2);
        const x = 0.5 + col * 6.4;
        const y = 1.6 + rr * 1.85;
        return [
          r(x, y, 6.15, 1.68, INK),
          tx(x + 0.28, y + 0.22, 5.6, 0.48, row[0], { pt: 16, bold: 1, color: GOLD }),
          tx(x + 0.28, y + 0.78, 5.6, 0.65, row[1], { pt: 16, color: WHITE }),
        ];
      })
    ),
  },
  {
    dark: 1,
    notes: "Cierra el domingo 11 de octubre de 2026, 08:00 Bolivia. Pozo 20.000 USD. Especial de Agent Studio: 2.000. bStocks, Ondo o xStocks, solo spot, en BSC.",
    els: [
      logo("yellow"),
      tx(0.55, 0.9, 12, 0.28, "DESPUÉS DE ESTA SALA", { pt: 13, bold: 1, color: GOLD }),
      tx(0.55, 1.3, 12, 0.55, "BNB Hack: Tokenized Stocks", { pt: 32, bold: 1, color: WHITE }),
    ].concat(
      [
        ["11 oct", "Cierra el domingo a las 08:00, hora de Bolivia."],
        ["USD 20.000", "Pozo con Binance Web3 Wallet."],
        ["USD 2.000", "Mejor uso de Agent Studio."],
      ].flatMap((stat, i) => {
        const x = 0.5 + i * 4.2;
        return [
          r(x, 2.05, 4.0, 1.85, SOFT),
          tx(x + 0.28, 2.22, 3.45, 0.55, stat[0], { pt: 26, bold: 1, color: GOLD }),
          tx(x + 0.28, 2.85, 3.45, 0.8, stat[1], { pt: 16, color: WHITE }),
        ];
      }),
      [
        r(0.5, 4.1, 9.9, 2.8, SOFT),
        tx(0.82, 4.35, 9.25, 1.15, "La entrega tiene que usar bStocks, Ondo o xStocks. Solo spot, en BSC.\nSe puede ganar un lugar del 1.º al 5.º y el premio de Studio.", { pt: 18, color: WHITE }),
        tx(0.82, 5.6, 9.25, 0.4, "bnbchain.org/en/hackathons/tokenized-stocks", { pt: 16, color: GOLD }),
        tx(0.82, 6.1, 9.25, 0.4, "Lo de hoy es el piso. La entrega es el 11.", { pt: 16, color: WHITE }),
        r(10.6, 4.1, 2.25, 2.8, SOFT),
        im(10.85, 4.32, 1.75, 1.75, "assets/qr-hack.png"),
        tx(10.7, 6.18, 2.05, 0.4, "Página", { pt: 14, bold: 1, color: GOLD, center: 1 }),
      ]
    ),
  },
  {
    notes: "Polera por asistir. Gorra por un post, no story. X: @TomoKi977, @BNBCHAIN @BNBChainLatAm. Instagram: @rasec56, @bnbchain @bnbchaines. No digas las cantidades.",
    els: [
      logo("ink"),
      heading("El swag se lleva así.", 0.78),
      tx(0.55, 1.32, 12.2, 0.3, "Hay pocas unidades. Una story no cuenta.", { pt: 16, color: INK }),
    ].concat(
      [
        ["Polera", "Por venir.", "Hoy, en la sala."],
        ["Gorra", "Por un post.", "Como estos. Mostralo."],
        ["Bag", "Por inscribirte.", "Trae stickers. Hay pocas."],
      ].flatMap((item, i) => {
        const x = 0.5 + i * 4.2;
        return [
          r(x, 1.72, 4.0, 1.72, INK),
          tx(x + 0.26, 1.86, 3.48, 0.4, item[0], { pt: 22, bold: 1, color: GOLD }),
          tx(x + 0.26, 2.3, 3.48, 0.36, item[1], { pt: 16, bold: 1, color: WHITE }),
          tx(x + 0.26, 2.7, 3.48, 0.48, item[2], { pt: 14, color: WHITE }),
        ];
      }),
      [
        r(0.5, 3.6, 5.35, 3.48, INK),
        im(0.72, 3.76, 0.52, 0.52, "assets/x-round.png"),
        tx(1.34, 3.82, 1.4, 0.36, "X", { pt: 16, bold: 1, color: WHITE, mid: 1 }),
        r(0.78, 4.38, 0.42, 0.42, GOLD, 0.21),
        tx(1.32, 4.42, 4.2, 0.36, "@TomoKi977", { pt: 14, bold: 1, color: WHITE, mid: 1 }),
        tx(0.78, 4.92, 4.8, 0.7, "Armando un agente en Santa Cruz, con Agent Studio.", { pt: 15, color: WHITE }),
        tx(0.78, 5.62, 4.8, 0.32, "#BuilderSessionSantaCruz", { pt: 14, bold: 1, color: GOLD }),
        tx(0.78, 5.96, 4.8, 0.32, "@BNBCHAIN   @BNBChainLatAm", { pt: 14, color: GOLD }),
        tx(0.78, 6.5, 4.8, 0.32, "Post. No story.", { pt: 13, color: WHITE }),
        r(6.0, 3.6, 5.1, 3.48, INK),
        im(6.2, 3.76, 0.52, 0.52, "assets/instagram-round.png"),
        tx(6.84, 3.82, 4.0, 0.36, "Instagram", { pt: 16, bold: 1, color: WHITE, mid: 1 }),
        r(6.28, 4.38, 0.42, 0.42, GOLD, 0.21),
        tx(6.82, 4.42, 4.0, 0.36, "@rasec56", { pt: 14, bold: 1, color: WHITE, mid: 1 }),
        r(6.28, 4.92, 4.54, 0.7, SOFT),
        tx(6.4, 5.04, 4.3, 0.46, "Foto de hoy. De la sala.", { pt: 13, color: WHITE, mid: 1 }),
        tx(6.28, 5.72, 4.54, 0.3, "#BuilderSessionSantaCruz", { pt: 14, bold: 1, color: GOLD }),
        tx(6.28, 6.0, 4.54, 0.38, "@bnbchain   @bnbchaines", { pt: 13, color: GOLD }),
        tx(6.28, 6.5, 4.54, 0.32, "Post. No story.", { pt: 13, color: WHITE }),
        r(11.25, 3.6, 1.58, 3.48, INK),
        im(11.4, 3.9, 1.28, 1.28, "assets/qr-hack-reg.png"),
        tx(11.32, 5.28, 1.44, 0.32, "Bag", { pt: 14, bold: 1, color: GOLD, center: 1 }),
        tx(11.32, 5.62, 1.44, 0.7, "Inscribite\nahora.", { pt: 12, color: WHITE, center: 1 }),
        tx(11.32, 6.35, 1.44, 0.55, "Mostrá\nel envío.", { pt: 12, color: WHITE, center: 1 }),
      ]
    ),
  },
  {
    notes: "Dejá que escaneen. linktr.ee/bnbchain, WhatsApp en español, linktr.ee/tomoki977.",
    els: [
      logo("ink"),
      heading("Para escribir después.", 0.88),
    ].concat(
      [
        ["assets/qr-bnb.png", "BNB Chain", "linktr.ee/bnbchain"],
        ["assets/qr-es.png", "En español", "WhatsApp"],
        ["assets/qr-julio.png", "Julio", "linktr.ee/tomoki977"],
      ].flatMap((item, i) => {
        const x = 0.5 + i * 4.2;
        return [
          r(x, 1.7, 4.0, 5.2, INK),
          im(x + 0.62, 2.15, 2.75, 2.75, item[0]),
          tx(x + 0.28, 5.15, 3.44, 0.5, item[1], { pt: 22, bold: 1, color: GOLD, center: 1 }),
          tx(x + 0.28, 5.7, 3.44, 0.4, item[2], { pt: 15, color: WHITE, center: 1 }),
        ];
      })
    ),
  },
  {
    dark: 1,
    notes: "Dejá esta lámina y respondé lo que quede. Si preguntan por la hackathon, volvé una lámina.",
    els: [
      logo("yellow"),
      tx(0.6, 2.15, 12, 0.9, "Gracias.", { pt: 54, bold: 1, color: WHITE }),
      tx(0.6, 3.4, 11, 0.9, "Julio Cesar Severiche Orellana\nDevRel Ambassador   ·   BNB Chain", { pt: 20, color: WHITE }),
    ],
  },
];

const root = document.getElementById("slide");
const notesEl = document.getElementById("notes");
const pager = document.createElement("div");
pager.className = "pager";
root.appendChild(pager);

function paint(el) {
  const node = document.createElement("div");
  node.className = "el " + (el.t === "tx" ? "t" : el.t === "i" ? "i" : el.t === "o" ? "o" : "s");
  node.style.left = (el.x / SW) * 100 + "%";
  node.style.top = (el.y / SH) * 100 + "%";
  node.style.width = (el.w / SW) * 100 + "%";
  node.style.height = (el.h / SH) * 100 + "%";
  if (el.t === "r" || el.t === "o") {
    node.style.background = el.fill;
    if (el.t === "r") node.style.borderRadius = "calc(" + el.rad + " * 100cqh / 7.5)";
  } else if (el.t === "i") {
    const img = document.createElement("img");
    img.src = el.src;
    img.alt = "";
    node.appendChild(img);
  } else {
    node.textContent = el.text;
    node.style.setProperty("--pt", el.pt || 16);
    node.style.color = el.color || INK;
    node.style.fontWeight = el.bold ? "700" : "400";
    if (el.mono) node.style.fontFamily = '"Courier New", Courier, monospace';
    if (el.mid) node.classList.add("mid");
    if (el.center) node.classList.add("center");
  }
  root.appendChild(node);
}

let i = 0;
function show(n) {
  i = Math.max(0, Math.min(slides.length - 1, n));
  [...root.querySelectorAll(".el")].forEach((n) => n.remove());
  const s = slides[i];
  root.classList.toggle("dark", !!s.dark);
  pager.style.color = s.dark ? "#fff" : "#0B0E11";
  s.els.flat().forEach(paint);
  pager.textContent = String(i + 1).padStart(2, "0") + "  /  " + String(slides.length).padStart(2, "0");
  notesEl.textContent = s.notes;
  location.hash = String(i + 1);
}
function parseHash() {
  const n = parseInt(location.hash.replace("#", ""), 10);
  show(Number.isFinite(n) ? n - 1 : i);
}
window.addEventListener("hashchange", parseHash);
parseHash();
document.addEventListener("keydown", (e) => {
  if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
  if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); show(i + 1); }
  else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); show(i - 1); }
  else if (e.key === "Home") show(0);
  else if (e.key === "End") show(slides.length - 1);
  else if (e.key === "s" || e.key === "S") document.body.classList.toggle("notes-on");
  else if (e.key === "f" || e.key === "F") {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  } else if (e.key === "h" || e.key === "H" || e.key === "?") document.body.classList.toggle("help-on");
  else if (e.key === "Escape") document.body.classList.remove("help-on");
});
