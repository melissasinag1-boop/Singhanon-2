/* ============================================================
   SINGHANON — Dictionary Data
   ------------------------------------------------------------
   Each entry is a plain object. To add a new word, just add a
   new object to the DICTIONARY_ENTRIES array below and save.
   The app validates every entry when it loads (see app.js) and
   silently skips anything malformed, so one bad entry can never
   crash the whole app.

   Required fields:
     word        - the Aklanon headword (string)
     pos         - part-of-speech code, e.g. "n", "RV1", "CV" (string)
     definition  - the English meaning (string)

   Optional fields:
     origin      - language of origin, e.g. "Sp", "Eng", "Tag"
     example     - { aklanon: "...", english: "..." }
     alt         - alternate spelling/form (string)
     related     - related word, synonym, or opposite (string)
     page        - source page number in the 1969 dictionary (number)

   Source: Salas Reyes, V., Zorc, R. D. P., & Prado, N. (1969).
   A Study of the Aklanon Dialect, Volume Two: Dictionary (of Root
   Words and Derivations), Aklanon to English. Peace Corps.
   (ERIC ED145704)
   ============================================================ */

const DICTIONARY_ENTRIES = [
  { word: "a", pos: "n", definition: "The first letter of the native Aklanon alphabet, representing the low central unrounded vowel /a/.", page: 39 },
  { word: "a", pos: "intj", definition: "A tag particle expressing annoyance, similar to \u2018ach\u2019.", example: { aklanon: "Indi\u2019 takon, a.", english: "I will not, ach." }, page: 39 },
  { word: "ab", pos: "intj", definition: "An exclamation of discovery, similar to \u2018oh\u2019 said with high intonation.", page: 39 },
  { word: "abaka", pos: "n", origin: "Sp", definition: "Abaca fibers, Manila hemp (Musa textilis).", related: "linabag", page: 39 },
  { word: "abaka", pos: "RV7", definition: "To be abundant, be in abundance.", example: { aklanon: "Nagaabak-abak ro bunga ku mais.", english: "The corn crop is abundant." }, page: 39 },
  { word: "abakada", pos: "n", definition: "The alphabet; name of the first-grade textbook that teaches it.", page: 39 },
  { word: "abakas", pos: "RV1", definition: "To afford.", example: { aklanon: "Indi\u2019 ako makabakas karon.", english: "I can't afford it right now." }, page: 39 },
  { word: "abalong", pos: "n", definition: "Taro (Colocasia esculenta), a root-crop tuber.", related: "gaway", page: 39 },
  { word: "abaga", pos: "n", definition: "Shoulder(s).", page: 39 },
  { word: "abaga", pos: "RV1", definition: "To take responsibility for, to shoulder, to take on.", example: { aklanon: "Sin-o ro gaabaga ku trabaho ngato?", english: "Who will take on that job?" }, page: 39 },
  { word: "abaniko", pos: "n", origin: "Sp", definition: "A fan.", related: "kabkab", page: 39 },
  { word: "abaniko", pos: "RV4", definition: "To fan.", page: 39 },
  { word: "abano", pos: "n", origin: "Sp", definition: "A large cigar.", page: 39 },
  { word: "abante", pos: "RV6", origin: "Sp", definition: "To go forward, advance.", related: "opposite of atras", page: 39 },
  { word: "abante", pos: "RV3", origin: "Sp", definition: "To endure, put up with.", page: 39 },
  { word: "abay", pos: "n", origin: "Tag", definition: "A sponsor at a wedding or baptism.", page: 40 },
  { word: "abi", pos: "Dp", definition: "A particle used in excuses or explanations, meaning \u2018but,\u2019 \u2018well,\u2019 or \u2018because.\u2019", example: { aklanon: "Ham-an owa ka ratha kagab-i?...Masakit abi ako.", english: "Why weren't you there last night?...Well, I was sick." }, page: 40 },
  { word: "abi", pos: "Dp", definition: "A requesting particle, similar to \u2018gimme\u2019 or \u2018come on.\u2019", example: { aklanon: "Abi anay ron.", english: "First give it [to me]." }, page: 40 },
  { word: "abi-abi", pos: "RV3", definition: "To welcome, to entertain.", page: 40 },
  { word: "maabi-abihon", pos: "adj", definition: "Hospitable, friendly.", page: 40 },
  { word: "abyan", pos: "n", definition: "Friend.", related: "abi-abi", page: 40 },
  { word: "abnormal", pos: "adj", origin: "Eng", definition: "Abnormal, out of the ordinary.", page: 40 },
  { word: "abo", pos: "n", definition: "Ash, ashes.", page: 40 },
  { word: "abo", pos: "RV1", definition: "To make into ashes.", page: 40 },
  { word: "abogado", pos: "n", origin: "Sp", definition: "Lawyer, advocate.", related: "manananbang", page: 40 },
  { word: "abusar", pos: "RV1", origin: "Sp", definition: "To abuse, take undue advantage of.", alt: "abuso", page: 41 },
  { word: "abusado", pos: "adj", definition: "Abusive.", page: 41 },
  { word: "abuso", pos: "n", definition: "Abuse.", page: 41 },
  { word: "abunar", pos: "RV3", origin: "Sp", definition: "To pay in advance, advance credit on one's account, or let someone use something without payment.", example: { aklanon: "Gin-abunaran ko ro imong kuwang rito.", english: "I advanced payment on what you owe here." }, page: 41 },
  { word: "abundante", pos: "adj", origin: "Sp", definition: "Abundant, plentiful.", page: 41 },
  { word: "abuno", pos: "n", origin: "Sp", definition: "Fertilizer.", page: 41 },
  { word: "abuno", pos: "RV3", definition: "To fertilize.", example: { aklanon: "Abunohi ro imong banas.", english: "Fertilize your land." }, page: 41 },
  { word: "abot", pos: "RV4", definition: "To arrive, get to one's destination, go as far as.", example: { aklanon: "Hin-uno imaw maabot?", english: "When will he arrive?" }, page: 41 },
  { word: "abot", pos: "RV1", definition: "To catch up with.", example: { aklanon: "Naabot nakon imaw.", english: "I caught up with him." }, page: 41 },
  { word: "Abril", pos: "n", origin: "Sp", definition: "April, the fourth month of the year.", page: 42 },
  { word: "absent", pos: "adj", origin: "Eng", definition: "Absent.", alt: "pae-at", page: 42 },
  { word: "abtik", pos: "RV1", definition: "To get faster, speed up.", page: 42 },
  { word: "maabtik", pos: "adj", definition: "Quick, dexterous, accurate, clever, sharp.", page: 42 },
  { word: "abyador", pos: "n", origin: "Sp", definition: "Pilot, aviator.", page: 42 },
  { word: "agaw", pos: "RV1", definition: "To take for oneself, grab (land, possessions).", page: 42 },
  { word: "maagaw", pos: "adj", definition: "Greedy, always taking for oneself.", related: "hakog", page: 42 },
  { word: "akasya", pos: "n", origin: "Sp", definition: "The acacia or rain tree (Samanea saman).", page: 42 },
  { word: "Aklan", pos: "n", definition: "The province of Aklan.", page: 42 },
  { word: "Aklanon", pos: "adj", definition: "Pertaining to Aklan.", page: 42 },
  { word: "Aklanon", pos: "n", definition: "An Aklanon; an inhabitant of the province of Aklan.", page: 42 },
  { word: "Aklanon", pos: "RV5", definition: "To speak Aklanon.", example: { aklanon: "inakeanan nga hambae", english: "the Aklanon language" }, page: 42 },
  { word: "akig", pos: "ST2", definition: "To be angry, be furious at.", example: { aklanon: "Naakig imaw kakon.", english: "She's angry at me." }, page: 42 },
  { word: "akig", pos: "n", definition: "Anger, fury, rage.", page: 42 },
  { word: "ako", pos: "RV1", definition: "To assume responsibility for, take upon oneself, avow, claim as one's own, or admit (guilt).", example: { aklanon: "Indi\u2019 imaw mag-akô ku anang mga sae\u2019a.", english: "He won't admit his mistakes." }, page: 42 },
  { word: "akô", pos: "T/pro", definition: "I, me (topic pronoun).", page: 43 },
  { word: "akon", pos: "A/pro", definition: "My, mine (associate pronoun).", example: { aklanon: "akon nga baeay", english: "my house" }, page: 43 },
  { word: "aksidenti", pos: "n", origin: "Sp", definition: "Accident.", page: 43 },
  { word: "aktor", pos: "n", origin: "Eng", definition: "Actor.", related: "artista", page: 43 },
  { word: "aktres", pos: "n", origin: "Eng", definition: "Actress.", related: "artista", page: 43 },
  { word: "adlaw", pos: "n", definition: "Day; sun.", related: "buean (moon)", page: 43 },
  { word: "adlaw-adlaw", pos: "adv", definition: "Daily, every day.", page: 43 },
  { word: "adobo", pos: "n", origin: "Sp", definition: "Adobo \u2014 food cooked in a vinegar-garlic preparation until dry, then fried.", page: 43 },
  { word: "adobo", pos: "RV1", definition: "To cook by the adobo method.", example: { aklanon: "Adobohi ro manok.", english: "Adobo the chicken." }, page: 43 },
  { word: "adto", pos: "RV4", definition: "To go to, go see.", alt: "agto", example: { aklanon: "May adtoan pa ako.", english: "I still have somewhere to go." }, page: 43 },
  { word: "paadto", pos: "CV", definition: "To send, have someone go.", example: { aklanon: "Paadtona imaw sa Capiz.", english: "Have him go to Capiz." }, page: 43 },
  { word: "adyos", pos: "intj", origin: "Sp", definition: "Goodbye \u2014 used especially before a long journey.", page: 44 },
  { word: "agahon", pos: "n", definition: "Morning.", example: { aklanon: "Mayad-ayad nga agahon.", english: "Good morning." }, page: 45 },
  { word: "aga-aga", pos: "n", definition: "Very early morning, about 4:00 a.m.", page: 45 },
  { word: "agak", pos: "n", definition: "An old, mature rooster.", related: "sueog (young rooster)", page: 45 },
  { word: "agi", pos: "RV3", definition: "To pass by, bypass, pass up.", example: { aklanon: "Haagyan namon imaw.", english: "We passed him by." }, page: 46 },
  { word: "agi", pos: "n", definition: "Handwriting, script.", example: { aklanon: "Sadya ra agi.", english: "His handwriting is nice." }, page: 46 },
  { word: "agi\u2019", pos: "adj", definition: "Effeminate.", page: 46 },
  { word: "agila", pos: "n", origin: "Sp", definition: "Eagle.", page: 46 },
  { word: "agubay", pos: "RV3", definition: "To support or assist in walking, as in helping a lame person walk.", example: { aklanon: "Agubayi ratong magueang.", english: "Help that old man walk." }, page: 47 },
  { word: "agwanta", pos: "RV1", origin: "Sp", definition: "To endure, bear, or stretch to one's limit of endurance.", example: { aklanon: "Agwantaha ro imong kalisod.", english: "Bear that hardship of yours." }, page: 48 },
  { word: "agwador", pos: "n", origin: "Sp", definition: "A water carrier, water seller.", page: 47 },
  { word: "Agosto", pos: "n", origin: "Sp", definition: "August, the eighth month of the year.", page: 47 },
  { word: "alahas", pos: "n", origin: "Sp", definition: "Jewelry.", page: 49 },
  { word: "alahero", pos: "n", definition: "Jeweler.", page: 49 },
  { word: "alambre", pos: "n", origin: "Sp", definition: "Wire, for hanging clothes, fastening, etc.", page: 49 },
  { word: "alin", pos: "Qp", definition: "\u2018Do what?\u2019 \u2014 used in all manner of interrogative stative forms.", example: { aklanon: "Gaalin ka?", english: "What are you doing?" }, page: 51 },
  { word: "alisto", pos: "adj", origin: "Sp", definition: "Alert, clever, bright, agile \u2014 \u2018ready and able.\u2019", page: 51 },
  { word: "almanake", pos: "n", origin: "Sp", definition: "Almanac, yearbook, or calendar of events.", page: 51 },
  { word: "almires", pos: "n", origin: "Sp", definition: "A mortar and pestle set.", page: 51 },
  { word: "aluminyo", pos: "n", origin: "Eng", definition: "Aluminum (the metal).", page: 51 },
  { word: "ama", pos: "n", definition: "Father.", page: 52 },
  { word: "amakan", pos: "n", definition: "A mat of woven bamboo.", related: "sawali", page: 52 },
  { word: "amag", pos: "ST3", definition: "To get moldy.", page: 52 },
  { word: "amag", pos: "n", definition: "Mold.", page: 52 },
  { word: "amamako", pos: "n", definition: "A large, light-brown mushroom, dark brown in the center.", related: "hapon-hapon", page: 52 },
  { word: "amat-amat", pos: "RV6", definition: "To do something a little at a time, bit by bit.", page: 52 },
  { word: "ambag", pos: "RV3", definition: "To share with, chip in on paying for something.", page: 52 },
  { word: "ambisyon", pos: "n", origin: "Sp", definition: "Ambition, aim, desire.", page: 53 },
  { word: "ambisyoso", pos: "adj", definition: "Ambitious (male).", page: 53 },
  { word: "ambisyosa", pos: "adj", definition: "Ambitious (female).", page: 53 },
  { word: "ambulansya", pos: "n", origin: "Sp", definition: "Ambulance.", page: 53 },
  { word: "amigo", pos: "n", origin: "Sp", definition: "Friend, buddy.", related: "abyan", page: 53 },
  { word: "mag-amigo", pos: "REL.v", definition: "To be friends.", example: { aklanon: "Mag-amigo sanda.", english: "They're friends." }, page: 53 },
  { word: "amihan", pos: "n", definition: "The northeast wind.", page: 53 },
  { word: "amin", pos: "RV1", definition: "To get or take all, take everything.", example: { aklanon: "Amina tanan ro kwarta.", english: "Take all the money." }, page: 53 },
];

/* Convenience: valid part-of-speech codes recognized by the app.
   Anything outside this list still displays, just in a neutral
   default color, so a typo in a new entry never breaks the UI. */
const POS_LABELS = {
  "n":       "noun",
  "adj":     "adjective",
  "adv":     "adverb",
  "intj":    "interjection",
  "conj":    "conjunction",
  "prep":    "preposition",
  "Dp":      "discourse particle",
  "Qp":      "question particle",
  "T/pro":   "topic pronoun",
  "A/pro":   "associate pronoun",
  "R/pro":   "referent pronoun",
  "REL.v":   "verb of relationship",
  "CV":      "causative verb",
  "DV":      "distributive verb",
  "RV1": "regular verb (class 1)", "RV2": "regular verb (class 2)",
  "RV3": "regular verb (class 3)", "RV4": "regular verb (class 4)",
  "RV5": "regular verb (class 5)", "RV6": "regular verb (class 6)",
  "RV7": "regular verb (class 7)", "RV8": "regular verb (class 8)",
  "RV9": "regular verb (class 9)",
  "ST1": "stative verb (class 1)", "ST2": "stative verb (class 2)",
  "ST3": "stative verb (class 3)", "ST4": "stative verb (class 4)",
  "ST5": "stative verb (class 5)",
};

/* ------------------------------------------------------------
   Make both available on window explicitly.
   Top-level const/let in a plain script do NOT attach to window
   (only var does), but app.js reads them as window.DICTIONARY_
   ENTRIES and window.POS_LABELS. Without these two lines, the
   app always sees an empty dictionary, no matter what data.js
   contains.
   ------------------------------------------------------------ */
window.DICTIONARY_ENTRIES = DICTIONARY_ENTRIES;
window.POS_LABELS = POS_LABELS;
