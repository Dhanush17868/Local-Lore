import { Landmark, Tradition, FestivalEvent, FoodTrailItem, CommunityStory } from "./types";

import krishnaMathaImg from "./assets/images/regenerated_image_1783907679071.jpg";
import kapuLighthouseImg from "./assets/images/regenerated_image_1783908886086.jpg";
import stMarysImg from "./assets/images/regenerated_image_1783908888176.jpg";
import barkurRuinsImg from "./assets/images/regenerated_image_1783908890018.jpg";
import pajakaKshetraImg from "./assets/images/regenerated_image_1783910051145.webp";
import yakshaganaImg from "./assets/images/regenerated_image_1783910324031.jpg";
import bhootaKolaImg from "./assets/images/regenerated_image_1783909855434.jpg";
import goliBajeImg from "./assets/images/regenerated_image_1783908896674.jpg";
import patrodeImg from "./assets/images/regenerated_image_1783908899337.jpg";
import masalaDosaImg from "./assets/images/regenerated_image_1783908900463.jpg";
import photoJournalImg from "./assets/images/regenerated_image_1783908886086.jpg";
import yakshaganaMemoirsImg from "./assets/images/regenerated_image_1783908903419.jpg";
import culinaryHeritageImg from "./assets/images/regenerated_image_1783908905108.jpg";

export const LANDMARKS: Landmark[] = [
  {
    id: "krishna-matha",
    name: "Sri Krishna Matha",
    subtitle: "The Hearth of Coastal Devotion",
    category: "sacred",
    imageUrl: krishnaMathaImg,
    lore: "Founded in the 13th century by the saint Madhvacharya, this sacred temple is the heart of Udupi. Unlike other Hindu shrines where devotees face the deity directly, here one gazes at Lord Krishna through the Kanakana Kindi—a nine-holed silver window. Legend says Kanakadasa, an ecstatic saint denied entry due to his caste, sang from outside; moved by his devotion, the idol turned around and cracked the stone wall to reveal its face.",
    myth: "It is believed that the small clay-and-butter image of Child Krishna was originally worshipped in Dwarka, covered in sacred clay, and loaded onto a merchant ship. Madhvacharya foresaw a shipwreck, saved the vessel with his spiritual aura, and discovered the sacred idol inside, which he installed on an auspicious Makara Sankranthi day.",
    architecturalNote: "The temple features traditional coastal wood-and-tile architecture. The sanctuary contains no windows, lit only by thousands of oil lamps. The temple's daily rituals have continued without interruption for over seven hundred years.",
    soundsLike: "Deep brass bells clanging, Vedic chants echoing, and the low rumble of the bronze kettle-drums (Maddale).",
    bestTime: "5:00 AM (during the first aarti) or 8:00 PM (for the chariot procession).",
    locationDetails: "Car Street, Udupi Town Center."
  },
  {
    id: "kapu-lighthouse",
    name: "Kapu Beach & Lighthouse",
    subtitle: "The Beacon of the Granite Cliffs",
    category: "coast",
    imageUrl: kapuLighthouseImg,
    lore: "Built in 1901 under British authority, this 27-meter-tall lighthouse stands upon a massive black granite basalt outcrop that juts into the Arabian Sea. For over a century, it has guided countless dhows, fishing boats, and trade vessels away from the perilous rocks of the coastal shelf. The panoramic view from the gallery reveals a breathtaking contrast between deep green coconut plantations and the endless azure sea.",
    myth: "Local folklore recounts that Arab traders in the medieval era used to burn huge signal fires on these very granite cliffs, leaving tribute offerings of incense and spices for the sea-spirit Bobbariya, whom local fishermen still revere as the protector of the coast.",
    architecturalNote: "Constructed of hand-hewn granite blocks directly anchored to the bedrock, the lighthouse houses a classic third-order revolving Fresnel lens that emits a beam visible up to 20 nautical miles.",
    soundsLike: "The rhythmic crash of heavy waves against basalt rocks and the whistling wind through the spiral staircase.",
    bestTime: "5:30 PM - 6:30 PM (just before and during sunset).",
    locationDetails: "Kaup Village, 15 km south of Udupi."
  },
  {
    id: "st-marys-island",
    name: "St. Mary's Islands",
    subtitle: "Volcanic Pillars in the Azure Surf",
    category: "coast",
    imageUrl: stMarysImg,
    lore: "A geological wonder of unmatched beauty. These uninhabited islands are famous for their unique columnar basalt rock formations—hexagonal pillars created by sub-volcanic activity when Madagascar was attached to India, nearly 88 million years ago. Vasco da Gama landed on these islands in 1498, named them 'O Padrão de Santa Maria' after the Virgin Mary, and erected a wooden cross before sailing towards Calicut.",
    myth: "Fishermen's lore tells of a mystical treasure buried beneath the columns, protected by sea serpents and the changing tides that submerge the pathway to the inner caves.",
    architecturalNote: "Composed entirely of sub-volcanic dacite lava rocks. The columns are neat, five, six, or seven-sided vertical pillars arranged like giant steps carved by nature.",
    soundsLike: "The continuous crunching of millions of seashells underfoot and the roar of the deep sea breeze.",
    bestTime: "October to April (Accessible via boat ferry from Malpe Harbor).",
    locationDetails: "6 km off the coast of Malpe Beach."
  },
  {
    id: "barkur-ruins",
    name: "The Ruins of Barkur",
    subtitle: "Forgotten Capital of the Alupa Kings",
    category: "heritage",
    imageUrl: barkurRuinsImg,
    lore: "Now a quiet, sleepy village, Barkur was once the bustling capital of the Alupa Dynasty and a major seaport on the Sita River, trading with Mesopotamians and Arabians as early as the 2nd century. The area is dotted with ruins of ancient mud fortresses and several unique stone temples built with sloping granite roofs designed to shed Udupi’s torrential monsoon rains.",
    myth: "It is believed that Barkur was protected by three hundred and sixty-five temples, one for each day of the year, and that the Alupa kings held secret nocturnal coronation ceremonies under the sacred peepal trees to seek the blessing of the local earth deities.",
    architecturalNote: "The temples are unique coastal regional styles, featuring stone walls, sloping step-slab roofs, and delicate carvings of sea-monsters (Yalis) on the lintels.",
    soundsLike: "The rustle of dry leaves, the call of peacocks from the surrounding dry-stone walls, and the distant murmur of the river.",
    bestTime: "Cool mornings between November and February.",
    locationDetails: "Barkur town, 16 km north of Udupi."
  },
  {
    id: "pajaka-kshetra",
    name: "Pajaka Kshetra",
    subtitle: "The Sacred Hills of the Dual feet",
    category: "heritage",
    imageUrl: pajakaKshetraImg,
    lore: "Pajaka is the serene birthplace of Sri Madhvacharya, the founder of the Dvaita school of philosophy. The village remains untouched by modernity, framed by rolling green pasture hills and red laterite stone paths. One can still explore the ancestral home of the saint, which houses a shrine protecting his footprints carved into the rock face where he spent his childhood meditating.",
    myth: "As a young child named Vasudeva, the saint is said to have performed incredible miracles here—including lifting a massive boulder with his toe to pin down a demon disguised as a serpent, and creating a continuous freshwater pond with his staff to save his elderly parents from walking to distant holy rivers.",
    architecturalNote: "A beautiful preservation of an ancient Tulu-style homestead, showcasing thick stone-masonry, heavy teakwood rafters, and a central courtyard (Angala) open to the sky.",
    soundsLike: "Muted birdsong, dry wind whispering through betelnut palms, and the faint sound of water dripping from the miracle well.",
    bestTime: "Early mornings or late afternoons for serene introspection.",
    locationDetails: "Pajaka Village, 12 km southeast of Udupi."
  }
];

export const TRADITIONS: Tradition[] = [
  {
    id: "yakshagana",
    title: "Yakshagana",
    subtitle: "The Celestial Dance of Coastal Gods",
    lore: "Yakshagana is a living, operatic theater form that has flourished in coastal Karnataka for over five hundred years. It blends heavy dance steps, highly stylized face makeup (Panna), towering glittering headgears (Kirita), and extemporaneous Tulu or Kannada dialogue. Troupe members belong to wandering temple schools (Melas) who travel from village to village, performing all night under the open sky in paddy fields after the winter harvest.",
    soundsLike: "The fierce, sharp crack of the Chande drum, the deep steady rhythm of the Maddale drum, and the high-pitched singing (Bhagavathike) guiding the celestial battle.",
    imageUrl: yakshaganaImg,
    historicalContext: "Originally funded by local feudal lords and temples, Yakshagana serves as an oral medium to transmit epic lore from the Ramayana, Mahabharata, and Puranas to rural audiences.",
    soundUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "daivaradhane",
    title: "Bhoota Kola",
    subtitle: "The Spirit Dance of the Sacred Forest Groves",
    lore: "A profound ritual of ancestor and spirit worship (Daivaradhane) native to Tulu Nadu. Under the flicker of brass oil torches, an oracle dancer wears an elaborate skirt made of tender palm fronds, paints his face with symbolic red and yellow laterite clay, and dons a massive, heavy brass breastplate representing guardian spirits like Panjurli (the wild boar) or Bobbariya. After falling into a deep, rhythmic trance, the dancer channels the deity to resolve land disputes and heal village conflicts.",
    soundsLike: "The steady, hypnotic beat of the brass gongs, the rustling of palm leaves, and the sudden, booming spirit-voices of the oracle dancer.",
    imageUrl: bhootaKolaImg,
    historicalContext: "Rooted in nature-veneration, Bhoota Kola stands as an ancient system of local justice, ecological conservation, and community harmony that predates the arrival of major temple traditions.",
    soundUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];

export const FESTIVALS: FestivalEvent[] = [
  {
    id: "paryaya",
    name: "Paryaya Mahotsava",
    sanskritName: "पर्याय महोत्सव",
    timing: "Biennial (Once every 2 years on January 18th)",
    lore: "The most significant cultural festival of Udupi. It marks the solemn transfer of worship and administrative rights of the Sri Krishna Temple among the eight pontiffs of the Ashta Mathas, founded by Madhvacharya. The incoming Swamiji takes a ritual bath at Kapu beach in the dead of night and is carried in a massive cultural procession through the illuminated streets, accompanied by folk artists, elephant chariots, and Yakshagana dancers.",
    significance: "Symbolizes the peaceful rotation of religious duty and is celebrated with magnificent oil-lamp decorations (Laksha Deepotsava) where Car Street is lit by over 100,000 clay lamps.",
    colors: "Deep saffron, temple brass, pure white silks",
    iconName: "Flame"
  },
  {
    id: "chariot-festival",
    name: "Makara Sankranthi Chariot Festival",
    sanskritName: "मकर संक्रांति रथोत्सव",
    timing: "Annual (January 14th - 15th)",
    lore: "On this auspicious day, three massive wooden temple chariots (Rathas) are pulled by tens of thousands of devotees across Car Street. Lit entirely by torches and oil flares, the atmosphere is electric. Lord Krishna’s image is placed in the giant chariot, which slowly rolls under the starlit sky, accompanied by temple horns and continuous drumming.",
    significance: "Commemorates the day Saint Madhvacharya originally installed the beautiful clay-mural image of Child Krishna in Udupi.",
    colors: "Golden yellow, terracotta red, blazing gold",
    iconName: "ShieldAlert"
  },
  {
    id: "karavali",
    name: "Karavali Utsava",
    sanskritName: "करावलि उत्सव",
    timing: "Annual (December to January)",
    lore: "A vibrant coast-wide exhibition celebrating the cultural tapestry of coastal Karnataka. Over several weeks, Malpe beach and open grounds host regional food trails, traditional sand sculpture championships, pottery-making workshops, and open-air performances of Yakshagana and traditional Gombeata (puppetry).",
    significance: "Brings together local artists, tribal craftsmen, and coastal farmers to preserve Tulu culture and marine heritage.",
    colors: "Emerald green, sea blue, sand yellow",
    iconName: "Compass"
  }
];

export const FOOD_TRAILS: FoodTrailItem[] = [
  {
    id: "goli-baje",
    name: "Udupi Goli Baje",
    alternateName: "Mangalore Bajji",
    lore: "Born in local Udupi tea stalls, Goli Baje are light, pillowy-soft fritters made with fermented yogurt, refined flour, green chillies, finely chopped ginger, and curry leaves. They are fried to a uniform golden-brown spheres that are crispy on the outside, but spongy and aerated inside.",
    culinarySecrets: "The secret to its cloud-like softness is letting the spiced yogurt and flour batter ferment naturally for three hours, and using fresh coconut oil for deep frying.",
    whereToFind: "Mitra Samaj (Car Street, Udupi) or any local heritage hotel.",
    imageUrl: goliBajeImg,
    sensoryReview: "Best enjoyed hot when the heavy monsoon rain begins to fall on the tiled roofs, paired with a cup of piping hot brass-tumbler filter coffee."
  },
  {
    id: "patrode",
    name: "Spiced Patrode",
    alternateName: "Colocasia Leaf Rolls",
    lore: "An absolute coastal delicacy of the monsoon season. Patrode is made by spreading a thick, highly spiced rice-lentil paste flavored with tamarind, jaggery, and coconut on heart-shaped colocasia leaves, which are then layered, tightly rolled, sliced, and steamed to perfection.",
    culinarySecrets: "Colocasia leaves contain calcium oxalate crystals that can cause throat itching if not neutralized. Local home cooks use an extra-generous dose of wild tamarind paste and organic jaggery in the batter to balance it.",
    whereToFind: "Authentic homestays, or local specialty coastal restaurants like Kedige.",
    imageUrl: patrodeImg,
    sensoryReview: "Steamed, then sliced and shallow-fried in homemade coconut oil with a sprinkle of mustard seeds and grated coconut. It's a complex explosion of sweet, sour, hot, and earthy herbal tones."
  },
  {
    id: "masala-dosa",
    name: "Udupi Masala Dosa",
    alternateName: "Temple Style Crepe",
    lore: "While dosas are ubiquitous across South India, the classic Udupi masala dosa is unique—cooked to a deep, dark golden reddish-brown hue. It features a moderately thick, incredibly crispy exterior with a soft interior, lined with a signature spicy garlic-red chilli paste, and stuffed with heavily spiced, mustard-infused potato mash (Bhaji).",
    culinarySecrets: "The reddish crust and crispness come from adding a small amount of parboiled rice, fenugreek seeds, and raw sugar to the black gram batter, cooked with a generous ladle of pure wood-pressed ghee.",
    whereToFind: "Mitra Samaj (Car Street) or Woodlands Hotel.",
    imageUrl: masalaDosaImg,
    sensoryReview: "Crispy, rich, and intensely aromatic, the dosa is served with fresh coconut chutney and piping hot, water-thin temple-style Sambhar."
  }
];

export const STORIES: CommunityStory[] = [
  {
    id: "photographer-journal",
    author: "Raghavendra Acharya",
    role: "Heritage Photographer & Archivist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    title: "Chasing the Monsoon Mist at Kapu Lighthouse",
    excerpt: "For fifteen years, I have walked the black rocks of Kapu during the first monsoon gale. Here is what the sea-wind told me.",
    content: "There is a brief, magical window of ten minutes just before the southwest monsoon crashes over the Udupi coast. The sky turns an impossible shade of dark indigo-violet. The coconut palms bend almost double, their green fronds rustling like dry paper. In that moment, the Kapu lighthouse turns on its rotating golden beam. The contrast between that warm, revolving beacon and the cold, roaring basalt rocks is what keeps me coming back every single June. It is not just scenery; it is the heartbeat of Tulu Nadu.",
    date: "July 2, 2026",
    tags: ["Monsoon", "Photography", "Kapu", "Coast"],
    imageUrl: photoJournalImg
  },
  {
    id: "yakshagana-memoirs",
    author: "Bhagavath Govinda Bhat",
    role: "Senior Yakshagana Vocalist",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150",
    title: "The All-Night Fire: Singing for the Gods in Paddy Fields",
    excerpt: "We paint our faces to hide our mortal worries. When the Chande breaks the night silence, we are no longer men—we are warriors, kings, and celestial spirits.",
    content: "When the winter harvest concludes, the mud in the paddy fields dries and cracks. This becomes our stage. We set up simple wooden pillars wrapped in marigold garlands and light our oil torches. For an artist, the all-night Yakshagana performance is a spiritual penance. My throat might ache, the heavy brass headgear weighs six kilograms, but when the Bhagavatha (vocalist) raises his voice to summon the battle of Arjuna and Karna, the fatigue evaporates. The audience sits huddled in blankets until the sunrise, their eyes reflecting the stage lights. This is the living theater of Udupi, passed down through five generations of my family.",
    date: "June 28, 2026",
    tags: ["Tradition", "Yakshagana", "Art", "Village Life"],
    imageUrl: yakshaganaMemoirsImg
  },
  {
    id: "culinary-heritage",
    author: "Sharada Bhat",
    role: "Traditional Home Cook & Culinary Archivist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    title: "Turmeric Leaves & Monsoon Steaming: The Sacred Art of Patholi",
    excerpt: "Modern steam cookers cannot replicate the aroma of fresh turmeric leaves picked from the backyard while it pours outside.",
    content: "In Udupi, our kitchens are ruled by the seasonal rhythm. During the heavy downpour of the Shravana month, we harvest fresh turmeric leaves from the garden. We spread a thin batter of freshly ground local parboiled rice, sweet coconut, and liquid organic palm jaggery inside the leaf, fold it, and steam it. The magic of Patholi lies entirely in the leaf—the steam extracts the therapeutic, earthy oils of the turmeric, infusing the sweet rice dumpling with a comforting, warm aroma. It is the smell of a monsoon afternoon in a coastal home.",
    date: "July 10, 2026",
    tags: ["Cuisine", "Heritage Recipes", "Monsoon", "Monastery Kitchens"],
    imageUrl: culinaryHeritageImg
  }
];
