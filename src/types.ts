export interface Landmark {
  id: string;
  name: string;
  subtitle: string;
  category: "coast" | "sacred" | "heritage";
  imageUrl: string;
  soundUrl?: string;
  lore: string;
  myth: string;
  architecturalNote: string;
  soundsLike: string;
  bestTime: string;
  locationDetails: string;
}

export interface Tradition {
  id: string;
  title: string;
  subtitle: string;
  lore: string;
  soundsLike: string;
  imageUrl: string;
  historicalContext: string;
  soundUrl?: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  sanskritName: string;
  timing: string;
  lore: string;
  significance: string;
  colors: string;
  iconName: string;
}

export interface FoodTrailItem {
  id: string;
  name: string;
  alternateName: string;
  lore: string;
  culinarySecrets: string;
  whereToFind: string;
  imageUrl: string;
  sensoryReview: string;
}

export interface CommunityStory {
  id: string;
  author: string;
  role: string;
  avatar: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  imageUrl: string;
}

export interface ItineraryResponse {
  tripTitle: string;
  themeDescription: string;
  dayItineraries: {
    dayNumber: number;
    title: string;
    narrative: string;
    places: {
      name: string;
      culturalLore: string;
      localTip: string;
    }[];
  }[];
  culinaryRecommendations: {
    dishName: string;
    description: string;
    culturalContext: string;
    whereToTry: string;
  }[];
  soundscapeRecommendation: string;
}
