export type LessonContent =
  | { type: "text";  value: string }
  | { type: "titre"; value: string }
  | { type: "table"; value: { header: string[]; rows: string[][] } };

export type Lesson = {
  id: number;
  title: string;
  description: string;
  content: LessonContent[];
};
export const lessons: Lesson[] = [
  {
    id: 1,
    title: "1 - Les Salutations",
    description:
      "Nous verrons à travers ce chapitre comment se font les salutations.",
    content: [
      {
        type: "text",
        value:
          "Les salutations sont un aspect important de la vie mahoraise, surtout à la campagne : il est recommandé de saluer la personne et de l'interroger sur sa santé, et éventuellement sur celle de ses proches, avant de passer à d'autres sujets.",
      },
      {
        type: "text",
        value: "1. LES SALUTATIONS COURANTES :",
      },
      {
        type: "table",
        value: {
          header: ["SALUTATIONS", "Français", "RÉPONSES", "Français"],
          rows: [
            [],
            ["- Jeje", "= Bonjour ! Ça va ?", "- Ndjema !", "= Bien !"],
            [
              "- Jeje monye",
              "= Bonjour, Monsieur, ça va ?",
              "- Ndjema !",
              "= Bien !",
            ],
            [
              "- Jeje ɓweni",
              "= Bonjour, Madame, ça va ?",
              "- Ndjema !",
              "= Bien !",
            ],
            ["- Jeje ɗagoni", "= La maison, ça va ?", "- Ndjema !", "= Bien !"],
            ["- Kwezi !", "= Bonjour ! (à un aîné)", "- Mbona !", "= Bien !"],
            ["- Salaam aleikum !", "(salut musulman)", "- Wa aleikum salaam !"],
          ],
        },
      },
      {
        type: "text",
        value: "2. L'ÉCHANGE DE NOUVELLES :",
      },
      {
        type: "text",
        value:
          "Ces simples salutations sont souvent suivies de questions plus précises, sur le moment de la journée, la santé, la famille, les enfants, etc..",
      },
      {
        type: "text",
        value:
          'On utilise pour cela des questions commençant par le mot HAƁARI qui signifie "nouvelles" :',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["- Haɓari ?", "- Quoi de neuf ?"],
            [
              "- Haɓari zaho ?",
              "- Comment vas-tu ? / Quelles sont tes nouvelles ?",
            ],
            ["- Haɓari za asuɓuhi ?", "- Comment ça va ce matin ?"],
            ["- Haɓari za mutsana ?", "- Comment ça va cet après-midi ?"],
            ["- Haɓari za ujoni ?", "- Comment ça va ce soir ?"],
            ["- Haɓari za uku ?", "- Comment ça va ce soir / cette nuit ?"],
            [
              "- Haɓari za suku nyengi ?",
              "- Comment ça va depuis plusieurs jours ?",
            ],
            ["- Haɓari za ɗagoni ?", "- Comment ça va au village ?"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Sauf en cas de malheur (décès, maladie grave, etc...) On répondra invariablement par :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "- Ndjema !",
              "ou - Hairi !",
              "ou - Fetre !",
              "ou - Salama !",
              "= Tout va bien.",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "3. AUTRES EXPRESSIONS COURANTES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["- Urendre jeje ?", "- Comment vas-tu ? / comment allez-vous ?"],
            [
              "- Trongo za ndjema ?",
              "- Tout va bien ? / Les choses vont bien ?",
            ],
            ["- Ewa !", "- Oui"],
            ["- Kiasi.", "- Un peu"],
            ["- Wa fetre ?", "- Tu vas bien ? / Vous allez bien ?"],
            ["- Tsa fetre.", "- Je vais bien"],
            ["- Navuzaho ?", "- Es-tu bien portant ?"],
            ["- Alhamdulillahi!", "- Dieu merci"],
            ["- Ɓasi wawe ?", "- Et toi ? / Et vous ?"],
            ["- Halo !", "- Allons-y !"],
            ["- Labe ! ou Labeka !", "- Oui ? (En réponse à un appel, femme)"],
            ["- Naam !", "- Oui ? (En réponse à un appel, homme)"],
            ["- Ãhã !", "- Non !"],
            ["- Tafadhali", "- S'il vous plaît. (Peu employé)"],
            ["- Marahaɓa", "- Merci."],
            ["- Marahaɓa nyengi / mengi", "- Merci beaucoup."],
            ["- Haidhuru", "- Ça ne fait rien."],
          ],
        },
      },
      {
        type: "text",
        value: "4. EN VISITE CHEZ QUELQU'UN :",
      },
      {
        type: "text",
        value: "Pour annoncer sa présence chez quelqu'un, on crie à la porte :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["- Hoɗi !", "- Il y a quelqu'un ?"]],
        },
      },
      {
        type: "text",
        value: "Auquel la personne répond :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["- Kariɓu !", "- Sois le bienvenu ! (A une personne)"],
            [
              "- Namukariɓu ! / Namukariɓuni !",
              "- Soyez les bienvenus ! (A plusieurs personnes)",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "5. LES ADIEUX :",
      },
      {
        type: "text",
        value:
          'Le mot pour dire au revoir est Kwaheri ! Ce mot vient directement du swahili "Kwa heri !" ce qui signifie littéralement : à la chance, au bonheur, ou encore "bonne chance !"',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["- Kwaheri !", "- Au revoir ! (A une personne)"],
            [
              "- Namukwaheri ! / Namukwaherini !",
              "- Au revoir ! (A plusieurs personnes)",
            ],
            ["- Ritsowonana !", "- A bientôt ! (Nous nous reverrons)"],
            ["- Suku yangina tsena.", "- A un de ces jours !"],
            ["- Asuɓuhi ndjema.", "- bonne matinée !"],
          ],
        },
      },
      {
        type: "text",
        value: "Lorsqu'on se quitte le soir, on peut souhaiter :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["- Uku wa hairi !", "- bonne nuit ! (hairi = heri = le bonheur)"],
            ["- Uku mwema !", "- bonne nuit !"],
          ],
        },
      },
      {
        type: "text",
        value: "Au moment de dormir, on peut souhaiter aussi :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["- Lala ha unono !", "- Dors bien !"],
            ["- Ndzozi ndjema !", "- Faites de beaux rêves !"],
          ],
        },
      },
      {
        type: "text",
        value:
          "EXERCICE 1 :\tFaites correspondre les questions et les réponses :",
      },
      {
        type: "table",
        value: {
          header: ["QUESTIONS", "RÉPONSES"],
          rows: [
            [],
            ["1) Hodi !", "a) Tsa fetre, alhamdulillahi !"],
            ["2) Jeje ?", "b) Haya, kwaheri !"],
            ["3) Kwezi ?", "c) Marahaɓa !"],
            ["4) Haɓari zaho ?", "d) Kariɓu !"],
            ["5) Trongo za ndjema ?", "e) Mbona !"],
            ["6) Ndzozi ndjema !", "f) Salama !"],
            ["7) Ritsowonana !", "g) Ndjema !"],
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: "2 - Les Verbes : L'Infinitif",
    description:
      "Savoir la structure des verbes peut être un plus pour la comprehension.",
    content: [
      {
        type: "text",
        value:
          "Le verbe en shimaore se caractérise par son caractère agglutinant. Pour qu'il puisse être fonctionnel, qu'il se conjugue et s'intègre à la phrase, on doit lui attacher un nombre variable d'affixes : préfixes, infixes et suffixes, selon les différents cas de figures. Tous ces affixes ont une place et une fonction précise. Le schéma général de position des affixes par rapport au radical verbal est le suivant :",
      },
      {
        type: "titre",
        value:
          "Pré-Préfixe + Préfixe Sujet + Marque de Temps + Temps Auxiliaire + Infixe Objet + RADICAL + Dérivation + Suffixe + Post-Suffixe",
      },
      {
        type: "text",
        value:
          "Heureusement, il est très rare qu'un verbe comporte à la fois tous ces affixes !\n Ces différents affixes et leurs fonctions seront expliqués au cours des différents chapitres.",
      },
      {
        type: "text",
        value:
          "En français, l'infinitif est marqué par une terminaison : -ER, -IR, -OIR, -RE.\n En shimaore, l'infinitif est marqué par le préfixe U- placé devant le radical verbal.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["U-ENDRA", "aller", "U-PARA", "avoir, trouver, obtenir"],
            ["U-FANYA", "faire", "U-REMA", "frapper"],
            ["U-JUA", "savoir", "U-RENGA", "prendre"],
            ["U-KIA", "entendre", "U-SOMA", "lire, apprendre"],
            ["U-NGALIA", "regarder", "U-TRIA", "mettre, poser, placer"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Comme on le voit à travers ces quelques exemples, la grande majorité des verbes du shimaore se terminent par -A à l'infinitif. Il y a cependant des exceptions, notamment des verbes d'origine arabe, qui se terminent en -I et -U.",
      },
      {
        type: "text",
        value: "QUELQUES VERBES D'ORIGINE ARABE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uasili", "arriver", "Ufikiri", "penser"],
            ["Uɓadili", "échanger", "Ufurahi", "se réjouir"],
            ["Uɓaki", "rester", "Uhadisi", "raconter"],
            ["Udjereɓu", "essayer", "Usafiri", "voyager"],
            ["Udjiɓu", "répondre", "Usalimu", "saluer"],
          ],
        },
      },
      {
        type: "text",
        value: "LISTE DE VERBES D'USAGE COURANT :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uãndrisa", "commencer", "Ununua", "acheter"],
            ["Udzisa", "demander", "Uona", "voir"],
            ["Uhima", "se lever", "Urongoa", "dire, raconter"],
            ["Uhira", "appeler", "Usaidia", "aider"],
            ["Ukatra", "supprimer", "Usika", "tenir, prendre, saisir"],
            ["Ulawa", "partir, quitter, sortir", "Utsaha", "vouloir"],
            ["Ulala", "dormir", "Uudza", "vendre"],
            ["Ulisha", "laisser", "Uv̄endza", "aimer"],
            ["Uliv̄a", "payer", "Uvira", "passer"],
            ["Umalidza", "terminer", "Uzia", "arrêter, retenir"],
          ],
        },
      },
      {
        type: "text",
        value: "VERBES MONOSYLLABIQUES",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ufa", "mourir", "Unwa", "boire"],
            ["Uja", "venir", "Unya", "tomber (pluie)"],
            ["Ulaa", "venir de", "Unya", "faire ses besoins"],
            ["Ula / Uɗya", "manger", "Uv̄a", "donner"],
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: "3 - Les Verbes : L'Impératif",
    description:
      "Nous verrons dans cette partie comment est constituer l'impératif",
    content: [
      {
        type: "text",
        value: "1. L'IMPÉRATIF AFFIRMATIF :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1. UFANYA", "NA-NI-FANYE", "nanifanye !", "que je fasse !"],
            ["(faire)", "NA-A-FANYE", "nafanye !", "qu'il / elle fasse !"],
            ["", "NA-RI-FANYE", "narifanye !", "faisons !"],
            ["", "NA-MU-FANYE", "namufanye !", "faites !"],
            ["", "NA-WA-FANYE", "nawafanye !", "qu'ils / elles fassent !"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["2. UHIMA", "NA-NI-HIME", "nanihime !", "que je me lève !"],
            ["(se lever)", "NA-A-HIME", "nahime !", "qu'il / elle se lève !"],
            ["", "NA-RI-HIME", "narihime !", "levons-nous !"],
            ["", "NA-MU-HIME", "namuhime !", "levez-vous !"],
            ["", "NA-WA-HIME", "nawahime !", "qu'ils / elles se lèvent !"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["3. UƁAKI", "NA-NI-ƁAKI", "naniɓaki !", "que je reste !"],
            ["(rester)", "NA-A-ƁAKI", "naɓaki !", "qu'il / elle reste !"],
            ["", "NA-RI-ƁAKI", "nariɓaki !", "restons !"],
            ["", "NA-MU-ƁAKI", "namuɓaki !", "restez !"],
            ["", "NA-WA-ƁAKI", "nawaɓaki !", "qu'ils / elles restent !"],
            [
              "",
              "NA-ZI-ƁAKI",
              "naziɓaki !",
              "qu'ils / elles restent ! (Cl 10)",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "CAS PARTICULIERS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uja", "(venir)", "-> KO !", "viens !"],
            ["Ulaa", "(venir de, partir)", "-> LAA V̄AV̄O !", "va-t-en !"],
            ["Uv̄a", "(donner)", "-> NIV̄E !", "donne-moi !"],
          ],
        },
      },
      {
        type: "text",
        value: "2. L'IMPÉRATIF NÉGATIF :",
      },
      {
        type: "text",
        value:
          "On intercale l'infixe négatif -SI- entre le préfixe sujet et le radical verbal, et la voyelle finale -A du radical se change en -E.\n La voyelle finale des verbes terminés en -I et -U ne change pas.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["NI-", "= je", "+SI", "+RADICAL /E"],
            ["U-", "= tu"],
            ["A-", "= il, elle"],
            ["RI-", "= nous"],
            ["MU-", "= vous"],
            ["WA-", "= ils / elles"],
            ["ZI-", "= ils / elles (classe 10)"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1. ULISHA", "U-SI-LISHE", "usilishe !", "ne laisse pas !"],
            ["(laisser)", "RI-SI-LISHE", "risilishe !", "ne laissons pas !"],
            ["", "MU-SI-LISHE", "musilishe !", "ne laissez pas !"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["2. UJA", "U-SI-JE", "usije !", "ne viens pas !"],
            ["(venir)", "RI-SI-JE", "risije !", "ne venons pas !"],
            ["", "MU-SI-JE", "musije !", "ne venez pas !"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["3. UREMA", "U-SI-REME", "usireme !", "ne frappe pas !"],
            ["(frapper)", "RI-SI-REME", "risireme !", "ne frappons pas !"],
            ["", "MU-SI-REME", "musireme !", "ne frappez pas !"],
          ],
        },
      },
      {
        type: "text",
        value: "3. L'IMPÉRATIF D'INSISTANCE :",
      },
      {
        type: "text",
        value:
          "Il se forme en ajoutant le pré-préfixe négatif KA- devant le préfixe sujet suivi de la racine verbale.\n A la 2ème personne du singulier, le pré-préfixe KA- et le préfixe sujet U- fusionnent en KU-.\n La voyelle finale du verbe change en fonction de la voyelle qui la précède dans le radical.\n La voyelle finale est identique à celle de l'Accompli. (Voir : Chapitre 14.)",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["USOMA", "KA-NI-SOMO", "kanisomo !", "que j'apprenne donc !"],
            ["(apprendre)", "KA-U-SOMO", "kusomo !", "apprends donc !"],
            ["", "KA-A-SOMO", "kasomo !", "qu'il / elle apprenne donc !"],
            ["", "KA-RI-SOMO", "karisomo !", "apprenons donc !"],
            ["", "KA-MU-SOMO", "kamusomo !", "apprenez donc !"],
            [
              "",
              "KA-WA-SOMO",
              "kawasomo !",
              "qu'ils / elles apprennent donc !",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uãngadza", "jouer", "Ulagua", "parler, bavarder"],
            ["Uɓala", "fermer", "Uloa", "pêcher"],
            ["Uɓua", "ouvrir", "Uregeya", "revenir"],
            ["Uela", "nager", "Uruka", "sauter"],
            ["Uengedza", "augmenter", "Uvungudza", "diminuer, réduire"],
            ["Ukariɓisa", "accueillir", "Uzina", "danser"],
          ],
        },
      },
    ],
  },
  {
    id: 4,
    title: "4 - Les classes Nominales",
    description:
      "Le shi-maore est une langue qui n'a pas de genre grammaticaux",
    content: [
      {
        type: "text",
        value:
          'En shimaore, comme dans les autres langues bantoues, les substantifs se répartissent, non pas en genres grammaticaux du type "masculin / féminin / neutre", mais en classes nominales. Le shimaore comprend 13 classes nominales, plus trois classes particulières appelées classes locatives.',
      },
      {
        type: "text",
        value:
          'Les 13 classes nominales peuvent être regroupées en 7 "genres" (ou catégories) comprenant chacun 2 classes : une classe pour le singulier et une pour le pluriel. Le 6ème "genre" emprunte ses pluriels aux autres classes. Le 7ème "genre" constitué de verbes substantivés ne possède pas de pluriel. Ces 7 "genres" correspondent de façon assez lâche à des catégories sémantiques plus ou moins étendues.',
      },
      {
        type: "text",
        value:
          "Les différentes classes nominales se reconnaissent et se définissent par leur préfixe, c'est-à-dire la première syllabe du nom, qui déterminera à\n son tour une série d'accords par préfixes (et infixes) sur les adjectifs, pronoms, démonstratifs, possessifs, verbes, etc... dans la phrase.",
      },
      {
        type: "text",
        value:
          "Le nom est d'ordinaire indéfini. La distinction entre défini (le / la / l' / les) et indéfini (un / une / des) s'obtient, non pas à l'aide d'articles comme en français, mais en ajoutant un pré-préfixe défini, c'est-à-dire une syllabe supplémentaire, devant le préfixe de classe du nom. Ce\n pré-préfixe varie lui aussi en fonction de la classe à laquelle appartient le nom.",
      },
      {
        type: "table",
        value: {
          header: [
            "GENRES /CLASSES",
            "PRÉ-PRÉFIXESDÉFINIS",
            "PRÉFIXESNOMINAUX",
            "EXEMPLES",
            "CATÉGORIES SÉMANTIQUES",
          ],
          rows: [
            [],
            [
              "MU-/WA-Cl 1 SingulierCl 2 Pluriel",
              "U-U-",
              "M(U), MW-WA-, W-",
              "(personne)MUTRU WATRU",
              "Noms d'êtres humains uniquement.",
            ],
            [
              "MU-/MI-Cl 3 SingulierCl 4 Pluriel",
              "U-I-",
              "M(U), MW-MI-, M-",
              "(main)MUHONO MIHONO",
              "Noms d'arbres, d'objets, de parties du corps humain, éléments de la nature.",
            ],
            [
              "MA-Cl 5 SingulierCl 6 Pluriel",
              "LI-YA-",
              "Ø- ou DZI-MA-",
              "(voiture)GARI MAGARI",
              "Noms d'objets, d'animaux, de fruits, de parties du corps humain, termes de parenté, noms abstraits, etc.",
            ],
            [
              "SHI-/ZI-Cl 7 Singulier Cl 8 Pluriel",
              "I-I-",
              "SHI-, SH-ZI-, Z-",
              "(chaise)SHIRI ZIRI",
              "Noms de langues, de parties du corps humain,\n objets usuels.",
            ],
            [
              "N-Cl 9 SingulierCl 10 Pluriel",
              "I-ZI-",
              "Ø- ou N-Ø- ou N-",
              "(vêtement)NGUO ZINGUO",
              "Noms de personnes, de\n choses abstraites ou concrètes,\n éléments naturels, emprunts au français, etc.",
            ],
            [
              "U-Cl. 11, 14 pluriels divers",
              "",
              "U-",
              "(nuit)UKU",
              "Quelques noms d'objets (Cl. 11), Noms abstraits singuliers\n (Cl. 14).",
            ],
            [
              "Cl. 15 pas de pluriel",
              "",
              "U-",
              "(cuisiner)UPIHA",
              "Verbes substantivés (Cl. 15).",
            ],
            [
              "Cl. LocativesCl. 16, 17, 18",
              "",
              "V̄-, H-, M-",
              "(endroit)V̄AHANU",
              "Les classes locatives ne comprennent qu'un seul nom. Elles sont présentes dans les accords de classes.",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "Les numéros attribués aux différentes classes nominales dans ce tableau sont des numéros d'ordre conventionnel, valables pour toutes les langues bantoues.",
      },
      {
        type: "text",
        value: "Les classes 12 et 13 ne sont pas attestées en shimaore.",
      },
      {
        type: "text",
        value:
          "Le genre U- réunit en réalité 2 classes distinctes de noms au singulier : les classes 11 et 14. Les noms de classe 11 forment généralement leur pluriel en classe 6 ou 10. Ceux de la classe 14 n'ont pas de pluriel.",
      },
      {
        type: "text",
        value:
          "La classe 15 est constituée de verbes substantivés, c'est-à-dire des verbes à l'infinitif employés comme noms. Ils commencent aussi par U- en shimaore (quelquefois transcrit par WU-), ou par HU- en shindzuani. Cette classe ne possède pas de pluriel.",
      },
      {
        type: "text",
        value:
          "Quant aux classes locatives, elles comprennent 3 classes : la classe 16 (préfixe V̄-), la classe 17 (préfixe H-) et la classe 18 (préfixe M-), mais\n elles ne possèdent qu'un seul nom. Comme elles ne correspondent pas aux catégories traditionnelles du singulier et du pluriel, il est difficile de les considérer comme un \"genre\" nominal à part entière.\n C'est pourquoi elles ne seront pas incluses dans les différents tableaux de variations nominales de cet ouvrage, mais traitées comme un cas à\n part.",
      },
      {
        type: "text",
        value:
          "Pour s'adapter aux réalités du monde moderne, le shimaore doit se fabriquer tous les jours des mots nouveaux. Après avoir beaucoup\n emprunté à l'arabe, il emprunte maintenant ses mots au français. Malgré tout, le système des classes nominales est préservé, car les mots\n nouveaux sont assimilés aux genres MA- (Classes 5 / 6) et N- (Classes 9 / 10).",
      },
      {
        type: "text",
        value: "Voici quelques exemples pour illustrer ce phénomène :",
      },
      {
        type: "table",
        value: {
          header: ["Genre", "Singulier", "Pluriel"],
          rows: [
            [],
            [
              "Genre MA- :",
              "un chauffeur\n un docteur\n un policier\n un gâteau",
              "shofera\n dukutera\n polisi\n gato",
              "des chauffeurs\n des docteurs\n des policiers\n des gâteaux",
              "mazofera\n madukutera\n mav̄olisi\n magato",
            ],
            [
              "Genre N- :",
              "un taxi\n l'hôpital\n l'école\n la barge\n un avion\n un jardin",
              "taksi\n lapitali\n likoli\n barji\n aeroplani / ãvio\n zarde",
              "des taxis\n des hôpitaux\n des écoles\n des barges\n des avions\n des jardins",
              "taksi\n lapitali\n likoli\n barji\n aeroplani / ãvio\n zarde",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "Tout le long de cet ouvrage, nous utiliserons la terminologie suivante pour décrire certaines parties de mots :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Radical / Racine :",
              "C'est la partie du mot qui reste inchangée au cours des différentes dérivations de mots, que ce soit des noms, des adjectifs ou des verbes.\n \n Exemple : muSAFIRI (= un\n voyageur), waSAFIRI (= des voyageurs),\n uSAFIRI (= voyager), uSAFIRIdza (=\n faire partir en voyage). Cependant on trouve : muSAFARA,\n miSAFARA (= un voyage, des voyages).",
            ],
            [""],
            [
              "Préfixe :",
              "C'est une lettre, ou une syllabe placée\n devant un nom. Le préfixe sert souvent\n d'accord (classe, personne, nombre, etc...)\n \n Exemple : MUzungu (= un Européen),\n WAzungu (= des Européens).",
            ],
            [""],
            [
              "Pré-Préfixe :",
              "C'est une syllabe supplémentaire, placée devant le préfixe du nom. Présent dans de nombreuses langues bantoues, mais pas en swahili, le pré-préfixe joue en shimaore un rôle de déterminant défini. \n \n Exemple : MUzungu (= un Européen),\n Umuzungu (= l'Européen).\n WAzungu (= des Européens),\n Uwazungu (= les Européens).",
            ],
            [""],
            [
              "Infixe :",
              "C'est une lettre ou une syllabe, placée au milieu d'un mot, généralement dans un verbe, entre un préfixe et le radical verbal.\n \n Exemple : tsaelewa (= je n'ai pas compris)\n tsaHUelewa (= je ne t'ai pas compris).",
            ],
            [""],
            [
              "Suffixe :",
              "C'est une lettre ou une syllabe, ajoutée à la fin d'un mot. Quelquefois, c'est simplement la voyelle finale du mot qui change.\n \n Exemple : anunuA (= il a acheté)\n anunuE (= qu'il achète).",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 5,
    title: "5 - Le Genre MU/WA",
    description:
      "Cette partie potera sur la distinction du genre, cela paraît difficile mais tranquille 🤣...",
    content: [
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Attention",
              "Le genre MU-/WA- (Classes 1 / 2) contient exclusivement des noms de personnes.",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["Cl 1 (Singulier) :", "préfixe MU-", "MUTRU= un homme"]],
        },
      },
      {
        type: "text",
        value:
          "La voyelle U du préfixe de classe singulier MU- est très faiblement prononcée, ou même pas du tout. Nous avons cependant gardé cette voyelle en conformité avec les règles orthographiques de l'Association SHIME.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["Cl 2 (Pluriel) :", "préfixe WA-", "WATRU= des hommes"]],
        },
      },
      {
        type: "table",
        value: {
          header: ["A NOTER :"],
          rows: [
            [
              "Devant une voyelle,",
              "le préfixe singulier MU- devient MW- :",
              "MWANA= un enfant",
            ],
            ["", "Le préfixe pluriel WA- devient W- :", "WANA= des enfants"],
          ],
        },
      },
      {
        type: "text",
        value: "1. QUELQUES NOMS DU GENRE MU-/WA- :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Mudjeni", "Wadjeni", "un invité, des --"],
            ["Mudjeremani", "Wadjeremani", "un allemand, des --"],
            ["Mudzade", "Wadzade", "un parent, des --"],
            ["Mufalme / Mufaume", "Wafalme / Wafaume", "un roi, des --"],
            ["Mufanyizi hazi", "Wafanyisi hazi", "un travailleur, des --"],
            ["Mufarantsa", "Wafarantsa", "un français, des --"],
            ["Muhindi", "Wahindi", "un indien, des --"],
            ["Mujuhu", "Wajuhu", "un petit-fils, des --"],
            ["Mukazi", "Wakazi", "un résident, un citoyen, des --"],
            ["Mulimizi", "Walimizi", "un cultivateur, des --"],
            ["Mulozi", "Walozi", "un pêcheur, des --"],
            ["Mume", "Wame", "un époux, un mari, des --"],
            ["Mumrima", "Wamrima", "un africain, des --"],
            ["Mungereza", "Wangereza", "un anglais, des --"],
            ["Mungu", "(pas de pluriel)", "Dieu"],
            ["Mununuzi", "Wanunuzi", "un acheteur, des --"],
            ["Munyawe", "Wanyawe", "un camarade, un ami, des --"],
            ["Musafiri", "Wasafiri", "un voyageur, des --"],
            ["Mushe", "Washe", "une épouse, une femme, des --"],
            ["Musindzi", "Wasindzi", "un coureur de jupon, des --"],
            ["Mutangifu", "Watangifu", "un flâneur, des --"],
            ["Mutru", "Watru", "une personne, des --, des gens"],
            ["Mutru ɓaɓa", "Watru ɓaɓa", "un homme, des --"],
            ["Mutru-mama", "Watru-mama", "une femme, des --"],
            ["Mutsumba", "Watsumba", "un célibataire, des --"],
            ["Muzee", "Wazee", "un vieux, des --"],
            ["Muzungu", "Wazungu", "un homme blanc, des --"],
            [""],
            ["Mwadini", "Wadini", "un muezzin, des --"],
            ["Mwamu", "Wamu", "une belle-sœur, des --"],
            ["Mwana", "Wana", "un enfant, des --"],
            ["Mwanadamu", "Wanadamu", "un être humain, des -- (enfant d'Adam)"],
            ["Mwanamtsa", "Wanatsa", "un jeune, un enfant, un gamin, des --"],
            ["Mwananya", "Wananya", "un frère, une sœur, des --"],
            ["Mwana shioni", "Wana zioni", "un élève, des --"],
            ["Mwana zaza", "Wana zaza", "un bébé, des --"],
            ["Mwandzani", "Wandzani", "un ami, des --"],
            ["Mwaraɓu", "Waraɓu", "un arabe, des --"],
            ["Mwenyeji", "Wenyeji", "un villageois, des --"],
            ["Mwenyewe", "Wenyewe", "un propriétaire, des --"],
            ["Mwidzi", "Waidzi", "un voleur, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Mwananya mutru-ɓaɓa", "Wananya watru-ɓaɓa", "un frère, des --"],
            ["Mwananya mutru-mama", "Wananya watru-mama", "une sœur, des --"],
            ["Mwanamtsa mutru-ɓaɓa", "Wanatsa watru-ɓaɓa", "un fils, des --"],
            ["Mwanamtsa mutru-mama", "Wanatsa watru-mama", "une fille, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "MZUNGU ! MZUNGU ! Le mot mzungu, qui signifie 'homme blanc' - crié par tous les gamins des rues en Afrique de l'Est - fut créé à l'époque des premiers explorateurs européens à partir du verbe swahili 'kuzunguka' = 'tourner en rond sans but précis'.Depuis, on a forgé les néologismes 'mzounguette' en parlant d'une jeune femme blanche et 'mzoungouland' pour désigner les groupements de logements SIM réservés aux expatriés à Mayotte...",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "2. AUTRES NOMS DE PERSONNES :",
      },
      {
        type: "text",
        value:
          "Quelques noms de personnes de genre N- au singulier (Classe 9), prennent le préfixe WA- de classe 2 au pluriel.",
      },
      {
        type: "text",
        value:
          'Il y a aussi un certain nombre de noms de personnes du genre MA- . Ces noms qui n\'ont pas de préfixe au singulier (classe 5, préfixe "Ø-"), forment leur pluriel avec le préfixe MA- (classe 6).',
      },
      {
        type: "text",
        value:
          "Tous ces noms de personnes commandent cependant des accords de classes 1 / 2 avec les verbes, les adjectifs, etc.. (Voir : Chapitre 13 et Chapitre 20.)",
      },
      {
        type: "text",
        value: "Noms de GENRE N- avec pluriel en WA- (Cl 9 / Cl 2) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Ɓaɓa", "Waɓaɓa", "père, papa"],
            ["Mama", "Wamama", "mère, maman"],
            ["Ɓaɓaɓole", "Waɓaɓaɓole", "frère aîné du père, oncle"],
            ["Mamaɓole", "Wamamaɓole", "sœur aînée de la mère, tante"],
            ["Ɓaɓatiti", "Waɓaɓatiti", "frère cadet du père, oncle"],
            ["Mamatiti", "Wamamatiti", "sœur cadette de la mère, tante"],
          ],
        },
      },
      {
        type: "text",
        value: "Noms de GENRE MA- (Classes 5 / 6) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            ["Ɓakoko", "Maɓakoko", "grand-père"],
            ["Ɓwana", "Maɓwana", "monsieur"],
            ["Ɓweni", "Maɓweni", "madame"],
            ["Duktera", "Maduktera", "docteur"],
            ["Fundi", "Mafundi", "maître, artisan"],
            ["Fundi likoli", "Mafundi likoli", "maître d'école"],
            ["Koko", "Mahoko / Makoko", "grand-mère"],
            ["Monye", "Mamonye", "monsieur"],
            ["Ngivavi", "Mangivavi", "tante (paternelle)"],
            ["Raisi", "Maraisi", "président"],
            ["Shaɓaɓi", "Mashaɓaɓi", "jeune, adolescent"],
            ["Shofera", "Mazofera", "chauffeur"],
            ["Twaɓiɓu", "Matwaɓiɓu", "médecin, docteur"],
            ["Zama", "Mazama", "oncle (maternel)"],
            ["Zena", "Mazena", "tante (épouse de Zama)"],
            ["Zuki", "Mazuki", "grand frère"],
          ],
        },
      },
      {
        type: "text",
        value: "3. LE PRÉ-PRÉFIXE DÉFINI :",
      },
      {
        type: "text",
        value:
          "Le pré-préfixe défini se place devant le préfixe de classe, et fonctionne comme un article défini. D'un usage moins fréquent que l'article défini en français, il est surtout employé pour désigner une personne (ou une chose, dans le cas des autres classes nominales) dont on a déjà parlé avant.",
      },
      {
        type: "text",
        value:
          "Il s'emploie aussi en conjonction avec un adjectif démonstratif ou un possessif (ce qui n'est pas le cas de l'article défini en français).",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 1 (Singulier) :"],
            ["U-", "MUTRU", "= une personne", "UMUTRU", "= la personne"],
            ["", "MWANA", "= un enfant", "UMWANA", "= l'enfant"],
            [""],
            ["Cl 2 (Pluriel) :"],
            ["U-", "WATRU", "= des personnes", "UWATRU", "= les personnes"],
            ["", "WANA", "= des enfants", "UWANA", "= les enfants"],
          ],
        },
      },
      {
        type: "text",
        value: "4. ACCORDS DE CLASSE :",
      },
    ],
  },
  {
    id: 6,
    title: "6 - Les Pronoms Sujets",
    description:
      "Le Shi-Maoré est complexe ce qui en fait sa richesse, dans cette partie on verra les types de pronoms sujets.",
    content: [
      {
        type: "text",
        value: "Il existe en shimaore deux catégories de pronoms sujets :",
      },
      {
        type: "text",
        value:
          "1. Les PRONOMS PERSONNELS AUTONOMES : \n Ceux-ci sont surtout utilisés avec le PRÉSENT HABITUEL. \n Ils peuvent aussi être utilisés aux autres temps, pour renforcer le sujet.",
      },
      {
        type: "text",
        value:
          "2. Les PRÉFIXES SUJETS : \n On peut distinguer deux sortes de péfixes sujets : \n - Les indices pronoms sujets \n - Les indices d'accord de classe",
      },
      {
        type: "text",
        value:
          "Ils sont utilisés à tous les temps, excepté le présent habituel, et sont accrochés au verbe. \n A la 3ème personne du singulier et du pluriel, il n'y a pas substitution entre le nom sujet et le préfixe sujet, mais complémentarité : le préfixe sujet est là, même lorsque le nom sujet est déjà exprimé dans la phrase.",
      },
      {
        type: "text",
        value: "1. LES PRONOMS PERSONNEL AUTONOMES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["WAMI", "= je, moi"],
            ["WAWE", "= tu, toi"],
            ["WAYE", "= il, elle, lui, elle"],
            ["WASI", "= nous"],
            ["WANYU", "= vous"],
            ["WAWO", "= ils, elles, eux, elles"],
          ],
        },
      },
      {
        type: "text",
        value: "2. LES INDICES PRONOMS SUJETS AFFIRMATIFS :",
      },
      {
        type: "table",
        value: {
          header: [
            "Personne",
            "Singulier",
            "Equivalent",
            "Pluriel",
            "Equivalent",
          ],
          rows: [
            [],
            ["1ère personne", "Ni- ou TSI-", "= je", "RI-", "= nous"],
            ["2ème personne", "U-", "= tu", "MU-", "= vous"],
            ["3ème personne", "A-", "= il / elle", "WA-", "= ils / elles"],
          ],
        },
      },
      {
        type: "text",
        value: "3. LES INDICES D'ACCORDS DE CLASSE AFFIRMATIFS :",
      },
      {
        type: "table",
        value: {
          header: [
            "GENRES / Classes",
            "Singulier",
            "Equivalent",
            "Pluriel",
            "Equivalent",
          ],
          rows: [
            [
              "Genre MU-/WA- (Cl 1 / 2)",
              "A-",
              "= il, elle",
              "WA-",
              "= ils / elles",
            ],
            [
              "Genre MU-/MI- (Cl 3 / 4)",
              "U-",
              "= il / elle",
              "I-",
              "= ils / elles",
            ],
            [
              "Genre MA- Cl 5 / 6)",
              "LI-",
              "= il / elle",
              "YA-",
              "= ils / elles",
            ],
            [
              "Genre SHI-/ZI- (Cl 7 / 8)",
              "I-",
              "= il / elle",
              "ZI-",
              "= ils / elles",
            ],
            [
              "Genre N- (Cl 9 / 10)",
              "I-",
              "= il / elle",
              "ZI-",
              "= ils / elles",
            ],
            ["Genre U- (Cl 11,14)", "U-", "= il / elle", ""],
            ["CLASSES LOCATIVES", "V̄U-", "= il / elle"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Du point de vue de la forme, les préfixes sujets des verbes sont identiques aux pré-préfixes définis des noms de classe correspondante, sauf pour le genre MU-/WA-.",
      },
      {
        type: "text",
        value:
          "Les indices d'accords de classe 1 et classe 2 (genre MU-/WA-) se confondent avec les indices pronoms sujets de la 3ème personne du singulier et du pluriel.",
      },
      {
        type: "text",
        value:
          "Le choix de l'indice d'accord de classe dépend de la classe nominale à laquelle appartient le nom sujet correspondant.",
      },
      {
        type: "text",
        value:
          "Cependant, avec un nom sujet qui représente une personne, même lorsqu'il n'appartient pas au genre MU-/WA-, on utilisera des indices d'accord de classes 1 et 2. L'accord sémantique a priorité sur le stricte accord de classe.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Asuloa fi", "Il / elle pêche des poissons", "(Classe 1)"],
            ["Mulozi asuloa fi", "Le pêcheur (il) prend des\n poissons", ""],
            ["Wasuasili", "Ils / elles arrivent", "(Classe 2)"],
            ["Wanatsa wasuasili", "Les enfants (ils) arrivent", ""],
            ["Afu", "Il / elle est morte", "(Classe 1)"],
            ["Ɓaɓa afu", "Papa (il) est mort", ""],
            ["Ifu", "Il / elle est morte", "(Classe 9)"],
            ["Imbuzi ifu", "La chèvre (elle) est morte", ""],
            ["Zifu", "Ils / elles sont mortes", "(Classe 10)"],
            ["Zimbuzi zifu", "Les chèvres sont mortes", ""],
            ["Isulawa", "Il / elle part", "(Classe 9)"],
            ["Barji isulawa", "La barge (elle) part", ""],
            ["Yasulawa", "Ils / elles démarrent", "(Classe 6)"],
            ["Magari yasulawa", "Les voitures (elles) démarrent", ""],
          ],
        },
      },
      {
        type: "text",
        value: "4. LES INDICES PRONOMS SUJETS NEGATIFS :",
      },
      {
        type: "text",
        value:
          "Ceux-ci résultent de la combinaison du pré-préfixe négatif KA- et de l'indice pronom sujet, à l'exception de la 1ère personne du singulier, qui utilise un indice pronom spécifique (probablement emprunté au malgache).",
      },
      {
        type: "table",
        value: {
          header: [
            "Personne",
            "Singulier",
            "Equivalent",
            "Pluriel",
            "Equivalent",
          ],
          rows: [
            [],
            ["1ère personne", "TSI-", "= je ne", "KARI-", "= nous ne"],
            ["2ème personne", "KU-", "= tu ne", "KAMU-", "= vous ne"],
            [
              "3ème personne",
              "KA-",
              "= il / elle ne",
              "KAWA-",
              "= ils / elles ne",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "5. LES INDICES D'ACCORDS DE CLASSE NEGATIFS :",
      },
      {
        type: "text",
        value:
          "Ceux-ci résultent de la combinaison du pré-préfixe négatif KA- et de l'indice d'accord de classe :",
      },
      {
        type: "table",
        value: {
          header: [
            "GENRES / Classes",
            "Singulier",
            "Equivalent",
            "Pluriel",
            "Equivalent",
          ],
          rows: [
            [],
            [
              "Genre MU-/WA- (Cl 1 /2 )",
              "KA-",
              "= il / elle ne",
              "KAWA-",
              "= ils / elles ne",
            ],
            [
              "Genre MU-/MI- (Cl 3 / 4)",
              "KAU-",
              "= il / elle ne",
              "KAI-",
              "= ils / elles ne",
            ],
            [
              "Genre MA- (Cl 5 / 6)",
              "KALI-",
              "= il / elle ne",
              "KAYA-",
              "= ils / elles ne",
            ],
            [
              "Genre SHI-/ZI- (Cl 7 / 8)",
              "KAI-",
              "= il / elle ne",
              "KAZI-",
              "= ils / elles ne",
            ],
            [
              "Genre N- (Cl 9 / 10)",
              "KAI-",
              "= il / elle ne",
              "KAZI-",
              "= ils / elles ne",
            ],
            ["Genre U- (Cl 11 / 14)", "KAU-", "= il / elle ne", ""],
            ["CLASSES LOCATIVES", "KAV̄U-", "= il / elle ne"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Tsiji", "Je ne sais pas", ""],
            ["Kaji", "Il / elle ne sait pas", "(Classe 1)"],
            ["Kaja", "Il / elle n'est pas venu", "(Classe 1)"],
            ["Kawaja", "Ils / elles ne sont pas venu(e)s", "(Classe 2)"],
            ["Kamulala", "Vous n'êtes pas couchés", ""],
            ["Kasufanya hazi", "Il / elle ne travaille pas", "(Classe 1)"],
            ["Hamadi kasufanya hazi", "Ahmed (il) ne travaille pas", ""],
            [
              "Shofera kasufanya hazi",
              "Le chauffeur (il) ne travaille pas",
              "(Classe 5 : Cl 1)",
            ],
            [
              "Kayasufanya hazi",
              "Ils / elles ne travaillent pas",
              "(Classe 6)",
            ],
            [
              "Mafundi kayasufanya hazi",
              "Les artisans (ils) ne travaillent pas",
              "(Classe 6)",
            ],
            ["Hazi kav̄u", "Il n'y a pas de travail", "(Classes Locatives)"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uazima", "prêter", "Ulola", "épouser (une femme)"],
            ["Uɗala", "oublier", "Upasi", "repasser"],
            ["Ufua (nguo)", "laver le linge", "Upiha", "faire la cuisine"],
            ["Uhosa (zia)", "laver la vaisselle", "Upindra", "s'habiller"],
            ["Uhundza", "balayer", "Upua", "enlever, arracher"],
            ["Ulindra", "attendre", "Uv̄angua", "essuyer (les assiettes)"],
          ],
        },
      },
    ],
  },
  {
    id: 7,
    title: "7 - Le Présent Actuel",
    description:
      "La conjuguaisons des verbes reste un peu complexe mais c'est ease.",
    content: [
      {
        type: "titre",
        value: "Chapitre 8 ",
      },
      {
        type: "text",
        value:
          "Le présent actuel en -SI- (ou -SU-) sert essentiellement à décrire des actions qui ont lieu au moment où l'on parle. Il est ancré dans l'instant présent et a la même valeur que le PRESENT CONTINUOUS en anglais. Il se traduit par le présent en français.",
      },
      {
        type: "text",
        value: "1. LA FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value: "Le verbe se construit de la façon suivante au présent actuel :",
      },
      {
        type: "text",
        value:
          "On retire la marque de l'infinitif (le préfixe U-) pour conjuguer le verbe. La marque du présent est l'infixe\n -SI- (ou -SU-) qui se place entre le préfixe sujet et le radical verbal.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "",
              "Il ne faut pas confondre l'infixe SI- ou SU- marque du présent avec le SI- de l'impératif négatif !",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "MODÈLE : UFANYA = faire",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["", "NI-SI-FANYA", "-> nisifanya", "je fais"],
            ["", "U-SI-FANYA", "-> usifanya", "tu fais"],
            [
              "(Classe 1, Singulier)",
              "A-SI-FANYA",
              "-> asifanya",
              "il / elle fait",
            ],
            ["", "RI-SI-FANYA", "-> risifanya", "nous faisons"],
            ["", "MU-SI-FANYA", "-> musifanya", "vous faites"],
            [
              "(Classe 2, Pluriel)",
              "WA-SI-FANYA",
              "-> wasifanya",
              "ils / elles font",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "REMARQUE :",
      },
      {
        type: "text",
        value:
          "Lorsque le radical verbal commence par une voyelle, il est fréquent que la voyelle de l'infixe de temps -SI- (ou -SU-) ne s'entende pas.",
      },
      {
        type: "text",
        value: "MODÈLE : UENDRA = aller",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["", "NI-S(I)-ENDRA", "-> nisendra", "je vais"],
            ["", "U-S(I)-ENDRA", "-> usendra", "tu vas"],
            [
              "(Classe 1, Singulier)",
              "A-S(I)-ENDRA",
              "-> asendra",
              "il / elle va",
            ],
            ["", "RI-S(I)-ENDRA", "-> risendra", "nous allons"],
            ["", "MU-S(I)-ENDRA", "-> musendra", "vous allez"],
            [
              "(Classe 2, Pluriel)",
              "WA-S(I)-ENDRA",
              "-> wasendra",
              "ils / elles vont",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "2. LA FORME NÉGATIVE :",
      },
      {
        type: "text",
        value:
          "La négation se forme en ajoutant le pré-préfixe négatif KA- devant le préfixe sujet, sauf à la première personne du singulier où l'on utilise le préfixe sujet négatif TSI-.",
      },
      {
        type: "text",
        value: "MODÈLE : UKIA = entendre",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["", "TSI-SI-KIA", "-> tsisikia", "je n'entends pas"],
            ["(KA+U) :", "KU-SI-KIA", "-> kusikia", "tu n'entends pas"],
            ["(KA+A) :", "KA-SI-KIA", "-> kasikia", "il / elle n'entend pas"],
            ["", "KA-RI-SI-KIA", "-> karisikia", "nous n'entendons pas"],
            ["", "KA-MU-SI-KIA", "-> kamusikia", "vous n'entendez pas"],
            ["", "KA-WA-SI-KIA", "-> kawasikia", "ils / elles n'entendent pas"],
          ],
        },
      },
      {
        type: "text",
        value: "3. QUELQUES PHRASES AU PRÉSENT ACTUEL :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Mama asiketsi", "Maman s'asseoit"],
            ["Uwandzani wasija", "Les amis arrivent"],
            ["Risikariɓisa uwadjeni", "Nous accueillons les invités"],
            ["Wana wasufurahi", "Les enfants se réjouissent"],
            ["Usitsaha fi ?", "Veux-tu du poisson ?"],
            [
              "Nisuona dza / nyora",
              "J'ai faim / soif (Je vois la faim / la soif)",
            ],
            ["Barji isija", "La barge arrive"],
            ["Vua isinya", "La pluie tombe"],
            ["Kawasija", "Ils / elles ne viennent pas"],
            ["Kaswona walozi", "Il ne voit pas les pêcheurs"],
            ["Kamusifanya hazi mwa ?", "Vous ne travaillez pas ?"],
            ["Karisifanya hazi", "Nous ne travaillons pas"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Lorsqu'on pose une question qui appelle une réponse par OUI ou par NON, on peut utiliser les mots AFA\n ou MWA ou SAV̄U pour renforcer l'intonation interrogative de la phrase.",
      },
      {
        type: "text",
        value:
          "AFA et SAV̄U se placent en début de phrase, tandis que MWA se place à la fin.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Usija ?", "Est-ce que tu viens ?"],
            ["Afa usija ?", "Alors, tu viens ?"],
            ["Sav̄u usija ?", "Et bien, tu viens ?"],
            ["Usija mwa ?", "Viens-tu donc ?"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Na", "et, avec", "au", "ou"],
            ["Lakini, ɓe", "mais", "Leo", "aujourd'hui"],
            ["Av̄asa", "maintenant", "Tsena", "encore, à nouveau"],
            ["Kula / kila", "chaque", "Swafi", "très, vivement"],
          ],
        },
      },
    ],
  },
  {
    id: 8,
    title: "8 - Le Genre MU-/MI-",
    description: "Maintenant on va découvrir deux nouveaux genres.",
    content: [
      {
        type: "text",
        value:
          "Le genre MU-/MI- (Classes 3 / 4) n'est pas aussi spécifique que le genre MU-/WA- (Classes 1 / 2).",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Attention",
              "Le genre MU-/MI- contient tous les noms d'arbres mais ne contient aucun nom d'êtres humains.",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "Outre les noms d'arbres, il contient aussi des noms d'objets usuels, d'aliments cuisinés, de parties du corps humain, de lieux construits, d'éléments de la nature, de repères temporels, etc..",
      },

      {
        type: "table",
        value: {
          header: [],
          rows: [["Cl 3 (Singulier) :", "préfixe MU-", "MUHONO", "= une main"]],
        },
      },
      {
        type: "text",
        value:
          "Comme pour le genre MU-/WA-, la voyelle U du préfixe de classe singulier MU- est très faiblement prononcée, ou même pas du tout. Nous avons cependant gardé cette voyelle en conformité avec les règles orthographiques de l'Association SHIME.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 4 (Pluriel) :", "préfixe MI-", "MIHONO", "= des mains"],
            ["A NOTER :"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 4 (Pluriel) :", "préfixe MI-", "MIHONO", "= des mains"],
            ["A NOTER :"],
            [
              "Devant une voyelle,",
              "le préfixe singulier MU- devient MW- :",
              "MWIRI",
              "= un arbre",
            ],
            ["", "Le préfixe pluriel MI- devient M- :", "MIRI", "= des arbres"],
          ],
        },
      },
      {
        type: "text",
        value: "1. QUELQUES NOMS DU GENRE MU-/MI- (Classes 3 / 4 ) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Muɓuyu", "Miɓuyu", "un baobab, des --"],
            ["Mufenesi", "Mifenesi", "un jaquier, des --"],
            ["Muframpe", "Miframpe", "un arbre à pain, des --"],
            ["Muhogo", "Mihogo", "le manioc, des --"],
            ["Mulimu", "Milimu", "un citronier, des --"],
            ["Mumanga", "Mimanga", "un manguier, des --"],
            ["Munadzi", "Minadzi", "un cocotier, des --"],
            ["Mupapaya", "Mipapaya", "un papayer, des --"],
            ["Murundra", "Mirundra", "un oranger, des --"],
            ["Muwa", "Miwa / Miha", "une canne à sucre, des --"],
            ["Mwiri", "Miri", "un arbre, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Muɓwa", "Miɓwa", "un os, des --"],
            ["Muhono", "Mihono", "une main, des --"],
            ["Mundru", "Mindru", "un pied, une jambe, des --"],
            ["Mushia", "Mishia", "une queue, des --"],
            ["Muvumo", "Mivumo", "une fesse, des --"],
            ["Mwili", "Mili", "un corps, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Muhare", "Mihare", "un gâteau, une galette, des --"],
            ["Muho", "Miho", "une rape à coco, des --"],
            ["Mukandra", "Mikandra", "une ceinture, des --"],
            ["Mukoɓa", "Mikoɓa", "un sac, des --"],
            ["Mulango", "Milango", "une porte, des --"],
            ["Mulingo", "Milingo", "une échelle, des --"],
            ["Mulizima", "Milizima", "un boubou, des --"],
            ["Mupira", "Mipira", "un tuyau, un plastique, des --"],
            ["Muswaki", "Miswaki", "une brosse à dent, des --"],
            ["Mutsuzi", "Mitsuzi", "une sauce, des --"],
            ["Mwitsi", "Mitsi", "un pilon, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Mukiri", "Mikiri", "une mosquée, des --"],
            ["Mulima", "Milima", "une colline, une montagne, des --"],
            ["Munara", "Minara", "un minaret, des --"],
            ["Mupaka", "Mipaka", "une frontière, une limite, des --"],
            ["Mura", "Mira", "un quartier, des --"],
            ["Muro", "Miro", "une rivière, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Moro", "Mero", "un feu, des --"],
            ["Mufumo", "Mifumo", "une semaine, des --"],
            ["Mukataba", "Mikataba", "un contrat, une promesse, des --"],
            ["Mupango", "Mipango", "un projet, des --"],
            ["Muraha", "Miraha", "un jeu de bao, des --"],
            ["Musafara", "Misafara", "un voyage, des --"],
            ["Mwaha", "Maha", "une année, des --"],
            ["Mwenge", "Menge", "l'électricité, une lumière, des --"],
            ["Mwesi", "Mesi", "une fumée, des --"],
            ["Mwezi", "Mezi", "un mois, la lune, des --"],
            ["Mwiso", "(pas de pluriel)", "la fin"],
          ],
        },
      },
      {
        type: "text",
        value: "Voir aussi les listes de vocabulaire complémentaires :",
      },
      {
        type: "text",
        value:
          "Cependant, de nombreux noms d'éléments naturels, de parties du corps humain, et de plantes, ne sont pas contenus dans ce genre.",
      },
      {
        type: "text",
        value: "2. LE PRÉ-PRÉFIXE DÉFINI :",
      },
      {
        type: "text",
        value:
          "Il se place devant le préfixe de classe du nom et fonctionne comme un article défini.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 1 (Singulier) :"],
            ["U-", "MWAHA", "= une année", "UMWAHA", "= l'année"],
            ["", "MUHONO", "= une main", "UMUHONO", "= la main"],
            [""],
            ["Cl 2 (Pluriel) :"],
            ["I-", "MAHA", "= des années", "IMAHA", "= les années"],
            ["", "MIHONO", "= des mains", "IMIHONO", "= les mains"],
          ],
        },
      },
      {
        type: "text",
        value: "3. ACCORDS DE CLASSE :",
      },
    ],
  },
  {
    id: 9,
    title: "9 - Le Présent Habituel",
    description:
      "Les habitudes sont présent dans notre quotidient alors de quoi il sagit",
    content: [
      {
        type: "text",
        value:
          "Ce temps sert à décrire des actions habituelles ou permanentes, ou à énoncer des vérités \"scientifiques\", qui ne se déroulent pas nécessairement au moment où l'on parle.\n L'emploi de ce temps correspond à celui du SIMPLE PRESENT en anglais. On le traduira en français par un présent.",
      },
      {
        type: "text",
        value: "1. FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value:
          "Le présent habituel se conjugue en utilisant les PRONOMS PERSONNELS AUTONOMES ou P.P.A., suivis du radical verbal préfixé par U- (forme identique à celle de l'infinitif du verbe).",
      },
      {
        type: "text",
        value:
          "A la 3ème personne du singulier et du pluriel, un nom sujet peut se substituer au P.P.A.",
      },
      {
        type: "text",
        value: "MODÈLE : USOMA = lire",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["WAMI", "USOMA", "je lis"],
            ["WAWE", "USOMA", "tu lis"],
            ["WAYE", "USOMA", "il /elle lit"],
            ["WASI", "USOMA", "nous lisons"],
            ["WANYU", "USOMA", "vous lisez"],
            ["WAWO", "USOMA", "ils / elles lisent"],
          ],
        },
      },
      {
        type: "text",
        value: "2. FORME NÉGATIVE :",
      },
      {
        type: "text",
        value:
          "Le présent habituel négatif se conjugue en utilisant les P.P.A. suivis des préfixes sujets négatifs du présent actuel liés à la racine verbale. La voyelle finale -A se change en -E, -I, -0, -U par harmonie vocalique avec la voyelle précédente. (Voir : Chapitre 14.)",
      },
      {
        type: "text",
        value: "MODÈLE:USOMA = lire",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["WAMI", "TSISOMO", "je ne lis pas"],
            ["WAWE", "KUSOMO", "tu ne lis pas"],
            ["WAYE", "KASOMO", "il /elle ne lit pas"],
            ["WASI", "KARISOMO", "nous ne lisons pas"],
            ["WANYU", "KAMUSOMO", "vous ne lisez pas"],
            ["WAWO", "KAWASOMO", "ils / elles ne lisent pas"],
          ],
        },
      },
      {
        type: "text",
        value: "ATTENTION :",
      },
      {
        type: "text",
        value:
          "Il existe un risque de confusion entre la 1ère personne du singulier du présent habituel et la 1ère personne du singulier de l'accompli affirmatif, qui ont une forme identique :",
      },
      {
        type: "text",
        value: "3. QUELQUES PHRASES AU PRÉSENT HABITUEL :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1. Wawe ufanya hazi trini ?", "Quel travail fais-tu ?"],
            ["2. Wami usomedza", "J'enseigne"],
            ["3. Wami uhimba", "Je chante"],
            ["4. Waye upiha", "Elle fait la cuisine"],
            [
              "5. Wasi ununua tsohole kula suku",
              "Nous achetons du riz tous les jours",
            ],
            ["6. Waye uhiriwa Ali", "Il s'appelle Ali"],
            ["7. Watru ulala uku", "Les gens dorment la nuit"],
            ["8. Nyombe ula ɗavu", "Le bœuf mange de l'herbe"],
            ["9. Nyoha uriya moro", "Le serpent craint le feu"],
            ["10. Wawo uriya uku", "Ils / elles ont peur de la nuit"],
            ["11. Watru mama uv̄endza ulagua", "Les femmes aiment bavarder"],
            ["12. Wawe kuono", "Tu ne vois pas"],
            ["13. Mama kapihi", "Maman ne fait pas la cuisine"],
            [
              "14. Kali, kano, kalala",
              "Il ne mange pas, il ne boit pas, il ne dort pas",
            ],
            ["15. Tsiji", "Je ne sais pas"],
            ["16. Wasi kariv̄endza ulima", "Nous n'aimons pas cultiver"],
            ["(Wasi kariv̄endzolima)", ""],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uheya", "monter", "Uriya", "craindre, avoir peur de"],
            ["Uhimba", "chanter", "Usomedza", "enseigner"],
            ["Uhiriwa", "s'appeler", "Utoa", "retirer, enlever"],
            ["Uhoa", "se laver", "Utosha", "suffire, être suffisant"],
            ["Ukuɓali", "être d'accord", "Utsahua", "choisir"],
            ["Ulima", "cultiver", "Uv̄ulikia", "écouter, obéir"],
          ],
        },
      },
      {
        type: "text",
        value: "EXERCICE 1 : Traduisez en shimaore, au présent habituel :",
      },
    ],
  },
  {
    id: 10,
    title: "10 - Les Adjectifs Accordables",
    description:
      "Décrire un objet, une personne on ne peut se passer de l'incontournable adjectif.",
    content: [
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "⚠",
              "En shimaore, l'adjectif se place toujours APRÈS le nom qu'il qualifie.",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "⚠",
              "On distingue deux grandes catégories d'adjectifs :\n \n Ceux qui prennent un préfixe de classe pour s'accorder avec le nom qu'ils qualifient.\n Ceux qui restent invariables : ce sont pour la plupart des mots d'emprunt à l'arabe.",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "Nous commencerons par l'étude des adjectifs qui s'accordent.",
      },
      {
        type: "text",
        value:
          "Les préfixes d'accord des adjectifs sont identiques aux préfixes nominaux pour les classes 1/2, les classes\n 3/4 et la classe 6. Ils présentent des différences importantes aux autres classes.",
      },
      {
        type: "text",
        value:
          "Afin de faciliter leur mémorisation, nous avons choisi de diviser les adjectifs en 8 grands types, selon\n leurs préfixes en classe 5 (genre MA-) et aux classes 7 + 9 / 8 + 10 (genres SHI-/ZI- et N-).",
      },
      {
        type: "text",
        value:
          "Nous présentons en même temps les formes d'usage les plus courants pour chaque adjectif.",
      },
      {
        type: "text",
        value: "1. ADJECTIFS ACCORDABLES REGROUPÉS PAR TYPES :",
      },
      {
        type: "table",
        value: {
          header: ["Type 1", "MU-/WA- MU-/MI- Ø-/MA- Ø-/Ø-"],
          rows: [
            [],
            ["-ɓole", "grand", "muɓole, waɓole, miɓole, maɓole, ɓole", ""],
            ["-hodari", "fort, intelligent", "muhodari, wahodari", ""],
            ["-kutri", "court", "mukutri, wakutri, kutri", ""],
            ["-nono", "sain", "munono, wanono", ""],
            ["-shashi", "peu, rare", "washashi, shashi", ""],
            ["-titi", "petit", "mutiti, watiti, mititi, matiti, titi", ""],
            ["-tronga", "gros, gras", "mutronga, watronga, tronga", ""],
            ["-tsala", "mince", "mutsala, watsala, tsala", ""],
            [""],
            ["-kali", "fort, sévère", "muhali, wahali, kali", "K -> voy -H"],
            ["-kavu", "sec", "mahavu, kavu", "K -> voy -H"],
            ["-kuu", "grand, âgé", "muhuu, wahuu, kuu", "K -> voy -H"],
            [""],
            [
              "-trahafu",
              "propre",
              "murahafu, warahafu, mirahafu, trahafu",
              "Tr -> voy -R",
            ],
            [
              "-trembwavu",
              "mou, tendre",
              "murembwavu, trembwavu",
              "Tr -> voy -R",
            ],
            ["-trupu", "vide, pur", "marupu, trupu", "Tr -> voy -R"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Type 2", "MU-/WA- MU-/MI- Ø-/MA- M-/M-"],
          rows: [
            [],
            ["-pana", "large", "muv̄ana, pana, mav̄ana, mpana", "P -> voy -v̄"],
            [
              "-pia",
              "neuf, nouveau",
              "muv̄ia, miv̄ia, pia, mav̄ia, mpia",
              "P -> voy -v̄",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Type 3", "MU-/WA- MU-/MI- DZI-/MA- NDZ-/NDZ-"],
          rows: [
            [],
            ["(a) NDZA-"],
            [
              "-ambamba",
              "mince, étroit",
              "mwambamba, wambamba, ndzambamba",
              "",
            ],
            ["-angavu", "dur", "mwangavu, dzangavu, mangavu, ndzangavu"],
            ["-angu", "léger, facile", "mwangu, dzangu, ndzangu/nyangu", ""],
            ["(b) NDZI-"],
            ["-djeni", "étranger", "mudjeni, wadjeni, dzidjeni, ndzidjeni", ""],
            ["-ɗu", "noir", "muɗu, waɗu, miɗu, dziɗu, ndziɗu", ""],
            ["-she", "femelle", "mushe, washe, dzishe, ndzishe", ""],
            ["-waɗe", "malade", "mwaɗe, dziwaɗe, ndziwaɗe", ""],
            ["(c) NDZU-"],
            ["-kundru", "rouge", "mukundru, dzukundru, ndzukundru", ""],
            [
              "-zuri",
              "beau, joli, bon",
              "muzuri, wazuri, dzuzuri, ndzuzuri",
              "",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Type 4", "MU-/WA- MU-/MI- (ɗ)-/MA- N-/N-"],
          rows: [
            [],
            ["-dzima", "entier", "mudzima, dzima, ndzima", ""],
            ["-dziro", "lourd, difficile", "mudziro, dziro, ndziro", ""],
            ["-undra", "long, profond", "mundra, ɗundra, nundra", ""],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Type 5", "MU-/WA- MU-/MI- ɗ-/MA- NDR-/NDR-"],
          rows: [
            [],
            ["-le", "long", "mule, ɗile, male, ndrile", ""],
            ["-ume", "mâle", "mume, wame, ɗume, ndrume", ""],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Type 6", "MU-/WA- MU-/MI- DJI-/MA- NDJ-/NDJ-"],
          rows: [
            [],
            ["-ema", "bon, gentil", "mwema, wema, djema, mema, ndjema", ""],
            ["-eu", "blanc", "mweu, weu, djeu, meu, ndjeu", ""],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Type 7", "MU-/WA- MU-/MI- ɓ-/MA- MB-/MB-"],
          rows: [
            [],
            ["-i", "mauvais", "mui, wai, mii, ɓi, mai, mbi", ""],
            ["-itsi", "vert, non mûr", "muitsi, ɓitsi, maitsi, mbitsi", ""],
            ["-ovu", "mal, mauvais", "muovu, ɓovu, maovu, mbovu", ""],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Type 8", "/WA- MW-/M- /MA- /NY-"],
          rows: [[], ["-engi", "nombreux", "wengi, mwengi, mengi, nyengi", ""]],
        },
      },
      {
        type: "text",
        value: "2. QUELQUES EXEMPLES D'EMPLOI :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Mwana mutiti",
              "un petit enfant",
              "Wana watiti",
              "des petits enfants",
            ],
            [
              "Mutru muzuri",
              "une belle personne",
              "Watru wazuri",
              "des belles personnes",
            ],
            [
              "Mutru mwaɗe",
              "une personne malade",
              "Watru wa(w)aɗe",
              "des personnes malades",
            ],
            [
              "Mwaha mwema",
              "une bonne année",
              "Maha mema",
              "des bonnes années",
            ],
            [
              "Mwiri muɓole",
              "un grand arbre",
              "Miri miɓole",
              "des grands arbres",
            ],
            [
              "Gari pia",
              "une nouvelle voiture",
              "Magari mav̄ia",
              "des nouvelles voitures",
            ],
            [
              "Shiri ndzukundru",
              "une chaise rouge",
              "Ziri ndzukundru",
              "des chaises rouges",
            ],
            [
              "Inguo ndjeu",
              "le vêtement blanc",
              "Zinguo njeu",
              "les vêtements blancs",
            ],
            [
              "Manga kali",
              "une mangue acide",
              "Zimanga kali",
              "les mangues acides",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "3. UN ADJECTIF / PRONOM PARTICULIER :",
      },
      {
        type: "text",
        value: "ANGINA = un autre, une autre, d'autres",
      },
      {
        type: "text",
        value:
          "Ce mot, à la fois adjectif et pronom, utilise les mêmes préfixes d'accord de classe que les adjectifs possessifs et que le connectif -A. (Voir : Chapitre 29.)",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Mutru wangina",
              "une autre personne",
              "Watru wangina",
              "d'autres personnes",
            ],
            [
              "Muhono wangina",
              "une autre main",
              "Mihono yangina",
              "d'autres mains",
            ],
            [
              "Gari langina",
              "une autre voiture",
              "Magari yangina",
              "d'autres voitures",
            ],
            [
              "Shiri yangina",
              "une autre chaise",
              "Ziri zangina",
              "d'autres chaises",
            ],
            [
              "Nguo yangina",
              "un autre vêtement",
              "Nguo zangina",
              "d'autres vêtements",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1. Mama asununua mukoɓa wangina.", "Maman achète un autre sac."],
            [
              "2. Fanya hazi ha namna yangina !",
              "Travaille d'une autre façon.",
            ],
            [
              "3. Ritsowonana suku yangina tsena.",
              "Nous nous reverrons un autre jour.",
            ],
            ["4. Waye apara gari langina.", "Il a une autre voiture."],
            [
              "5. Risutsaha mihare, muhogo,",
              "Nous voulons des gâteaux, du manioc, etc..",
            ],
            ["na zangina na zangina...", ""],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Mubushi, wa-", "un Malgache", "Mulamo, wa-", "un gourmand"],
            ["Mudjanja, wa-", "un malin", "Mulevi, wa-", "un ivrogne"],
            [
              "Mudzade, wa",
              "une parturiente",
              "Mutoro, wa-",
              "un fuyard, sauvage",
            ],
            [
              "Muhimbizi, wa-",
              "un chanteur",
              "Mutrazi, wa-",
              "enfant qui fait l'école\n buissonnière",
            ],
            ["Mukaidi, wa-", "un têtu", "Mutrume, wa-", "un envoyé de Dieu"],
            ["Mulaguzi, wa-", "un bavard", "Muzinzi, wa-", "un dragueur"],
          ],
        },
      },
    ],
  },
  {
    id: 11,
    title: "11 - Les Adjectifs Invariables",
    description: "On va encore manger des adjectifs ",
    content: [
      {
        type: "text",
        value:
          "Les adjectifs invariables sont pour la plupart empruntés à l'arabe, ou plus rarement au français. Comme les adjectifs qui s'accordent, ils se placent toujours APRÈS le nom. Certains peuvent être à la fois nom et adjectif. C'est le cas de maskini = pauvre et de tadjiri (ma-) = riche(s).",
      },
      {
        type: "text",
        value: "1. ADJECTIFS INVARIABLES LES PLUS COURANTS :",
      },
      {
        type: "table",
        value: {
          header: ["ADJECTIF", "TRADUCTION", "ADJECTIF", "TRADUCTION"],
          rows: [
            [],
            ["Bile", "bleu", "Laini", "lisse, doux"],
            ["Ɓombo", "délabré, usé", "Maskini", "pauvre"],
            ["Ɓora / Ɓorwa", "meilleur", "Muhimu", "important"],
            ["Ɓure", "gratuit", "Piya", "tous, toutes"],
            ["Dzindzano", "jaune (safran)", "Rahisi", "bon marché, pas cher"],
            ["Fenyã", "fainéant", "Rasmi", "officiel"],
            [
              "Halali",
              "permis, légitime, pur",
              "Sawa",
              "pareil, égal, identique",
            ],
            ["Hali", "cher", "Shinamna", "mal, bizarre"],
            ["Haramu", "interdit, illicite, illégitime", "Shwari", "calme"],
            ["Hashiri", "vigilant", "Tadjiri (ma-)", "riche"],
            ["Hayi", "vivant", "Tayari", "prêt"],
            ["Kadha", "quelconque", "Veri", "vert"],
            ["Kamili", "complet, entier", "Wadzi", "nu, ouvert"],
            ["Kweli", "vrai", "Weke", "seul"],
          ],
        },
      },
      {
        type: "text",
        value: "2. QUELQUES EXEMPLES D'EMPLOI :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Mutru tadjiri",
              "une riche personne",
              "Watru matadjiri",
              "des riches personnes",
            ],
            [
              "Mwana maskini",
              "un enfant pauvre",
              "Wana maskini",
              "des enfants pauvres",
            ],
            [
              "Mukoɓa rahisi",
              "un sac bon marché",
              "Mikoɓa rahisi",
              "des sacs bon marché",
            ],
            [
              "Gari ɓombo",
              "une voiture usée",
              "Magari ɓombo",
              "des voitures usées",
            ],
            [
              "Shitru muhimu",
              "une chose importante",
              "Zitru muhimu",
              "des choses importantes",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 12,
    title: "12 - Le Genre MA-",
    description: "Surtout utiliser pour le pluriel des objets",
    content: [
      {
        type: "text",
        value:
          "Le genre MA- (Classes 5 / 6) regroupe des termes de parenté, des noms d'objets, d'animaux, de parties du corps humain, de fruits, etc..\n Ce sont souvent des noms d'emprunt, particulièrement d'origine arabe.",
      },
      {
        type: "text",
        value:
          'Nous avons préféré nommer ce genre "MA-", plutôt que de le nommer DZI-/MA-, car seul un très petit nombre de noms de la classe 5 prennent le préfixe singulier DZI-.',
      },
      {
        type: "text",
        value:
          'La majorité des noms de la classe 5 n\'ont pas de préfixe, aussi les avons-nous regroupés sous le label\n préfixe "Ø-".',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Cl 5 (Singulier) :",
              "préfixe Ø-",
              "GARI",
              "= une voiture, la voiture",
            ],
            ["", "préfixe DZI-", "DZINYO", "= une dent, la dent"],
            [
              "Cl 6 (Pluriel) :",
              "préfixe MA-",
              "MAGARI",
              "= des voitures, les voitures",
            ],
            ["", "MANYO", "= des dents, les dents"],
          ],
        },
      },
      {
        type: "text",
        value: "1. QUELQUES NOMS DU GENRE MA- (Classes 5 / 6) :",
      },
      {
        type: "table",
        value: {
          header: ["Nom", "Traduction", "Nom", "Traduction"],
          rows: [
            [],
            [
              "Ɓarua, (ma-)",
              "une lettre, des --",
              "Gari, (ma-)",
              "une voiture, des --",
            ],
            [
              "Ɓawa, (ma-)",
              "une aile, des --",
              "Godoro, (ma-)",
              "un matelas, des --",
            ],
            [
              "Ɓega, (ma-)",
              "une épaule, des --",
              "Goshi, (ma-)",
              "une chaussure, des --",
            ],
            [
              "Ɓele, (ma-)",
              "un sein, des --",
              "Guni, (ma-)",
              "un sac de jute, des --",
            ],
            [
              "Ɓuledi, (ma-)",
              "une petite amie, des --",
              "Jwayi, (ma-)",
              "un œuf, des --",
            ],
            [
              "Djini, (ma-)",
              "un djinn, des --",
              "Karatasi, (ma-)",
              "un papier, une carte, des --",
            ],
            [
              "Djirani, (ma-)",
              "un voisin, des --",
              "Kio, (ma-)",
              "une oreille, des --",
            ],
            [
              "Duka, (ma-)",
              "une boutique, des --",
              "Shauri, (ma-)",
              "un avis, des --",
            ],
            [
              "Fuko, (ma-)",
              "une chambre, des --",
              "Surwali, (ma-)",
              "un pantalon, des --",
            ],
            [
              "Fulera, (ma-)",
              "une fleur, des --",
              "Tadjiri, (ma-)",
              "un riche, des --",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "2. NOMS A PRÉFIXE DZI- AU SINGULIER (Classes 5 / 6) :",
      },
      {
        type: "table",
        value: {
          header: ["Nom", "Traduction", "Nom", "Traduction"],
          rows: [
            [],
            [
              "Dzia (CL 5)",
              "le lait / un lac",
              "Dzinyo, manyo",
              "une dent, des --",
            ],
            [
              "Dziani Dzaha",
              "le lac du volcan",
              "Dzitso, matso",
              "un œil, des yeux",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "3. NOMS QUI N'EXISTENT QU'AU PLURIEL (Classe 6) :",
      },
      {
        type: "table",
        value: {
          header: ["Nom", "Traduction", "Nom", "Traduction"],
          rows: [
            [],
            ["Madzi", "les excréments", "Marashi", "un parfum"],
            ["Maesha", "la vie", "Mashaka", "les soucis, les malheurs"],
            ["Maji", "l'eau", "Masiwa", "un archipel"],
            ["Maradhi", "la maladie", "Matra", "l'huile"],
          ],
        },
      },
      {
        type: "text",
        value: "4. NOMS À ALTERNANCE CONSONANTIQUE AU PLURIEL :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["ɗaɓa", "malaɓa", "un sot, un idiot, des --"],
            ["ɗago", "malago", "une ville, un village, une maison, des --"],
            ["ɗalao", "malalao", "un remède, un médicament, des --"],
            ["ɗandzi", "malandzi", "une mandarine, des --"],
            ["ɗangadzo", "malangadzo", "un jeu, un match, des --"],
            ["ɗavu", "malavu", "une herbe, des --"],
            ["ɗomo", "malomo", "une lèvre, des --"],
            ["ɗundri", "manundri", "un moustique, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["kaa", "mahaa", "une braise, des --"],
            ["kaɓuri", "mahaɓuri", "une tombe, des --"],
            ["kafiri", "mahafiri", "un incroyant, des --"],
            ["kara", "mahara", "un nid, des --"],
            ["kofu", "mahofu", "une griffe, un ongle, des --"],
            ["koko", "mahoko ou makoko", "une grand-mère, une veuve, des --"],
            ["kosa", "mahosa", "une faute, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["paja", "mav̄aja", "une cuisse, des --"],
            ["pare", "mav̄are", "une route, des --"],
            ["peo", "mav̄eo", "un balai, des --"],
            ["polisi", "mav̄olisi", "un policier, des --"],
            ["puhu", "mav̄uhu", "une souris, un rat, des --"],
            ["puruku", "mav̄uruku", "un porc, des --"],
            ["puzi", "mav̄uzi", "un poil, une plume, des --"],
            ["pwapwaya", "mav̄wav̄waya", "une papaye, des --"],
            ["pwera", "mav̄wera", "une goyave, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["trango", "marango", "une citrouille, des --"],
            ["trindri", "marindri", "un bananier, des --"],
            ["trumbo", "marumbo", "un estomac, un intestin, des --"],
            ["trundra", "marundra", "un fruit, une orange, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Shahidi", "mazahidi", "un témoin, des --"],
            ["Shefu", "mazefu", "un chef, des --"],
            ["Shemedji", "mazemedji", "un beau-frère, une belle-sœur, des --"],
            ["Shofera", "mazofera", "un chauffeur, des --"],
          ],
        },
      },
      {
        type: "text",
        value: "Voir aussi les listes de vocabulaire complémentaires :",
      },
      {
        type: "text",
        value: "5. LE PRÉ-PRÉFIXE DÉFINI :",
      },
      {
        type: "text",
        value:
          "Il se place devant le préfixe de classe du nom et fonctionne comme un article défini.",
      },
      {
        type: "text",
        value: "Cl 5 (Singulier) :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["LI-", "GARI", "= une voiture", "LIGARI", "= la voiture"],
            ["", "DZINYO", "= une dent", "LIDZINYO", "= la dent"],
          ],
        },
      },
      {
        type: "text",
        value: "Cl 6 (Pluriel) :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["YA-", "MAGARI", "= des voitures", "YAMAGARI", "= les voitures"],
            ["", "MANYO", "= des dents", "YAMANYO", "= les dents"],
          ],
        },
      },
      {
        type: "text",
        value: "6. ACCORDS DE CLASSE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uangiha", "écrire", "Ushia", "traverser"],
            ["Uhasiɓu", "compter", "Usona", "coudre"],
            ["Uhoma", "être en retard", "Usuɓutu", "oser"],
            ["Ulemewa", "être fatigué", "Utayarisha", "préparer"],
            ["Ungia", "entrer, pénétrer", "Uvumua", "se reposer"],
            ["Ushanga", "être étonné, inquiet", "Uwaha", "construire"],
          ],
        },
      },
    ],
  },
  {
    id: 13,
    title: "13 - L'Accompli",
    description: "On va voir les actions passer dans le temps",
    content: [
      {
        type: "text",
        value: "Quelques exemples :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Kamali afungu mbuzi yahe", "Kamal a attaché sa chèvre"],
            ["Bakoko afu lavioni", "Grand-père est mort en avion"],
            ["Ali ali manga", "Ali a mangé une mangue"],
            ["Hafez kaketsi shirini", "Hafez n'est pas assis sur la chaise"],
            ["Fatima kaɓala mulango", "Fatima n'a pas fermé la porte"],
            ["Shamu kaja hatru", "Chamou n'est pas venu chez moi"],
          ],
        },
      },
      {
        type: "text",
        value:
          "On utilise l'ACCOMPLI pour parler des actions ponctuelles qui ont déjà eu lieu, ou pour décrire un état\n (par exemple : il est assis, il est mort, etc..). C'est l'un des temps les plus employés en shimaore.",
      },
      {
        type: "text",
        value: "1. L'ACCOMPLI - FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value:
          "Sa conjugaison est des plus simples car il n'y a pas d'infixe marqueur de temps : le préfixe sujet est directement suivi de la racine verbale :",
      },
      {
        type: "text",
        value: "MODÈLE : UREMA = frapper",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["TSI-REME", "= tsireme", "j'ai frappé"],
            ["U-REME", "= ureme", "tu as frappé"],
            ["A-REME", "= areme", "il / elle a frappé"],
            ["RI-REME", "= rireme", "nous avons frappé"],
            ["MU-REME", "= mureme", "vous avez frappé"],
            ["WA-REME", "= wareme", "ils / elles ont frappé"],
          ],
        },
      },
      {
        type: "text",
        value: "REMARQUE :",
      },
      {
        type: "text",
        value:
          "A l'accompli, la voyelle finale de la racine verbale change, c'est-à-dire que la terminaison -A du verbe devient -E, -I, -O, -U, par harmonie vocalique avec la voyelle précédente.",
      },
      {
        type: "text",
        value: "Autres verbes :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Uendra",
              "aller",
              "tsiendre",
              "= je suis allé",
              "aendre",
              "= il est allé",
            ],
            [
              "Urenga",
              "prendre",
              "tsirenge",
              "= j'ai pris",
              "arenge",
              "= il a pris",
            ],
            [
              "Uliv̄a",
              "payer",
              "tsiliv̄i",
              "= j'ai payé",
              "aliv̄i",
              "= il a payé",
            ],
            [
              "Upiha",
              "cuisiner",
              "tsipihi",
              "= j'ai cuisiné",
              "apihi",
              "= il a cuisiné",
            ],
            [
              "Uola",
              "pourrir",
              "iolo",
              "= il est pourri",
              "ziolo",
              "= ils sont pourris",
            ],
            [
              "Usoma",
              "apprendre",
              "tsisomo",
              "= j'ai appris",
              "asomo",
              "= il a appris",
            ],
            [
              "Uɗunga",
              "suivre",
              "tsiɗungu",
              "= j'ai suivi",
              "aɗungu",
              "= il a suivi",
            ],
            ["Uwula", "tuer", "tsiwulu", "= j'ai tué", "awulu", "= il a tué"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Cependant, les verbes de 3 syllabes et les verbes dont l'avant-dernière voyelle est -A- restent inchangés !",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Ufanya",
              "faire",
              "tsifanya",
              "= j'ai fait",
              "afanya",
              "= il a fait",
            ],
            [
              "Utsaha",
              "vouloir",
              "tsitsaha",
              "= j'ai voulu",
              "atsaha",
              "= il a voulu",
            ],
            [
              "Urav̄iha",
              "vomir",
              "tsirav̄iha",
              "= j'ai vomi",
              "arav̄iha",
              "= il a vomi",
            ],
            [
              "Urongoa",
              "parler",
              "tsirongoa",
              "= j'ai parlé",
              "arongoa",
              "= il a parlé",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXCEPTIONS :LES VERBES MONOSYLLABIQUES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Ufa",
              "mourir",
              "tsifu",
              "= je suis mort",
              "afu",
              "= il / elle est mort(e)",
            ],
            [
              "Uja",
              "venir",
              "tsija",
              "= je suis venu",
              "aja",
              "= il / elle est venu(e)",
            ],
            [
              "Ulaa",
              "venir de",
              "tsila",
              "= je viens de",
              "ala",
              "= il / elle vient de",
            ],
            [
              "Ula / Uɗya",
              "manger",
              "tsili",
              "= j'ai mangé",
              "ali",
              "= il / elle a mangé",
            ],
            ["Unwa", "boire", "tsino", "= j'ai bu", "ano", "= il / elle a bu"],
            [
              "Uwa",
              "tomber",
              "tsiwu",
              "= je suis tombé",
              "awu",
              "= il / elle est tombé(e)",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "Voir aussi : Liste des verbes à l'Accompli.",
      },
      {
        type: "text",
        value: "2. L'ACCOMPLI - FORME NÉGATIVE :",
      },
      {
        type: "text",
        value: "MODÈLE : UREMA = frapper",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["TSI-A-REMA", "= tsarema", "je n'ai pas frappé"],
            ["KA-U-A-REMA", "= kwarema", "tu n'as pas frappé"],
            ["KA-A-A-REMA", "= karema", "il / elle n'a pas frappé"],
            ["KA-RI-A-REMA", "= kararema", "nous n'avons pas frappé"],
            ["KA-MU-A-REMA", "= kamwarema", "vous n'avez pas frappé"],
            ["KA-WA-A-REMA", "= kawarema", "ils / elles n'ont pas frappé"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "",
              "A la forme négative, la voyelle finale du verbe reste inchangée.",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "Autres verbes :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uendra", "aller", "tsaendra", "= je ne suis pas allé"],
            ["Urenga", "prendre", "tsarenga", "= je n'ai pas pris"],
            ["Uliv̄a", "payer", "tsaliv̄a", "= je n'ai pas payé"],
            ["Upiha", "cuisiner", "tsapiha", "= je n'ai pas cuisiné"],
            ["Ula", "manger", "tsala", "= je n'ai pas mangé"],
            ["Unwa", "boire", "tsanwa", "= je n'ai pas bu"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uɗunga", "suivre", "Usukuma", "pousser (qq chose ou qq'un)"],
            ["Ujadza", "remplir", "Utembeya", "se promener"],
            [
              "Ukiri",
              "accepter, être possible",
              "Utruliya",
              "se calmer, être tranquille",
            ],
            ["Upashia", "monter, s'embarquer", "Uv̄idza", "aider"],
            ["Ushuka", "descendre", "Uv̄ima", "mesurer, peser"],
            [
              "Usimamia",
              "se dépêcher, se hâter",
              "Uvinga",
              "apporter, emmener, porter",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ha ɓaɓangu", "chez mon père", "Ha ɓaɓatru", "chez notre père"],
            ["Ha ɓaɓaho", "chez ton père", "Ha ɓaɓanyu", "chez votre père"],
            ["Ha ɓaɓahe", "chez son père", "Ha ɓaɓawo", "chez leur père"],
          ],
        },
      },
    ],
  },
  {
    id: 14,
    title: "14 - Les Démonstratifs",
    description:
      "Similaire aux adjectifs les démonstratifs sont indispensables",
    content: [
      {
        type: "text",
        value: "Il y a trois sortes de démonstratifs en shimaore :",
      },
      {
        type: "text",
        value:
          "En shimaore, on ne fait pas de distinction entre l'adjectif et le pronom démonstratif.\n Qu'il soit adjectif ou pronom, le démonstratif s'accorde au nom auquel il se rapporte.\n Le préfixe d'accord utilisé est identique au pré-préfixe défini du nom, sauf en Classe 2 où il est identique au préfixe nominal WA-.",
      },
      {
        type: "table",
        value: {
          header: [
            "CLASSES / NOMS",
            "DÉMONSTRATIFS",
            "PROXIMITÉ",
            "DISTANCE",
            "RÉFÉRENCE",
          ],
          rows: [
            [],
            [],
            [
              "Classe 1 Classe 2",
              "Mutru Watru",
              "UNU\n WANU",
              "ULE\n WALE",
              "UWO\n WAWO",
            ],
            [
              "Classe 3 Classe 4",
              "Muhono Mihono",
              "UNU\n INI",
              "ULE\n ILE",
              "UWO\n IYO",
            ],
            [
              "Classe 5 Classe 6",
              "Gari Magari",
              "LINI\n YANU",
              "LILE\n YALE",
              "LILO\n YAYO",
            ],
            [
              "Classe 7 Classe 8",
              "Shiri Ziri",
              "INI\n ZINI",
              "ILE\n ZILE",
              "IYO\n ZIZO (IZO)",
            ],
            [
              "Classe 9Classe 10",
              "Nguo Nguo",
              "INI\n ZINI",
              "ILE\n ZILE",
              "IYO\n ZIZO (IZO)",
            ],
            [
              "Classe 11",
              "Uku",
              "UNU\n (Pluriel en accord",
              "ULE\n avec la classe du",
              "UWO\n nom au pluriel)",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "L'adjectif démonstratif se place toujours APRÈS le nom, et après l'adjectif qualificatif lorsque le nom qu'il détermine est déjà suivi d'un adjectif.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Mwana unu",
              "cet enfant-ci",
              "Mwana muzuri unu",
              "ce bel enfant-ci",
            ],
            [
              "Mwana ule",
              "cet enfant-là",
              "Mwana mutiti ule",
              "ce petit enfant-là",
            ],
            [
              "Wana wale",
              "ces enfants-là",
              "Wana watiti wale",
              "ces beaux enfants-là",
            ],
            [
              "Wana wawo",
              "ces enfants-là",
              "Wana wazuri waili wawo",
              "ces deux beaux enfants",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "NOTE :",
      },
      {
        type: "text",
        value:
          "On modifie le sens de la phrase en plaçant l'adjectif qualificatif après l'adjectif\n démonstratif. Comparez les phrases suivantes :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Mwana muzuri unu",
              "ce bel enfant",
              "Mwana unu muzuri",
              "cet enfant est beau",
            ],
            [
              "Wana watiti wale",
              "ces petits enfants",
              "Wana wale watiti",
              "Ces enfants sont petits",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "(Voir à ce sujet : Chapitre 17, B.)",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Muda, mi-",
              "un moment, des --",
              "Mushakiki, mi-",
              "une brochette, des --",
            ],
            [
              "Mudila, mi-",
              "une bouilloire, des --",
              "Mushumari, miz-",
              "un clou, des --",
            ],
            [
              "Mudzo, mi-",
              "un bagage, des --",
              "Musomo, mi-",
              "une leçon, des --",
            ],
            [
              "Mufano, mi-",
              "un exemple, des --",
              "Mustakera, mi-",
              "une moustiquaire, des --",
            ],
            [
              "Musada, mi-",
              "une aide, des --",
              "Mustari, mi-",
              "un trait, une ligne, des --",
            ],
            [
              "Mushahara, mi-",
              "un salaire, des --",
              "Mutsolola, mi-",
              "un plat de bananes vertes",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 15,
    title: "15 Le Genre SHI-/ZI-",
    description:
      "Après cette partie on peut dire vous serrez un pro de la distinction du singulier/pluriel",
    content: [
      {
        type: "text",
        value:
          "Le genre SHI-/ZI- (Classes 7 / 8) regroupe des noms de parties du corps humain, des noms d'objets courants, et en classe 7 uniquement, les noms de langues.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "⚠",
              'Les êtres humains contenus dans le genre SHI-/ZI- sont des êtres "diminués"',
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 7 Singulier :", "préfixe SHI-", "SHIRI", "= une chaise"],
            ["Cl 8 Pluriel :", "préfixe ZI-", "ZIRI", "= des chaises"],
          ],
        },
      },
      {
        type: "text",
        value: "1. QUELQUES NOMS DU GENRE SHI-/ZI-(Classes 7 / 8) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Shia", "Zia", "une vaisselle, des --"],
            ["Shiazi", "Ziazi", "un igname, des --"],
            ["Shiɓaɓa", "Ziɓaɓa", "une mesure à grain, des --"],
            ["Shifuɓa", "Zifuɓa", "la poitrine, le torse, des --"],
            ["Shiga", "Ziga", "un membre, des --"],
            ["Shijavu", "Zijavu", "une noix de coco verte, des --"],
            ["Shikandre", "Zikandre", "une page, des --"],
            ["Shikombe", "Zikombe", "une tasse, des --"],
            ["Shino", "Zino", "un mortier, des --"],
            ["Shinyama", "Zinyama", "un animal, des animaux"],
            ["Shio", "Zio", "un livre, des --"],
            ["Shireo", "Zireo", "de la viande, du poisson, des brèdes"],
            ["Shirere", "Zirere", "un nain, des --"],
            ["Shirewe", "Zirewe", "un handicapé, des --"],
            ["Shiri", "Ziri", "une chaise, des --"],
            ["Shisiwa", "Zisiwa", "une île, des --"],
            ["Shitrandra", "Zitrandra", "un lit, des --"],
            ["Shitru", "Zitru", "une chose, une affaire, un objet, des --"],
            ["Shitswa", "Zitswa", "une tête, des --"],
            ["Shiwatrotro", "Ziwatrotro", "une grenouille, des --"],
          ],
        },
      },
      {
        type: "text",
        value: "CAS PARTICULIERS : SH- / Z-",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Traduction"],
          rows: [
            [],
            ["Shahula", "Zahula", "une nourriture, des --"],
            ["Shandza", "Zandza", "un terrain, des --"],
            ["Shengwe", "Zengwe", "un fouet, des --"],
            ["Shombo", "Zombo", "un outil, un coupe-coupe, des --"],
            ["Shuma", "Zuma", "un métal, des métaux"],
          ],
        },
      },
      {
        type: "text",
        value: "2. NOMS DE LANGUES(Classe 7) :",
      },
      {
        type: "table",
        value: {
          header: ["Langue", "Traduction", "Langue", "Traduction"],
          rows: [
            [],
            ["Shimaore", "le mahorais", "Shingazidja", "le grand-comorien"],
            ["Shindzuani", "l'anjouanais", "Shiɓushi", "le malgache"],
            ["Shiswahili", "le swahili", "Shihindi", "l'indien"],
            ["Shifarantsa", "le français", "Shidjeremani", "l'allemand"],
            ["Shingereza", "l'anglais", "Sharaɓu", "l'arabe"],
          ],
        },
      },
      {
        type: "text",
        value:
          'Le nom de nationalité, préfixé parSHI-peut signifier : "à la manière de..." (Voir : Chapitre 44.)',
      },
      {
        type: "text",
        value: "Ainsi :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Shifarantsa", "= à la manière des Français"],
            ["Shizungu", "= à la manière des blancs (ou des Français !)"],
            ["Shimaore", "= à la manière des Mahorais"],
          ],
        },
      },
      {
        type: "text",
        value: "3. LE PRÉ-PRÉFIXE DÉFINI :",
      },
      {
        type: "text",
        value:
          "Il se place devant le préfixe de classe du nom et fonctionne comme un article défini.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 7 (Singulier) :"],
            ["I-", "SHIRI", "= une chaise", "ISHIRI", "= la chaise"],
            [""],
            ["Cl 8 (Pluriel) :"],
            ["ZI-", "ZIRI", "= des chaises", "ZIZIRI", "= les chaises"],
          ],
        },
      },
    ],
  },
  {
    id: 16,
    title: "16 - Le Verbe UKA = être",
    description: "Le verbe en lui même est complexe mais tranquille 🤣",
    content: [
      {
        type: "text",
        value:
          'Le verbe UKA = "ÊTRE" est sans aucun doute le verbe qui pose le plus de problèmes aux débutants, car il a la particularité de posséder cinq radicaux différents :',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["-A", "-SI", "-Ø", "-KA", "-LI"]],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "",
              'En réalité, ces différents radicaux n\'ont de commun entre eux que le sens de = "être". C\'est donc par commodité que l\'on parle ici du verbe "UKA".',
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["A) AU PRÉSENT ACTUEL :", "RADICAL -A / -SI"]],
        },
      },
      {
        type: "text",
        value:
          "A la forme affirmative, le radical verbal -A s'accorde au nom sujet en prenant les préfixes sujets du\n genre MU-/WA- et des autres genres, à la 3ème personne du singulier et du pluriel.",
      },
      {
        type: "text",
        value:
          "A la forme négative, les préfixes sujets négatifs sont affixés au radical verbal -SI.",
      },
      {
        type: "table",
        value: {
          header: [
            "CLASSE",
            "AFFIRMATIF",
            "Equivalent",
            "NÉGATIF",
            "Equivalent",
          ],
          rows: [
            [],
            [
              "1\n 2\n Cl 1 Mutru 3\n 1\n 2\n Cl 2 Watru 3",
              "TSA\n WA\n A\n RA\n MWA\n WA",
              "je suis\n tu es\n il / elle est\n nous sommes\n vous êtes\n ils / elles sont",
              "TSISI\n KUSI\n KASI\n KARISI\n KAMUSI\n KAWASI",
              "je ne suis pas\n tu n'es pas\n il / elle n'est pas\n nous ne sommes pas\n vous n'êtes pas\n ils / elles ne sont pas",
            ],
            [
              "Cl 3 Muhono\n Cl 4 Mihono",
              "WA\n YA",
              "il / elle est\n ils / elles sont",
              "KAUSI\n KAISI",
              "il / elle n'est pas\n ils / elles ne sont pas",
            ],
            [
              "Cl 5 Gari\n Cl 6 Magari",
              "LA\n YA",
              "il / elle est\n ils / elles sont",
              "KALISI\n KAYASI",
              "il / elle n'est pas\n ils / elles ne sont pas",
            ],
            [
              "Cl 7 Shiri\n Cl 8 Ziri",
              "YA\n ZA",
              "il / elle est\n ils / elles sont",
              "KAISI\n KAZISI",
              "il / elle n'est pas\n ils / elles ne sont pas",
            ],
            [
              "Cl 9 Nguo\n Cl 10 Nguo",
              "YA\n ZA",
              "il / elle est\n ils / elles sont",
              "KAISI\n KAZISI",
              "il / elle n'est pas\n ils / elles ne sont pas",
            ],
            [
              "Cl 11 Uku",
              "WA",
              "il / elle est",
              "KAUSI",
              "il / elle n'est pas",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Tsa v̄anu", "Je suis ici"],
            ["Ɓaɓangu a ɗagoni", "Mon père est en ville"],
            ["Ra fetre v̄anu", "Nous sommes bien ici"],
            ["Wa ha maɓaɓawo", "Ils sont chez leurs parents"],
            ["Fi za muroni", "Les poissons sont dans la rivière"],
            ["Wakati wa mwema", "Le temps est beau"],
            ["Ra uku", "Il fait nuit (Nous sommes la nuit)"],
            ["Mwenyewe kasi", "Le propriétaire n'est pas là"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["B) AU PRÉSENT HABITUEL :", "RADICAL -Ø"]],
        },
      },
      {
        type: "text",
        value:
          "Au présent habituel, il est fréquent, surtout en présence d'un démonstratif ou d'un possessif, que le verbe\n UKA ne soit pas exprimé : il est simplement sous-entendu. On parle dans ce cas de radical -Ø. Ainsi :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Nyumba ini yangu", "C'est ma maison", "(maison-ci mienne)"],
            [
              "Mwana wangu muzuri",
              "Mon enfant est beau",
              "(enfant à moi beau)",
            ],
            [
              "Wanatsa wale watiti",
              "Ces enfants sont petits",
              "(enfants là petits)",
            ],
            [
              "Ini yangu, iyo yaho",
              "Ceci est à moi, cela est à toi",
              "(ceci à moi, cela à toi)",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["C) A L'ACCOMPLI :", "RADICAL -KA"]],
        },
      },
      {
        type: "table",
        value: {
          header: ["FORME AFFIRMATIVE", "FORME NÉGATIVE"],
          rows: [
            [],
            [
              "TSIKA\n UKA\n AKA\n RIKA\n MUKA\n WAKA",
              "j'étais\n tu étais\n il / elle était\n nous étions\n vous étiez\n ils / elles étaient",
              "TSAKA\n KWAKA\n KAKA\n KARAKA\n KAMWAKA\n KAWAKA",
              "je n'étais pas\n tu n'étais pas\n il / elle n'était pas\n nous n'étions pas\n vous n'étiez pas\n ils / elles n'étaient pas",
            ],
            [
              "UKA\n IKA\n LIKA\n YAKA\n ZIKA",
              "(Cl 3 - 11 - 14)\n (Cl 4 - 7 - 9)\n (Cl 5)\n (Cl 6)\n (Cl 8 - 10)",
              "KAUKA\n KAIKA\n KALIKA\n KAYAKA\n KAZIKA",
              "(Cl 3 - 11 - 14)\n (Cl 4 - 7 - 9)\n (Cl 5)\n (Cl 6)\n (Cl 8 - 10)",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["D) AU FUTUR :", "RADICAL -KA"]],
        },
      },
      {
        type: "table",
        value: {
          header: ["FORME AFFIRMATIVE", "FORME NÉGATIVE"],
          rows: [
            [],
            [
              "NITSOKA\n UTSOKA\n ATSOKA\n RITSOKA\n MUTSOKA\n WATSOKA",
              "je serai\n tu seras\n il / elle sera\n nous serons\n vous serez\n ils / elles seront",
              "TSITSOKA\n KUTSOKA\n KATSOKA\n KARITSOKA\n KAMUTSOKA\n KAWATSOKA",
              "je ne serai pas\n tu ne seras pas\n il / elle ne sera pas\n nous ne serons pas\n vous ne serez pas\n ils / elles ne seront pas",
            ],
            [
              "UTSOKA\n ITSOKA\n LITSOKA\n YATSOKA\n ZITSOKA",
              "(Cl 3 - 11 - 14)\n (Cl 4 - 7 - 9)\n (Cl 5)\n (Cl 6)\n (Cl 8 - 10)",
              "KAUTSOKA\n KAITSOKA\n KALITSOKA\n KAYATSOKA\n KAZITSOKA",
              "(Cl 3 - 11 - 14)\n (Cl 4 - 7 - 9)\n (Cl 5)\n (Cl 6)\n (Cl 8 - 10)",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["E) AU SUBJONCTIF :", "RADICAL -K(A)-E"]],
        },
      },
      {
        type: "table",
        value: {
          header: ["FORME AFFIRMATIVE", "FORME NÉGATIVE"],
          rows: [
            [],
            [
              "NIKE\n UKE\n AKE\n RIKE\n MUKE\n WAKE",
              "que je sois\n que tu sois\n qu'il / elle soit\n que nous soyons\n que vous soyez\n qu'ils / elles soient",
              "NISIKE\n USIKE\n ASIKE\n RISIKE\n ASIKE\n WASIKE",
              "que je ne sois pas\n que tu ne sois pas\n qu'il / elle ne soit pas\n que nous ne soyons pas\n que vous ne soyez pas\n qu'ils / elles ne soient pas",
            ],
            [
              "UKE\n IKE\n LIKE\n YAKE\n ZIKE",
              "(Cl 3 - 11 - 14)\n (Cl 4 - 7 - 9)\n (Cl 5)\n (Cl 6)\n (Cl 8 - 10)",
              "USIKE\n ISIKE\n LISIKE\n YASIKE\n ZISIKE",
              "(Cl 3 - 11 - 14)\n (Cl 4 - 7 - 9)\n (Cl 5)\n (Cl 6)\n (Cl 8 - 10)",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Muke v̄wamoja na wasi", "Soyez avec nous"],
            [
              "Ilazimu wananya watru-ɓaɓana wananya watru-mama wake sawa",
              "Il faut que les frères et les sœurs soient égaux",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["F) A L'IMPÉRATIF :", "RADICAL -KA"]],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [['G) POUR TRADUIRE "C\'EST" :', "ƊE"]],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [['H) POUR TRADUIRE "IL Y A" :', "V̄WA"]],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [['I) POUR TRADUIRE "IL Y EST"', "A V̄AV̄O"]],
        },
      },
      {
        type: "text",
        value: "J) LA FORME RELATIVE",
      },
      {
        type: "text",
        value:
          "Nous avions annoncé 5 radicaux différents au début de ce chapitre.\n Nous en avons étudié 4 : -A, -SI, -Ø et -KA.\n Où est passé -LI-, le 5ème radical ?",
      },
      {
        type: "text",
        value:
          "Pour le savoir, rendez-vous au Chapitre 52 - Les Temps Relatifs.",
      },
      {
        type: "text",
        value: "PROVERBE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Ɓanga, ma-",
              "une cuisine, des --",
              "Feliki, ma-",
              "une brède, des --",
            ],
            [
              "Ɓaraza, ma-",
              "une véranda, des --",
              "Fenesi, ma-",
              "un jaque, des --",
            ],
            [
              "Ɓaribari, ma-",
              "un mouton, des --",
              "Frãmpe, ma-",
              "un fruit à pain, des --",
            ],
            [
              "Ɓengani, ma-",
              "une aubergine, des --",
              "Jimbi, ma-",
              "un songe, des --",
            ],
            [
              "Bibi, ma-",
              "un insecte, des --",
              "Kowa, ma-",
              "un escargot, des --",
            ],
            [
              "Ɓwe, mawe",
              "une pierre, des --",
              "Sindza, ma-",
              "une banane douce, des --",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 17,
    title: "17 - Le Verbe UKA NA = avoir",
    description: "Accrocher vous bien sinon vous allez vous faire avoir 🤣.",
    content: [
      {
        type: "text",
        value:
          "On utilise UKA NA pour exprimer l'idée d'avoir, de posséder quelque chose, ce qui signifie littéralement \"être avec\".",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "⚠",
              'Tout comme le verbe UKA = "être" dont il est dérivé, le verbe UKA NA possède plusieurs radicaux, liés ensemble par le sens de = "avoir".',
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          'Au présent actuel affirmatif et au présent habituel négatif, la particule "NA" est accolée directement au préfixe sujet, en raison de l\'absence de radical verbal. On a choisi de garder NA séparée du verbe aux autres temps et aux autres formes.',
      },
      {
        type: "text",
        value: '1. CONJUGAISON DU VERBE "UKA NA" :',
      },
      {
        type: "text",
        value:
          'A la forme affirmative, "NA" est directement accroché aux préfixes sujets, en l\'absence de tout radical verbal. (On parle de radical Ø.)',
      },
      {
        type: "text",
        value:
          "A la forme négative, les préfixes sujets négatifs sont affixés au radical verbal SI (conjugaison semblable à\n celle du présent actuel négatif de UKA = être) et sont suivis de la particule NA.",
      },
      {
        type: "table",
        value: {
          header: [
            "CLASSE",
            "AFFIRMATIF",
            "Equivalent",
            "NÉGATIF",
            "Equivalent",
          ],
          rows: [
            [],
            [
              "1\n 2\n Cl 1 Mutru 3\n 1\n 2\n Cl 2 Watru 3",
              "TSINA\n UNA\n ANA\n RINA\n MUNA\n WANA",
              "j'ai\n tu as\n il / elle a\n nous avons\n vous avez\n ils / elles ont",
              "TSISI NA\n KUSI NA\n KASI NA\n KARISI NA\n KAMUSI NA\n KAWASI NA",
              "je n'ai pas\n tu n'as pas\n il / elle n'a pas\n nous n'avons pas\n vous n'avez pas\n ils / elles n'ont pas",
            ],
            [
              "Cl 3 Muhono\n Cl 4 Mihono",
              "UNA\n INA",
              "il / elle a\n ils / elles ont",
              "KAUSI NA\n KAISI NA",
              "il / elle n'a pas\n ils / elles n'ont pas",
            ],
            [
              "Cl 5 Gari\n Cl 6 Magari",
              "LINA\n YANA",
              "il / elle a\n ils / elles ont",
              "KALISI NA\n KAYASI NA",
              "il / elle n'a pas\n ils / elles n'ont pas",
            ],
            [
              "Cl 7 Shiri\n Cl 8 Ziri",
              "INA\n ZINA",
              "il / elle a\n ils / elles ont",
              "KAISI NA\n KAZISI NA",
              "il / elle n'a pas\n ils / elles n'ont pas",
            ],
            [
              "Cl 9 Nguo\n Cl 10 Nguo",
              "INA\n ZINA",
              "il / elle a\n ils / elles ont",
              "KAISI NA\n KAZISI NA",
              "il / elle n'a pas\n ils / elles n'ont pas",
            ],
            [
              "Cl 11 Uku",
              "UNA",
              "il / elle a",
              "KAUSI NA",
              "il / elle n'a pas",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ɓaɓangu ana wana wararu", "Mon père a trois enfants"],
            ["Rina nguo nyengi", "Nous avons beaucoup de vêtements"],
            ["Hamadi kasi na magoshi", "Ahmed n'a pas de chaussures"],
            ["Wasi karisi na nyumba", "Nous n'avons pas de maison"],
            [
              "Maji yayo yana ɓaridi",
              "Cette eau est froide. (cette eau a du froid)",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "A la forme affirmative, les pronoms personnels autonomes (P.P.A.) sont suivis de la particule NA, en l'absence de tout radical verbal.",
      },
      {
        type: "text",
        value:
          "A la forme négative, les P.P.A. sont suivis des préfixes sujets négatifs liés à la particule -NA.",
      },
      {
        type: "text",
        value:
          "Là encore, le radical verbal est absent. Par ailleurs, on remarque que la première personne du singulier\n présente un risque de confusion avec la forme affirmative du présent actuel.",
      },
      {
        type: "table",
        value: {
          header: ["FORME AFFIRMATIVE", "FORME NÉGATIVE"],
          rows: [
            [],
            [
              "WAMI NA\n WAWE NA\n WAYE NA\n WASI NA\n WANYU NA\n WAWO NA",
              "j'ai\n tu as\n il / elle a\n nous avons\n vous avez\n ils / elles ont",
              "WAMI TSINA\n WAWE KUNA\n WAYE KANA\n WASI KARISINA\n WANYU KAMUNA\n WAWO KAWANA",
              "je n'ai pas\n tu n'as pas\n il / elle n'a pas\n nous n'avons pas\n vous n'avez pas\n ils / elles n'ont pas",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Wami na nyombe zangu", "J'ai mes vaches"],
            ["Shemedji kuna nyombe", "Beau-frère, tu n'as pas de vaches"],
            ["Mutru kana lahe", "Quelqu'un qui n'a rien a lui"],
            ["Mama wangu wawe kuna mufano", "Ma mère, tu n'as pas d'exemple"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["FORME AFFIRMATIVE", "FORME NÉGATIVE"],
          rows: [
            [],
            [
              "TSIKA NA\n UKA NA\n AKA NA\n RIKA NA\n MUKA NA\n WAKA NA",
              "j'avais\n tu avais\n il / elle avait\n nous avions\n vous aviez\n ils / elles avaient",
              "TSAKA NA\n KWAKA NA\n KAKA NA\n KARAKA NA\n KAMWAKA NA\n KAWAKA NA",
              "je n'avais pas\n tu n'avais pas\n il / elle n'avait pas\n nous n'avions pas\n vous n'aviez pas\n ils / elles n'avaient pas",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Aka na shitswa ɓole na tsingo ndrile",
              "Il avait une grosse tête et un long cou",
            ],
            [
              "Mwiri unu uka na mafulera mazuri",
              "Cet arbre avait des belles fleurs",
            ],
            [
              "Tsika na wanyawe wengi Farantsa",
              "J'avais beaucoup d'amis en France",
            ],
            [
              "Watru masikini kawaka na shahula",
              "Les pauvres n'avaient pas de nourriture",
            ],
          ],
        },
      },
      {
        type: "text",
        value: '2. LE VERBE "UPARA" :',
      },
      {
        type: "text",
        value:
          "Il existe d'autres verbes en shimaore pour traduire la notion d'avoir et de possession, notamment le verbe UPARA, qui signifie : avoir, obtenir, trouver, recevoir, gagner, atteindre, arriver à...",
      },
      {
        type: "text",
        value: "Ce verbe se conjugue comme tous les verbes ordinaires.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Mama apara mwana zaza", "Maman a eu un bébé"],
            ["Ritsopara fi leo ujoni", "Nous aurons du poisson ce soir"],
            ["Tsipara ɓarua", "J'ai eu (reçu) une lettre"],
            ["Upara mushahara waho", "Tu as eu ton salaire"],
            ["Tsapara nafasi", "Je n'ai pas le temps"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ufariki dunia", "décéder", "Usalimu", "saluer"],
            ["Ufunga", "attacher, lier", "Usherehi", "fêter, commémorer"],
            ["Uharaya", "refuser", "Usikinia", "plaindre, avoir pitié de"],
            ["Ukosa", "manquer", "Utshipu", "se taire"],
            ["Ulaga", "faire ses adieux à", "Utwali", "apprendre par cœur"],
            ["Umia", "implorer, demander", "Uwanisa", "partager"],
          ],
        },
      },
    ],
  },
  {
    id: 18,
    title: "18 - Les Adverbes",
    description: "Aller changeons un peut voyons la structure des adverbes",
    content: [
      {
        type: "text",
        value: "RAPPEL :",
      },
      {
        type: "text",
        value:
          "Un adverbe est un mot invariable qui permet de dire comment une action se déroule (vite, lentement, etc..), avec quelle fréquence (souvent, quelquefois, jamais, etc..). Il permet d'exprimer des possibilités ou des certitudes (peut-être, certainement, etc..), ou encore de qualifier un adjectif (très grand, assez petit, etc..)",
      },
      {
        type: "text",
        value:
          "En shimaore, l'adverbe est placé après le verbe, sauf dans quelques cas particuliers.",
      },
      {
        type: "text",
        value: "1. QUELQUES ADVERBES COURANTS :",
      },
      {
        type: "table",
        value: {
          header: ["Adverbe", "Traduction", "Adverbe", "Traduction"],
          rows: [
            [],
            ["Dahari", "souvent", "Mbio", "vite"],
            ["Daima", "toujours", "Mkini", "peut-être"],
            ["Fetre", "bien", "Nai", "mal, mauvais"],
            ["Halisi", "vraiment, parfaitement", "Rabuzi", "d'abord"],
            ["Haraka", "rapidement, vite", "Raha", "pas encore / davantage"],
            ["Haswa", "surtout, spécialement", "Rasa", "encore"],
            ["Kabisa", "tout-à-fait", "Swafi", "bien, vraiment"],
            [
              "Kadiri",
              "environ, à peu près",
              "Taratiɓu",
              "régulièrement, calmement",
            ],
            ["Kamwe", "déjà, tout de suite", "Tsena", "encore, à nouveau"],
            ["Kiasi", "assez", "Tu", "seulement"],
            ["Labda", "peut-être", "V̄olev̄ole", "lentement, doucement"],
            ["Madza", "déjà", "Wajau", "aussi"],
            ["Mapema", "tôt", "Zaidi", "plus, davantage"],
          ],
        },
      },
      {
        type: "text",
        value: "2. ADVERBES COMPOSÉS :",
      },
      {
        type: "table",
        value: {
          header: ["Adverbe", "Traduction"],
          rows: [
            [],
            ["Ha ɓahati ndjema", "par chance"],
            ["Ha ɓahati mbovu", "par malheur"],
            ["Ha djumla", "dans l'ensemble"],
            ["Ha kawaida", "comme d'habitude"],
            ["Ha muhtaswari", "en bref, en résumé"],
            ["Ha namna iyo", "de cette façon"],
            ["Ha namna yangina", "autrement"],
            ["Ha nguvu", "fortement, trop"],
            ["Ha uhafula", "brusquement"],
            ["Ha wengi", "en grand nombre"],
            ["Dahar tuku", "tout le temps"],
            ["Daiman abada", "pour toujours"],
            ["Kiasi ya utosha", "suffisamment"],
            ["Mwana pavi", "un petit peu"],
            ["Mwana shiteku", "un tout petit peu"],
          ],
        },
      },
      {
        type: "text",
        value: "3. QUELQUES EXEMPLES D'EMPLOI :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1. Fanya haraka !", "Fais vite ! / Dépêche-toi !"],
            ["2. Ira haraka pompie !", "Appelle vite les pompiers !"],
            ["3. Toa kaɓisa !", "Enlève complètement !"],
            ["4. Ko raɓuzi !", "Viens immédiatement !"],
            ["5. Madza rijadza.", "Nous sommes déjà au complet."],
            ["6. Madza aja / Amadza aja.", "Il est déjà arrivé."],
            ["7. Aja kamwe.", "Il est déjà arrivé."],
            ["8. Nisishuka kamwe v̄anu.", "Je descends juste là."],
            ["9. Waye ufanya hazi fetre.", "Il travaille bien."],
            ["10. Waye mwanamtsa mwema swafi.", "C'est un très bon enfant."],
            ["11. Isijiva swafi !", "C'est très bon !"],
            ["12. Shukidza thamani mwana pav̄i !", "Baisse un peu le prix !"],
            ["13. Ya ɓole ha nguvu na wami.", "C'est trop grand pour moi."],
            [
              "14. Urendre jeje Ɓweni ? - Ndjema tu.",
              "Comment allez-vous madame ? - Très bien.",
            ],
            ["15. Usije tsena !", "Ne reviens pas !"],
            ["16. Usije raha !", "Ne viens pas tout de suite !"],
            [
              "17. Narendre raha polisi kaja !",
              "Partons avant que la police n'arrive !",
            ],
            [
              "18. Wawe mkini kumji Rastami.",
              "Peut-être ne connais-tu pas Rastami.",
            ],
            [
              "19. Mkini oho mbali ? - Ãhã, kariɓu tu.",
              "Peut-être est-ce loin ? - Non, c'est tout près.",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Sha, zya / zisha",
              "un doigt, des --",
              "Shilevu, zi-",
              "un menton, des --",
            ],
            [
              "Shama, zama",
              "une association, des --",
              "Shemizi, zi-",
              "une chemise, des --",
            ],
            [
              "Shifungo, zi-",
              "une articulation, des --",
              "Shiromani, zi-",
              "une cotonnade imprimée",
            ],
            [
              "Shihonko, zi-",
              "une souche d'arbre, des --",
              "Shurungu",
              "un oignon, des --",
            ],
            ["Shikao, zi-", "un comité, des --", "Shurungu vuje", "de l'ail"],
            [
              "Shikoi, zi-",
              "un pagne d'homme, des --",
              "Shisima, zi-",
              "un puits, une citerne, des --",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 19,
    title: "19 Le Genre N-",
    description: "Il y a beaucoup de genre n'est-ce pas 🤔.",
    content: [
      {
        type: "text",
        value:
          "Le genre N- (Classes 9 / 10) est l'un des genres les plus larges : il regroupe des noms de personnes, d'animaux, de plantes, d'aliments, d'objets de la vie courante, d'éléments naturels, des noms abstraits, etc..\n Beaucoup de noms empruntés au français sont absorbés dans le genre N-.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "⚠",
              "Le genre N- est le seul genre en shimaore qui comporte des noms commençant par le préfixe N-.",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "",
              "Tous les noms du genre N- ne commencent pas forcément par N-",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "Pour des raisons phonétiques le préfixe N- se change en M- devant B et P.",
      },
      {
        type: "text",
        value:
          "Une autre particularité de cette classe est que le nom a une forme identique au singulier et au pluriel.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 9 Singulier :", "préfixe Ø-", "HAZI", "= un travail"],
            ["", "préfixe N-", "NGUO", "= un vêtement"],
            ["Cl 10 Pluriel :", "préfixe Ø-", "HAZI", "= des travaux"],
            ["", "préfixe N-", "NGUO", "= des vêtements"],
          ],
        },
      },
      {
        type: "text",
        value:
          "En l'absence de préfixes de classe distinctifs, ce sont les accords de classe à l'intérieur de la phrase\n (préfixe verbal, démonstratif, possessif, etc..) qui permettent de distinguer le singulier du pluriel. Ainsi :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel"],
          rows: [
            [],
            [
              "INGUO ILE",
              "= ce vêtement-là",
              "ZINGUO ZILE",
              "= ces vêtements-là",
            ],
            [
              "INGUO YANGU",
              "= mon vêtement",
              "ZINGUO ZANGU",
              "= mes vêtements",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "1. QUELQUES NOMS DU GENRE N- (Classes 9 / 10) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Singulier", "Pluriel"],
          rows: [
            [],
            ["Ɓamuhe", "gendre, beau-père", "Valahi", "beau-frère"],
            ["Fulani", "un tel, une telle", "Yatima", "un orphelin"],
            ["Nyadza", "belle-fille, belle-mère", "", ""],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Singulier", "Pluriel"],
          rows: [
            [],
            ["Ɓazari", "un marché", "Marike", "l'argent"],
            ["Ɓiashara", "le commerce", "Thamani", "la valeur, le prix"],
            ["Damu", "le sang", "Robo", "une robe, des --"],
            ["Hazi", "un travail, des --", "Tsindzi", "le sommeil"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Singulier", "Pluriel"],
          rows: [
            [],
            ["Dara", "un drap, des --", "Range", "la couleur, la peinture"],
            ["Lakuru", "une cour, des --", "Saɓuni", "un savon, des --"],
            ["Meza", "une table, des --", "Sahani", "une assiette, des --"],
            ["Nyumba", "une maison, des --", "Vera", "un verre, des --"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Singulier", "Pluriel"],
          rows: [
            [],
            ["Ardhwi", "la Terre", "Hari", "la chaleur, la transpiration"],
            ["Ɓahari", "la mer", "Hawa", "l'air, l'atmosphère"],
            ["Ɓaridi", "le froid", "Nuru", "la clarté, la lumière"],
            ["Juwa", "le soleil", "Vuwa", "la pluie"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Singulier", "Pluriel"],
          rows: [
            [],
            ["Adjali", "un accident", "Hasira", "la colère"],
            ["Ɓahati", "la chance", "Hatwari", "le danger"],
            ["Dunia", "le monde, ici-bas", "Nguvu", "la force"],
            [
              "Fikira",
              "une idée, une pensée",
              "Niya",
              "une intention, la volonté",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Singulier", "Pluriel"],
          rows: [
            [],
            ["Komba", "un maki", "Nyoha", "un serpent"],
            ["Mbuzi", "une chèvre", "Nyombe", "une vache"],
            ["Mbwa", "un chien", "Nyoshi", "une abeille"],
            ["Ndzi", "une mouche", "Paha / Mpaha", "un chat"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Singulier", "Pluriel"],
          rows: [
            [],
            ["Kafe", "le café, du café", "Samuli", "le beurre"],
            ["Ngizi", "le miel", "Shingo", "le sel"],
            ["Nyama", "la viande", "Sukari", "le sucre"],
            ["Putu", "le piment", "Tshai, Dite", "le thé, du thé"],
          ],
        },
      },
      {
        type: "text",
        value: "Voir aussi les listes de vocabulaire complémentaires :",
      },
      {
        type: "text",
        value: "2. LE PRÉ-PRÉFIXE DÉFINI :",
      },
      {
        type: "text",
        value:
          "Il se place devant le préfixe de classe du nom et fonctionne comme un article défini.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 9 (Singulier) :"],
            ["I-", "NGUO", "= un vêtement", "INGUO", "= le vêtement"],
            [""],
            ["Cl 10 (Pluriel) :"],
            ["ZI-", "ZINGUO", "= des vêtements", "ZINGUO", "= les vêtements"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "",
              "Le pré-préfixe défini joue aussi le rôle d'un préfixe de classe pour distinguer le singulier du pluriel.",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "HAZI",
              "= un travail / des travaux",
              "IHAZI",
              "= un / le travail",
            ],
            ["", "ZIHAZI", "= des / les travaux"],
          ],
        },
      },
      {
        type: "text",
        value: "3. ACCORDS DE CLASSE :",
      },
      {
        type: "text",
        value: "REMARQUE :",
      },
      {
        type: "text",
        value:
          "Lorsque le nom de genre N- représente une personne, il commande un accord sémantique de classes 1 / 2, comme un nom du genre MU-/WA-. Ainsi :",
      },
    ],
  },
  {
    id: 20,
    title: "20 - Les Mots Interrogatifs",
    description: "C'est bien aussi de savoir poser des questions 😁",
    content: [
      {
        type: "text",
        value: "A. POSITION DU MOT INTERROGATIF DANS LA PHRASE :",
      },
      {
        type: "text",
        value:
          "Lorsqu'on pose une question en shimaore, on ne pratique pas l'inversion sujet / verbe dans la phrase, comme en français, et cela d'autant moins que le pronom sujet est un préfixe accolé au verbe. C'est avant tout l'intonation, ainsi que la présence d'un mot interrogatif, qui signalent qu'il s'agit d'une question.",
      },
      {
        type: "text",
        value:
          "Le mot interrogatif est en général situé en fin de phrase.\n Mais lorsque la phrase commence par le mot interrogatif, cela implique souvent l'emploi d'un temps relatif (verbe terminé en -o).",
      },
      {
        type: "text",
        value: "B. LES MOTS INTERROGATIFS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1.MBANI ? = Qui ?"],
            ["", "- Mwana unu mbani ?", "Qui est cet enfant ?"],
            [
              "- Mwana unu wa mbani ?",
              "A qui est cet enfant ? (enfant-ci de qui ?)",
            ],
            ["- Uwo mbani ?", "Qui est-ce ?"],
            ["- Wawe mbani ?", "Qui es-tu ?"],
            ["- Wawe uhiriwa mbani ?", "Comment t'appelles-tu ?"],
            ["- Dzina laho mbani ?", "Quel est ton nom ?"],
            ["- Oho ɗe mbani?", "Qui est-ce qui est là ?"],
            ["Mais :"],
            ["", "- Mbani kaja ?", "Qui n'est pas venu ?"],
            ["- Mbani ɗe anihirao ?", "Qui est-ce qui m'appelle ?"],
            [
              "- Mbani atsokao mzuri suku ya Idi ?",
              "Qui sera beau le jour de la fête ?",
            ],
            ["2.TRINI ? = Que... ? Quoi... ? etc.."],
            ["", "- Iyo trini ?", "Qu'est-ce ?"],
            ["- Ini shinyama trini ?", "Quelle sorte d'animal est-ce ?"],
            ["- Shitru iyo uhiriwa trini?", "Comment s'appelle cette chose ?"],
            ["- Usutsaha trini ?", "Que veux-tu ?"],
            ["- Urongoa trini ?", "Qu'as-tu dis ?"],
            ["3.TRONGO TRINI ? = Quoi... ? Quelle affaire ?"],
            ["", "- Trongo trini ?", "Pourquoi ? / Pour quelle raison ?"],
            [
              "- Ini trongo trini ?",
              "De quoi s'agit-il ? (cette chose-ci quoi ?)",
            ],
            ["- Trongo trini ɗe ilio v̄anu ?", "Qu'est-ce qui se passe ici ?"],
            ["4.MANA TRINI ? = Pourquoi... ? Quelle raison ? Quel sens ?"],
            ["", "- Mana trini kasi v̄anu ?", "Pourquoi n'est-il pas là ?"],
            [
              "- Ulemewa mana trini ?",
              "Comment ça se fait que tu sois fatigué ?",
            ],
            ["- Ina mana trini ?", "Ça a quel sens ? / Ça veut dire quoi ?"],
            ["5.NAMNA TRINI ? = De quelle façon ? Comment ?"],
            [
              "",
              "- Uregeya ɗagoni namna trini ?",
              "Comment es-tu rentré au Village ?",
            ],
            ["6.LERA TRINI ? = A quelle heure ?"],
            ["", "- Utsoregeya lera trini ?", "A quelle heure rentreras-tu ?"],
            ["- Una lera trini ?", "Quelle heure as-tu ?"],
            [
              "7.-V̄I ? = Quel / quelle / quels / quelles / lequel / laquelle / lesquels / lesquelles ?",
            ],
            ["-V̄I s'accorde en classe avec le nom auquel il se réfère :"],
            [
              "Classe 1 Sing.UV̄IMutru uv̄i ?Quelle personne ?\n Classe 2 Plur.WAV̄IWatru wav̄i ?Quelles personnes ?\n Classe 3 Sing.UV̄̅IMwiri uv̄i ?Quel arbre ?\n Classe 4 Plur.IV̄̅IMiri iv̄i ?Quels arbres ?\n Classe 5 Sing.LIV̄̅IGari liv̄i ?Quelle voiture ?\n Classe 6 Plur.YAV̄̅IMagari yav̄i ?Quelles voitures ?\n Classe 7 Sing.IV̄̅IShitru iv̄i ?Quelle chose ?\n Classe 8 Plur.ZIV̄̅IZitru ziv̄i ?Quelles choses ?\n Classe 9 Sing.IV̄̅INyumba iv̄i ?Quelle maison ?\n Classe 10 Plur.ZIV̄̅INyumba ziv̄i ?Quelles maisons ?\n Classes 11-14 Sing.UV̄̅IUku uv̄i ?Quelle nuit ?",
              "Classe 1 Sing.",
              "UV̄I",
              "Mutru uv̄i ?",
              "Quelle personne ?",
              "Classe 2 Plur.",
              "WAV̄I",
              "Watru wav̄i ?",
              "Quelles personnes ?",
              "Classe 3 Sing.",
              "UV̄̅I",
              "Mwiri uv̄i ?",
              "Quel arbre ?",
              "Classe 4 Plur.",
              "IV̄̅I",
              "Miri iv̄i ?",
              "Quels arbres ?",
              "Classe 5 Sing.",
              "LIV̄̅I",
              "Gari liv̄i ?",
              "Quelle voiture ?",
              "Classe 6 Plur.",
              "YAV̄̅I",
              "Magari yav̄i ?",
              "Quelles voitures ?",
              "Classe 7 Sing.",
              "IV̄̅I",
              "Shitru iv̄i ?",
              "Quelle chose ?",
              "Classe 8 Plur.",
              "ZIV̄̅I",
              "Zitru ziv̄i ?",
              "Quelles choses ?",
              "Classe 9 Sing.",
              "IV̄̅I",
              "Nyumba iv̄i ?",
              "Quelle maison ?",
              "Classe 10 Plur.",
              "ZIV̄̅I",
              "Nyumba ziv̄i ?",
              "Quelles maisons ?",
              "Classes 11-14 Sing.",
              "UV̄̅I",
              "Uku uv̄i ?",
              "Quelle nuit ?",
            ],
            ["Classe 1 Sing.", "UV̄I", "Mutru uv̄i ?", "Quelle personne ?"],
            ["Classe 2 Plur.", "WAV̄I", "Watru wav̄i ?", "Quelles personnes ?"],
            ["Classe 3 Sing.", "UV̄̅I", "Mwiri uv̄i ?", "Quel arbre ?"],
            ["Classe 4 Plur.", "IV̄̅I", "Miri iv̄i ?", "Quels arbres ?"],
            ["Classe 5 Sing.", "LIV̄̅I", "Gari liv̄i ?", "Quelle voiture ?"],
            ["Classe 6 Plur.", "YAV̄̅I", "Magari yav̄i ?", "Quelles voitures ?"],
            ["Classe 7 Sing.", "IV̄̅I", "Shitru iv̄i ?", "Quelle chose ?"],
            ["Classe 8 Plur.", "ZIV̄̅I", "Zitru ziv̄i ?", "Quelles choses ?"],
            ["Classe 9 Sing.", "IV̄̅I", "Nyumba iv̄i ?", "Quelle maison ?"],
            ["Classe 10 Plur.", "ZIV̄̅I", "Nyumba ziv̄i ?", "Quelles maisons ?"],
            ["Classes 11-14 Sing.", "UV̄̅I", "Uku uv̄i ?", "Quelle nuit ?"],
            [""],
            ["8.HAV̄I ? = Où ?"],
            ["", "- Dapani ɗe hav̄i ?", "Où se trouve Dapani ?"],
            ["- Usendra mukabala hav̄i ?", "A quel endroit vas-tu ?"],
            ["- Ulaa hav̄i ?", "D'où viens-tu ?"],
            ["- Wawe uketsi hav̄i ?", "Où habites-tu ?"],
            ["- Usuendra ɗe hav̄i ?", "Tu vas de quel côté ?"],
            [
              "- Hav̄i ɗe uendrao ?",
              "Où est-ce que tu vas ?(Voir : Chapitre 52.)",
            ],
            ["9.-NGAV̄I ? = Combien ?"],
            [
              "-ngav̄i ? prend des accords de classe. Lorsqu'il est adjectif, il se place après le nom et\n s'accorde en classe avec celui-ci.",
            ],
            [
              "Cl 2",
              "- V̄wa wanatsa wangav̄i v̄anu ?",
              "Combien y a-t-il d'enfants ici ?",
            ],
            [
              "Cl 4",
              "- Una maha mingav̄i ?",
              "Quel âge as-tu ? (Tu as années combien ?)",
            ],
            [
              "Cl 6",
              "- Usutsaha masindza mangav̄i ?",
              "Tu veux combien de bananes ?",
            ],
            ["Cl 8", "- Riyali ngav̄i ?", "Combien de Rials ? / Quel prix ?"],
            ["SA (YA) NGAV̄I ? = Quelle heure ?"],
            [
              "",
              "- Rina sa (ya) ngav̄i ?",
              "Quelle heure est-il ?(Nous avons heure combien ?)",
            ],
            ["10.LINI ? = Quand ?"],
            ["", "- Utsorudi lini ?", "Quand reviendras-tu ?"],
            ["- Lini ɗe utsorudi ?", "Quand est-ce que tu reviendras ?"],
            ["RANGU LINI ? = Depuis quand ?"],
            [
              "",
              "- Wawe uketsi Maore rangu lini ?",
              "Tu habites Mayotte depuis quand ?",
            ],
            [
              "- Rangu lini (ɗe) uketsio Maore ?",
              "Depuis quand est-ce que tu habites Mayotte ?",
            ],
            ["11.JEJE ? ou -JE ? suffixé au verbe = Comment ?"],
            ["", "- Usufanya jeje ? / Usufanyaje ?", "Comment fais-tu ?"],
            ["- Aifanya jeje ?", "Comment l'a-t-il fait ?"],
            ["- Jeje ?", "Comment ça va ?"],
            ["12.KISAJE ? = Combien ?"],
            [
              "",
              "- Fungu kisaje mwa ?",
              "Combien coûte le tas ?(Tas combien donc ?)",
            ],
            ["- Masindza kisaje ?", "Combien coûtent les bananes ?"],
            ["", "(Bananes combien ?)"],
            ["13.SAƁU ? = Est-ce que ?"],
            [
              "",
              "- Saɓu usikia, mwandzani ?",
              "Est-ce que tu entends, mon ami ?",
            ],
            ["- Saɓu ujiviwa ?", "Est-ce que tu es content ?"],
            [
              "- Saɓu ufanya trongo uambilwa ?",
              "Est-ce que tu as fait ce qu'on t'a dit ?",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ufuma", "chasser, tirer", "Umedza", "avaler"],
            ["Ugauha", "changer, se modifier", "Upotea", "se perdre, s'égarer"],
            ["Ukoma", "finir, se terminer", "Uruma", "déléguer, envoyer"],
            ["Ukwala", "trébucher", "Uvongona", "chuchoter"],
            ["Ulewa", "être ivre", "Uvuruha", "croquer"],
            ["Umaruha", "sursauter", "Uwana", "se battre"],
          ],
        },
      },
    ],
  },
  {
    id: 21,
    title: "21 - Les Nombres",
    description: "Enfin on va apprendre à compter, c'est super ease...",
    content: [
      {
        type: "titre",
        value: "Chapitre ",
      },
      {
        type: "text",
        value: "1. LES NOMBRES DE 1 A 19 :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["0", "KAV̄U / ZERO", "10", "KUMI"],
            ["1", "MOJA", "11", "KUMI NA MOJA"],
            ["2", "MBILI", "12", "KUMI NA MBILI"],
            ["3", "TRARU", "13", "KUMI NA TRARU"],
            ["4", "NNE", "14", "KUMI NA NNE"],
            ["5", "TSANO", "15", "KUMI NA TSANO"],
            ["6", "SITA", "16", "KUMI NA SITA"],
            ["7", "SAƁA", "17", "KUMI NA SAƁA"],
            ["8", "NANE", "18", "KUMI NA NANE"],
            ["9", "SHENDRA", "19", "KUMI NA SHENDRA"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Les nombres en shimaore se comportent comme des adjectifs, et comme tous les adjectifs, ils se placent après le nom, mais avant le démonstratif.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "",
              "Certains nombres sont invariables tandis que d'autres s'accordent en genre avec le nom !",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["CLASSE / NOM", "2", "3", "4", "5", "8"],
          rows: [
            [],
            ["Cl 2 Watru", "waili", "wararu", "wanne", "watsano", "wanane"],
            ["Cl 4 Miri", "mili", "miraru", "minne", "mitsano", "minane"],
            ["Cl 6 Magari", "maili", "mararu", "manne", "matsano", "manane"],
            ["Cl 8 Ziri", "mbili", "traru", "nne", "tsano", "nane"],
            ["Cl 10 Nguo", "mbili", "traru", "nne", "tsano", "nane"],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value: "2. LES DIZAINES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["10", "KUMI", "", ""],
            ["20", "SHIRINI", "60", "SITINI"],
            ["30", "THELATHINI", "70", "SAƁWINI"],
            ["40", "ARƁAINI", "80", "THAMANINI"],
            ["50", "HAMSINI", "90", "TUSWINI"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Lorsqu'une dizaine est suivie d'une unité, on fait précéder l'unité du mot NA = et.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value: "3. LES CENTAINES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["100", "MIA", "", ""],
            ["200", "MIA TENI", "600", "SITA MIA"],
            ["300", "THALATHA MIA", "700", "SAƁA MIA"],
            ["400", "ARƁA MIA", "800", "THAMANI MIA"],
            ["500", "HAMSU MIA", "900", "TUSU MIA"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Lorsqu'une centaine est suivie d'une unité, on fait précéder celle-ci du mot NA = et.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value:
          "Il en va de même lorsqu'elle est suivie d'une dizaine, jusqu'à 19.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value:
          "Mais lorsqu'une centaine est suivie d'une dizaine à partir de 20, on fait précéder celle-ci du mot WA = \"et\" en arabe. Il en va de même pour les milliers.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value: "4. LES MILLIERS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1000", "ALIFU", "", ""],
            ["2000", "ALIFU MBILI", "6000", "ALIFU SITA"],
            ["3000", "ALIFU TRARU", "7000", "ALIFU SAƁA"],
            ["4000", "ALIFU NNE", "8000", "ALIFU NANE"],
            ["5000", "ALIFU TSANO", "9000", "ALIFU SHENDRA"],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value: "5. LES FRACTIONS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1/2", "Nusu", "une moitié, un demi"],
            ["1/4", "Robo", "un quart"],
            ["1/8", "Thumuni", "un huitième"],
          ],
        },
      },
      {
        type: "text",
        value: "6. LES NOMBRES ORDINAUX :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["-A HANDRA", "Mutru wa handra", "La première personne"],
            ["-A V̄ILI", "Gari la v̄ili", "La deuxième voiture"],
            ["-A RARU", "Mara ya raru", "La troisième fois"],
            ["-A NNE", "Sha ya nne", "Le quatrième doigt"],
            ["-A TSANO", "Nyumba ya tsano", "La cinqième maison"],
            ["-A SITA", "Fi ya sita", "Le sixième poisson"],
            ["-A SAƁA", "Suku ya saɓa", "Le septième jour"],
            ["-A NANE", "Musomo wa nane", "La huitième leçon"],
            ["-A SHENDRA", "Mwezi wa shendra", "Le neuvième mois"],
            ["-A KUMI", "Munadzi wa kumi", "Le dixième cocotier"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["dremela / ndrema", "chauve-souris", "mbu", "moustique"],
            ["farasi", "cheval", "nyamba", "tortue"],
            ["fi", "poisson", "nyunyi", "oiseau"],
            ["kuba", "raie", "pundra", "âne"],
            ["kuhu", "poule", "pwedza", "poulpe"],
            ["landra", "hérisson", "tsutsuhu", "fourmi"],
          ],
        },
      },
    ],
  },
  {
    id: 22,
    title: "22 - L'Heure",
    description:
      "Il est rare qu'un personne indique l'heure en Shi-Maoré mais il est utile de savoir.",
    content: [
      {
        type: "text",
        value:
          "Mayotte est située près de l'équateur. Il y a donc peu de variations au cours de l'année dans les heures du lever et du coucher du soleil. Le soleil se lève vers 6 heures du matin et se couche vers six heures du soir.",
      },
      {
        type: "text",
        value:
          "Aussi 7 heures du matin est-elle la première heure du jour, et sept heures du soir est la première heure de la nuit : il y a donc un décalage de 6 heures entre l'heure \"occidentale\" et l'heure mahoraise.",
      },
      {
        type: "text",
        value:
          "Cependant, si l'heure est lue à la mahoraise, les pendules sont réglées à l'occidentale... Il faut donc à chaque fois ajouter ou retrancher mentalement 6 heures pour s'y retrouver !",
      },
      {
        type: "text",
        value: "1. L'HEURE JUSTE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "",
              "Pour demander l'heure, on utilise le mot SA (= heure, en arabe) ou LERA (= l'heure, en français) :",
            ],
            [
              "- Rina lera trini ?",
              "= Quelle heure avons-nous ?(= Nous avons heure quoi ?)",
            ],
            [
              "- Rina sa ya ngav̄i ?",
              "= Quelle heure avons-nous ?(= Nous avons heure de combien ?)",
            ],
            ["Pour dire l'heure, le mot SA (= heure) précède le chiffre."],
            [
              "- Rina sa ya kumi na moja",
              "= Nous avons onze heures(= Nous avons heure onzième)",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: ["HEURE MAHORAISE", "HEURE OCCIDENTALE"],
          rows: [
            ["Sa ya handra", "1ère heure", "7 h du matin"],
            ["Sa ya v̄ili", "2ème heure", "8 h du matin"],
            ["Sa ya raru", "3ème heure", "9 h du matin"],
            ["Sa ya nne", "4ème heure", "10 h du matin"],
            ["Sa ya tsano", "5 ème heure", "11 h du matin"],
            ["Sa ya sita", "6 ème heure", "12 h du matin"],
            ["Sa ya saɓa", "7 ème heure", "1 h de l'après-midi"],
            ["Sa ya nane", "8 ème heure", "2 h de l'après-midi"],
            ["Sa ya shendra", "9 ème heure", "3 h de l'après-midi"],
            ["Sa ya kumi", "10 ème heure", "4 h de l'après-midi"],
            ["Sa ya kumi na moja", "11 ème heure", "5 h de l'après-midi"],
            ["Sa ya kumi na mbili", "12 ème heure", "6 h du soir"],
          ],
        },
      },
      {
        type: "text",
        value:
          "EXPRESSION :Harimwa sa saɓa zaikamiliha = à une heure juste (à sept heures complètes)",
      },
      {
        type: "text",
        value:
          'Pour distinguer les heures de la nuit de celles du jour, il suffit d\'ajouter l\'expression "YA UKU" (= de\n la nuit) ou "YA UKWARI" (de UKU HARI = le milieu de la nuit). Ainsi :',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Aux petites heures de la nuit, on peut aussi se repérer au chant du coq !",
            ],
            ["- Kukuyi la handra", "(= le 1er coq)", "= 2 heures du matin"],
            ["- Kukuyi la v̄ili", "(= le 2ème coq)", "= 3 heures du matin"],
            ["- Kukuyi la raru", "(= le 3ème coq)", "= 4 heures du matin"],
          ],
        },
      },
      {
        type: "text",
        value: "2. IL Y A DES MINUTES EN PLUS :",
      },
      {
        type: "text",
        value:
          'Le mot "minute" se dit : DAKIKA. On mentionnera les minutes supplémentaire en comptant ainsi :',
      },
      {
        type: "text",
        value: 'La "demie" se dit : NUSU.',
      },
      {
        type: "text",
        value:
          "On constate que pour ajouter les minutes, on utilise le terme bantou NA (= et), alors que pour ajouter les demies on utilise le terme arabe WA (= et).",
      },
      {
        type: "text",
        value: "3. IL Y A DES MINUTES EN MOINS :",
      },
      {
        type: "text",
        value:
          "A partir de la demie, on comptera les minutes qui manquent pour atteindre l'heure suivante. On utilise\n l'expression : YAV̄UNGUHA DAKIKA ... = diminué de ... minutes.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Sa ya nane yav̄unguha dakika kumi",
              "huit heures moins dix (= 2 h moins 10)",
            ],
            [
              "Sa ya shendra yav̄unguha dakika shirini",
              "neuf heures moins vingt (= 3 h moins 20)",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "4. LES DIFFÉRENTES PÉRIODES DU JOUR ET DE LA NUIT :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["ASUƁUHI", "de 6 h à 9 h environ", "Le matin"],
            ["MUTSANA", "de 9 h à 14 h environ", "La journée"],
            ["UJONI", "de 14 h à 18 h environ", "L'après-midi, le soir"],
            ["UKU", "de 18 h à 6 h du matin", "La nuit"],
          ],
        },
      },
      {
        type: "text",
        value:
          "De plus, la journée est rythmée par les cinq prières de l'Islam qui servent de repères temporels :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["ALFADJIRI", "vers 4 h 30 / 5 h 10", "Prière de l'aube"],
            ["ADHUHURI", "vers 12 h / 12 h 30", "Prière de midi"],
            ["ALASIRI", "vers 16 h / 16 h 30", "Prière de l'après-midi"],
            ["MAHARIBI", "vers 18 h / 18 h 30", "Prière du coucher du soleil"],
            ["ALESHA", "vers 20 h", "Prière de la nuit"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Mubwabwa, wa-", "bavard", "Mushudjaa, wa-", "courageux"],
            [
              "Mudjisifu, wa-",
              "vantard",
              "Mustahamilifu, wa-",
              "patient, endurant",
            ],
            ["Muhara, wa-", "peureux", "Mutaalamu, wa-", "expert, spécialiste"],
            ["Mujinga, wa-", "sot, imbécile", "Mutoro, wa-", "sauvage, fuyard"],
            ["Mukaidi, wa-", "entêté", "Mutrulivu, wa", "calme, tranquille"],
            ["Munafiki, wa-", "traître, menteur", "Mwaminifu, wa-", "honnête"],
          ],
        },
      },
    ],
  },
  {
    id: 23,
    title: "23 - Jours, Mois, Dates",
    description:
      "Fesons un petit saut temporelle entre les jours, les mois et les années",
    content: [
      {
        type: "text",
        value: "1. LES JOURS DE LA SEMAINE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["MFUMOTSI", "(le 1er jour de la semaine)", "Samedi"],
            ["MFUMOV̄ILI", "(le 2ème jour de la semaine)", "Dimanche"],
            ["MFUMORARU", "(le 3ème jour de la semaine)", "Lundi"],
            ["MFUMONNE", "(le 4ème jour de la semaine)", "Mardi"],
            ["MFUMOTSANO", "(le 5ème jour de la semaine)", "Mercredi"],
            ["YAHOA", "(jour de bain)", "Jeudi"],
            ["DJIMWA", "(assemblée dans la mosquée)", "Vendredi"],
          ],
        },
      },
      {
        type: "text",
        value: "2. LES MOIS DU CALENDRIER GRÉGORIEN :",
      },
      {
        type: "text",
        value:
          "Le calendrier grégorien est le calendrier normalement utilisé dans toutes les activités de la vie quotidienne à Mayotte. Les noms des mois sont transcrits directement des mois français, et se prononcent de la même façon.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["JÃVYE", "Janvier", "JWIYE", "Juillet"],
            ["FEVRIYE", "Février", "UTU", "Août"],
            ["MARSI", "Mars", "SEPTAMBRU", "Septembre"],
            ["AVRILI", "Avril", "OKTOBRU", "Octobre"],
            ["ME", "Mai", "NOVAMBRU", "Novembre"],
            ["JWÎ", "Juin", "DESAMBRU", "Décembre"],
          ],
        },
      },
      {
        type: "text",
        value: "3. COMMENT LIRE UNE DATE :",
      },
      {
        type: "text",
        value:
          "Le chiffre de la date s'intercale entre le mot mwezi (= mois) et le nom du mois en question.",
      },

      {
        type: "text",
        value: "4. LES MOIS DU CALENDRIER DE L'HÉGIRE :",
      },
      {
        type: "text",
        value:
          "Bien que le calendrier grégorien soit le plus employé, le calendrier de l'hégire ou calendrier musulman est cependant utilisé pour tout ce qui concerne la vie religieuse et les fêtes musulmanes.",
      },
      {
        type: "text",
        value:
          "C'est un calendrier lunaire, avec des mois de 29 ou 30 jours. L'année lunaire étant plus courte d'environ 10 jours par rapport à l'année solaire, il y a un décalage croissant de 10 jours chaque\n année entre les deux calendriers : ce qui explique que l'on ne peut établir de correspondance fixe entre les mois du calendrier français et les mois musulmans.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["ASHURA", "Mouharram", "MIRADJI", "Rajab"],
            ["KARU", "Safar", "ƊEDZA", "Cha'ban"],
            ["MAULIDA", "Rabi' Al-Awwal", "RAMADHANI / TSUMU", "Ramadan"],
            ["V̄ILI WA MAULIDA", "Rabi' Al-Thani", "MUFUNGUO", "Chawwal"],
            [
              "RARU WA MAULIDA",
              "Joumada Al-Awwal",
              "V̄ILI WA MUFUNGUO",
              "Dhou Al-qi'da",
            ],
            ["SUMBWA", "Joumada Al-Thani", "HEDJA MAKA", "Dhou Al-Hijja"],
          ],
        },
      },
      {
        type: "text",
        value: "5. LES PRINCIPALES FÊTES MUSULMANES A MAYOTTE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "MAULIDA",
              "Maulid, ou Mouloud, commémore à la fois la naissance et la mort du prophète Mohamed (S.A.W.), (12 Rabioul Awwal.)",
            ],
            [
              "MIRADJI",
              "Miraj, commémore le voyage du prophète Mohamed (S.A.W.) à Jérusalem, et son ascension au ciel. (27 Rabioul Awwal.)",
            ],
            [
              "IDI EL FITRI",
              "Aïd-el-Fitr, fête la fin du mois de Ramadan, (1er Chawwal.)",
            ],
            [
              "IDI EL HADJI",
              "Aïd-el-Adha, (Aïd-el-Kebir), ou fête du sacrifice, (10 Zoul Hidjjah.)",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "6. QUELQUES EXPRESSIONS LIÉES AU TEMPS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Av̄asa v̄anu", "maintenant"],
            ["Ɓaãda meso", "Après-demain"],
            ["Idi mbaraka !", "Bonne fête de l'Aïd !"],
            ["Ina hale", "il y a longtemps"],
            ["Jana, V̄ojana", "hier, la veille"],
            ["Karne", "un siècle"],
            ["Leo", "aujourd'hui"],
            ["Lera", "quand, au moment où"],
            ["Meso", "demain"],
            ["Mufumo, mi-", "une semaine, des --"],
            ["Mufumo ujao", "la semaine prochaine"],
            ["Mwaha, maha", "une année, des --"],
            ["Mwaha jana", "l'année dernière"],
            ["Mwaha mwema !", "Bonne année !"],
            ["Mwahani", "l'année prochaine"],
            ["Mwezi, mezi", "un mois, des --"],
            ["Mwezi unu", "ce mois-ci"],
            ["Mwezini yavira", "le mois passé"],
            ["Sa ile", "à cette heure là"],
            ["Suku", "un jour, le jour où"],
            ["Suku ya v̄ili", "le jour suivant"],
            ["Suku yangina tsena", "un autre jour"],
            ["Ta rava", "jusqu'à maintenant"],
            ["Tsi hale", "bientôt"],
            ["V̄av̄o na v̄av̄o", "de temps en temps"],
            ["Wakati ukao", "à l'heure actuelle"],
            ["Wakati uwo", "à ce moment là"],
            ["Zama za hale", "autrefois"],
            ["Zamani", "dans le temps"],
            ["Zuzi", "avant-hier"],
          ],
        },
      },
    ],
  },
  {
    id: 24,
    title: "24 Le Genre U-",
    description:
      "Et c'est repartie, je sens qu'on ne va jamais s'ennuiyer avec ces genres.",
    content: [
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "⚠",
              "Ce que nous appelons ici le genre U- est en réalité la juxtaposition de 3 classes distinctes de noms, ayant chacune le préfixe nominal U- au singulier. Ce genre ne comporte pas de classes plurielles spécifiques.",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "Ces 3 classes sont :",
      },
      {
        type: "text",
        value: "1. CLASSE 11 : NOMS D'OBJETS CONCRETS À PLURIELS DIVERS :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "Pluriel", "Classe", "Traduction"],
          rows: [
            [],
            ["Uhura", "nguhura", "Cl 10", "un mur, des --"],
            ["Uku", "mauku", "Cl 6", "une nuit, des --"],
            ["Ulevu", "malevu", "Cl 6", "un poil de barbe, des --"],
            ["Ulimi", "malimi, maulimi", "Cl 6", "une langue, des --"],
            ["Umiyo", "maumiyo", "Cl 6", "la gorge, le gosier, des --"],
            ["Upanga", "mipanga", "Cl 4", "une machette, des --"],
            ["Ure", "mare", "Cl 6", "la bave, la salive"],
            ["Uso", "mauso, nguso", "Cl 6, 10", "un visage, des --"],
            ["Utro", "mautro", "Cl 6", "un toit, des --"],
            ["Uv̄andre", "v̄andre", "Cl 10", "un côté, des --"],
            ["Uwaɗe", "mawaɗe", "Cl 6", "une maladie, des --"],
            ["Uzi", "mauzi", "Cl 6", "un fil, des --"],
            ["Wakati", "makati, nyakati", "Cl 6, 10", "le temps, des moments"],
            ["Wani", "mani, mauani", "Cl 6", "une feuille, des --"],
            [
              "Waswiya",
              "nyasiya",
              "Cl 10",
              "un conseil, une recommandation, des --",
            ],
            [
              "Wingu",
              "mbingu, maingu",
              "Cl 10, 6",
              "le ciel, les --, des nuages",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "2. CLASSE 14 : NOMS SINGULIERS ABSTRAITS :",
      },
      {
        type: "text",
        value:
          "Ceux-ci sont la plupart du temps formés à partir d'une racine adjectivale, nominale ou verbale.",
      },
      {
        type: "text",
        value: "3. CLASSE 15 : VERBES SUBSTANTIVÉS (employés comme noms) :",
      },
      {
        type: "text",
        value:
          "L'infinitif des verbes en shimaore commence par U- (alors qu'il commence en HU- en shindzuani).\n C'est pour cette seule raison que nous avons placé ici l'étude des verbes substantivés, au lieu de les traiter dans un chapitre à part qui aurait été très court !",
      },
      {
        type: "text",
        value: "4. ACCORDS DE CLASSE DE L'ADJECTIF :",
      },
      {
        type: "text",
        value: "PROVERBE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uhaju, ma-", "le tamarin", "Upotevu", "l'égarement, la perte"],
            ["Umati", "la communauté", "Upwari", "la vantardise"],
            ["Umri", "l'âge", "Utukufu", "l'honneur"],
            ["Urisifu", "la laideur", "Wahadi", "une promesse"],
            ["Ushaɓaɓi", "l'adolescence", "Wivu", "la jalousie"],
            ["Ushauku", "l'envie, le désir", "Wongo, ma-", "le cerveau"],
          ],
        },
      },
    ],
  },
  {
    id: 25,
    title: "25 - Les Prépositions",
    description:
      "Maintenant on va se consacrer à positionner les objet dans l'espace.",
    content: [
      {
        type: "text",
        value:
          "RAPPEL : Une préposition est un mot qui permet de situer quelque chose dans l'espace ou dans le temps. (Par exemple : sur la table ; à cinq heures ; dans la maison.)",
      },
      {
        type: "text",
        value: "1. LES SUFFIXES LOCATIFS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "a. -NI = dans, sur",
              "Exemple : ƊAGO + NI\n -> Ɗagoni",
              "= dans / à la maison.",
            ],
            [
              "b. -JU = sur",
              "Exemple : MEZA + JU\n -> Mezaju",
              "= sur la table.",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "2. LES PRÉPOSITIONS",
      },
      {
        type: "text",
        value: "PROVERBE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Ɓaãda dhiki faradji.",
              "Après les difficultés, le bonheur.",
              "Après la pluie le beau temps.",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 26,
    title: "26 - Les Présentatifs",
    description:
      "Une notion très compliquée, restez motivé et tous va bien se passer",
    content: [
      {
        type: "text",
        value:
          'Il existe en shimaore une catégorie distincte de démonstratifs que nous appellerons des présentatifs. Les présentatifs du shimaore sont l\'équivalent des prépositions françaises "voici" et "voilà", ou encore : "le voici", "la voici", "les voici", et : "le voilà", "la voilà", "les voilà".',
      },
      {
        type: "text",
        value:
          "Comme pour les démonstratifs, il y a trois degrés de présentatifs :",
      },
      {
        type: "text",
        value: "1. LE PRÉSENTATIF DE PROXIMITÉ :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["PRÉFIXE TS- + (CONNECTIF A +) DÉMONSTRATIF DE PROXIMITÉ"]],
        },
      },
      {
        type: "text",
        value: "2. LE PRÉSENTATIF DE DISTANCE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [["PRÉFIXE TS- + (CONNECTIF A +) DÉMONSTRATIF DE DISTANCE"]],
        },
      },
      {
        type: "text",
        value: "3. LE PRÉSENTATIF DE RÉFÉRENCE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "PRÉFIXE ACTUALISATEUR TS- + (CONNECTIF A +) DÉMONSTRATIF DE RÉFÉRENCE",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "4. LES PRONOMS PRÉSENTATIFS :",
      },
      {
        type: "text",
        value:
          "Cette catégorie de présentatifs est formée avec le préfixe actualisateur TS- suivi du pronom personnel\n autonome. Elle existe pour les 1ères et les 2èmes personnes du singulier et du pluriel.",
      },
      {
        type: "text",
        value:
          "Nous donnons dans ce tableau deux réalisations de chaque présentatif, qui correspondent :",
      },
      {
        type: "table",
        value: {
          header: ["CLASSES", "PROXIMITÉ", "DISTANCE", "RÉFÉRENCE"],
          rows: [
            [
              "Classe 1 Sing\n Classe 2 Plur",
              "Tsunu / Tsuwanu\n Tswanu / Tsawanu",
              "Tsule / Tsuwale\n Tswale / Tsawale",
              "Tsuwo / Tsiwo\n Tswao / Tsawo",
            ],
            [
              "Classe 3 Sing\n Classe 4 Plur",
              "Tsunu / Tsuwanu\n Tsini / Tsiyanu",
              "Tsule / Tsuwale\n Tsile / Tsayale",
              "Tsuwo / Tsiwo\n Tsiyo",
            ],
            [
              "Classe 5 Sing\n Classe 6 Plur",
              "Tsilini / Tsilani\n Tsiyanu / Tsayani",
              "Tsilile / Tsilale\n Tsiyale / Tsayale",
              "Tsililo / Tsilo\n Tsayo",
            ],
            [
              "Classe 7 Sing\n Classe 8 Plur",
              "Tsini / Tsiyani\n Tsizini / Tsizani",
              "Tsile / Tsiyale\n Tsizile / Tsizale",
              "Tsiyo\n Tsizo",
            ],
            [
              "Classe 9 Sing\n Classe 10 Plur",
              "Tsini / Tsiyani\n Tsizini / Tsizani",
              "Tsile / Tsiyale\n Tsizile / Tsizale",
              "Tsiyo\n Tsizo",
            ],
            [
              "Classe 11 Sing",
              "Tsunu / Tsuwanu",
              "Tsule / Tsuwale",
              "Tsuwo / Tsiwo",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "5. EXEMPLES D'EMPLOI DES PRÉSENTATIFS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Ɓakuli, ma-",
              "un récipient, des --",
              "Fursheti, ma-",
              "une fourchette, des --",
            ],
            [
              "Ɓao, ma-",
              "une planche, des --",
              "Gazeti, ma-",
              "un journal, des --",
            ],
            ["Ɓavu, ma-", "un côté, des --", "Kofia, ma-", "un bonnet, des --"],
            [
              "Dirisha, ma-",
              "une fenêtre, des --",
              "Sembea, ma-",
              "un couteau, des --",
            ],
            [
              "Djeshi, ma-",
              "une armée, des --",
              "Shamba, maz-",
              "un champ, des --",
            ],
            [
              "Dzina, ma-",
              "un nom, des --",
              "Sutru, ma-",
              "une cuillère, des --",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 27,
    title: "27 - Le Lieu",
    description: "Il est tellement facile de comprendre le concept des lieux",
    content: [
      {
        type: "text",
        value: "1. LE SUFFIXE LOCATIF :",
      },
      {
        type: "text",
        value:
          "Il existe en shimaore un suffixe locatif qui peut être ajouté à pratiquement tous les noms communs concrets (excepté les noms d'animés). Ce suffixe est -NI et donne le sens de : dans, sur, à, en, là où il y a, etc...",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [],
            ["Ɓahari", "la mer", "Ɓaharini", "en mer"],
            ["Barji", "la barge", "Barjini", "sur la barge"],
            ["Ɗago", "la maison, la ville", "Ɗagoni", "en ville, chez soi"],
            ["Hazi", "le travail", "Hazini", "au travail, du travail"],
            ["Malavu", "des herbes", "Malavuni", "à la campagne"],
            ["Masiwa", "un archipel", "Masiwaini", "dans l'archipel"],
            ["Matso", "les yeux", "Matsoni", "dans les yes, au fond des yeux"],
          ],
        },
      },
      {
        type: "text",
        value: "Ce système a donné des noms de lieux-dits ou de villages :",
      },
      {
        type: "text",
        value:
          "Mais les noms propres de villes, pays, ainsi que certains lieux très fréquentés ne prennent pas ce suffixe, ainsi :",
      },
      {
        type: "text",
        value: "2. OÙ ? :",
      },
      {
        type: "text",
        value:
          'Pour demander : "où ?", on utilise l\'adverbe interrogatif : HAV̄I ?',
      },
      {
        type: "text",
        value: "3. LE DÉMONSTRATIF DE LIEU :",
      },
      {
        type: "text",
        value:
          "Il se place en général après le nom, sauf construction avec ɗe.",
      },
      {
        type: "text",
        value:
          "Il y a 6 démonstratifs de lieu, selon le degré de proximité et de précision du lieu :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [],
            ["", "PROXIMITÉ", "DISTANCE", "RÉFÉRENCE"],
            ["LIEU DÉFINI", "V̄ANU = ici", "V̄ALE = là-bas", "V̄AV̄O = là"],
            [
              "LIEU IMPRÉCIS",
              "HUNU = par ici",
              "HULE = par là-bas",
              "OHO = par là",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value: "4. LE LOCATIF A THEME POSSESSIF :",
      },
      {
        type: "text",
        value: 'type : "Dzangu", "Hangu".',
      },
      {
        type: "text",
        value: "Voir : la leçon suivante.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uduburiya", "faire le nécessaire", "Urema mbio", "faire vite"],
            ["Uendrelea", "continuer", "Ushindra", "pouvoir, vaincre"],
            ["Ufaulu", "réussir", "Ushuka mujini", "descendre en ville"],
            ["Uforoa", "trouer", "Ushukuria", "remercier"],
            [
              "Uheya liju",
              "monter en brousse",
              "Uvinga gari",
              "conduire une voiture",
            ],
            ["Ujiviwa", "se réjouir", "Uzinga", "tourner"],
          ],
        },
      },
    ],
  },
  {
    id: 28,
    title: "28 - La Possession",
    description:
      "Savoir si un objet vous appartient ou pas est primodiale, alors plongeons pour y voir un peu plus clair.",
    content: [
      {
        type: "text",
        value: '1. LE CONNECTIF "-A" :',
      },
      {
        type: "text",
        value:
          "Le \"de\" (de la, de l', du, des) français se traduit en shimaore par un mot dont la racine est -A. Le connectif -A doit s'accorder avec la classe nominale de l'objet ou de la personne possédée. Les connectifs sont de fait identiques aux formes de la 3ème personne du présent affirmatif du verbe UKA\n (= être), sauf en Classe 1 (WA au lieu de A).",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Cl 1", "WA", "Mwana wa ɓaɓa.", "L'enfant du père."],
            ["Cl 2", "WA", "Wana wa ɓaɓa.", "Les enfants du père."],
            ["Cl 3", "WA", "Muhono wa ɓaɓa.", "La main du père."],
            ["Cl 4", "YA", "Mihono ya ɓaɓa.", "Les mains du père."],
            ["Cl 5", "LA", "Gari la ɓaɓa.", "La voiture du père."],
            ["Cl 6", "YA", "Magari ya ɓaɓa.", "Les voitures du père."],
            ["Cl 7", "YA", "Shiri ya ɓaɓa.", "La chaise du père."],
            ["Cl 8", "ZA", "Ziri za ɓaɓa.", "Les chaises du père."],
            ["Cl 9", "YA", "Nguo ya ɓaɓa.", "Le vêtement du père."],
            ["Cl 10", "ZA", "Nguo za ɓaɓa.", "Les vêtements du père."],
            ["Cl 11/14", "WA", "Uso wa ɓaɓa.", "Le visage du père."],
          ],
        },
      },
      {
        type: "text",
        value: "ORDRE DES MOTS ET EXEMPLES :",
      },
      {
        type: "text",
        value:
          "Celui-ci est semblable à l'ordre des mots français, à la seule condition que l'adjectif suive le nom qu'il qualifie.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Mwana mutiti wa mama.", "Le petit enfant de maman."],
            [
              "Mihono mɓole ya umwana mutiti",
              "Les grosses mains du petit enfant.",
            ],
            ["Magoshi mav̄ia ya ɓaɓa.", "Les chaussures neuves de Papa."],
          ],
        },
      },
      {
        type: "text",
        value: "2. LES ADJECTIFS ET PRONOMS POSSESSIFS :",
      },
      {
        type: "text",
        value: "A. Le possesseur est une personne :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "ANGOU",
              "mon, ma, mes",
              "le mien, la mienne, les miens, les miennes",
            ],
            [
              "AHO",
              "ton, ta, tes",
              "le tien, la tienne, les tiens, les tiennes",
            ],
            [
              "AHE",
              "son, sa, ses",
              "le sien; la sienne, les siens, les siennes",
            ],
            ["ATRU", "notre, nos", "	le nôtre, la nôtre, les nôtres"],
            ["ANYU", "votre, vos", "le vôtre, la vôtre, les vôtres"],
            ["AO", "leur, leurs", "le leur, la leur, les leurs"],
          ],
        },
      },
      {
        type: "text",
        value: "AVEC LES NOMS DU GENRE MU-/WA- (Classes 1/2) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "", "Pluriel", ""],
          rows: [
            ["Mwana wangu", "mon enfant", "Wana wangu", "mes enfants"],
            ["Mwana waho", "ton enfant", "Wana waho", "tes enfants"],
            ["Mwana wahe", "son enfant", "Wana wahe", "ses enfants"],
            ["Mwana watru", "notre enfant", "Wana watru", "nos enfants"],
            ["Mwana wanyu", "votre enfant", "Wana wanyu", "vos enfants"],
            ["Mwana wo", "leur enfant", "Wana wo", "leurs enfants"],
          ],
        },
      },
      {
        type: "text",
        value: "AVEC LES NOMS DU GENRE MU-/MI- (Classes 3/4) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "", "Pluriel", ""],
          rows: [
            ["Muhono wangu", "ma main", "Mihono yangu", "mes mains"],
            ["Muhono waho", "ta main", "Mihono yaho", "tes mains"],
            ["Muhono wahe", "sa main", "Mihono yahe", "ses mains"],
            ["Muhono watru", "notre main", "Mihono yatru", "nos mains"],
            ["Muhono wanyu", "votre main", "Mihono yanyu", "vos mains"],
            ["Muhono wao", "leur main", "Mihono yao", "leurs mains"],
          ],
        },
      },
      {
        type: "text",
        value: "AAVEC LES NOMS DU GENRE MA- (Classes 5/6) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "", "Pluriel", ""],
          rows: [
            ["Gari langu", "ma voiture", "Magari yangu", "mes voitures"],
            ["Gari laho", "ta voiture", "Magari yaho", "tes voitures"],
            ["Gari lahe", "sa voiture", "Magari yahe", "ses voitures"],
            ["Gari latru", "notre voiture", "Magari yatru", "nos voitures"],
            ["Gari lanyu", "votre voiture", "Magari yanyu", "vos voitures"],
            ["Gari lao", "leur voiture", "Magari yao", "leurs voitures"],
          ],
        },
      },
      {
        type: "text",
        value: "AVEC LES NOMS DU GENRE SHI-/ZI- (Classes 7/8) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "", "Pluriel", ""],
          rows: [
            ["Shiri yangu", "ma chaise", "Ziri zangu", "mes chaises"],
            ["Shiri yaho", "ta chaise", "Ziri zaho", "tes chaises"],
            ["Shiri yahe", "sa chaise", "Ziri zahe", "ses chaises"],
            ["Shiri yatru", "notre chaise", "Ziri zatru", "nos chaises"],
            ["Shiri yanyu", "votre chaise", "Ziri zanyu", "vos chaises"],
            ["Shiri yao", "leur chaise", "Ziri zao", "leurs chaises"],
          ],
        },
      },
      {
        type: "text",
        value: "AVEC LES NOMS DU GENRE N- (Classes 9/10) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", "", "Pluriel", ""],
          rows: [
            ["Nguo yangu", "mon vêtement", "Nguo zangu", "mes vêtements"],
            ["Nguo yaho", "ton vêtement", "Nguo zaho", "tes vêtements"],
            ["Nguo yahe", "son vêtement", "Nguo zahe", "ses vêtements"],
            ["Nguo yatru", "notre vêtement", "Nguo zatru", "nos vêtements"],
            ["Nguo yanyu", "votre vêtement", "Nguo zanyu", "vos vêtements"],
            ["Nguo yao", "leur vêtement", "Nguo zao", "leurs vêtements"],
          ],
        },
      },
      {
        type: "text",
        value: "AVEC LES NOMS DU GENRE U- (Classes 11, 14) :",
      },
      {
        type: "table",
        value: {
          header: ["Singulier", ""],
          rows: [
            ["Uku wangu", "ma nuit"],
            ["Uku waho", "ta nuit"],
            ["Uku wahe", "sa nuit"],
            ["Uku watru", "notre nuit"],
            ["Uku wanyu", "votre nuit"],
            ["Uku wao", "leur nuit"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Les adjectifs ou pronoms possessifs s'accordent en classe avec le nom de l'objet possédé. Les préfixes\n de classe, identiques aux connectifs, seront suivis des thèmes possessifs suivants :",
      },
      {
        type: "text",
        value: "B. Le possesseur est une chose :",
      },
      {
        type: "text",
        value:
          "Il existe une série de thèmes possessifs propres aux classes nominales représentant des objets :",
      },
      {
        type: "table",
        value: {
          header: ["GENRE / Classes", "SINGULIER", "PLURIEL"],
          rows: [
            [],
            ["MU-/MI- (Cl 3/4)", "-AO", "-AYO"],
            ["MA- (Cl 5/6)", "-ALO", "-AYO"],
            ["SHI-/ZI- (Cl 7/8)", "-AYO", "-AZO"],
            ["N- (Cl 9/10)", "-AYO", "-AZO"],
            ["U- (Cl 11, 14)", "-AO", ""],
            ["Classes locatives", "-AV̄O"],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Zitru za hatwari za ɗagoni zilazimu zihetsiwe uju, moni mwa zipambo zazo. (zipambo za zitru).",
              "Les objets dangereux de la maison doivent être placés en haut, dans leurs emballages. (les emballages des choses).",
            ],
            [
              "Harimwa ikomini ya Momoju likoli mbili mpia ɗe zitsoɓuao milango yazo mwaha hunu. (milango ya likoli).",
              "Dans la communue de Mamoudzou ce sont deux écoles qui ouvriront leurs portes. (les portes des écoles).",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "3. CONTRACTIONS : NOMS DE PERSONNES + ADJ. POSSESSIFS :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Mwana wangu", "Mwanangu", "=  mon enfant"],
            ["Mwana wahe", "Mwanahe", "=  son enfant"],
            ["Wana waho", "Wanaho", "=  tes enfants"],
            ["Ɓaɓa wangu", "Ɓaɓangu", "=  mon père"],
            ["Ɓaɓa wahe", "Ɓaɓahe", "=  son père"],
            ["Mama wangu", "Mayangu", "=  ma mère"],
            ["Mama waho", "Mayaho", "=  ta mère"],
            ["Koko wangu", "Kokwangu", "=  ma grand-mère"],
            ["Zama wangu", "Zamangu", "=  mon oncle"],
            ["Mwananya wangu", "Mwananyangu", "=  mon frère, ma sœur"],
            ["Mwananya waho", "Mwananyaho", "=  ton frère, ta sœur"],
            ["Munyawe wangu", "Munyangu", "=  mon ami, mon camarade"],
          ],
        },
      },
      {
        type: "text",
        value: '4. DEUX PRONOMS POSSESSIFS "LOCATIFS" :',
      },
      {
        type: "text",
        value:
          'La particule réflexive  DZI- associée aux thèmes possessifs prend le sens de "s\'en aller" et donne la\nsérie de pronoms possessifs suivants :',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Nisuendra  DZANGU", "Je m'en vais"],
            ["Usuendra  DZAHO", "Tu t'en vas"],
            ["Asuendra  DZAHE", "Il / elle s'en va"],
            ["Risuendra  DZATRU", "Nous nous en allons"],
            ["Musuendra  DZANYU", "Vous vous en allez"],
            ["Wasuendra  DZAO", "Ils / elles s'en vont"],
          ],
        },
      },
      {
        type: "text",
        value:
          'La particule prépositionnelle  HA-  associée aux thèmes possessifs prend le sens de "chez soi" et donne la série de pronoms possessifs suivants :',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["HANGU", "chez moi"],
            ["HAHO", "chez toi"],
            ["HAHE", "chez lui / chez elle"],
            ["HATRU", "chez nous"],
            ["HANYU", "chez vous"],
            ["HAO", "chez eux / chez elles"],
          ],
        },
      },
      {
        type: "text",
        value:
          "Cette dernière série de pronoms possessifs s'utilise aussi comme adjectifs possessifs après  les noms suffixés en  -NI  (= à, dans, sur) :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "ɗagoni hangu",
              "dans mon village",
              "ɗagoni hatru",
              "dans notre village",
            ],
            [
              "ɗagoni haho",
              "dans ton village",
              "ɗagoni hanyu",
              "dans votre village",
            ],
            [
              "ɗagoni hahe",
              "dans son village",
              "ɗagoni hao",
              "dans leur village",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 29,
    title: "29 - Les Infixes Compléments",
    description:
      "Il n'existe pas de pronom complément d'objet ou de pronom attribut autonome en shimaore...",
    content: [
      {
        type: "text",
        value:
          " De la même façon que le pronom sujet est intégré à la construction verbale sous forme de préfixe sujet, le pronom complément d'objet ou le pronom attribut se réalise comme un infixe à l'intérieur du verbe. Il est situé juste avant la racine verbale.",
      },
      {
        type: "text",
        value:
          "Voici d'abord quelques exemples, pour bien comprendre ce phénomène :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "1. U-SI-NI-ONA",
              "-> Usiniona",
              "= tu me vois.",
              "Compl. d'objet",
            ],
            ["2. TSI-HU-AMBIA", "-> Tsihuambia", "= je te dis.", "Attribut"],
            [
              "3. A-MU-REME",
              "-> Amureme",
              "= il / elle l'a frappé(e).",
              "Compl. d'objet",
            ],
            [
              "4. A-SI-MU-V̄A-NI",
              "-> Asimuv̄ani",
              "= il / elle vous donne.",
              "Attribut",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "Les infixes compléments d'objet existent pour toutes les classes nominales, avec une série spéciale d'infixes pour le genre MU-/WA-, qui servent indifféremment de pronoms compléments d'objet ou de pronoms d'attribution (= complément d'objet indirect).",
      },
      {
        type: "text",
        value: "1. LES INFIXES COMPLÉMENTS DES ANIMÉS ET INANIMÉS :",
      },
      {
        type: "table",
        value: {
          header: [
            "GENRES / Classes",
            "SINGULIER",
            "Equivalent",
            "PLURIEL",
            "Equivalent",
          ],
          rows: [
            [],
            [
              "12MU-/WA- (Cl 1 / 2)\n 3",
              "-NI-\n -HU-\n -MU- / -MW-",
              "me, moi\n te, toi\n le, la , l', lui",
              "-RI-\n -MU- ... -NI\n -WA-",
              "nous\n vous\n les, leur",
            ],
            ["MU-/MI- (Cl 3 / 4)", "-U-", "le, la , l'", "-I-", "les"],
            ["MA- (Cl 5 / 6)", "-LI-", "le, la , l'", "-YA-", "les"],
            ["SHI-/ZI- (Cl\n 7 / 8)", "-I-", "le, la , l'", "-ZI-", "les"],
            ["N- (Cl 9 / 10)", "-I-", "le, la , l'", "-ZI-", "les"],
            ["U- (Cl 11,\n 14)", "-U-", "le, la , l'", "", ""],
            ["Classes Locatives", "-V̄WA-", "y, en", "", ""],
          ],
        },
      },
      {
        type: "text",
        value:
          "On remarque le risque de confusion entre l'infixe complément de la 3ème personne du singulier (Classe 1) et celui de la 2ème personne du pluriel qui sont tous les deux -MU-.",
      },
      {
        type: "text",
        value:
          'Ainsi : Tsimuambia peut signifier : "je lui dis" ou "je vous dis".',
      },
      {
        type: "text",
        value:
          "Pour éviter ce risque de confusion, on ajoute habituellement la terminaison plurielle -NI à la fin du verbe lorsqu'il s'agit de l'infixe complément de la 2ème personne du pluriel. Ainsi :",
      },
      {
        type: "text",
        value: "2. EMPLOI DE l'INFIXE PRONOM COMPLÉMENT :",
      },
      {
        type: "text",
        value:
          "L'infixe complément remplace (ou renforce), soit un nom complément d'objet direct, soit un nom attribut. De même que le préfixe sujet s'utilise en même temps que le nom sujet, l'infixe complément, inséré dans le verbe, s'emploie même lorsque le nom attribut ou le nom complément d'objet est présent\n dans la phrase. Il renforce alors celui-ci.",
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1. Risuhuvulikia.", "Nous t' écoutons."],
            [
              "2. Ɓaɓa, Mama, musinilishe weke !",
              "Papa, Maman, ne me laissez pas seul !",
            ],
            [
              "3. Tsina midzo. - Ivahidze ɓasi !",
              "J'ai des bagages. - Montez-les alors !",
            ],
            [
              "4. Mwanangu a hav̄i ? - Tsimuono pareni.",
              "Où est mon enfant ? - Je l'ai vu sur la route.",
            ],
            ["5. Muhire !", "Appelle-le !"],
            ["Muhire Ali ! (et non : Hira Ali !)", "Appelle (-le) Ali !"],
            ["6. Waye umuria ha nguvu.", "Il le craint beaucoup."],
            [
              "Waye umuria ɓaɓahe ha nguvu.",
              "Il (le) craint beaucoup son père.",
            ],
            [
              "7. Maji muhimu, nariyahifadhi !",
              "L'eau est importante, protégeons-la !",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "3. REMARQUES :",
      },
      {
        type: "text",
        value:
          "Dans cet exemple, c'est le pronom attribut -HU- qui occupe la place de l'infixe complément, le complément d'objet direct est sous-entendu. L'attribut a toujours priorité sur le complément d'objet direct pour occuper la place de l'infixe complément à l'intérieur du verbe.",
      },
      {
        type: "text",
        value:
          "Lorsque 2 pronoms (attribut + complément d'objet) sont absolument nécessaires, on pourra ajouter un suffixe complément d'objet, ou \"-O\" de référence, à la fin du verbe.",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Mimea (Cl 4)",
              "des plantes",
              "Munyamba, mi-",
              "un badamier, des --",
            ],
            [
              "Muɓa, mi-",
              "une épine, des --",
              "Mupwera, mi-",
              "un goyavier, des --",
            ],
            [
              "Muhaju, mi-",
              "un tamarin, des --",
              "Murandra, mi-",
              "un dattier sauvage, des --",
            ],
            [
              "Muhõko, mi-",
              "un palétuvier, des --",
              "Murindri, mi-",
              "un bananier, des --",
            ],
            [
              "Mukonokono, mi-",
              "un corossolier, des --",
              "Mutseve, mi-",
              "feuille de cocotier",
            ],
            [
              "Mukungu, mi-",
              "régime de bananes",
              "Muzi, mi-",
              "une racine, des --",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 30,
    title: "30 - Le Subjonctif",
    description:
      "Changeons un peu de sujets allons y on va étudier le subjonctif",
    content: [
      {
        type: "text",
        value:
          "Tout comme en français, le subjonctif est fréquemment employé après une idée d'obligation, ou pour faire une suggestion, etc.. mais aussi à la suite d'un premier verbe, que celui-ci exprime une volonté ou non, là où le français utilise habituellement un infinitif.",
      },
      {
        type: "text",
        value: "1. FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value: "MODÈLE : USOMA = lire, étudier",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["NI-SOME", "-> nisome", "que je lise"],
            ["U-SOME", "-> usome", "que tu lises"],
            ["A-SOME", "-> asome", "qu'il / elle lise"],
            ["RI-SOME", "-> risome", "que nous lisions"],
            ["MU-SOME", "-> musome", "que vous lisiez"],
            ["WA-SOME", "-> wasome", "qu'ils / elles lisent"],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Risome trini ?", "Que faut-il que nous lisions ?", ""],
            [
              "Nifanye hazi na mbani ?",
              "Avec qui faut-il que je travaille ?",
              "",
            ],
            [
              "Atsaha alole mutru mushe.",
              "Il veut épouser une femme.",
              "(Il veut qu'il épouse ...)",
            ],
            ["Ko uketsi.", "Viens t'asseoir.", "(Viens que tu t'asseyes)"],
          ],
        },
      },
      {
        type: "text",
        value: "2. FORME NÉGATIVE :",
      },
      {
        type: "text",
        value: "MODÈLE : USOMA = lire, étudier",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["NI-SI-SOME", "-> nisisome", "que je ne lise pas"],
            ["U-SI-SOME", "-> usisome", "que tu ne lises pas"],
            ["A-SI-SOME", "-> asisome", "qu'il /elle ne lise pas"],
            ["RI-SI-SOME", "-> risisome", "que nous ne lisions pas"],
            ["MU-SI-SOME", "-> musisome", "que vous ne lisiez pas"],
            ["WA-SI-SOME", "-> wasisome", "qu'ils / elles ne lisent pas"],
          ],
        },
      },
      {
        type: "text",
        value:
          "On constate que le SUBJONCTIF NÉGATIF est identique à l'IMPÉRATIF NÉGATIF.",
      },
      {
        type: "text",
        value: '3. LE SUBJONCTIF APRÈS "ENDRA" :',
      },
      {
        type: "text",
        value:
          'En français on dit habituellement : "Je vais (il va / vous allez /elles vont / etc...) faire."',
      },
      {
        type: "text",
        value: 'On constate que le verbe qui suit "aller" est à l\'infinitif.',
      },
      {
        type: "text",
        value:
          "En shimaore, le verbe qui suit ENDRA (= aller) se conjugue au subjonctif, avec l'addition d'un infixe de contingence -A- placé entre le préfixe sujet et le radical verbal :",
      },
      {
        type: "text",
        value: "MODÈLE: UENDRA UNUNUA TROVI = aller acheter des bananes",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Nisendra nanunue trovi.", "Je vais acheter des bananes."],
            ["Usendra uanunue troovi.", "Tu vas acheter des bananes."],
            ["Asendra anunue trovi.", "Il /elle va acheter des bananes."],
            ["Risendra ranunue trovi.", "Nous allons acheter des bananes."],
            ["Musendra mwanunue trovi.", "Vous allez acheter des bananes."],
            [
              "Wasendra wanunue trovi.",
              "Ils / elles vont acheter des bananes.",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "text",
        value: "4. MOTS EXPRIMANT L'OBLIGATION, SUIVIS D'UN SUBJONCTIF :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ilazimu, Lazima", "il faut", "Afudhwali", "il vaut mieux"],
            [
              "Ulazimisha",
              "obliger quelqu'un",
              "Bora / Borwa",
              "cela vaut mieux",
            ],
            ["Sharuti", "il est obligatoire", "Ile, Pare", "afin de"],
            ["Hairi", "il vaut mieux", "Yafarudhwi", "c'est obligé"],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1. Afudhwali uje.", "Il vaut mieux que tu viennes."],
            ["2. Bora niendre dzangu.", "Mieux vaut que je retourne chez moi."],
            ["3. Alazimishwa amuliv̄e.", "On l'a obligé à le payer."],
            [
              "4. Hairi uendre dzaho.",
              "Il vaut mieux que tu retournes chez toi.",
            ],
            [
              "5. Mwanadamu imlazimu afanye hazi ile ayeshi.",
              "L'homme est obligé de travailler pour vivre.(L'homme il lui faut qu'il travaille pour qu'il vive.)",
            ],
          ],
        },
      },
    ],
  },
  {
    id: 31,
    title: "31 - L'Imparfait",
    description: "Et c'est reparti , encore un peu de conjugaison",
    content: [
      {
        type: "text",
        value:
          "Ce temps comporte une idée de durée de l'action dans le passé, et se traduira en général par un IMPARFAIT en français. (Il correspond au PAST CONTINUOUS de l'anglais.)",
      },
      {
        type: "text",
        value:
          "La marque de temps de l'imparfait est l'infixe -KO-, dérivé du verbe UKA = être.",
      },
      {
        type: "text",
        value:
          "De plus, un infixe de contingence -A- se place entre le pronom sujet et le marqueur de temps, transformant les préfixes sujets de la façon suivante :",
      },
      {
        type: "table",
        value: {
          header: [
            "Classe",
            "Forme affirmative",
            "Equivalence",
            "Forme négative",
            "Equivalence",
          ],
          rows: [
            [],
            [
              "Cl 1\n \n \n Cl 2",
              "NI + A- : NA-\n U + A- : UA-\n A + A- : A-\n RI + A- : RA-\n MU + A- : MWA-\n WA + A- : WA-",
              "= je\n = tu\n = il / elle\n = nous\n = vous\n = ils / elles",
              "TSI + A- : TSA-\n KU + A- : KWA-\n KA + A- : KA-\n KARI + A- : KARA-\n KAMU + A- : KAMWA-\n KAWA + A- : KAWA-",
              "= je ne ......... pas\n = tu ne ......... pas\n = il / elle ne .... pas\n = nous ne ...... pas\n = vous ne ....... pas\n = ils/elles ne ... pas",
            ],
            [
              "Cl 3, 11\n Cl 4",
              "U + A- : UA-\n I + A- : YA-",
              "= il / elle\n = ils / elles",
              "KAU + A- : KAUA-\n KAI + A- : KAYA-",
              "= il /elle ne ... pas\n = ils/elles ne ... pas",
            ],
            [
              "Cl 5\n Cl 6",
              "LI + A- : LA-\n I + A- : YA-",
              "= il / elle\n = ils / elles",
              "KALI + A- : KALA-\n KAI + A- : KAYA-",
              "= il /elle ne ... pas\n = ils/elles ne ... pas",
            ],
            [
              "Cl 7, 9\n Cl 8, 10",
              "I + A- : YA-\n ZI + A- : ZA-",
              "= il / elle\n = ils / elles",
              "KAI + A- : KAYA-\n KAZI + A- : KAZA-",
              "= il /elle ne ... pas\n = ils/elles ne ... pas",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "1. L'IMPARFAIT - FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value: "MODÈLE : UFANYA = faire",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["NA-KO-FANYA", "-> nakofanya", "je faisais"],
            ["UA-KO-FANYA", "-> uakofanya", "tu faisais"],
            ["A-KO-FANYA", "-> akofanya", "il /elle faisait"],
            ["RA-KO-FANYA", "-> rakofanya", "nous faisions"],
            ["MWA-KO-FANYA", "-> mwakofanya", "vous faisiez"],
            ["WA-KO-FANYA", "-> wakofanya", "ils / elles faisaient"],
          ],
        },
      },
      {
        type: "text",
        value: "2. L'IMPARFAIT - FORME NÉGATIVE :",
      },
      {
        type: "text",
        value: "MODÈLE : UFANYA = faire",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["TSA-KO-FANYA", "-> tsakofanya", "je ne faisais pas"],
            ["KWA-KO-FANYA", "-> kwakofanya", "tu ne faisais pas"],
            ["KA-KO-FANYA", "-> kakofanya", "il / elle ne faisait pas"],
            ["KARA-KO-FANYA", "-> karakofanya", "nous ne faisions pas"],
            ["KAMWA-KO-FANYA", "-> kamwakofanya", "vous ne faisiez pas"],
            ["KAWA-KO-FANYA", "-> kawakofanya", "ils / elles ne faisaient pas"],
          ],
        },
      },
      {
        type: "text",
        value: "3. EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uɓarikishiha", "prospérer", "Uola", "pourrir"],
            ["Ufereshea", "féliciter", "Urongodza", "saluer"],
            ["Uhora", "rêver", "Urumia", "utiliser"],
            ["Uliya", "pleurer", "Utseha", "rire"],
            ["Unuka fetre", "sentir bon", "Uv̄uma", "souffler"],
            ["Unuka nai", "sentir mauvais", "Uwula", "tuer"],
          ],
        },
      },
    ],
  },
  {
    id: 32,
    title: "32 - Le Futur",
    description: "Dans le futur, vous saurrez comment parler futur 🤣",
    content: [
      {
        type: "titre",
        value: "Chapitre ",
      },
      {
        type: "text",
        value: "La marque de temps du FUTUR est l'infixe -TSO-.",
      },
      {
        type: "text",
        value: "1. LE FUTUR - FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value:
          "La marque de temps -TSO- est placée entre le préfixe sujet, identique à celui du présent, et la racine verbale :",
      },
      {
        type: "text",
        value: "MODÈLE : UFANYA = faire",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["NI-TSO-FANYA", "-> nitsofanya", "je ferai"],
            ["U-TSO-FANYA", "-> utsofanya", "tu feras"],
            ["A-TSO-FANYA", "-> atsofanya", "il / elle fera"],
            ["RI-TSO-FANYA", "-> ritsofanya", "nous ferons"],
            ["MU-TSO-FANYA", "-> mutsofanya", "vous ferez"],
            ["WA-TSO-FANYA", "-> watsofanya", "ils / elles feront"],
          ],
        },
      },
      {
        type: "text",
        value: "2. LE FUTUR - FORME NÉGATIVE :",
      },
      {
        type: "text",
        value:
          "La marque de temps -TSO- est placée entre le préfixe sujet négatif, identique à celui du présent, et la racine verbale :",
      },
      {
        type: "text",
        value: "MODÈLE : UFANYA = faire",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["TSI-TSO-FANYA", "-> tsitsofanya", "je ne ferai pas"],
            ["KU-TSO-FANYA", "-> kutsofanya", "tu ne feras pas"],
            ["KA-TSO-FANYA", "-> katsofanya", "il / elle ne fera pas"],
            ["KARI-TSO-FANYA", "-> karitsofanya", "nous ne ferons pas"],
            ["KAMU-TSO-FANYA", "-> kamutsofanya", "vous ne ferez pas"],
            ["KAWA-TSO-FANYA", "-> kawatsofanya", "ils / elles ne feront pas"],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uɓuɓua", "battre, frapper", "Usia", "conseiller"],
            ["Uɓuriha", "se taire", "Usonga", "harceler"],
            ["Uyenga", "haïr, détester", "Usuka", "tresser, coiffer"],
            ["Uhondra", "maigrir", "Utrala", "se sauver"],
            ["Ukura", "être rassasié", "Utsunga", "élever, garder (bêtes)"],
            ["Urara", "flâner, vagabonder", "Uzunguha", "chercher"],
          ],
        },
      },
    ],
  },
  {
    id: 33,
    title: "33 - L'Infixe Réfléchi -DJI-",
    description:
      "On verra des exemples de son utilisation et un petit vocabulaire.",
    content: [
      {
        type: "text",
        value:
          "En français, on utilise le pronom réfléchi \"se\" devant le verbe pour marquer qu'une action est réfléchie,\n c'est-à-dire dirigée vers celui qui la fait.",
      },
      {
        type: "text",
        value:
          "Par exemple : Il se voit = il se voit lui-même (dans un miroir, ou en imagination, etc...)",
      },
      {
        type: "text",
        value:
          "En shimaore, on utilise un INFIXE COMPLÉMENT D'OBJET particulier : -DJI- (ou -DZI-) placé\n entre le marqueur de temps et la racine verbale. Cet infixe reste le même à toutes les personnes.",
      },
      {
        type: "text",
        value:
          "EXEMPLE : UONA = voir UDJIONA = se voir, se croire, s'enorgueillir",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Nisidjiona", "je me vois"],
            ["Usidjiona", "tu te vois"],
            ["Asidjiona", "il / elle se voit"],
            ["Risidjiona", "nous nous voyons"],
            ["Musidjiona", "vous vous voyez"],
            ["Wasidjiona", "ils / elles se voient"],
          ],
        },
      },
      {
        type: "text",
        value:
          "La forme réfléchie peut être utilisée à tous les temps, y compris l'infinitif, et à toutes les formes, affirmatives et négatives :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Présent habituel :", "Wami udjiona", "je me vois"],
            [
              "Présent habituel négatif :",
              "Wami tsidjiono",
              "je ne me vois pas",
            ],
            ["Présent actuel :", "Nisudjiona", "je me vois"],
            ["Présent actuel négatif :", "Tsisudjiona", "je ne me vois pas"],
            ["Accompli :", "Tsidjiono", "je me suis vu"],
            ["Accompli négatif :", "Tsadjiona", "je ne me suis pas vu"],
            ["Imparfait :", "Nakodjiona", "je me voyais"],
            ["Imparfait négatif :", "Tsakodjiona", "je ne me voyais pas"],
            ["Futur :", "Nitsodjiona", "je me verrai"],
            ["Futur négatif :", "Tsitsodjiona", "je ne me verrai pas"],
            ["Conditionnel :", "Natsodjiona", "je me verrais"],
            ["Conditionnel négatif :", "Tsatsodjiona", "je ne me verrais pas"],
            ["Impératif :", "Djione !", "vois-toi !"],
            ["Impératif négatif :", "Usidjione !", "ne te vois pas !"],
          ],
        },
      },
      {
        type: "text",
        value: "REMARQUE :",
      },
      {
        type: "text",
        value:
          "Tous les pronoms réfléchis français ne se traduisent pas par -DJI- :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Udjiduburia", "se débrouiller", "Udjikia", "se sentir"],
            [
              "Udjidzisa",
              "se demander, s'interroger",
              "Udjinyongoha",
              "s'étirer",
            ],
            ["Udjihada", "se tromper", "Udjipara", "se trouver, se retrouver"],
            [
              "Udjihifadhwi",
              "se protéger",
              "Udjirema",
              "se frapper, se mordre",
            ],
            ["Udjihodza", "se faire mal", "Udjisifu", "se vanter"],
            ["Udjihosa", "se laver", "Udjitayarisha", "se préparer"],
            [
              "Udjikaza",
              "se croire fort",
              "Udjitria hamu",
              "se faire du soucis",
            ],
            ["Udzisomedza", "s'apprendre", "", ""],
          ],
        },
      },
      {
        type: "text",
        value: "VOCABULAIRE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["daruba", "cyclone", "mwamba", "barrière de corail"],
            ["kashikazi", "saison des pluies", "pev̄o", "vent"],
            ["kibula", "Nord", "sikloni", "cyclone, tempête"],
            ["kusi", "saison sèche", "swilihi", "Sud"],
            ["maharibi", "Ouest", "trotro", "terre, saleté"],
            ["mashariki", "Est", "tsi", "terre, pays"],
          ],
        },
      },
    ],
  },
  {
    id: 34,
    title: "34 - La Forme Passive",
    description:
      "La voie passive consiste à subir l'action, vous allez subir cette partie",
    content: [
      {
        type: "text",
        value:
          'En français, il est courant de mettre un verbe à la voix passive en le faisant précéder de l\'auxiliaire "être", le verbe principal se mettant alors au participe passé.',
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Ainsi :",
              "Il fait",
              "-> Il est fait",
              "Il prend",
              "-> Il est pris",
            ],
            ["", "Il frappe", "-> Il est frappé", "Il bat", "-> Il est battu"],
          ],
        },
      },
      {
        type: "text",
        value:
          "On obtient le même résultat en shimaore en remplaçant la terminaison  -A  du verbe par le suffixe  -WA\n(ou -IWA, -LWA, -LIWA, -OLWA).",
      },
      {
        type: "text",
        value:
          "(1) Lorsque le radical verbal se termine par une consonne : -A remplacé par le suffixe  -WA :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uɓala", "fermer", "-> Uɓalwa", "être fermé"],
            ["Uhira", "appeler", "-> Uhirwa", "être appelé (par qq'un)"],
            ["", "-> Uhiriwa", "être nommé, s'appeler"],
            ["Uiɓa", "voler", "-> Uiɓwa", "être volé (chose)"],
            ["", "-> Uiɓiwa", "être volé (parlant de qq'un)"],
            ["Ulisha", "laisser", "-> Ulishwa", "être laissé"],
            ["Uliv̄a", "payer", "-> Uliv̄wa", "être payé"],
            ["Ulola", "marier", "-> Ulolowa", "être épousée"],
            ["Urema", "frapper", "-> Uremwa", "être frappé"],
            ["Uruma", "employer", "-> Urumwa", "être employé"],
            [
              "Ushindra",
              "battre, gagner",
              "-> Ushindrwa",
              "être battu, vaincu",
            ],
            ["Usika", "attraper", "-> Usikwa", "être attrapé"],
          ],
        },
      },
      {
        type: "text",
        value:
          "(2) Lorsque le radical verbal se termine par une voyelle : -A remplacé par -LWA  ou -LIWA :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Udzaa", "accoucher", "-> Udzalwa", "être né, naître"],
            [
              "Ufungua",
              "détacher, délier",
              "-> Ufunguliwa",
              "divorcer, être répudiée",
            ],
            ["Ujua", "savoir, connaître", "-> Ujuliwa", "être connu"],
            ["Urongoa", "dire, parler", "-> Urongolwa", "être dit"],
            ["Utria", "mettre", "-> Utrilwa", "être mis"],
            ["Utsahua", "choisir", "-> Utsahulwa", "être choisi"],
          ],
        },
      },
      {
        type: "text",
        value:
          "(3) Les verbes d'origine arabe terminés en  -I  et  -U  prennent le suffixe  -IWA  :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uɓadili", "changer", "-> Uɓadiliwa", "être changé"],
            ["Uhetsi", "déposer, laisser", "-> Uhetsiwa", "être déposé"],
            ["Uruhusu", "autoriser", "-> Uruhusiwa", "être autorisé"],
          ],
        },
      },
      {
        type: "text",
        value:
          "(4) Cas des verbes monosyllabiques : suffixe  -IWA  ou  -OLWA  :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ula", "manger", "-> Uliwa", "être mangé"],
            ["Unwa", "boire", "-> Unolwa", "être bu"],
            ["Urwa", "piler", "-> Urolwa", "être pilé"],
            ["Uv̄a", "donner", "-> Uv̄olwa", "être donné"],
          ],
        },
      },
      {
        type: "text",
        value: "REMARQUE :",
      },
      {
        type: "text",
        value:
          "Certains verbes ont déjà un sens passif dans leur forme simple :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ulemewa", "être fatigué"],
            ["Ulewa", "être ivre"],
            ["Uwa", "tomber, être tombé"],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Shahula yontsi piya iliwa.", "Toute la nourriture a été mangée."],
            [
              "Mwana av̄olwa zawadi.",
              "On a donné un cadeau à l'enfant. (L'enfant a été donné...)",
            ],
            ["Aremwa na ɓaɓahe.", "Il a été battu par son père."],
            ["Waye uhiriwa Ali.", "Il s'appelle Ali. (Il est appelé Ali.)"],
            [
              'Duka lahe uhiriwa "Océane Fashion".',
              'Sa boutique s\'appelle "Océane Fashion"',
            ],
            [
              "Tsirongolwa amba Fatima alolwa.",
              "On m'a dit que Fatima s'est mariée.(J'ai été dit que Fatima a été épousée.)",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Uɗuha", "vieillir", "Ukohola", "tousser"],
            ["Ueledza", "expliquer", "Ulowa", "être trempé"],
            ["Uelewa", "comprendre", "Unahana", "se souvenir"],
            ["Uhiɓa", "voler", "Uzihira", "soigner"],
            ["Uhodza", "faire mal, blesser", "Uziliya", "refroidir"],
            ["Ukodza", "avoir mal, souffrir", "Uzima", "éteindre"],
          ],
        },
      },
    ],
  },
  {
    id: 35,
    title: "35 - La Forme Stative",
    description: "Très similaire à la voie passive rien de compliquer",
    content: [
      {
        type: "text",
        value:
          "Un verbe à la forme stative est assez semblable par le sens à un verbe à la forme passive, sauf qu'il ne dit pas par qui ou par quoi l'action a été faite. Il implique invariablement un état résultant ou latent, d'où le nom de STATIF, ou de FORME STATIVE, donné à cette dérivation.",
      },
      {
        type: "text",
        value: "EXEMPLE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Mwiri upasuwa na mwanamtsa unu",
              "= L'arbre a été cassé par ce jeune",
              "forme passive",
            ],
            ["Mwiri upasuha", "= L'arbre est cassé", "forme stative"],
          ],
        },
      },
      {
        type: "text",
        value:
          "La dérivation stative a pour autre particularité de faire passer un verbe de la catégorie transitive à la catégorie intransitive, c'est-à-dire d'empêcher le verbe dérivé d'avoir un complément d'objet direct. En français, ce changement de catégorie s'effectue en plaçant un pronom réfléchi devant le verbe afin d'obtenir un verbe pronominal intransitif.",
      },
      {
        type: "text",
        value: "EXEMPLE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "Upasua",
              "fendre, casser (qq chose)",
              "Upasuha",
              "se fendre, se casser",
            ],
            [
              "Ufundra",
              "instruire, enseigner (qq'un)",
              "Ufundriha",
              "s'instruire",
            ],
          ],
        },
      },
      {
        type: "text",
        value:
          "La dérivation stative s'obtient en remplaçant la terminaison -A du radical par le suffixe -HA (ou -IHA,\n -EHA). Certains verbes prennent la terminaison -NA après le suffixe -HA.",
      },
      {
        type: "text",
        value: "1. QUELQUES VERBES A LA FORME STATIVE :",
      },
      {
        type: "text",
        value: "REMARQUES :",
      },
      {
        type: "text",
        value: "2. EXEMPLES D'EMPLOI :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "1. Gari langu umenyeha daima.",
              "Ma voiture tombe toujours en panne.",
            ],
            [
              "2. Marikabu ionehana oho baharini.",
              "Le bateau était visible au loin sur la mer.",
            ],
            ["3. Trongo iyo kaitsofanyishiha.", "Ça ne pourra pas se faire."],
            ["4. Narifundrihe shimaore.", "Instruisons-nous en shimaore."],
          ],
        },
      },
      {
        type: "text",
        value: "VOCABULAIRE :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["bako", "bonhomme", "ntseso / tseso", "rire"],
            ["kasia", "pagaie, rame", "ntshari / tshari", "achards"],
            ["malaika", "ange", "nye", "foie"],
            ["masala", "épices", "tsindzi", "sommeil"],
            ["nahuda", "capitaine", "tsumu", "jeûne"],
            ["nanga", "ancre", "vule", "grillade, pique-nique"],
          ],
        },
      },
    ],
  },
  {
    id: 36,
    title: "36 - L'Accompli Absolu",
    description: "Voyons le seul tepms composée qui existe en Shi-Maoré",
    content: [
      {
        type: "text",
        value:
          "Ce temps, qui est le seul vrai temps composé en shimaore, sert à parler d'une action définitivement acquise dans le passé.",
      },
      {
        type: "text",
        value:
          "On le traduit en français par un passé composé ou un plus-que-parfait.",
      },
      {
        type: "text",
        value: "1. FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value:
          "Elle est formée de 2 verbes juxtaposés : l'auxiliaire UKA (= être) conjugué à  l'ACCOMPLI, suivi du verbe principal, également conjugué à l'ACCOMPLI.",
      },
      {
        type: "text",
        value:
          "L'auxiliaire, ainsi que le verbe principal, sont chacun précédés de leur préfixe sujet.",
      },
      {
        type: "text",
        value: "MODÈLE :      UENDRA    =  aller",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["TSIKA", "TSIENDRE", "-> Tsika tsiendre", "j'étais allé"],
            ["UKA", "UENDRE", "-> Uka uendre", "tu étais allé"],
            ["AKA", "AENDRE", "-> Aka aendre", "il / elle était allé"],
            ["RIKA", "RIENDRE", "-> Rika riendre", "nous étions allés"],
            ["MUKA", "MUENDRE", "-> Muka muendre", "vous étiez allés"],
            ["WAKA", "WAENDRE", "-> Waka waendre", "ils / elles étaient allés"],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["1.Tsika tsino maji.", "J'avais bu de l'eau."],
            ["2. Uka ukodzo.", "Tu étais blessé."],
            ["3. Aka arenge ɓwe ɓole.", "Il avait pris une grosse pierre."],
            ["4. Rika rinunua trovi.", "Nous avions acheté des bananes."],
            ["5. Muka mulawa malavuni.", "Vous étiez partis à la campagne."],
            [
              "6. Wandzani wangu waka wanihiri jana.",
              "Mes amis m'ont appelé hier.",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "2. FORME NÉGATIVE :",
      },
      {
        type: "text",
        value:
          "L'auxiliaire  UKA  est conjugué à  l'ACCOMPLI NÉGATIF, tandis que le verbe principal se met à la forme affirmative du PASSÉ RELATIF.",
      },
      {
        type: "text",
        value:
          "L'auxiliaire, ainsi que le verbe principal, sont chacun précédés de leur préfixe sujet.",
      },
      {
        type: "text",
        value: "MODÈLE : UENDRA =  aller",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["TSAKA", "NAENDRA", "-> Tsaka naendra", "je n'étais pas allé"],
            ["KWAKA", "UAENDRA", "-> Kwaka uaendra", "tu n'étais pas allé"],
            ["KAKA", "AENDRA", "-> Kaka aendra", "il / elle n'était pas allé"],
            [
              "KARAKA",
              "RAENDRA",
              "-> Karaka raendra",
              "nous n'étions pas allés",
            ],
            [
              "KAMWAKA",
              "MWAENDRA",
              "-> Kamwaka mwaendra",
              "vous n'étiez pas allés",
            ],
            [
              "KAWAKA",
              "WAENDRA",
              "-> Kawaka waendra",
              "ils / elles n'étaient pas allés",
            ],
          ],
        },
      },
      {
        type: "text",
        value: "EXEMPLES :",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            [
              "1. Karaka ranunua trovi.",
              "Nous n'avions pas acheté de bananes.",
            ],
            [
              "2. Kamwaka mwalawa malavuni.",
              "Vous n'étiez pas partis à la campagne.",
            ],
            [
              "3. Wandzani wangu kawaka wanihiri jana.",
              "Mes amis ne m'ont pas appelé hier.",
            ],
            ["4. Mwana kaka ala shahula.", "L'enfant n'avait pas mangé."],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Udai", "réclamer", "Uodza", "se répandre, étaler"],
            ["Udjiri", "se passer, arriver", "Ustahamili", "endurer"],
            ["Uɗungamana", "accompagner", "Utamani", "désirer"],
            ["Ufanana", "se ressembler", "Utekeleza", "faire une déclaration"],
            ["Uhafadhwi", "protéger", "Utsonga", "harceler, tracasser"],
            ["Uheana", "faire l'amour", "Uzuru", "visiter"],
          ],
        },
      },
    ],
  },
  {
    id: 37,
    title: "37 - Le Conditionnel",
    description: "Bah finisson par le conditionnel rien de compliqué",
    content: [
      {
        type: "text",
        value:
          "On emploie au CONDITIONNEL le même infixe de temps -TSO- que pour le FUTUR.",
      },
      {
        type: "text",
        value:
          "Ce qui distingue ces deux temps l'un de l'autre est l'adjonction de l'infixe de contingence -A- placé entre le préfixe sujet et le marqueur de temps -TSO-.",
      },
      {
        type: "text",
        value:
          "Ceci a pour résultat de modifier les pronoms sujets, comme à l'imparfait. (Voir : Chapitre 32.)",
      },
      {
        type: "text",
        value:
          "Les emplois du conditionnel en shimaore sont comparables à ceux du français : suggestion polie et formulation d'une hypothèse réelle au passé.",
      },
      {
        type: "text",
        value: "1. FORME AFFIRMATIVE :",
      },
      {
        type: "text",
        value: "MODÈLE : UV̄ENDZA = aimer",
      },
      {
        type: "text",
        value: "2. FORME NÉGATIVE :",
      },
      {
        type: "text",
        value: "MODÈLE : UV̄ENDZA = aimer",
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["TSA-TSO-V̄ENDZA", "-> Tsatsov̄endza", "je n'aimerais pas"],
            ["KWA-TSO-V̄ENDZA", "-> Kwatsov̄endza", "tu n'aimerais pas"],
            ["KA-TSO-V̄ENDZA", "-> Katsov̄endza", "il / elle n'aimerait pas"],
            ["KARA-TSO-V̄ENDZA", "-> Karatsov̄endza", "nous n'aimerions pas"],
            ["KAMWA-TSO-V̄ENDZA", "-> Kamwatsov̄endza", "vous n'aimeriez pas"],
            [
              "KAWA-TSO-V̄ENDZA",
              "-> Kawatsov̄endza",
              "ils / elles n'aimeraient pas",
            ],
          ],
        },
      },
      {
        type: "table",
        value: {
          header: [],
          rows: [
            ["Ɓewe, ma-", "bouc", "Kulukulu, ma-", "dinde, dindon"],
            ["Dzukutsi, ma-", "canard", "Paha, mav̄aha", "chat"],
            ["Furudji, ma-", "sauterelle", "Tarundru, marundru", "caméléon"],
            ["Kalafuba, ma-", "crabe", "Trambwi, marambwi", "scolopendre"],
            [
              "Kalalawi, mahalalawi",
              "cafard, cancrelas",
              "Trutri, marutri",
              "souris",
            ],
            ["Kukuyi, ma-", "coq", "V̄ungov̄ungo, ma-", "guèpe"],
          ],
        },
      },
    ],
  },
];
