const countryCards = [
  {
    id: 'united-states',
    name: 'United States',
    displayName: 'United States of America',
    emoji: '🗽',
    continent: 'Americas',
    flag: '🇺🇸',
    aliases: ['usa', 'u.s.a.', 'united states of america', 'america'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦅 Look for the country where the bald eagle watches over wide rivers and snowy mountains.',
      },
      {
        label: 'Food Clue',
        text: '🍔 Backyard cookouts with burgers, smoky barbecue, and corn on the cob are a weekend tradition here.',
      },
      {
        label: 'Flag Clue',
        text: '🇺🇸 Its flag waves with 13 stripes for the original colonies and 50 brilliant stars.',
      },
    ],
    discovery: {
      animalFact: 'Bald eagles build nests that can weigh a metric ton along Alaskan rivers and coastal cliffs.',
      greeting: '"Howdy" is a friendly hello you might hear from explorers in Texas cattle country.',
      fossil: '🦕 The famous Tyrannosaurus rex skeleton “Sue” was discovered in South Dakota.',
      history:
        '🏺 Indigenous nations have mapped this land for millennia; in 1969 NASA launched Apollo 11 to the Moon.',
      space: '🪐 NASA assembled the Destiny laboratory module for the International Space Station in Florida.',
    },
  },
  {
    id: 'japan',
    name: 'Japan',
    displayName: 'Japan',
    emoji: '🗻',
    continent: 'Asia',
    flag: '🇯🇵',
    aliases: ['nihon', 'nippon'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦌 Sika deer politely bow to visitors near temples in one of this country’s historic capitals.',
      },
      {
        label: 'Food Clue',
        text: '🍣 Artful rolls of sushi and warm bowls of ramen are beloved across these islands.',
      },
      {
        label: 'Flag Clue',
        text: '🇯🇵 Picture a white banner with a bright red sun rising at the center.',
      },
    ],
    discovery: {
      animalFact: 'In Nara Park, sika deer have learned to bow in exchange for special rice crackers.',
      greeting: '"Konnichiwa" (こんにちは) is a cheerful daytime greeting.',
      fossil: '🦕 Paleontologists unearthed the Futabasaurus dinosaur along Fukushima’s coast.',
      history: '🏯 Samurai once protected the shogun in Edo, which later became Tokyo.',
      space: '🪐 JAXA’s Kibo laboratory adds Japanese science experiments to the International Space Station.',
    },
  },
  {
    id: 'egypt',
    name: 'Egypt',
    displayName: 'Arab Republic of Egypt',
    emoji: '🛕',
    continent: 'Africa',
    flag: '🇪🇬',
    aliases: ['arab republic of egypt'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🐪 Dromedary camels trek past golden dunes to reach ancient river oases.',
      },
      {
        label: 'Food Clue',
        text: '🥣 Koshari mixes lentils, pasta, tomato sauce, and crispy onions into a hearty street food favorite.',
      },
      {
        label: 'Flag Clue',
        text: '🇪🇬 Its flag stripes are red, white, and black with the golden Eagle of Saladin in the middle.',
      },
    ],
    discovery: {
      animalFact: 'Camels store energy in their humps and can travel days between Nile-side watering stops.',
      greeting: '"Salām!" (سلام) means “peace” and is a common hello.',
      fossil: '🦕 Egypt’s Bahariya Oasis preserves fossils of the giant Spinosaurus.',
      history: '🏺 Pharaohs planned the pyramids while the Nile’s floods nourished early civilizations.',
      space: '🪐 Egypt’s EgyptSat-2 satellite helps monitor the Sahara from orbit.',
    },
  },
  {
    id: 'brazil',
    name: 'Brazil',
    displayName: 'Federative Republic of Brazil',
    emoji: '🌿',
    continent: 'Americas',
    flag: '🇧🇷',
    aliases: ['federative republic of brazil', 'brasil'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦜 Brilliant blue macaws soar above the Amazon rainforest canopy.',
      },
      {
        label: 'Food Clue',
        text: '🥘 Families gather on Saturdays for feijoada, a rich stew of black beans and slow-cooked meats.',
      },
      {
        label: 'Flag Clue',
        text: '🇧🇷 A green field with a yellow diamond and a starry blue globe reads “Ordem e Progresso.”',
      },
    ],
    discovery: {
      animalFact: 'Hyacinth macaws crack palm nuts with powerful beaks and nest in towering manduvi trees.',
      greeting: '"Oi!" is a cheerful hello across Portuguese-speaking Brazil.',
      fossil: '🦕 The Santanaraptor fossil found in Ceará shows muscle impressions from 110 million years ago.',
      history: '🏺 Indigenous peoples, Portuguese explorers, and Afro-Brazilian cultures shaped this vast country.',
      space: '🪐 The Amazonia-1 satellite launched in 2021 to track rainforest health from orbit.',
    },
  },
  {
    id: 'australia',
    name: 'Australia',
    displayName: 'Commonwealth of Australia',
    emoji: '🦘',
    continent: 'Oceania',
    flag: '🇦🇺',
    aliases: ['commonwealth of australia'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦘 Marsupials with powerful hind legs bound across red deserts and eucalyptus forests.',
      },
      {
        label: 'Food Clue',
        text: '🥧 Meat pies filled with gravy are a classic snack at footy matches.',
      },
      {
        label: 'Flag Clue',
        text: '🇦🇺 A Union Jack shares space with the Southern Cross constellation on a deep blue background.',
      },
    ],
    discovery: {
      animalFact: 'Kangaroos balance on their tails to launch into 3-meter leaps across the outback.',
      greeting: '"G’day!" is a sunny greeting you might hear on the Great Barrier Reef docks.',
      fossil: '🦕 The Muttaburrasaurus fossil from Queensland reveals a plant-eating dinosaur with a curious snout.',
      history: '🏺 First Nations peoples have mapped Songlines across this continent for tens of thousands of years.',
      space: '🪐 The Canberra Deep Space Communication Complex tracks probe signals from across the solar system.',
    },
  },
];

export default countryCards;
