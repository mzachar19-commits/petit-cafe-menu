import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const p = join(__dirname, "en.html");
let t = readFileSync(p, "utf8");

const pairs = [
  ['<html lang="el">', '<html lang="en">'],
  [
    "<title>Petit Cafe — Vini & Aperitivi</title>",
    "<title>Petit Cafe — Vini & Aperitivi · English menu</title>",
  ],
  ['aria-label="Κατηγορίες μενού"', 'aria-label="Menu categories"'],
  [">Καφέδες</a>", ">Coffee</a>"],
  [">Χυμοί</a>", ">Juices</a>"],
  [">Τσάι</a>", ">Tea</a>"],
  [">Σπιτικά</a>", ">HomaMade drinks</a>"],
  [">Ανθρακούχα</a>", ">Soft drinks</a>"],
  [">Σαλάτες</a>", ">Salads</a>"],
  [">Ποικιλία</a>", ">Platters</a>"],
  [">Πίτσα</a>", ">Pizza</a>"],
  [">Γλυκά</a>", ">Desserts</a>"],
  [">Ποτά</a>", ">Spirits</a>"],
  [">Μπύρες</a>", ">Beers</a>"],
  ['<h2 class="reveal">Καφέδες</h2>', '<h2 class="reveal">COFFEE</h2>'],
  ['<span class="cg-mhead">ΜΟΝΟΣ</span>', '<span class="cg-mhead">SINGLE</span>'],
  ['<span class="cg-dhead">ΔΙΠΛΟΣ</span>', '<span class="cg-dhead">DOUBLE</span>'],
  ['<span class="name">Εσπρέσσο</span>', '<span class="name">Espresso</span>'],
  ['<span class="name">Αμερικάνο</span>', '<span class="name">Americano</span>'],
  ['<span class="name">Εσπρέσσο Μακιάτο</span>', '<span class="name">Espresso Macchiato</span>'],
  ['<span class="name">Εσπρέσσο φρέντο</span>', '<span class="name">Freddo espresso</span>'],
  ['<span class="name">Καπουτσίνο φρέντο</span>', '<span class="name">Freddo cappuccino</span>'],
  [
    '<span class="name">Καπουτσίνο φρέντο με γεύσεις<span class="star">*</span></span>',
    '<span class="name">Freddo cappuccino with flavours<span class="star">*</span></span>',
  ],
  ['<span class="name">Καπουτσίνο</span>', '<span class="name">Cappuccino</span>'],
  ['<span class="name">Καπουτσίνο Βιενουά</span>', '<span class="name">Viennese cappuccino</span>'],
  [
    '<span class="name">Καπουτσίνο διάφορες γεύσεις<span class="star">*</span></span>',
    '<span class="name">Cappuccino, assorted flavours<span class="star">*</span></span>',
  ],
  ['<span class="name">Λάττε</span>', '<span class="name">Latte</span>'],
  ['<span class="name">Φραπέ</span>', '<span class="name">Frappé</span>'],
  ['<span class="name">Φραπέ με Baileys</span>', '<span class="name">Frappé with Baileys</span>'],
  ['<span class="name">Γαλλικός καφές</span>', '<span class="name">French coffee</span>'],
  ['<span class="name">Ιρλανδικός καφές</span>', '<span class="name">Irish coffee</span>'],
  ['<span class="name">Ελληνικός</span>', '<span class="name">Greek coffee</span>'],
  [
    '<span class="name">Ζεστή σοκολάτα<span class="star">*</span></span>',
    '<span class="name">Hot chocolate<span class="star">*</span></span>',
  ],
  [
    '<span class="name">Κρύα σοκολάτα<span class="star">*</span></span>',
    '<span class="name">Iced chocolate<span class="star">*</span></span>',
  ],
  ['<span class="name">Σοκολάτα Βιενουά</span>', '<span class="name">Viennese chocolate</span>'],
  [
    '<div class="note reveal">*Γεύσεις: Καραμέλα, Φράουλα, Φουντούκι, Βανίλια, Πραλίνα</div>',
    '<div class="note reveal">*Flavours: Caramel, Strawberry, Hazelnut, Vanilla, Praline</div>',
  ],
  ['<h2 class="reveal">ΧΥΜΟΙ</h2>', '<h2 class="reveal">JUICES</h2>'],
  [
    '<span class="name">Φυσικός χυμός πορτοκάλι 330ml</span>',
    '<span class="name">Fresh orange juice 330ml</span>',
  ],
  [
    '<span class="name">Ανάμεικτος φυσικός χυμός 330ml</span>',
    '<span class="name">Fresh mixed juice 330ml</span>',
  ],
  ['<span class="name">Χυμός 330ml</span>', '<span class="name">Juice 330ml</span>'],
  ['<h2 class="reveal">ΤΣΑΙ</h2>', '<h2 class="reveal">TEA</h2>'],
  ['<span class="name">Τσάι (ρωτήστε μας)</span>', '<span class="name">Tea (ask us)</span>'],
  ['<span class="name">Χαμομήλι</span>', '<span class="name">Chamomile</span>'],
  ['<h2 class="reveal">ΣΠΙΤΙΚΑ ΡΟΦΗΜΑΤΑ</h2>', '<h2 class="reveal">HOUSE DRINKS</h2>'],
  [
    '<span class="name">Σπιτική λεμονάδα με τζίντζερ 500ml</span>',
    '<span class="name">Homemade ginger lemonade 500ml</span>',
  ],
  [
    '<span class="name">Σπιτική λεμονάδα με μαστίχα Χίου &amp; λάιμ 500ml</span>',
    '<span class="name">Homemade lemonade with Chios mastic &amp; lime 500ml</span>',
  ],
  [
    '<span class="name">Σπιτική βυσσινάδα 500ml</span>',
    '<span class="name">Homemade sour cherry drink 500ml</span>',
  ],
  [
    '<span class="name">Σπιτική μανταρινάδα 500ml</span>',
    '<span class="name">Homemade mandarin drink 500ml</span>',
  ],
  [
    '<span class="desc">Ρόφημα με μέλι ανθέων, φρεσκοστυμμένο χυμό τζίντζερ και λεμόνι. Δροσιστική και πικάντικη γεύση, χωρίς ζάχαρη και συντηρητικά.</span>',
    '<span class="desc">Drink with flower honey, freshly pressed ginger juice and lemon. Refreshing and spicy, with no added sugar or preservatives.</span>',
  ],
  ['<h2 class="reveal">ΑΝΘΡΑΚΟΥΧΑ</h2>', '<h2 class="reveal">SOFT DRINKS</h2>'],
  [
    '<span class="name">Πορτοκαλάδα με ανθρακικό 250ml</span>',
    '<span class="name">Sparkling orangeade 250ml</span>',
  ],
  [
    '<span class="name">Pelegrino / Ξυνό Νερό 360ml</span>',
    '<span class="name">Pellegrino / sparkling mineral water 360ml</span>',
  ],
  ['<span class="name">Νερό</span>', '<span class="name">Water</span>'],
  [
    '<p class="menu-intro menu-note">*Σημείωση: Τα ψωμάκια είναι κατεψυγμένα.</p>',
    '<p class="menu-intro menu-note">*Note: Bread rolls are served frozen.</p>',
  ],
  [
    '<span class="name">Σολομού</span><span class="price">6,50€</span>',
    '<span class="name">Salmon</span><span class="price">6,50€</span>',
  ],
  [
    '<span class="name">Παστράμι</span><span class="price">6,50€</span>',
    '<span class="name">Pastrami</span><span class="price">6,50€</span>',
  ],
  ['<span class="name">Ζαμπόν Πράγας</span>', '<span class="name">Prague ham</span>'],
  ['<span class="name">Μορταδέλα</span>', '<span class="name">Mortadella</span>'],
  [
    '<span class="name">Προσούτο</span><span class="price">5,50€</span>',
    '<span class="name">Prosciutto</span><span class="price">5,50€</span>',
  ],
  ['<span class="name">Σαλάμι</span>', '<span class="name">Salami</span>'],
  [
    '<span class="name">Τοστ γαλοπούλα - τυρί</span>',
    '<span class="name">Turkey &amp; cheese toast</span>',
  ],
  ['<span class="name">Τοστ ζαμπόν - τυρί</span>', '<span class="name">Ham &amp; cheese toast</span>'],
  ['<span class="name">Μίνι μπριός</span>', '<span class="name">Mini brioche</span>'],
  ['<span class="name">Χειροποίητη πίτα</span>', '<span class="name">Handmade pie</span>'],
  [
    '<span class="name">Club sandwich σολομού</span>',
    '<span class="name">Salmon club sandwich</span>',
  ],
  [
    '<span class="name">Club sandwich παστράμι</span>',
    '<span class="name">Pastrami club sandwich</span>',
  ],
  [
    '<span class="name">Club sandwich γαλοπούλα</span>',
    '<span class="name">Turkey club sandwich</span>',
  ],
  ['<span class="name">Club sandwich ζαμπόν</span>', '<span class="name">Ham club sandwich</span>'],
  ['<h2 class="reveal">ΣΑΛΑΤΕΣ</h2>', '<h2 class="reveal">SALADS</h2>'],
  [
    '<span class="name">Σολομού</span><span class="price">10,00€</span>',
    '<span class="name">Salmon</span><span class="price">10,00€</span>',
  ],
  [
    '<span class="name">Προσούτο</span><span class="price">9,00€</span>',
    '<span class="name">Prosciutto</span><span class="price">9,00€</span>',
  ],
  ['<h2 class="reveal">ΠΟΙΚΙΛΙΑ</h2>', '<h2 class="reveal">PLATTERS</h2>'],
  ['<span class="name">Τυριών</span>', '<span class="name">Cheese selection</span>'],
  ['<span class="name">Αλλαντικών</span>', '<span class="name">Cold cuts selection</span>'],
  ['<span class="name">Ανάμεικτη</span>', '<span class="name">Mixed platter</span>'],
  ['<h2 class="reveal">ΠΙΤΣΑ</h2>', '<h2 class="reveal">PIZZA</h2>'],
  ['<span class="name">Μαργαρίτα</span>', '<span class="name">Margherita</span>'],
  ['<h2 class="reveal">ΓΛΥΚΑ</h2>', '<h2 class="reveal">DESSERTS</h2>'],
  [
    '<div class="note reveal">Ρωτήστε μας για τα γλυκά ημέρας.</div>',
    '<div class="note reveal">Ask us about today’s desserts.</div>',
  ],
  ['<h2 class="reveal">ΠΟΤΑ</h2>', '<h2 class="reveal">SPIRITS</h2>'],
  ['<span class="name">Απλά</span>', '<span class="name">House</span>'],
  ['<h2 class="reveal">ΜΠΙΡΕΣ</h2>', '<h2 class="reveal">BEERS</h2>'],
  [
    '<p class="menu-intro">Όλες οι μπύρες είναι 330ml.</p>',
    '<p class="menu-intro">All beers are 330ml.</p>',
  ],
  ['<span class="name">Guinness Μαύρη</span>', '<span class="name">Guinness</span>'],
  ['<span class="name">Πικρή IPA</span>', '<span class="name">Bitter IPA</span>'],
  [
    'aria-label="Petit Cafe Piraeus στο Facebook"',
    'aria-label="Petit Cafe Piraeus on Facebook"',
  ],
  [
    'aria-label="Petit Cafe Piraeus στο Instagram"',
    'aria-label="Petit Cafe Piraeus on Instagram"',
  ],
  [
    'aria-label="Petit Cafe Piraeus στο Google Maps"',
    'aria-label="Petit Cafe Piraeus on Google Maps"',
  ],
  [
    '<span class="cocktail-ing">(Ρούμι, lime, δυόσμος, σόδα)</span>',
    '<span class="cocktail-ing">(Rum, lime, mint, soda)</span>',
  ],
];

for (const [a, b] of pairs) {
  if (!t.includes(a)) {
    console.error("Missing:", a.slice(0, 100));
    process.exit(1);
  }
  t = t.replace(a, b);
}
writeFileSync(p, t, "utf8");
console.log("OK", p);
