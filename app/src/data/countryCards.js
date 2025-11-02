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
  {
    id: 'vatican-city',
    name: 'Vatican City',
    displayName: 'Vatican City State',
    emoji: '🇻🇦',
    continent: 'Europe',
    flag: '🇻🇦',
    aliases: ['vatican', 'holy see'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦚 Elegant peacocks strut through manicured gardens behind ancient walls.',
      },
      {
        label: 'Food Clue',
        text: '🍝 Papal kitchens serve fresh pasta with herbs from rooftop gardens.',
      },
      {
        label: 'Flag Clue',
        text: '🇻🇦 Yellow and white bands feature crossed keys under a papal crown.',
      },
    ],
    discovery: {
      animalFact: 'Peacocks in the Vatican Gardens display iridescent feathers to visitors on special tours.',
      greeting: '"Buongiorno" is a good morning greeting in this Italian-speaking city-state.',
      fossil: '🦕 Ancient fossils collected by popes are displayed in the Vatican Museums.',
      history: '🏺 Home to St. Peter’s Basilica, where Michelangelo painted the Sistine Chapel ceiling.',
      space: '🪐 The Vatican Observatory studies asteroids from telescopes in Arizona and Italy.',
    },
  },
  {
    id: 'france',
    name: 'France',
    displayName: 'French Republic',
    emoji: '🗼',
    continent: 'Europe',
    flag: '🇫🇷',
    aliases: ['french republic'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🐓 Proud roosters crow in the morning, and colorful butterflies flutter in lavender fields.',
      },
      {
        label: 'Food Clue',
        text: '🥐 Buttery croissants and crepes with chocolate are yummy breakfast treats.',
      },
      {
        label: 'Flag Clue',
        text: '🇫🇷 Blue, white, and red stripes stand tall like the Eiffel Tower.',
      },
    ],
    discovery: {
      animalFact: 'Flamingos gather in pink flocks in the salty wetlands of the Camargue region.',
      greeting: '"Bonjour!" means "good day" and is a friendly way to say hello.',
      fossil: '🦕 Fossils of the huge Ampelosaurus dinosaur were found in vineyards of southern France.',
      history: '🏺 Brave knights lived in fairy-tale castles, and artists like Monet painted beautiful gardens.',
      space: '🪐 Rockets launch from French Guiana to carry satellites into space for Europe.',
    },
  },
  {
    id: 'china',
    name: 'China',
    displayName: 'People\'s Republic of China',
    emoji: '🐼',
    continent: 'Asia',
    flag: '🇨🇳',
    aliases: ['people\'s republic of china', 'zhongguo'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🐼 Fluffy giant pandas climb trees and eat bamboo in foggy mountains.',
      },
      {
        label: 'Food Clue',
        text: '🥟 Steamy dumplings and noodle soups are shared during family festivals.',
      },
      {
        label: 'Flag Clue',
        text: '🇨🇳 A bright red background with five golden stars twinkles like fireworks.',
      },
    ],
    discovery: {
      animalFact: 'Giant pandas have black and white fur that helps them hide in snowy bamboo forests.',
      greeting: '"Nǐ hǎo!" (你好) is how you say "hello" in Mandarin.',
      fossil: '🦕 The long-necked Mamenchisaurus dinosaur roamed what is now China millions of years ago.',
      history: '🏺 Builders created the Great Wall to guard ancient treasures, and inventors made fireworks for celebrations.',
      space: '🪐 Astronauts live on China\'s Tiangong space station, growing plants in space.',
    },
  },
  {
    id: 'india',
    name: 'India',
    displayName: 'Republic of India',
    emoji: '🐘',
    continent: 'Asia',
    flag: '🇮🇳',
    aliases: ['republic of india', 'bharat'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🐘 Majestic elephants splash in rivers, while tigers prowl through green jungles.',
      },
      {
        label: 'Food Clue',
        text: '🍛 Spicy curries with rice and warm naan bread are eaten with family and friends.',
      },
      {
        label: 'Flag Clue',
        text: '🇮🇳 Orange, white, and green stripes with a blue wheel in the center spin like a story.',
      },
    ],
    discovery: {
      animalFact: 'Indian elephants use their trunks like snorkels when swimming in deep rivers.',
      greeting: '"Namaste!" (नमस्ते) is a respectful greeting with palms pressed together.',
      fossil: '🦕 The Rajasaurus, a fierce dinosaur with a horn, was discovered in Gujarat.',
      history: '🏺 Ancient palaces like the Taj Mahal were built with white marble and colorful stories.',
      space: '🪐 India\'s Chandrayaan missions explore the Moon\'s craters and dusty surface.',
    },
  },
  {
    id: 'canada',
    name: 'Canada',
    displayName: 'Canada',
    emoji: '🍁',
    continent: 'Americas',
    flag: '🇨🇦',
    aliases: [],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦫 Busy beavers build dams in sparkling lakes surrounded by pine trees.',
      },
      {
        label: 'Food Clue',
        text: '🥞 Pancakes drizzled with maple syrup are a sweet start to snowy days.',
      },
      {
        label: 'Flag Clue',
        text: '🇨🇦 A red maple leaf stands proudly between two red bands on white.',
      },
    ],
    discovery: {
      animalFact: 'Beavers create ponds that become homes for fish, ducks, and other animals.',
      greeting: '"Hello!" or "Bonjour!" since people speak English and French here.',
      fossil: '🦕 Alberta is famous for dinosaur bones like the Albertosaurus in its badlands.',
      history: '🏺 Indigenous peoples carved totem poles telling stories, and explorers mapped vast forests.',
      space: '🪐 The Canadarm robotic arm helps build and fix the International Space Station.',
    },
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    displayName: 'Republic of South Africa',
    emoji: '🦁',
    continent: 'Africa',
    flag: '🇿🇦',
    aliases: ['republic of south africa'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦁 Mighty lions roam golden grasslands with zebras and giraffes nearby.',
      },
      {
        label: 'Food Clue',
        text: '🌭 Boerewors sausages grilled over fires are popular at outdoor braais.',
      },
      {
        label: 'Flag Clue',
        text: '🇿🇦 A rainbow of colors—red, white, blue, green, black, and yellow—comes together in a Y shape.',
      },
    ],
    discovery: {
      animalFact: 'Lions live in family groups called prides and take naps in the shade after hunting.',
      greeting: '"Sawubona!" means "I see you" in Zulu, one of many languages spoken here.',
      fossil: '🦕 The Heterodontosaurus, a small dinosaur with different teeth, was found here.',
      history: '🏺 Ancient rock art painted by San people shows animals and hunters from long ago.',
      space: '🪐 The Square Kilometre Array telescope in the Karoo desert listens for signals from stars.',
    },
  },
  {
    id: 'portugal',
    name: 'Portugal',
    displayName: 'Portuguese Republic',
    emoji: '🏰',
    continent: 'Europe',
    flag: '🇵🇹',
    aliases: ['portuguese republic'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦅 Golden eagles soar over cork oak forests and sunny beaches.',
      },
      {
        label: 'Food Clue',
        text: '🍮 Creamy pastéis de nata custard tarts are a sweet treat from bakeries.',
      },
      {
        label: 'Flag Clue',
        text: '🇵🇹 Green and red with a yellow armillary sphere and shield in the middle.',
      },
    ],
    discovery: {
      animalFact: 'Iberian lynx kittens play in hidden dens among Mediterranean shrubs.',
      greeting: '"Olá!" is a warm hello in this seaside country.',
      fossil: '🦕 The huge Lourinhanosaurus fossils were dug up near Lisbon\'s coast.',
      history: '🏺 Brave explorers like Vasco da Gama sailed to discover new lands and spices.',
      space: '🪐 Portugal helps build satellites for monitoring oceans from space.',
    },
  },
  {
    id: 'spain',
    name: 'Spain',
    displayName: 'Kingdom of Spain',
    emoji: '💃',
    continent: 'Europe',
    flag: '🇪🇸',
    aliases: ['kingdom of spain', 'españa'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦅 Spanish imperial eagles glide over olive groves and mountain peaks.',
      },
      {
        label: 'Food Clue',
        text: '🥘 Paella with rice, seafood, and saffron is cooked in big pans for sharing.',
      },
      {
        label: 'Flag Clue',
        text: '🇪🇸 Red and yellow stripes with a coat of arms featuring pillars and a crown.',
      },
    ],
    discovery: {
      animalFact: 'Flamingos wade in pink flocks through the wetlands of Doñana National Park.',
      greeting: '"¡Hola!" means hello with a smile.',
      fossil: '🦕 Dinosaur tracks from herds of sauropods are preserved in Rioja\'s rocks.',
      history: '🏺 Knights fought windmills in stories, and artists like Picasso painted colorful dreams.',
      space: '🪐 Spain\'s Canary Islands host telescopes that watch for asteroids.',
    },
  },
  {
    id: 'finland',
    name: 'Finland',
    displayName: 'Republic of Finland',
    emoji: '❄️',
    continent: 'Europe',
    flag: '🇫🇮',
    aliases: ['republic of finland', 'suomi'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦌 Reindeer with big antlers trot through snowy forests and frozen lakes.',
      },
      {
        label: 'Food Clue',
        text: '🥣 Warm rye bread and berry porridge keep you cozy on winter days.',
      },
      {
        label: 'Flag Clue',
        text: '🇫🇮 A blue cross on white, like a snowy sky with lakes below.',
      },
    ],
    discovery: {
      animalFact: 'Brown bears hibernate in dens during long winters and fish for salmon in summer.',
      greeting: '"Hei!" is a simple hello in Finnish.',
      fossil: '🦕 Ancient woolly mammoth bones have been found in Finland\'s icy soils.',
      history: '🏺 Vikings settled here, telling stories of gods and heroes around fires.',
      space: '🪐 Finland builds instruments for satellites that study Earth\'s northern lights.',
    },
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    displayName: 'Swiss Confederation',
    emoji: '🏔️',
    continent: 'Europe',
    flag: '🇨🇭',
    aliases: ['swiss confederation', 'schweiz', 'suisse', 'svizzera'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦌 Chamois goats leap across rocky Alps with bells tinkling.',
      },
      {
        label: 'Food Clue',
        text: '🧀 Melted cheese fondue dipped with bread is fun to share.',
      },
      {
        label: 'Flag Clue',
        text: '🇨🇭 A white cross on a red square, simple and strong like mountains.',
      },
    ],
    discovery: {
      animalFact: 'Alpine ibex climb steep cliffs to munch on mountain grasses.',
      greeting: '"Grüezi!" in Swiss German, or "Bonjour!" in French parts.',
      fossil: '🦕 Plateosaurus fossils from the Triassic period were found in Frick.',
      history: '🏺 William Tell shot an apple with his arrow in a famous legend.',
      space: '🪐 Swiss clocks help time missions on the International Space Station.',
    },
  },
  {
    id: 'iceland',
    name: 'Iceland',
    displayName: 'Republic of Iceland',
    emoji: '🌋',
    continent: 'Europe',
    flag: '🇮🇸',
    aliases: ['republic of iceland', 'ísland'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🐦 Puffins with colorful beaks nest on cliffs by the chilly sea.',
      },
      {
        label: 'Food Clue',
        text: '🥛 Skyr yogurt with berries is a creamy, healthy snack.',
      },
      {
        label: 'Flag Clue',
        text: '🇮🇸 Blue with a white and red cross, like ice and fire together.',
      },
    ],
    discovery: {
      animalFact: 'Arctic foxes change fur colors with the seasons to hide in snow or rocks.',
      greeting: '"Halló!" sounds like hello in this land of elves and sagas.',
      fossil: '🦕 Fossils of ancient whales are hidden in Iceland\'s volcanic rocks.',
      history: '🏺 Vikings settled here, telling stories of gods and heroes around fires.',
      space: '🪐 Iceland\'s glaciers help train astronauts for Moon walks.',
    },
  },
  {
    id: 'nauru',
    name: 'Nauru',
    displayName: 'Republic of Nauru',
    emoji: '🏝️',
    continent: 'Oceania',
    flag: '🇳🇷',
    aliases: ['republic of nauru'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦜 Frigatebirds soar high above coral reefs and phosphate rocks.',
      },
      {
        label: 'Food Clue',
        text: '🥥 Fresh coconuts and fish caught from the ocean are daily delights.',
      },
      {
        label: 'Flag Clue',
        text: '🇳🇷 Blue with a yellow stripe and a white star below.',
      },
    ],
    discovery: {
      animalFact: 'Noddy terns build nests in trees on this tiny Pacific island.',
      greeting: '"Ekamowir omo!" means hello in Nauruan.',
      fossil: '🦕 Phosphate mining revealed ancient seabird fossils on the island.',
      history: '🏺 Micronesian settlers arrived by canoe thousands of years ago.',
      space: '🪐 Nauru watches rocket launches from nearby Pacific neighbors.',
    },
  },
  {
    id: 'germany',
    name: 'Germany',
    displayName: 'Federal Republic of Germany',
    emoji: '🏰',
    continent: 'Europe',
    flag: '🇩🇪',
    aliases: ['federal republic of germany', 'deutschland'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦌 Red deer roam fairy-tale forests with tall pine trees.',
      },
      {
        label: 'Food Clue',
        text: '🥨 Soft pretzels and sausages are favorites at October festivals.',
      },
      {
        label: 'Flag Clue',
        text: '🇩🇪 Black, red, and yellow stripes wave like a cheerful banner.',
      },
    ],
    discovery: {
      animalFact: 'Wild boars snuffle for acorns in the Black Forest.',
      greeting: '"Hallo!" is a friendly greeting.',
      fossil: '🦕 The Archaeopteryx, a bird-like dinosaur, was found in Bavaria.',
      history: '🏺 Brothers Grimm collected fairy tales like Hansel and Gretel.',
      space: '🪐 Germany built the Columbus lab for experiments in space.',
    },
  },
  {
    id: 'russia',
    name: 'Russia',
    displayName: 'Russian Federation',
    emoji: '❄️',
    continent: 'Europe',
    flag: '🇷🇺',
    aliases: ['russian federation', 'rossiya'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🐻 Brown bears fish for salmon in vast Siberian rivers.',
      },
      {
        label: 'Food Clue',
        text: '🥟 Pelmeni dumplings filled with meat are warm and yummy.',
      },
      {
        label: 'Flag Clue',
        text: '🇷🇺 White, blue, and red stripes stretch wide like the land.',
      },
    ],
    discovery: {
      animalFact: 'Siberian tigers prowl through snowy taiga forests.',
      greeting: '"Privet!" (Привет) means hi to friends.',
      fossil: '🦕 Mammoth skeletons are dug up from frozen Siberian ground.',
      history: '🏺 Tsars lived in colorful onion-domed palaces in Moscow.',
      space: '🪐 Russia launched the first human, Yuri Gagarin, into space.',
    },
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    displayName: 'New Zealand',
    emoji: '🐑',
    continent: 'Oceania',
    flag: '🇳🇿',
    aliases: ['aotearoa'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦉 Kiwi birds with long beaks sniff for worms at night.',
      },
      {
        label: 'Food Clue',
        text: '🥧 Meat pies and pavlova dessert with fruit are picnic favorites.',
      },
      {
        label: 'Flag Clue',
        text: '🇳🇿 Blue with Union Jack and red stars of the Southern Cross.',
      },
    ],
    discovery: {
      animalFact: 'Kea parrots playfully steal shiny things from hikers in the mountains.',
      greeting: '"Kia ora!" means hello in Māori.',
      fossil: '🦕 Fossils of giant moa birds taller than people were found here.',
      history: '🏺 Māori warriors carved beautiful canoes and told legends of the land.',
      space: '🪐 Rocket Lab launches small satellites from the Mahia Peninsula.',
    },
  },
  {
    id: 'chile',
    name: 'Chile',
    displayName: 'Republic of Chile',
    emoji: '🏔️',
    continent: 'Americas',
    flag: '🇨🇱',
    aliases: ['republic of chile'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦙 Llamas trek through dry deserts and snowy Andes peaks.',
      },
      {
        label: 'Food Clue',
        text: '🥑 Empanadas filled with meat and avocados are tasty hand pies.',
      },
      {
        label: 'Flag Clue',
        text: '🇨🇱 Blue square with white star, white and red stripes below.',
      },
    ],
    discovery: {
      animalFact: 'Andean condors with huge wings soar over the longest mountain range.',
      greeting: '"¡Hola!" just like in Spain.',
      fossil: '🦕 Atacamatitan, a long-necked dinosaur, was discovered in the Atacama Desert.',
      history: '🏺 Mapuche people wove colorful textiles and lived in wooden houses.',
      space: '🪐 The Atacama Desert hosts giant telescopes staring at stars.',
    },
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    displayName: 'United Kingdom of Great Britain and Northern Ireland',
    emoji: '🏰',
    continent: 'Europe',
    flag: '🇬🇧',
    aliases: ['uk', 'united kingdom of great britain and northern ireland', 'britain'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦊 Red foxes sneak through green countryside and city parks.',
      },
      {
        label: 'Food Clue',
        text: '🍟 Fish and chips wrapped in paper are a seaside treat.',
      },
      {
        label: 'Flag Clue',
        text: '🇬🇧 Red, white, and blue crosses layered together, called the Union Jack.',
      },
    ],
    discovery: {
      animalFact: 'Highland cows with shaggy fur graze in Scotland\'s misty hills.',
      greeting: '"Hello!" or "Cheers!" for a friendly hi.',
      fossil: '🦕 Mary Anning found ichthyosaur fossils on England\'s Jurassic Coast.',
      history: '🏺 Kings and queens ruled from castles, and Shakespeare wrote plays in London.',
      space: '🪐 UK satellites help predict weather from space.',
    },
  },
  {
    id: 'argentina',
    name: 'Argentina',
    displayName: 'Argentine Republic',
    emoji: '🕺',
    continent: 'Americas',
    flag: '🇦🇷',
    aliases: ['argentine republic'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦙 Guanacos gallop across windy Patagonian plains.',
      },
      {
        label: 'Food Clue',
        text: '🥩 Asado barbecues with juicy steaks are weekend family fun.',
      },
      {
        label: 'Flag Clue',
        text: '🇦🇷 Light blue and white stripes with a golden sun smiling in the middle.',
      },
    ],
    discovery: {
      animalFact: 'Andean flamingos dance in high-altitude lakes with pink feathers.',
      greeting: '"¡Hola!" with a tango flair.',
      fossil: '🦕 Argentinosaurus, one of the biggest dinosaurs, stomped here long ago.',
      history: '🏺 Gauchos rode horses across pampas, and tango dancers twirl in Buenos Aires.',
      space: '🪐 Argentina launches satellites to study climate from orbit.',
    },
  },
  {
    id: 'peru',
    name: 'Peru',
    displayName: 'Republic of Peru',
    emoji: '🦙',
    continent: 'Americas',
    flag: '🇵🇪',
    aliases: ['republic of peru'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦙 Alpacas with fluffy wool climb misty Andean mountains.',
      },
      {
        label: 'Food Clue',
        text: '🍲 Ceviche with fresh fish and lime is a zesty coastal dish.',
      },
      {
        label: 'Flag Clue',
        text: '🇵🇪 Red and white stripes with a coat of arms in the center.',
      },
    ],
    discovery: {
      animalFact: 'Spectacled bears munch on fruits in cloud forests.',
      greeting: '"¡Hola!" in Spanish, or "Allillanchu!" in Quechua.',
      fossil: '🦕 Giant penguin fossils from 36 million years ago were found on the coast.',
      history: '🏺 Incas built Machu Picchu high in the mountains as a secret city.',
      space: '🪐 Peru\'s Chasqui-1 satellite takes pictures of Earth from space.',
    },
  },
  {
    id: 'colombia',
    name: 'Colombia',
    displayName: 'Republic of Colombia',
    emoji: '☕',
    continent: 'Americas',
    flag: '🇨🇴',
    aliases: ['republic of colombia'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦜 Colorful macaws chatter in lush Amazon rainforests.',
      },
      {
        label: 'Food Clue',
        text: '🍌 Arepas stuffed with cheese and plantains are breakfast favorites.',
      },
      {
        label: 'Flag Clue',
        text: '🇨🇴 Yellow, blue, and red stripes stacked like a rainbow.',
      },
    ],
    discovery: {
      animalFact: 'Jaguar cats with spotted fur prowl through tropical jungles.',
      greeting: '"¡Hola!" with a warm smile.',
      fossil: '🦕 Titanoboa, a giant snake fossil, was discovered in coal mines.',
      history: '🏺 Ancient gold artifacts crafted by skilled artists are museum treasures.',
      space: '🪐 Colombia trains astronauts and builds small satellites.',
    },
  },
  {
    id: 'guyana',
    name: 'Guyana',
    displayName: 'Co-operative Republic of Guyana',
    emoji: '🌳',
    continent: 'Americas',
    flag: '🇬🇾',
    aliases: ['co-operative republic of guyana'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦜 Harpy eagles with strong talons hunt in dense rainforests.',
      },
      {
        label: 'Food Clue',
        text: '🍲 Pepperpot stew with cassava and meat simmers for holidays.',
      },
      {
        label: 'Flag Clue',
        text: '🇬🇾 Green, yellow, white, black, and red with arrowhead shapes.',
      },
    ],
    discovery: {
      animalFact: 'Giant otters splash in rivers, catching fish with their families.',
      greeting: '"Hello!" in English, the official language.',
      fossil: '🦕 Ancient sloth fossils have been found in Guyana\'s soils.',
      history: '🏺 Indigenous Arawak people fished and farmed along the coasts.',
      space: '🪐 Guyana watches neighboring space launches from French Guiana.',
    },
  },
  {
    id: 'suriname',
    name: 'Suriname',
    displayName: 'Republic of Suriname',
    emoji: '🌴',
    continent: 'Americas',
    flag: '🇸🇷',
    aliases: ['republic of suriname'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦜 Blue-and-yellow macaws fly over treetops in the Amazon.',
      },
      {
        label: 'Food Clue',
        text: '🍗 Roti with chicken and potatoes is a flavorful wrap.',
      },
      {
        label: 'Flag Clue',
        text: '🇸🇷 Green, white, red stripes with a yellow star in the middle.',
      },
    ],
    discovery: {
      animalFact: 'Sloths hang upside down, munching leaves slowly.',
      greeting: '"Hallo!" in Dutch, or local languages.',
      fossil: '🦕 Prehistoric turtle shells have been unearthed here.',
      history: '🏺 Maroon communities built villages after escaping plantations.',
      space: '🪐 Suriname observes stars from its clear jungle skies.',
    },
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    displayName: 'Oriental Republic of Uruguay',
    emoji: '⚽',
    continent: 'Americas',
    flag: '🇺🇾',
    aliases: ['oriental republic of uruguay'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦊 Gray foxes scamper across grassy pampas plains.',
      },
      {
        label: 'Food Clue',
        text: '🥩 Chivito sandwiches with steak and eggs are hearty meals.',
      },
      {
        label: 'Flag Clue',
        text: '🇺🇾 White and blue stripes with a golden sun in the corner.',
      },
    ],
    discovery: {
      animalFact: 'Capybaras, the world\'s largest rodents, relax by rivers.',
      greeting: '"¡Hola!" in Spanish.',
      fossil: '🦕 Tacuaremboensis dinosaurs roamed ancient landscapes.',
      history: '🏺 Gauchos herded cattle on vast ranches.',
      space: '🪐 Uruguay launches educational nano-satellites.',
    },
  },
  {
    id: 'ukraine',
    name: 'Ukraine',
    displayName: 'Ukraine',
    emoji: '🌻',
    continent: 'Europe',
    flag: '🇺🇦',
    aliases: ['ukrayina'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🦅 Steppe eagles soar over golden wheat fields and sunflower meadows.',
      },
      {
        label: 'Food Clue',
        text: '🥟 Varenyky dumplings filled with potatoes or cherries are yummy treats.',
      },
      {
        label: 'Flag Clue',
        text: '🇺🇦 Blue on top for the sky and yellow below for wheat fields.',
      },
    ],
    discovery: {
      animalFact: 'White storks build big nests on rooftops and migrate long distances.',
      greeting: '"Pryvit!" (Привіт) means hello in Ukrainian.',
      fossil: '🦕 Woolly mammoth bones are found in Ukraine\'s ancient soils.',
      history: '🏺 Cossack warriors rode horses and danced in colorful clothes.',
      space: '🪐 Ukraine builds rocket engines that help launch satellites.',
    },
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    displayName: 'Kingdom of Saudi Arabia',
    emoji: '🐪',
    continent: 'Asia',
    flag: '🇸🇦',
    aliases: ['kingdom of saudi arabia', 'al arabiyah as suudiyah'],
    clues: [
      {
        label: 'Animal Clue',
        text: '🐪 Dromedary camels with one hump trek across vast sandy deserts.',
      },
      {
        label: 'Food Clue',
        text: '🍚 Kabsa rice with spiced chicken and nuts is a family feast.',
      },
      {
        label: 'Flag Clue',
        text: '🇸🇦 Green with white Arabic writing and a sword below.',
      },
    ],
    discovery: {
      animalFact: 'Arabian oryx with long horns roam protected desert reserves.',
      greeting: '"Marhaba!" (مرحبا) means welcome.',
      fossil: '🦕 Dinosaur footprints from ancient seas are preserved in rocks.',
      history: '🏺 Bedouin nomads told stories around campfires in the dunes.',
      space: '🪐 Saudi satellites help with mapping and communication from orbit.',
    },
  }
];

export default countryCards;
