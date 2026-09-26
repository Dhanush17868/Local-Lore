import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Compass,
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Calendar,
  Utensils,
  ChevronRight,
  User,
  Clock,
  ArrowRight,
  Flame,
  Heart,
  Info,
  Layers,
  ArrowUpRight,
  Phone,
  CheckCircle,
  MessageSquare,
  Bus,
  ShieldAlert,
  X,
  Languages,
  Award,
  Trash2,
  Plus,
  Check,
  Map
} from "lucide-react";
import Logo from "./components/Logo";
import SatelliteMap from "./components/SatelliteMap";
import { LANDMARKS, TRADITIONS, FESTIVALS, FOOD_TRAILS, STORIES } from "./data";
import { Landmark, Tradition, FoodTrailItem, CommunityStory, ItineraryResponse } from "./types";
import spiritOfUdupiImg from "./assets/images/regenerated_image_1783907679071.jpg";
import arrivalImg from "./assets/images/regenerated_image_1783909855434.jpg";
import kapuLighthouseImg from "./assets/images/regenerated_image_1783908886086.jpg";
import krishnaMathaImg from "./assets/images/regenerated_image_1783907679071.jpg";
import stMarysImg from "./assets/images/regenerated_image_1783908888176.jpg";
import barkurRuinsImg from "./assets/images/regenerated_image_1783908890018.jpg";
import pajakaKshetraImg from "./assets/images/regenerated_image_1783910051145.webp";

// Living Heritage Section Images
import lhHastaShilpaImg from "./assets/images/regenerated_image_1783914188919.png";
import lhKidiyoorImg from "./assets/images/regenerated_image_1783914198960.png";
import lhKodachadriImg from "./assets/images/regenerated_image_1783914213804.png";
import lhBackwatersImg from "./assets/images/regenerated_image_1783914232648.png";
import lhSoulfulImg from "./assets/images/regenerated_image_1783914245053.png";

const CURATED_EXPERIENCES = [
  {
    id: "exp-lighthouse",
    chronicle: "CHRONICLE I",
    title: "Sunset Heritage Walk at Kapu Lighthouse",
    description: "Witness the 1901 British lighthouse illuminate the rocky coastal cliffs as the sun dips below the Arabian horizon.",
    imageUrl: kapuLighthouseImg,
    tag: "COASTAL ARCHIVES",
    details: "1.5 Hours • Walking",
    anchor: "kapu-lighthouse"
  },
  {
    id: "exp-matha",
    chronicle: "CHRONICLE II",
    title: "Midnight Vedic Chants at Krishna Matha",
    description: "Sit under oil-lit wood carvings during the midnight chariot rituals to experience centuries of devotion.",
    imageUrl: krishnaMathaImg,
    tag: "SACRED TRADITION",
    details: "1 Hour • Contemplative",
    anchor: "krishna-matha"
  },
  {
    id: "exp-stmarys",
    chronicle: "CHRONICLE III",
    title: "Geological Expedition to St. Mary's Islands",
    description: "Trace 88-million-year-old hexagonal volcanic basalt pillars formed when Madagascar separated from India.",
    imageUrl: stMarysImg,
    tag: "GEOLOGICAL WONDER",
    details: "Half Day • Explorer",
    anchor: "st-marys-island"
  },
  {
    id: "exp-barkur",
    chronicle: "CHRONICLE IV",
    title: "The Lost Port Capital Trail of Barkur",
    description: "Decipher stone inscriptions among medieval wood temples and 365 ruined Alupa Dynasty shrines.",
    imageUrl: barkurRuinsImg,
    tag: "ARCHAEOLOGY",
    details: "3 Hours • Deep Dive",
    anchor: "barkur-ruins"
  },
  {
    id: "exp-pajaka",
    chronicle: "CHRONICLE V",
    title: "Philosophical Birthplace Walk of Pajaka Kshetra",
    description: "Explore the humble stone cottage, ancient footprint markers, and four sacred ponds of Dvaita scholar Madhvacharya.",
    imageUrl: pajakaKshetraImg,
    tag: "PHILOSOPHY & LORE",
    details: "2 Hours • Reflective",
    anchor: "pajaka-kshetra"
  }
];

const RESPONSIBLE_PLEDGES = [
  { id: "plastic", text: "Avoid carrying single-use plastic to St. Mary's Island", category: "Ecology" },
  { id: "clothing", text: "Dress modestly when entering Sri Krishna Matha (men remove shirts)", category: "Culture" },
  { id: "support_local", text: "Support local street vendors and micro-kitchens (e.g. Mitra Samaj)", category: "Community" },
  { id: "bhoota_kola", text: "Maintain absolute silence and respect during Bhoota Kola ceremonies", category: "Tradition" },
  { id: "conserve_water", text: "Be mindful of water usage and resource waste at your local homestay", category: "Ecology" }
];

const LIVING_HERITAGE_EXPERIENCES = [
  {
    id: "lh-hasta-shilpa",
    category: "ARCHITECTURAL PRESERVATION",
    title: "Hasta Shilpa Heritage Village",
    description: "Walk through beautifully preserved traditional homes where centuries of architecture, craftsmanship and everyday life continue to tell the story of coastal Karnataka.",
    location: "Manipal Hills, Udupi",
    duration: "3 Hours",
    curatorBadge: "Authentic Experience",
    imageUrl: lhHastaShilpaImg,
    detailedLore: "Hasta Shilpa Heritage Village is a stunning open-air museum that rescues and restores traditional homes, shrines, and manors from the path of destruction. Founded by the visionary conservationist Vijayanath Shenoy, each structure was meticulously dismantled from its original site and reconstructed in Manipal with archaeological precision. Visitors walk on red oxide floors under timber trusses, stepping through heavy wooden door frames that have witnessed centuries of monsoons.",
    coordinates: "13.3516° N, 74.7871° E"
  },
  {
    id: "lh-kidiyoor",
    category: "HERITAGE COMFORT",
    title: "Kidiyoor Hotels",
    description: "A heritage-inspired stay where authentic hospitality, local cuisine and timeless comfort welcome every traveller.",
    location: "City Center, Udupi",
    duration: "Overnight Stay",
    curatorBadge: "Local Recommendation",
    imageUrl: lhKidiyoorImg,
    detailedLore: "A landmark of coastal hospitality, Kidiyoor is famous for its elegant regional architecture and its deep dedication to authentic culinary preservation. Inspired by traditional Tulu manor houses, the property blends antique wood columns with state-of-the-art comforts. Its in-house kitchens prepare legacy dishes such as wood-fired ghee roast and sweet local delicacies, serving as an irreplaceable anchor for seekers of true Udupi culture.",
    coordinates: "13.3412° N, 74.7438° E"
  },
  {
    id: "lh-kodachadri",
    category: "MOUNTAIN PILGRIMAGE",
    title: "Kodachadri Hills Trek",
    description: "Journey through mist-covered mountain trails where nature, spirituality and breathtaking landscapes meet.",
    location: "Western Ghats Range",
    duration: "Full Day",
    curatorBadge: "Heritage Trail",
    imageUrl: lhKodachadriImg,
    detailedLore: "Rising 1,343 meters above sea level, Kodachadri is a sacred mountain peak nestled in the dense Mookambika National Park. The trail winds through emerald shola forests, hidden waterfalls, and ancient rock paths. At the windswept summit stands the Sarvajna Peetha—a small stone temple where the philosopher Adi Shankara meditated. The peak offers a divine view where the mist-draped Western Ghats plunge towards the distant shimmering blue horizon of the Arabian Sea.",
    coordinates: "13.8594° N, 74.8719° E"
  },
  {
    id: "lh-backwaters",
    category: "ECOLOGICAL WATERWAYS",
    title: "Udupi Backwater Experience",
    description: "Discover peaceful waterways lined with coconut groves, local fishing villages and unforgettable sunsets.",
    location: "Kemmanu River Delta",
    duration: "2.5 Hours",
    curatorBadge: "Curator's Pick",
    imageUrl: lhBackwatersImg,
    detailedLore: "Beyond the sandy beaches lies Udupi's secret water labyrinth—the Kemmanu backwaters. Fed by the pristine Swarna River, this calm estuary is lined with dense coconut plantations and mangrove marshes. Travelers board traditional wooden canoes paddled slowly by local fishermen, gliding past traditional coir-weaving homesteads and viewing the spectacular pink and orange tropical sunsets that cast glassy reflections over the waterways.",
    coordinates: "13.3856° N, 74.7212° E"
  },
  {
    id: "lh-soulful",
    category: "CULTURAL EXPEDITION",
    title: "Soulful Udupi Journey",
    description: "An immersive itinerary connecting temples, cuisine, beaches, traditions and hidden cultural gems.",
    location: "Greater Udupi Region",
    duration: "3-Day Itinerary",
    curatorBadge: "Editor's Collection",
    imageUrl: lhSoulfulImg,
    detailedLore: "A masterfully curated, slow-paced exploration designed for travelers seeking the silent soul of Tulu Nadu. This three-day journey unifies dawn Vedic chants, ancient stone inscriptions at the Barkur port ruins, traditional beach sunset walks at Kapu lighthouse, and authentic organic dining inside a 150-year-old local homestead. This itinerary provides a quiet rhythm that respects local communities and ecological boundaries.",
    coordinates: "13.3409° N, 74.7421° E"
  }
];

export default function App() {
  // Navigation & Page State
  const [activeSection, setActiveSection] = useState("arrival");
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [selectedTradition, setSelectedTradition] = useState<Tradition | null>(null);
  const [localTime, setLocalTime] = useState("");

  // Loading & Interactivity States
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Audio Engine State (Web Audio API Synthesized Soundscape)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const waveGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<any>(null);

  // AI Trip Planner State
  const [duration, setDuration] = useState(3);
  const [interests, setInterests] = useState<string[]>(["heritage", "cuisine"]);
  const [groupStyle, setGroupStyle] = useState("solo");
  const [pace, setPace] = useState("relaxed");
  const [isPlanning, setIsPlanning] = useState(false);
  const [planResult, setPlanResult] = useState<ItineraryResponse | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);

  // Companion Cockpit State
  const [isCockpitOpen, setIsCockpitOpen] = useState(false);
  const [cockpitTab, setCockpitTab] = useState<"guide" | "chat" | "transit" | "etiquette">("guide");
  
  const [savedLandmarks, setSavedLandmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("localLore_savedLandmarks");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [savedFoodTrails, setSavedFoodTrails] = useState<string[]>(() => {
    const saved = localStorage.getItem("localLore_savedFoodTrails");
    return saved ? JSON.parse(saved) : [];
  });

  const [savedHomestays, setSavedHomestays] = useState<any[]>(() => {
    const saved = localStorage.getItem("localLore_savedHomestays");
    return saved ? JSON.parse(saved) : [];
  });

  const [savedLivingHeritage, setSavedLivingHeritage] = useState<string[]>(() => {
    const saved = localStorage.getItem("localLore_savedLivingHeritage");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedLivingHeritage, setSelectedLivingHeritage] = useState<any | null>(null);

  const [completedPledges, setCompletedPledges] = useState<string[]>(() => {
    const saved = localStorage.getItem("localLore_completedPledges");
    return saved ? JSON.parse(saved) : [];
  });

  const [chatMessages, setChatMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem("localLore_chatMessages");
    return saved ? JSON.parse(saved) : [
      { sender: "anantha", text: "Namaskara! I am Anantha, your trusted local Udupi companion. Ask me anything about temple dress codes, hidden coastal bus routes, finding authentic Patrode, or how to experience Bhoota Kola respectfully. I stay with you as you explore!" }
    ];
  });

  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [distanceInput, setDistanceInput] = useState("5");
  const [activeBookingHomestay, setActiveBookingHomestay] = useState<any | null>(null);
  const [checkInDate, setCheckInDate] = useState("2026-07-13");
  const [guestsCount, setGuestsCount] = useState(2);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("localLore_savedLandmarks", JSON.stringify(savedLandmarks));
  }, [savedLandmarks]);

  useEffect(() => {
    localStorage.setItem("localLore_savedFoodTrails", JSON.stringify(savedFoodTrails));
  }, [savedFoodTrails]);

  useEffect(() => {
    localStorage.setItem("localLore_savedHomestays", JSON.stringify(savedHomestays));
  }, [savedHomestays]);

  useEffect(() => {
    localStorage.setItem("localLore_savedLivingHeritage", JSON.stringify(savedLivingHeritage));
  }, [savedLivingHeritage]);

  useEffect(() => {
    localStorage.setItem("localLore_completedPledges", JSON.stringify(completedPledges));
  }, [completedPledges]);

  useEffect(() => {
    localStorage.setItem("localLore_chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const toggleLandmarkSave = (id: string) => {
    if (savedLandmarks.includes(id)) {
      setSavedLandmarks(savedLandmarks.filter(l => l !== id));
    } else {
      setSavedLandmarks([...savedLandmarks, id]);
    }
  };

  const toggleFoodTrailSave = (id: string) => {
    if (savedFoodTrails.includes(id)) {
      setSavedFoodTrails(savedFoodTrails.filter(f => f !== id));
    } else {
      setSavedFoodTrails([...savedFoodTrails, id]);
    }
  };

  const toggleLivingHeritageSave = (id: string) => {
    if (savedLivingHeritage.includes(id)) {
      setSavedLivingHeritage(savedLivingHeritage.filter(l => l !== id));
    } else {
      setSavedLivingHeritage([...savedLivingHeritage, id]);
    }
  };

  const addHomestayBooking = (name: string, location: string, date: string, guests: number) => {
    const newBooking = {
      id: "bk-" + Date.now(),
      name,
      location,
      date,
      guests,
      qrCode: "LL-UDUPI-" + Math.floor(Math.random() * 90000 + 10000),
      hostPhone: "+91 820-25" + Math.floor(Math.random() * 90000 + 10000)
    };
    setSavedHomestays([...savedHomestays, newBooking]);
    setActiveBookingHomestay(null);
    setIsCockpitOpen(true);
    setCockpitTab("guide");
  };

  const removeHomestayBooking = (id: string) => {
    setSavedHomestays(savedHomestays.filter(b => b.id !== id));
  };

  const togglePledge = (id: string) => {
    if (completedPledges.includes(id)) {
      setCompletedPledges(completedPledges.filter(p => p !== id));
    } else {
      setCompletedPledges([...completedPledges, id]);
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: "user", text: chatInput };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/concierge-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: updatedMessages.slice(-6).map(m => ({
            role: m.sender === "user" ? "user" : "model",
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Local companion is deep in prayer or resting. Try again in a moment.");
      }

      const data = await response.json();
      setChatMessages([...updatedMessages, { sender: "anantha", text: data.text }]);
    } catch (err: any) {
      setChatMessages([...updatedMessages, { sender: "anantha", text: "My apologies, friend. " + (err.message || "I lost my connection for a brief moment. Let us continue speaking of Udupi.") }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Auto update Udupi Local Time
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setLocalTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Scroll tracking for header style adjustments
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Elegant loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Web Audio API Synthesizer for Immersive Soundscape
  const startAmbientSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // 1. WAVE WASH GENERATION (White Noise modulated by slow LFO)
      const bufferSize = ctx.sampleRate * 4; // 4 seconds of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      // Lowpass filter to make it sound like sea surf
      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = "lowpass";
      waveFilter.frequency.value = 350;
      waveFilter.Q.value = 1;

      // Slow LFO to modulate filter frequency (creates swelling wave effect)
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.12; // Wave washes every 8 seconds

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200; // Swing frequency by 200Hz

      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0, ctx.currentTime);
      waveGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3.0); // Smooth 3s fade in
      waveGainRef.current = waveGain;

      lfo.connect(lfoGain);
      lfoGain.connect(waveFilter.frequency);
      noiseNode.connect(waveFilter);
      waveFilter.connect(waveGain);
      waveGain.connect(ctx.destination);

      // Start wave elements
      lfo.start();
      noiseNode.start();

      // 2. PERIODIC TEMPLE BELL TRIGGER
      const triggerTempleBell = () => {
        if (!audioContextRef.current || audioContextRef.current.state === "suspended") return;
        
        const bellCtx = audioContextRef.current;
        const now = bellCtx.currentTime;

        // Rich bell spectrum (multiple frequencies acting as partials)
        const frequencies = [125, 250, 375, 490, 615, 840];
        const gains = [0.15, 0.08, 0.05, 0.03, 0.015, 0.008];

        frequencies.forEach((freq, idx) => {
          const osc = bellCtx.createOscillator();
          const gainNode = bellCtx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);
          
          // Exponential decay representing metal resonance
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(gains[idx], now + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 6.0); // 6 seconds long ringing

          osc.connect(gainNode);
          gainNode.connect(bellCtx.destination);
          
          osc.start(now);
          osc.stop(now + 6.5);
        });
      };

      // Trigger immediately and then every 12 seconds
      triggerTempleBell();
      const intervalId = setInterval(triggerTempleBell, 12000);
      timerRef.current = intervalId;

      setIsAudioPlaying(true);
    } catch (err) {
      console.error("Audio Synthesis failed to initialize", err);
    }
  };

  const stopAmbientSynth = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const ctx = audioContextRef.current;
    const gainNode = waveGainRef.current;
    
    if (ctx && gainNode) {
      // Smooth fade out over 2.5 seconds
      try {
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
      } catch (e) {
        console.warn("Could not execute smooth fade out:", e);
      }
      
      setTimeout(() => {
        if (audioContextRef.current === ctx) {
          ctx.close();
          audioContextRef.current = null;
          setIsAudioPlaying(false);
        }
      }, 2500);
    } else {
      setIsAudioPlaying(false);
    }
  };

  const toggleSoundscape = () => {
    if (isAudioPlaying) {
      stopAmbientSynth();
    } else {
      startAmbientSynth();
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Map Navigation Scroll assistance
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Interests multi-select helper
  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  // Core API call to server-side Gemini trip planner
  const generateItinerary = async () => {
    setIsPlanning(true);
    setPlanError(null);
    setPlanResult(null);

    try {
      const response = await fetch("/api/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration, interests, groupStyle, pace }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.details || "Failed to customize trip.");
      }

      const data = await response.json();
      setPlanResult(data);
      setIsCockpitOpen(true);
      setCockpitTab("guide");
    } catch (err: any) {
      setPlanError(err.message || "An unexpected error occurred while consulting our heritage archives.");
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal font-sans selection:bg-brand-gold selection:text-brand-forest relative">
      
      {/* LOADING EXPERIENCE (CREAM BACKGROUND, ANIMATED LOGO, THIN GOLD PROGRESS LINE) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#FAF8F5] z-[9999] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center max-w-xs w-full space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="flex justify-center"
              >
                <Logo variant="gold" size={64} showText={true} />
              </motion.div>

              <div className="w-48 h-[1.5px] bg-brand-sand/40 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="absolute h-full bg-brand-gold"
                ></motion.div>
              </div>

              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-brand-gold/80 animate-pulse">
                Consulting Museum Archives...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL FLOATING MUSIC PLAYER / SOUND BAR */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-forest text-brand-ivory px-4 py-3 rounded-full shadow-2xl border border-brand-gold/30">
        <button 
          onClick={toggleSoundscape}
          className="flex items-center gap-2 hover:text-brand-gold transition-colors focus:outline-none group"
          id="soundscape-toggle"
          title="Toggle ambient Udupi soundscape"
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-5 h-5 text-brand-gold animate-pulse" />
              <div className="flex items-end gap-[2px] h-4 w-6">
                <span className="w-[3px] bg-brand-gold bar-1"></span>
                <span className="w-[3px] bg-brand-gold bar-2"></span>
                <span className="w-[3px] bg-brand-gold bar-3"></span>
                <span className="w-[3px] bg-brand-gold bar-4"></span>
                <span className="w-[3px] bg-brand-gold bar-5"></span>
              </div>
              <span className="text-xs font-mono tracking-wider text-brand-gold uppercase hidden md:inline">Atmosphere Live</span>
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              <span className="text-xs font-mono tracking-wider opacity-75 group-hover:opacity-100 uppercase hidden md:inline">Listen to Udupi</span>
            </>
          )}
        </button>
      </div>

      {/* TOP BAR / PREMIUM NAVIGATION */}
      <header className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? "bg-brand-ivory/95 backdrop-blur-lg border-b border-brand-sand shadow-sm" 
          : "bg-brand-ivory/80 backdrop-blur-md border-b border-brand-sand/50"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Handcrafted Emblem Logo */}
          <Logo variant="gold" size={44} showText={true} />

          {/* Clean Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button 
              onClick={() => scrollToId("heritage-gallery")} 
              className="relative text-brand-forest/80 hover:text-brand-forest transition-all font-mono uppercase text-xs tracking-widest py-2.5 group cursor-pointer focus:outline-none"
            >
              <span>Places</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToId("living-traditions")} 
              className="relative text-brand-forest/80 hover:text-brand-forest transition-all font-mono uppercase text-xs tracking-widest py-2.5 group cursor-pointer focus:outline-none"
            >
              <span>Traditions</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToId("festival-calendar")} 
              className="relative text-brand-forest/80 hover:text-brand-forest transition-all font-mono uppercase text-xs tracking-widest py-2.5 group cursor-pointer focus:outline-none"
            >
              <span>Calendar</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToId("food-trails")} 
              className="relative text-brand-forest/80 hover:text-brand-forest transition-all font-mono uppercase text-xs tracking-widest py-2.5 group cursor-pointer focus:outline-none"
            >
              <span>Culinary</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToId("community-stories")} 
              className="relative text-brand-forest/80 hover:text-brand-forest transition-all font-mono uppercase text-xs tracking-widest py-2.5 group cursor-pointer focus:outline-none"
            >
              <span>Journals</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button 
              onClick={() => scrollToId("cultural-map")} 
              className="relative text-brand-forest/80 hover:text-brand-forest transition-all font-mono uppercase text-xs tracking-widest py-2.5 group cursor-pointer focus:outline-none"
            >
              <span>Interactive Map</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-4">
            {/* Companion Toggle Button */}
            <button
              onClick={() => setIsCockpitOpen(true)}
              className="relative px-4 py-2.5 bg-brand-gold text-brand-forest hover:bg-brand-forest hover:text-brand-ivory text-xs font-mono uppercase tracking-widest transition-all rounded shadow-md border border-brand-gold/40 flex items-center gap-1.5 cursor-pointer focus:outline-none"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden md:inline">Companion</span>
              {(savedLandmarks.length > 0 || savedFoodTrails.length > 0 || savedHomestays.length > 0) && (
                <span className="bg-brand-forest text-brand-gold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans">
                  {savedLandmarks.length + savedFoodTrails.length + savedHomestays.length}
                </span>
              )}
            </button>

            {/* Live Udupi Time Indicator */}
            <div className="hidden sm:flex flex-col items-end text-[11px] font-mono tracking-wider uppercase text-brand-forest/60">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Udupi Time</span>
              <span className="text-brand-forest font-medium">{localTime || "10:00 AM"}</span>
            </div>
            
            <button 
              onClick={() => scrollToId("ai-planner")} 
              className="px-4 py-2.5 bg-brand-forest text-brand-ivory hover:bg-brand-gold hover:text-brand-forest text-xs font-mono uppercase tracking-widest transition-all rounded shadow-md border border-brand-gold/20 flex items-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>Planner</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION — DOCUMENTARY OVERVIEW */}
      <section id="arrival" className="relative h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col justify-between p-8 md:p-16 bg-brand-forest text-brand-ivory">
        
        {/* Cinematic Backdrop Image with slow zooming Ken Burns effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={arrivalImg} 
            alt="Cinematic Kapu Lighthouse coastal dawn of Udupi" 
            className="w-full h-full object-cover opacity-35 animate-kenburns scale-105"
          />
          {/* Subtle glowing light rays and tiny gold particles */}
          <div className="absolute inset-0 bg-radial-at-t from-brand-gold/10 via-transparent to-transparent pointer-events-none opacity-40 mix-blend-screen animate-ambient-glow"></div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-gold/5 blur-[120px] top-1/4 left-1/3 animate-pulse-slow"></div>
            <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-ocean/10 blur-[150px] bottom-1/4 right-1/4 animate-pulse-slow-delay"></div>
          </div>
          {/* Subtle vignette/shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/50 to-transparent"></div>
        </div>

        {/* Minimal Hero Header */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">Chapter I</span>
            <span className="font-serif italic text-lg text-brand-gold">The Sea Whispers</span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">13° 21' N • 74° 44' E</span>
        </div>

        {/* Core Narrative / Main Hero Typography */}
        <div className="relative z-10 max-w-3xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-brand-gold border-b border-brand-gold/30 pb-2 inline-block">An Interactive Living Archive</span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight font-light tracking-tight">
              Some places are visited. <br />
              <span className="font-serif italic text-brand-gold">Others stay with you.</span>
            </h1>
            <p className="font-sans font-light text-base md:text-lg text-brand-ivory/80 leading-relaxed max-w-xl">
              Welcome to LocalLore. A timeless digital museum of Udupi—a cinematic sanctuary where the brass bells of century-old temples, salt-washed basalt reefs, and wood-fired monastery kitchens merge into one living story.
            </p>
          </motion.div>
        </div>

        {/* Scroll To Arrive call to action */}
        <div className="relative z-10 flex justify-between items-end border-t border-brand-ivory/20 pt-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSoundscape}
              className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-brand-gold hover:text-brand-ivory transition-colors group"
            >
              <Volume2 className="w-4 h-4 animate-bounce" />
              {isAudioPlaying ? "Atmosphere Live (Stop Soundscape)" : "Activate Soundscape to listen"}
            </button>
          </div>
          <button 
            onClick={() => scrollToId("spirit-of-udupi")} 
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-brand-ivory/70 hover:text-brand-gold transition-colors group"
          >
            Scroll to Arrive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* SECTION: THE SPIRIT OF UDUPI */}
      <section id="spirit-of-udupi" className="py-24 px-6 max-w-7xl mx-auto border-b border-brand-sand/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Editorial Text Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Introduction</span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight font-light">
                The Heritage Trust of Tulu Nadu
              </h2>
            </div>
            
            <p className="text-brand-charcoal/80 font-sans font-light leading-relaxed text-base">
              To understand Udupi is to sit in silence under the clay tiles of Car Street as morning Vedic slokas harmonize with the distant pounding surf of Malpe. This is a land shaped by saintly philosophers, seafaring merchants, and master chefs who elevated humble coastal ingredients into sacred temple feasts.
            </p>

            <motion.blockquote 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { borderLeftColor: "rgba(197, 168, 92, 0.1)" },
                visible: {
                  borderLeftColor: "rgba(197, 168, 92, 1)",
                  transition: { staggerChildren: 0.2, duration: 1.2 }
                }
              }}
              className="border-l-2 border-brand-gold pl-6 py-1 my-4"
            >
              <motion.p 
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: "easeOut" } }
                }}
                className="font-serif italic text-lg text-brand-forest font-light"
              >
                "We do not inherit the land from our ancestors; we borrow it from our children."
              </motion.p>
              <motion.cite 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 0.8, transition: { duration: 0.8 } }
                }}
                className="block text-xs font-mono tracking-widest uppercase mt-2 text-brand-gold/80"
              >
                — Tulu Coastal Proverb
              </motion.cite>
            </motion.blockquote>

            <p className="text-brand-charcoal/70 font-sans font-light text-sm leading-relaxed">
              LocalLore preserves this unique ecosystem by capturing genuine sounds, oral memories, temple structures, and traditional recipes with archival precision. We invite you to slow down, explore deep regional truths, and create custom journeys that respect local history.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => scrollToId("cultural-map")}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-brand-forest hover:text-brand-gold transition-colors font-semibold"
              >
                Launch Cultural Map <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Cinematic Graphic Column */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            
            <div className="col-span-8 overflow-hidden rounded shadow-lg group">
              <img 
                src={spiritOfUdupiImg} 
                alt="Intricate golden carvings and lamps of Sri Krishna Matha temple" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="p-4 bg-brand-forest text-brand-ivory">
                <span className="font-mono text-[9px] tracking-widest uppercase opacity-75">Car Street Shrine</span>
                <p className="font-serif text-sm mt-1">Carved timber framework preserving 700 years of daily light offerings.</p>
              </div>
            </div>

            <div className="col-span-4 flex flex-col justify-between gap-4">
              <div className="bg-brand-sand/30 p-6 rounded border border-brand-sand/50 flex flex-col justify-between h-40">
                <span className="font-mono text-xs text-brand-gold font-bold">12+</span>
                <p className="text-xs font-mono uppercase tracking-wider text-brand-forest">Sustained Living Traditions</p>
              </div>
              
              <div className="bg-brand-forest p-6 rounded flex flex-col justify-between h-40 text-brand-ivory">
                <span className="font-serif italic text-lg text-brand-gold">Silent</span>
                <p className="text-[10px] font-mono uppercase tracking-wider opacity-80">Nature Sanctuary Trails</p>
              </div>
            </div>

            <div className="col-span-12 bg-brand-forest/5 p-6 rounded-md border border-brand-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-forest text-brand-ivory rounded-full">
                  <Compass className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-brand-forest font-semibold">How to interact with the archives</h4>
                  <p className="text-xs text-brand-charcoal/75">Hover over elements to reveal layers. Click items to hear real local lore.</p>
                </div>
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-gold font-semibold bg-brand-ivory px-3 py-1.5 rounded border border-brand-sand">Curator-Approved</span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: FEATURED PLACES (CHAPTER I) */}
      <section id="heritage-gallery" className="py-24 bg-brand-forest text-brand-ivory relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-brand-ivory/10 pb-8">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Chapter II</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light">
                The Sacred Coast & Forgotten Ruins
              </h2>
            </div>
            <p className="text-sm font-light text-brand-ivory/70 max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
              From volcanic hexagonal basalt pillars off Malpe to ancient stone temples built to withstand heavy monsoons, every coordinate holds a legacy.
            </p>
          </div>

          {/* Places Grid Layout - Unique and spacious */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LANDMARKS.map((landmark) => (
              <motion.div 
                key={landmark.id}
                whileHover={{ y: -6 }}
                className="flex flex-col bg-brand-charcoal/30 rounded overflow-hidden border border-brand-ivory/10 group cursor-pointer"
                onClick={() => setSelectedLandmark(landmark)}
                id={`landmark-card-${landmark.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={landmark.imageUrl} 
                    alt={landmark.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-brand-forest/90 text-brand-gold border border-brand-gold/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded">
                    {landmark.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-gold tracking-widest">{landmark.subtitle}</span>
                    <h3 className="font-serif text-xl group-hover:text-brand-gold transition-colors">{landmark.name}</h3>
                  </div>

                  <p className="text-xs text-brand-ivory/80 font-light line-clamp-3 leading-relaxed">
                    {landmark.lore}
                  </p>

                  <div className="pt-2 border-t border-brand-ivory/10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-brand-gold">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLandmarkSave(landmark.id);
                      }}
                      className="hover:text-brand-ivory transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                    >
                      {savedLandmarks.includes(landmark.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-brand-gold" /> Saved
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Save
                        </>
                      )}
                    </button>
                    <span className="flex items-center gap-1">
                      Explore Archives <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* IMMERSIVE LANDMARK DRAWER/MODAL DETAIL */}
      <AnimatePresence>
        {selectedLandmark && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-forest/90 backdrop-blur-md z-50 overflow-y-auto p-4 md:p-8 flex items-center justify-center"
            onClick={() => setSelectedLandmark(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-brand-ivory text-brand-charcoal max-w-5xl w-full rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
              id={`landmark-modal-${selectedLandmark.id}`}
            >
              
              {/* Image & Key Info Column */}
              <div className="lg:col-span-5 relative bg-brand-forest text-brand-ivory flex flex-col justify-between p-8 min-h-[400px]">
                <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
                  <img 
                    src={selectedLandmark.imageUrl} 
                    alt={selectedLandmark.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-transparent to-brand-forest/30"></div>
                </div>

                {/* Top indicator */}
                <div className="relative z-10">
                  <span className="font-mono text-xs tracking-widest uppercase text-brand-gold bg-brand-forest/80 px-2 py-1 border border-brand-gold/30 rounded inline-block">
                    {selectedLandmark.category}
                  </span>
                </div>

                {/* Bottom Main Info */}
                <div className="relative z-10 space-y-3">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-brand-gold block">{selectedLandmark.subtitle}</span>
                  <h3 className="font-serif text-3xl font-light">{selectedLandmark.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-ivory/80 pt-2 border-t border-brand-ivory/20">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{selectedLandmark.locationDetails}</span>
                  </div>
                </div>
              </div>

              {/* Rich Narrative Archives Column */}
              <div className="lg:col-span-7 p-8 md:p-12 space-y-8 overflow-y-auto max-h-[85vh] scrollbar-thin">
                <div className="flex justify-between items-center border-b border-brand-sand pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Historical Dossier</span>
                  <button 
                    onClick={() => setSelectedLandmark(null)}
                    className="text-xs font-mono uppercase tracking-widest text-brand-forest hover:text-brand-gold transition-colors font-bold cursor-pointer"
                  >
                    Close [Esc]
                  </button>
                </div>

                {/* Lore / Overview */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs tracking-widest uppercase text-brand-forest font-semibold">The Lore</h4>
                  <p className="text-brand-charcoal/80 text-sm leading-relaxed font-sans">
                    {selectedLandmark.lore}
                  </p>
                </div>

                {/* Myths & Legends */}
                <div className="space-y-3 bg-brand-sand/20 p-6 rounded border-l-2 border-brand-gold">
                  <h4 className="font-mono text-xs tracking-widest uppercase text-brand-forest font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-gold" /> Myths & Local Beliefs
                  </h4>
                  <p className="text-brand-charcoal/80 text-sm leading-relaxed font-sans italic">
                    "{selectedLandmark.myth}"
                  </p>
                </div>

                {/* Architecture & Senses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-sand">
                  <div className="space-y-2">
                    <h5 className="font-mono text-xs tracking-widest uppercase text-brand-forest font-semibold">Architectural Soul</h5>
                    <p className="text-brand-charcoal/80 text-xs leading-relaxed">
                      {selectedLandmark.architecturalNote}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-mono text-xs tracking-widest uppercase text-brand-forest font-semibold">Acoustic Memory</h5>
                    <p className="text-brand-charcoal/80 text-xs leading-relaxed font-mono">
                      {selectedLandmark.soundsLike}
                    </p>
                  </div>
                </div>

                {/* Curator note */}
                <div className="bg-brand-forest text-brand-ivory p-4 rounded text-xs font-mono flex items-center justify-between">
                  <span>Best Time for Meditation: <strong>{selectedLandmark.bestTime}</strong></span>
                  <Info className="w-4 h-4 text-brand-gold" />
                </div>

                {/* Save to Companion / Open Cockpit */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-sand">
                  <button
                    onClick={() => {
                      toggleLandmarkSave(selectedLandmark.id);
                    }}
                    className={`flex-1 py-3 px-4 rounded text-xs font-mono uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                      savedLandmarks.includes(selectedLandmark.id)
                        ? "bg-brand-gold text-brand-forest border-brand-gold font-semibold"
                        : "border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-ivory"
                    }`}
                  >
                    {savedLandmarks.includes(selectedLandmark.id) ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Companion
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Save in Companion Cockpit
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLandmark(null);
                      setIsCockpitOpen(true);
                      setCockpitTab("guide");
                    }}
                    className="py-3 px-4 rounded text-xs font-mono uppercase tracking-wider bg-brand-forest text-brand-ivory hover:bg-brand-gold hover:text-brand-forest transition-colors"
                  >
                    Open Active Companion
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION: LIVING TRADITIONS (CHAPTER II) */}
      <section id="living-traditions" className="py-24 bg-brand-ivory border-b border-brand-sand/50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Chapter III</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light">
              Living Traditions & Sacred Oracles
            </h2>
            <p className="text-brand-charcoal/80 font-sans font-light leading-relaxed text-base">
              Step into the mystical theatre of coastal Karnataka, where local performers cross the boundary between human and divine.
            </p>
          </div>

          {/* Traditions layout with asymmetrical design */}
          <div className="space-y-20">
            {TRADITIONS.map((tradition, index) => (
              <div 
                key={tradition.id} 
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                id={`tradition-block-${tradition.id}`}
              >
                
                {/* Visual Column */}
                <div className={`lg:col-span-6 relative ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="overflow-hidden rounded-lg shadow-xl relative group">
                    <img 
                      src={tradition.imageUrl} 
                      alt={tradition.title} 
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-transparent to-transparent"></div>
                    
                    {/* Audio Preview trigger */}
                    <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
                      <button 
                        onClick={toggleSoundscape}
                        className="p-4 bg-brand-gold hover:bg-brand-forest text-brand-forest hover:text-brand-gold rounded-full transition-all shadow-lg"
                        title="Simulate Traditional Chants & Drums"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <div className="text-brand-ivory">
                        <span className="font-mono text-[9px] uppercase tracking-wider block opacity-75">Acoustic Archive</span>
                        <span className="font-serif text-xs italic text-brand-gold">Listen to ancestral frequencies</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Column */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase text-brand-gold tracking-widest">{tradition.subtitle}</span>
                    <h3 className="font-serif text-3xl md:text-4xl font-light text-brand-forest">{tradition.title}</h3>
                  </div>

                  <p className="text-brand-charcoal/80 font-sans font-light text-sm leading-relaxed">
                    {tradition.lore}
                  </p>

                  <div className="p-5 bg-brand-sand/20 rounded border border-brand-sand/50 space-y-2">
                    <span className="font-mono text-[10px] uppercase text-brand-gold font-bold tracking-widest">Ritual Atmosphere & Instruments</span>
                    <p className="text-xs text-brand-charcoal/90 leading-relaxed font-mono">
                      {tradition.soundsLike}
                    </p>
                  </div>

                  <p className="text-xs text-brand-charcoal/60 font-sans italic">
                    <strong>Historical Roots:</strong> {tradition.historicalContext}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: FESTIVAL CALENDAR */}
      <section id="festival-calendar" className="py-24 bg-brand-forest text-brand-ivory border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Sacred Cycles</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light">
              The Festival Calendar
            </h2>
            <p className="text-brand-ivory/70 font-sans font-light leading-relaxed text-sm">
              Discover the auspicious celebrations that transform the streets of Udupi into luminous river processions and massive chariot races.
            </p>
          </div>

          {/* Elegant Horizontal Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FESTIVALS.map((fest) => (
              <div 
                key={fest.id} 
                className="bg-brand-charcoal/30 p-8 rounded-lg border border-brand-ivory/10 flex flex-col justify-between space-y-6 relative overflow-hidden group"
                id={`festival-card-${fest.id}`}
              >
                {/* Decorative background light */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors"></div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-gold border border-brand-gold/30 px-2.5 py-1 rounded">
                      {fest.timing}
                    </span>
                    <span className="font-serif italic text-sm text-brand-gold/60">{fest.sanskritName}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-light">{fest.name}</h3>
                  <p className="text-xs text-brand-ivory/80 leading-relaxed font-light font-sans">
                    {fest.lore}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-ivory/10 flex items-center justify-between text-xs font-mono relative z-10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-gold" />
                    <span className="text-[10px] uppercase text-brand-ivory/60">Aura Colors:</span>
                    <span className="text-[10px] text-brand-gold uppercase">{fest.colors}</span>
                  </div>
                  <span className="text-[10px] text-brand-gold uppercase bg-brand-forest px-2 py-1 rounded">
                    {fest.significance.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: FOOD STORIES (CHAPTER IV) */}
      <section id="food-trails" className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-brand-sand pb-8">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Chapter IV</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-forest">
                Heritage Food Trails & Cooking Secrets
              </h2>
            </div>
            <p className="text-sm font-light text-brand-charcoal/70 max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
              Taste the heritage. Traditional Udupi vegetarian cuisine arose from strict monastery guidelines, creating clean, intensely flavorful dishes cooked in copper vessels over wood fire.
            </p>
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FOOD_TRAILS.map((trail) => (
              <div 
                key={trail.id} 
                className="bg-brand-ivory rounded overflow-hidden border border-brand-sand/80 shadow-sm flex flex-col group"
                id={`food-card-${trail.id}`}
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={trail.imageUrl} 
                    alt={trail.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-brand-forest text-brand-ivory px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded shadow">
                    {trail.alternateName}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">Classic Local Treat</span>
                    <h3 className="font-serif text-xl text-brand-forest">{trail.name}</h3>
                  </div>

                  <p className="text-xs text-brand-charcoal/80 font-light leading-relaxed font-sans">
                    {trail.lore}
                  </p>

                  <div className="p-4 bg-brand-sand/20 rounded border border-brand-sand/50 text-xs">
                    <strong className="font-mono text-[10px] uppercase text-brand-forest block mb-1">Culinary Secret</strong>
                    <p className="text-brand-charcoal/80 italic font-sans">"{trail.culinarySecrets}"</p>
                  </div>

                  <div className="pt-3 border-t border-brand-sand flex flex-col gap-2 text-xs text-brand-charcoal/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold">Recommended Tasting:</span>
                        <p className="font-serif italic text-brand-forest">{trail.whereToFind}</p>
                      </div>
                      <button
                        onClick={() => {
                          toggleFoodTrailSave(trail.id);
                        }}
                        className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded border transition-colors flex items-center gap-1 cursor-pointer ${
                          savedFoodTrails.includes(trail.id)
                            ? "bg-brand-forest text-brand-gold border-brand-forest"
                            : "border-brand-sand hover:border-brand-gold text-brand-forest"
                        }`}
                      >
                        {savedFoodTrails.includes(trail.id) ? (
                          <>
                            <Check className="w-3 h-3" /> Saved
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> Add to Trail
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: COMMUNITY STORIES / JOURNALS */}
      <section id="community-stories" className="py-24 bg-brand-forest text-brand-ivory">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Coastal Voices</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light">
              Living Chronicles & Oral History
            </h2>
            <p className="text-brand-ivory/70 font-sans font-light leading-relaxed text-sm">
              Read hand-written diaries, photo journals, and oral histories of real locals who dedicated their lives to preserving Tulu customs.
            </p>
          </div>

          {/* Journals Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {STORIES.map((story) => (
              <div 
                key={story.id} 
                className="bg-brand-charcoal/35 rounded-lg border border-brand-ivory/10 flex flex-col justify-between overflow-hidden group hover:border-brand-gold/30 transition-all"
                id={`story-card-${story.id}`}
              >
                
                {/* Visual Thumbnail */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={story.imageUrl} 
                    alt={story.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent"></div>
                </div>

                <div className="p-6 space-y-4 flex-grow">
                  <div className="flex items-center gap-3">
                    <img 
                      src={story.avatar} 
                      alt={story.author} 
                      className="w-8 h-8 rounded-full border border-brand-gold object-cover"
                    />
                    <div>
                      <h4 className="font-serif text-xs font-semibold text-brand-gold">{story.author}</h4>
                      <p className="text-[9px] font-mono uppercase text-brand-ivory/60">{story.role}</p>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg leading-snug text-brand-ivory group-hover:text-brand-gold transition-colors pt-2">
                    {story.title}
                  </h3>

                  <p className="text-xs text-brand-ivory/80 font-light leading-relaxed italic">
                    "{story.excerpt}"
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-brand-ivory/10 flex justify-between items-center text-[10px] font-mono text-brand-ivory/50">
                  <span>{story.date}</span>
                  <div className="flex gap-1.5">
                    {story.tags.slice(0, 2).map((t) => (
                      <span key={t} className="bg-brand-forest text-brand-gold px-1.5 py-0.5 rounded text-[8px] uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: INTERACTIVE GEOGRAPHICAL CULTURAL MAP */}
      <section id="cultural-map" className="py-24 bg-brand-ivory border-b border-brand-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Map Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Interactive Chart</span>
              <h2 className="font-serif text-4xl font-light text-brand-forest">
                The Sacred Cartography of Udupi
              </h2>
              <p className="text-brand-charcoal/80 text-sm leading-relaxed font-sans font-light">
                Click on the ancient coordinates below to view geographical lore and quickly navigate the living museum. This vector map traces the delicate coastline from volcanic basalt pillars in the north down to the red cliff lighthouses of the southern bays.
              </p>

              {/* Coordinates List acting as interactive hotkeys */}
              <div className="space-y-3 pt-4">
                {LANDMARKS.map((land) => (
                  <button
                    key={land.id}
                    onClick={() => {
                      setSelectedLandmark(land);
                      scrollToId("heritage-gallery");
                    }}
                    className="w-full text-left p-3.5 bg-brand-ivory hover:bg-brand-sand/30 border border-brand-sand hover:border-brand-gold rounded transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-brand-forest text-brand-gold rounded-full">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-brand-forest uppercase block">{land.name}</span>
                        <span className="text-[10px] text-brand-charcoal/60 font-serif italic block">{land.subtitle}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Real Interactive Satellite Map Column */}
            <div className="lg:col-span-7 flex flex-col justify-between items-center relative">
              <div className="w-full h-[520px] rounded-xl overflow-hidden border border-brand-sand shadow-lg bg-zinc-950">
                <SatelliteMap
                  landmarks={LANDMARKS}
                  livingHeritage={LIVING_HERITAGE_EXPERIENCES}
                  selectedLandmark={selectedLandmark}
                  selectedLivingHeritage={selectedLivingHeritage}
                  onSelectLandmark={setSelectedLandmark}
                  onSelectLivingHeritage={setSelectedLivingHeritage}
                />
              </div>
              <div className="mt-4 bg-brand-forest text-brand-ivory p-4 rounded text-xs font-mono max-w-md w-full border border-brand-gold/30 text-center shadow z-10">
                ✨ Pan and zoom this high-resolution satellite map. Click any pulsing beacon to load its historical chronicles.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: AI TRIP PLANNER — CURATE MY JOURNEY */}
      <section id="ai-planner" className="py-24 bg-brand-forest text-brand-ivory relative overflow-hidden">
        
        {/* Subtle decorative temple wheel layout inside the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-gold/5 rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-gold">Chapter V</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light">
              AI Heritage Itinerary Designer
            </h2>
            <p className="text-brand-ivory/80 font-sans font-light leading-relaxed text-sm">
              In consultation with the digital museum’s cultural historians, design a personalized journey through Udupi. Let our AI curate days centered around your unique tempo, interests, and dining tastes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Configuration Panel Column */}
            <div className="lg:col-span-5 bg-brand-charcoal/40 p-8 rounded-lg border border-brand-ivory/10 space-y-8">
              <h3 className="font-serif text-xl text-brand-gold border-b border-brand-ivory/10 pb-4">Define Your Journey</h3>

              {/* Day Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono tracking-wider uppercase text-brand-ivory/80 block">Duration of Stay</label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 7].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2 rounded text-xs font-mono border transition-all ${duration === d ? 'bg-brand-gold text-brand-forest border-brand-gold font-bold' : 'bg-transparent text-brand-ivory border-brand-ivory/20 hover:border-brand-gold'}`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Areas (Interests) */}
              <div className="space-y-3">
                <label className="text-xs font-mono tracking-wider uppercase text-brand-ivory/80 block">Archival Interests</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "heritage", label: "Ancient Ruins & History" },
                    { id: "sacred", label: "Temples & Monasteries" },
                    { id: "cuisine", label: "Wood-fired Cooking" },
                    { id: "coast", label: "Reefs & Lighthouses" },
                    { id: "folklore", label: "Oral Legends & Spirits" },
                    { id: "nature", label: "Monsoon Forests" }
                  ].map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`py-2 px-3 text-left rounded text-xs font-sans border transition-all flex items-center justify-between ${interests.includes(interest.id) ? 'bg-brand-ivory text-brand-forest border-brand-ivory font-semibold' : 'bg-transparent text-brand-ivory/80 border-brand-ivory/20 hover:border-brand-gold'}`}
                    >
                      <span>{interest.label}</span>
                      {interests.includes(interest.id) && <span className="text-brand-gold font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-xs font-mono tracking-wider uppercase text-brand-ivory/80 block">Travel Party</label>
                  <select
                    value={groupStyle}
                    onChange={(e) => setGroupStyle(e.target.value)}
                    className="w-full bg-brand-forest text-brand-ivory border border-brand-ivory/20 rounded p-2.5 text-xs font-mono focus:outline-none focus:border-brand-gold"
                  >
                    <option value="solo">Solo Seeker</option>
                    <option value="couple">Couples Sanctuary</option>
                    <option value="family">Family Pilgrimage</option>
                    <option value="friends">Fellow Explorers</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono tracking-wider uppercase text-brand-ivory/80 block">Movement Pace</label>
                  <select
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                    className="w-full bg-brand-forest text-brand-ivory border border-brand-ivory/20 rounded p-2.5 text-xs font-mono focus:outline-none focus:border-brand-gold"
                  >
                    <option value="relaxed">Slow & Mindful</option>
                    <option value="moderate">Curated Explorer</option>
                    <option value="intensive">Deep Dive Study</option>
                  </select>
                </div>
              </div>

              {/* Submit Trigger */}
              <button
                onClick={generateItinerary}
                disabled={isPlanning}
                className="w-full py-4 bg-brand-gold text-brand-forest hover:bg-brand-ivory hover:text-brand-forest font-mono uppercase tracking-widest text-xs font-bold transition-all rounded shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPlanning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-forest" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Consulting Sacred Scrolls...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Curate My Custom Journey
                  </>
                )}
              </button>

              {planError && (
                <div className="p-4 bg-brand-terracotta/20 text-brand-ivory text-xs border border-brand-terracotta/30 rounded">
                  ⚠️ {planError}
                </div>
              )}
            </div>

            {/* Curated Result Document Column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {planResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="bg-[#fcfbf9] text-brand-charcoal p-8 md:p-12 rounded-lg shadow-2xl border border-brand-sand relative overflow-hidden"
                    id="curated-journal-document"
                  >
                    {/* Paper grain overlay */}
                    <div className="absolute inset-0 bg-repeat opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }}></div>

                    {/* Journal Header */}
                    <div className="text-center space-y-3 border-b border-brand-sand/80 pb-8 relative z-10">
                      <Logo size={40} showText={false} variant="dark" className="justify-center" />
                      <span className="font-mono text-[9px] tracking-widest uppercase text-brand-gold font-bold block">Exclusive Travel Journal</span>
                      <h3 className="font-serif text-3xl text-brand-forest leading-tight tracking-tight font-medium">
                        {planResult.tripTitle}
                      </h3>
                      <p className="font-serif italic text-sm text-brand-charcoal/80 max-w-lg mx-auto leading-relaxed">
                        "{planResult.themeDescription}"
                      </p>
                    </div>

                    {/* Day by Day Narratives */}
                    <div className="space-y-12 py-8 relative z-10 border-b border-brand-sand/80">
                      {planResult.dayItineraries.map((day) => (
                        <div key={day.dayNumber} className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] uppercase bg-brand-forest text-brand-gold px-2 py-0.5 rounded-sm">
                              Day {day.dayNumber}
                            </span>
                            <h4 className="font-serif text-xl text-brand-forest font-semibold">{day.title}</h4>
                          </div>

                          <p className="text-sm font-sans font-light text-brand-charcoal/80 leading-relaxed">
                            {day.narrative}
                          </p>

                          {/* Specific sights suggested */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            {day.places.map((place, pIdx) => (
                              <div key={pIdx} className="bg-brand-sand/15 p-4 rounded border border-brand-sand/30 flex flex-col justify-between">
                                <div>
                                  <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold block">Historic Coordinate</span>
                                  <strong className="font-serif text-sm text-brand-forest block mb-1">{place.name}</strong>
                                  <p className="text-[11px] text-brand-charcoal/80 leading-relaxed italic">
                                    "{place.culturalLore}"
                                  </p>
                                </div>
                                <div className="mt-3 pt-2 border-t border-brand-sand/30 text-[10px] text-brand-forest font-mono">
                                  <strong>Local insight:</strong> {place.localTip}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Culinary highlight recommendations */}
                    <div className="py-8 relative z-10 space-y-6 border-b border-brand-sand/80">
                      <div className="flex items-center gap-2 text-brand-forest">
                        <Utensils className="w-5 h-5 text-brand-gold" />
                        <h4 className="font-serif text-lg font-semibold">Suggested Culinary Stops</h4>
                      </div>

                      <div className="space-y-4">
                        {planResult.culinaryRecommendations.map((dish, dIdx) => (
                          <div key={dIdx} className="bg-brand-ivory p-4 rounded border border-brand-sand text-xs flex flex-col sm:flex-row justify-between gap-4">
                            <div className="space-y-1 sm:max-w-[70%]">
                              <strong className="font-serif text-sm text-brand-forest block">{dish.dishName}</strong>
                              <p className="text-brand-charcoal/80 italic font-sans leading-relaxed">"{dish.description}"</p>
                              <span className="text-[10px] text-brand-charcoal/60 font-serif block">Origin: {dish.culturalContext}</span>
                            </div>
                            <div className="text-right flex flex-col justify-end">
                              <span className="text-[9px] font-mono uppercase text-brand-gold block font-bold">Traditional Stove:</span>
                              <span className="text-[11px] font-mono text-brand-forest">{dish.whereToTry}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Soundscape recommendation */}
                    <div className="pt-6 text-center text-xs font-mono text-brand-forest/70 relative z-10">
                      <span className="font-bold text-brand-gold block mb-1">👂 HEAR THE JOURNEY:</span>
                      <p className="italic">"{planResult.soundscapeRecommendation}"</p>
                    </div>

                  </motion.div>
                ) : (
                  <div className="h-full min-h-[450px] bg-brand-charcoal/20 rounded-lg border border-brand-ivory/10 flex flex-col justify-center items-center text-center p-8 space-y-4">
                    <Logo size={56} showText={false} variant="gold" />
                    <h3 className="font-serif text-xl text-brand-gold">Your Personal Scroll Remains Unwritten</h3>
                    <p className="text-xs text-brand-ivory/70 max-w-md font-sans font-light leading-relaxed">
                      Select your travel parameters on the left and invoke our digital museum archives to construct a deeply customized, historically sound travel journal.
                    </p>
                    <div className="w-24 h-0.5 bg-brand-gold/30"></div>
                    <span className="text-[10px] font-mono uppercase text-brand-ivory/40 tracking-widest">Powered by Gemini 3.5 Flash API</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: FEATURED LOCAL EXPERIENCES / CURATED RECOMMENDATIONS */}
      <section id="featured-experiences" className="py-24 bg-brand-ivory border-t border-brand-sand/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header with Elegant Museum Typography */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-brand-gold font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
                Archival Recommendations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-brand-forest">
                Featured Local Experiences
              </h2>
              <div className="h-[1px] w-20 bg-brand-gold/50"></div>
            </div>
            <p className="text-brand-charcoal/70 font-sans font-light leading-relaxed text-xs max-w-md">
              A curated selection of five deeply authentic regional journeys, mapped by local historians and conservationists to protect Udupi's ecological and architectural beauty.
            </p>
          </div>

          {/* Responsive Layout Grid / Carousel */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="flex md:grid md:grid-cols-4 lg:grid-cols-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none gap-6 pb-6 md:pb-0"
          >
            {CURATED_EXPERIENCES.map((exp, idx) => {
              // Custom span based on index for Tablet (md) and Desktop (lg) layouts
              let colSpanClass = "";
              if (idx === 0 || idx === 1) {
                // First 2 are large landscape cards
                colSpanClass = "md:col-span-2 lg:col-span-3";
              } else if (idx === 2 || idx === 3) {
                // Next 2 are smaller supporting cards
                colSpanClass = "md:col-span-2 lg:col-span-2";
              } else {
                // Last 1 is a smaller supporting card (or full width on tablet to complete 2+2+1)
                colSpanClass = "md:col-span-4 lg:col-span-2";
              }

              return (
                <motion.div
                  key={exp.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  onClick={() => exp.anchor && scrollToId(exp.anchor)}
                  className={`flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-auto md:shrink snap-center cursor-pointer group premium-zoom-parent bg-brand-ivory border border-brand-sand/60 rounded overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brand-gold/40 hover:-translate-y-1 transition-all duration-700 ${colSpanClass}`}
                >
                  {/* Card Image and Chronicle Tag */}
                  <div className="relative overflow-hidden aspect-[16/10] w-full bg-brand-forest">
                    <img 
                      src={exp.imageUrl} 
                      alt={exp.title}
                      className="w-full h-full object-cover premium-zoom-img opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/40 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-brand-forest/90 text-brand-gold font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded shadow-sm border border-brand-gold/20">
                      {exp.chronicle}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-brand-gold bg-brand-forest/10 px-2 py-0.5 rounded">
                          {exp.tag}
                        </span>
                        <span className="text-[10px] font-mono text-brand-charcoal/50">• {exp.details}</span>
                      </div>
                      <h3 className="font-serif text-lg leading-tight text-brand-forest group-hover:text-brand-gold transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-brand-charcoal/70 font-sans font-light leading-relaxed line-clamp-2">
                        {exp.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-brand-sand/30 flex items-center justify-between text-xs font-mono text-brand-forest font-semibold uppercase tracking-widest">
                      <span className="text-[10px] group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                        Explore Chronicle <ArrowUpRight className="w-3 h-3 text-brand-gold" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* SECTION: CHAPTER IV — THE LIVING HERITAGE */}
      <section id="living-heritage" className="py-32 bg-[#fafbf9] border-t border-brand-sand/50 overflow-hidden relative">
        {/* Subtle separator at the very top of the section */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          
          {/* Chapter Introduction Header */}
          <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
            <span className="font-mono text-[10px] tracking-widest uppercase text-brand-gold font-semibold block">
              CHAPTER IV
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-forest tracking-tight">
              The Living Heritage
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold/60 mx-auto my-4"></div>
            <div className="space-y-4 text-brand-charcoal/80 font-sans font-light leading-relaxed text-sm max-w-2xl mx-auto">
              <p>
                The traditions of Udupi don't end in history—they continue to live through heritage villages, family-run hotels, local artisans, traditional cuisine, guided adventures, peaceful backwaters and authentic community experiences.
              </p>
              <p className="italic text-brand-forest/80 font-serif text-base pt-2">
                This chapter invites visitors to step beyond the archive and experience Udupi through carefully curated places that preserve its living culture.
              </p>
            </div>
          </div>

          {/* Staggered Storytelling Layout */}
          <div className="space-y-24">
            
            {/* 1. Large Feature Experience: Hasta Shilpa Heritage Village */}
            {(() => {
              const exp = LIVING_HERITAGE_EXPERIENCES[0];
              return (
                <div key={exp.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                  {/* Poster Museum Frame Column */}
                  <div className="lg:col-span-7 flex justify-center">
                    <motion.div 
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-[#FAF6F0] p-4 rounded shadow-md border border-[#c5a85c]/30 max-w-xl w-full transition-all duration-700 hover:shadow-xl group-hover:border-brand-gold/50"
                    >
                      {/* Original Aspect Ratio container (3:4) */}
                      <div className="overflow-hidden aspect-[3/4] w-full relative rounded-sm bg-brand-forest">
                        <img 
                          src={exp.imageUrl} 
                          alt={exp.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                        />
                        {/* Muted Gold Accent Highlight Line */}
                        <div className="absolute bottom-0 left-0 h-[3px] bg-[#c5a85c] w-0 group-hover:w-full transition-all duration-700"></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Editorial Information Panel Column */}
                  <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a85c] border border-[#c5a85c]/40 px-2 py-0.5 rounded">
                          {exp.curatorBadge}
                        </span>
                        <span className="font-mono text-[9px] tracking-wider uppercase text-brand-charcoal/50">
                          {exp.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-light text-brand-forest tracking-tight group-hover:text-brand-gold transition-colors duration-500">
                        {exp.title}
                      </h3>
                      <p className="text-brand-charcoal font-sans font-light text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Museum-style labels */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-brand-sand/40 text-xs font-mono">
                      <div>
                        <span className="text-brand-charcoal/40 uppercase text-[9px] tracking-wider block mb-1">Location</span>
                        <span className="text-brand-forest font-medium block">{exp.location}</span>
                      </div>
                      <div>
                        <span className="text-brand-charcoal/40 uppercase text-[9px] tracking-wider block mb-1">Suggested Duration</span>
                        <span className="text-brand-forest font-medium block">{exp.duration}</span>
                      </div>
                    </div>

                    {/* Button Group */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button 
                        onClick={() => setSelectedLivingHeritage(exp)}
                        className="group/btn px-5 py-2.5 bg-brand-forest hover:bg-brand-gold text-brand-ivory hover:text-brand-forest text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 rounded flex items-center gap-1.5 shadow-sm font-semibold cursor-pointer"
                      >
                        <span className="group-hover/btn:-translate-y-[1px] transition-transform duration-300">Explore Experience</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a85c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </button>

                      <button 
                        onClick={() => toggleLivingHeritageSave(exp.id)}
                        className={`px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest rounded border transition-colors duration-500 flex items-center gap-1.5 font-semibold cursor-pointer ${
                          savedLivingHeritage.includes(exp.id)
                            ? "bg-brand-gold text-brand-forest border-brand-gold"
                            : "border-brand-sand hover:border-brand-gold text-brand-forest bg-transparent"
                        }`}
                      >
                        {savedLivingHeritage.includes(exp.id) ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Saved to Planner
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Save to Planner
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 2. Two Medium Experiences: Kidiyoor Hotels & Kodachadri Hills Trek */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              {LIVING_HERITAGE_EXPERIENCES.slice(1, 3).map((exp) => (
                <div key={exp.id} className="space-y-6 group">
                  {/* Poster Museum Frame */}
                  <div className="flex justify-center">
                    <motion.div 
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-[#FAF6F0] p-4 rounded shadow-md border border-[#c5a85c]/30 w-full transition-all duration-700 hover:shadow-xl group-hover:border-brand-gold/50"
                    >
                      {/* Original Aspect Ratio container (3:4) */}
                      <div className="overflow-hidden aspect-[3/4] w-full relative rounded-sm bg-brand-forest">
                        <img 
                          src={exp.imageUrl} 
                          alt={exp.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                        />
                        {/* Muted Gold Accent Highlight Line */}
                        <div className="absolute bottom-0 left-0 h-[3px] bg-[#c5a85c] w-0 group-hover:w-full transition-all duration-700"></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Editorial Info Panel */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a85c] border border-[#c5a85c]/40 px-2 py-0.5 rounded">
                        {exp.curatorBadge}
                      </span>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-brand-charcoal/50">
                        {exp.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-light text-brand-forest tracking-tight group-hover:text-brand-gold transition-colors duration-500">
                      {exp.title}
                    </h3>
                    <p className="text-brand-charcoal font-sans font-light text-xs leading-relaxed line-clamp-3">
                      {exp.description}
                    </p>

                    {/* Museum-style labels */}
                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-brand-sand/30 text-[11px] font-mono">
                      <div>
                        <span className="text-brand-charcoal/40 uppercase text-[8px] tracking-wider block mb-0.5">Location</span>
                        <span className="text-brand-forest font-medium block truncate">{exp.location}</span>
                      </div>
                      <div>
                        <span className="text-brand-charcoal/40 uppercase text-[8px] tracking-wider block mb-0.5">Duration</span>
                        <span className="text-brand-forest font-medium block">{exp.duration}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button 
                        onClick={() => setSelectedLivingHeritage(exp)}
                        className="group/btn px-4 py-2 bg-brand-forest hover:bg-brand-gold text-brand-ivory hover:text-brand-forest text-[9px] font-mono uppercase tracking-widest transition-colors duration-500 rounded flex items-center gap-1 shadow-sm font-semibold cursor-pointer"
                      >
                        <span className="group-hover/btn:-translate-y-[1px] transition-transform duration-300">Explore</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a85c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </button>

                      <button 
                        onClick={() => toggleLivingHeritageSave(exp.id)}
                        className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest rounded border transition-colors duration-500 flex items-center gap-1 font-semibold cursor-pointer ${
                          savedLivingHeritage.includes(exp.id)
                            ? "bg-brand-gold text-brand-forest border-brand-gold"
                            : "border-brand-sand hover:border-brand-gold text-brand-forest bg-transparent"
                        }`}
                      >
                        {savedLivingHeritage.includes(exp.id) ? (
                          <>
                            <Check className="w-3 h-3" /> Saved
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> Save
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Two Supporting Experiences: Udupi Backwater Experience & Soulful Udupi Journey */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              {LIVING_HERITAGE_EXPERIENCES.slice(3, 5).map((exp) => (
                <div key={exp.id} className="space-y-6 group">
                  {/* Poster Museum Frame */}
                  <div className="flex justify-center">
                    <motion.div 
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-[#FAF6F0] p-4 rounded shadow-md border border-[#c5a85c]/30 w-full transition-all duration-700 hover:shadow-xl group-hover:border-brand-gold/50"
                    >
                      {/* Original Aspect Ratio container (3:4) */}
                      <div className="overflow-hidden aspect-[3/4] w-full relative rounded-sm bg-brand-forest">
                        <img 
                          src={exp.imageUrl} 
                          alt={exp.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                        />
                        {/* Muted Gold Accent Highlight Line */}
                        <div className="absolute bottom-0 left-0 h-[3px] bg-[#c5a85c] w-0 group-hover:w-full transition-all duration-700"></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Editorial Info Panel */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a85c] border border-[#c5a85c]/40 px-2 py-0.5 rounded">
                        {exp.curatorBadge}
                      </span>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-brand-charcoal/50">
                        {exp.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-light text-brand-forest tracking-tight group-hover:text-brand-gold transition-colors duration-500">
                      {exp.title}
                    </h3>
                    <p className="text-brand-charcoal font-sans font-light text-xs leading-relaxed line-clamp-3">
                      {exp.description}
                    </p>

                    {/* Museum-style labels */}
                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-brand-sand/30 text-[11px] font-mono">
                      <div>
                        <span className="text-brand-charcoal/40 uppercase text-[8px] tracking-wider block mb-0.5">Location</span>
                        <span className="text-brand-forest font-medium block truncate">{exp.location}</span>
                      </div>
                      <div>
                        <span className="text-brand-charcoal/40 uppercase text-[8px] tracking-wider block mb-0.5">Duration</span>
                        <span className="text-brand-forest font-medium block">{exp.duration}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button 
                        onClick={() => setSelectedLivingHeritage(exp)}
                        className="group/btn px-4 py-2 bg-brand-forest hover:bg-brand-gold text-brand-ivory hover:text-brand-forest text-[9px] font-mono uppercase tracking-widest transition-colors duration-500 rounded flex items-center gap-1 shadow-sm font-semibold cursor-pointer"
                      >
                        <span className="group-hover/btn:-translate-y-[1px] transition-transform duration-300">Explore</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a85c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </button>

                      <button 
                        onClick={() => toggleLivingHeritageSave(exp.id)}
                        className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest rounded border transition-colors duration-500 flex items-center gap-1 font-semibold cursor-pointer ${
                          savedLivingHeritage.includes(exp.id)
                            ? "bg-brand-gold text-brand-forest border-brand-gold"
                            : "border-brand-sand hover:border-brand-gold text-brand-forest bg-transparent"
                        }`}
                      >
                        {savedLivingHeritage.includes(exp.id) ? (
                          <>
                            <Check className="w-3 h-3" /> Saved
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> Save
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* FINAL CURATOR NOTE */}
          <div className="mt-28 pt-8 border-t border-brand-sand/40 text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-mono text-brand-charcoal/50 leading-relaxed uppercase tracking-widest">
              Every experience featured in this chapter has been thoughtfully selected for preserving the craftsmanship, hospitality, traditions and living heritage of coastal Karnataka.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: ADVERTISEMENT SHOWCASE (PLACEHOLDER) */}
      <section id="advertisements" className="py-20 bg-[#f3efe6] border-t border-b border-brand-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-brand-gold font-bold">Curated Partners</span>
            <h2 className="font-serif text-3xl font-light text-brand-forest">
              Heritage Homestays & Coastal Lodging
            </h2>
            <p className="text-brand-charcoal/70 font-sans font-light leading-relaxed text-xs">
              To preserve authentic tourism, we highlight selected local partners who protect Udupi's ecological and architectural beauty.
            </p>
          </div>

          {/* Advertisement Showcase Layout (Constructed with placeholders as requested) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Ad Placeholder 1 */}
            <div className="bg-brand-ivory p-6 rounded border border-brand-sand flex flex-col justify-between h-72 group hover:border-brand-gold transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold">Heritage Homestay</span>
                <h4 className="font-serif text-lg text-brand-forest font-semibold">The Red Tile Homestead</h4>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed font-sans">
                  A beautifully restored 150-year-old traditional Tulu home near Pajaka, offering organic vegetarian local dining.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-sand flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-brand-charcoal/60">Kaup Hills</span>
                <button
                  onClick={() => setActiveBookingHomestay({ name: "The Red Tile Homestead", location: "Kaup Hills" })}
                  className="text-xs font-mono text-brand-gold font-semibold group-hover:underline flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  Reserve Homestay <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Ad Placeholder 2 */}
            <div className="bg-brand-ivory p-6 rounded border border-brand-sand flex flex-col justify-between h-72 group hover:border-brand-gold transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold">Luxury Sanctuary</span>
                <h4 className="font-serif text-lg text-brand-forest font-semibold">The Coconut Grove Resort</h4>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed font-sans">
                  Mindful coastal villas nestled in palm orchards overlooking Kapu bay. Powered entirely by solar energy.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-sand flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-brand-charcoal/60">Kapu Beach</span>
                <button
                  onClick={() => setActiveBookingHomestay({ name: "The Coconut Grove Resort", location: "Kapu Beach" })}
                  className="text-xs font-mono text-brand-gold font-semibold group-hover:underline flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  Reserve Sanctuary <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Ad Placeholder 3 */}
            <div className="bg-brand-ivory p-6 rounded border border-brand-sand flex flex-col justify-between h-72 group hover:border-brand-gold transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold">Culinary Pavilion</span>
                <h4 className="font-serif text-lg text-brand-forest font-semibold">Mitra Samaj Heritage</h4>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed font-sans">
                  Traditional wooden bench tea rooms serving authentic wood-fired coffee and legacy coastal delicacies since 1949.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-sand flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-brand-charcoal/60">Car Street Center</span>
                <span className="text-xs font-mono text-brand-gold font-semibold group-hover:underline flex items-center gap-1">
                  View Menu <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Ad Placeholder 4 */}
            <div className="bg-brand-ivory p-6 rounded border border-brand-sand flex flex-col justify-between h-72 group hover:border-brand-gold transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gold font-bold">Cultural Center</span>
                <span className="font-serif text-lg text-brand-forest font-semibold">Ashta Matha Trust</span>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed font-sans">
                  Sponsors and guides for the authentic traditional crafts, Sanskrit manuscript archives, and morning Vedic events.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-sand flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-brand-charcoal/60">Udupi Diocese</span>
                <span className="text-xs font-mono text-brand-gold font-semibold group-hover:underline flex items-center gap-1">
                  View Events <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

          {/* User management disclaimer */}
          <div className="mt-8 text-center text-[11px] font-mono text-brand-charcoal/50">
            ℹ️ Partner assets and active sponsor placements are managed by the platform curators.
          </div>
        </div>
      </section>

      {/* EDITORIAL FOOTER */}
      <footer className="bg-brand-forest text-brand-ivory py-20 border-t border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Manifesto Column */}
          <div className="md:col-span-5 space-y-6">
            <Logo variant="gold" size={48} showText={true} />
            <p className="text-xs font-sans font-light leading-relaxed text-brand-ivory/70 max-w-sm">
              LocalLore is a digital trust dedicated to the archival, preservation, and celebration of the coastal heritage of Udupi, Karnataka, India. We do not curate tourism; we catalog memory.
            </p>
            <div className="text-[10px] font-mono text-brand-gold tracking-widest uppercase">
              © 2026 LocalLore Foundation. All Rights Reserved.
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-xs uppercase text-brand-gold tracking-wider">Living Archives</h5>
            <ul className="space-y-2 text-xs font-sans font-light text-brand-ivory/80">
              <li><button onClick={() => scrollToId("spirit-of-udupi")} className="hover:text-brand-gold transition-colors">The Spirit of Udupi</button></li>
              <li><button onClick={() => scrollToId("heritage-gallery")} className="hover:text-brand-gold transition-colors">Coastlines & Sacred Spaces</button></li>
              <li><button onClick={() => scrollToId("living-traditions")} className="hover:text-brand-gold transition-colors">Yakshagana & Oracles</button></li>
              <li><button onClick={() => scrollToId("festival-calendar")} className="hover:text-brand-gold transition-colors">Vedic Solar Calendars</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h5 className="font-mono text-xs uppercase text-brand-gold tracking-wider">Interactive Hub</h5>
            <ul className="space-y-2 text-xs font-sans font-light text-brand-ivory/80">
              <li><button onClick={() => scrollToId("cultural-map")} className="hover:text-brand-gold transition-colors">Vector Geographic Map</button></li>
              <li><button onClick={() => scrollToId("ai-planner")} className="hover:text-brand-gold transition-colors">Itinerary Designer</button></li>
              <li><button onClick={() => scrollToId("food-trails")} className="hover:text-brand-gold transition-colors">Stove & Spice Trails</button></li>
              <li><button onClick={() => scrollToId("community-stories")} className="hover:text-brand-gold transition-colors">Local Oral History</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h5 className="font-mono text-xs uppercase text-brand-gold tracking-wider">Legal & Preservation</h5>
            <ul className="space-y-2 text-xs font-sans font-light text-brand-ivory/80">
              <li><span className="hover:text-brand-gold transition-colors cursor-pointer">Heritage Trust Terms</span></li>
              <li><span className="hover:text-brand-gold transition-colors cursor-pointer">Curator Guidelines</span></li>
              <li><span className="hover:text-brand-gold transition-colors cursor-pointer">API Metadata</span></li>
              <li><span className="hover:text-brand-gold transition-colors cursor-pointer">Cultural Preservation Act</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-brand-ivory/40">
          <span>COORDINATES: 13.3409° N, 74.7421° E</span>
          <span>A KINFOLK & CHROME-INSPIRED TRAVEL DOCUMENTARY</span>
          <span>MADE IN INDIA WITH ABSOLUTE DEVOTION</span>
        </div>
      </footer>

      {/* LOCAL LORE COMPANION COCKPIT DRAWER */}
      <AnimatePresence>
        {isCockpitOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCockpitOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Sliding Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF8F5] text-brand-charcoal z-50 shadow-2xl flex flex-col border-l border-brand-sand/50"
            >
              {/* Drawer Header */}
              <div className="p-6 bg-brand-forest text-brand-ivory flex items-center justify-between border-b border-brand-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none scale-150">
                  <Compass className="w-40 h-40" />
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <Logo size={32} showText={false} variant="gold" />
                  <div>
                    <h3 className="font-serif text-lg text-brand-gold font-semibold flex items-center gap-1.5">
                      Anantha <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Local Companion</span>
                    </h3>
                    <p className="text-[10px] font-mono tracking-widest text-brand-ivory/60 uppercase">Udupi Heritage Trust</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCockpitOpen(false)}
                  className="p-1 rounded-full hover:bg-brand-ivory/10 text-brand-ivory/80 hover:text-brand-ivory transition-colors cursor-pointer focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-brand-sand bg-brand-ivory font-mono text-[10px] uppercase tracking-wider font-bold">
                {[
                  { id: "guide", label: "My Journey", icon: Compass },
                  { id: "chat", label: "Ask Anantha", icon: MessageSquare },
                  { id: "transit", label: "Transit & Tulu", icon: Bus },
                  { id: "etiquette", label: "Pledge & Safe", icon: ShieldAlert }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setCockpitTab(tab.id as any)}
                      className={`flex-1 py-3 px-1 border-b-2 transition-all flex flex-col items-center gap-1 cursor-pointer focus:outline-none ${
                        cockpitTab === tab.id
                          ? "border-brand-gold text-brand-forest bg-[#FAF8F5]"
                          : "border-transparent text-brand-charcoal/50 hover:text-brand-forest hover:bg-brand-sand/10"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Drawer Content Area (Scrollable) */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {/* TAB 1: MY ACTIVE GUIDE */}
                {cockpitTab === "guide" && (
                  <div className="space-y-6">
                    {/* Header Summary */}
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-brand-forest font-semibold">Active Itinerary & Saves</h4>
                      <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans font-light">
                        Here is your active digital travel companion checklist. Every saved spot synchronizes with your offline journey maps.
                      </p>
                    </div>

                    {/* AI ITINERARY INTEGRATION */}
                    {planResult ? (
                      <div className="bg-brand-forest/5 p-4 rounded border border-brand-sand space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold bg-brand-forest px-2 py-0.5 rounded">AI Curated Scroll</span>
                          <span className="font-mono text-[10px] text-brand-forest">{planResult.dayItineraries.length} Days Active</span>
                        </div>
                        <h5 className="font-serif text-sm font-semibold text-brand-forest">{planResult.tripTitle}</h5>
                        <p className="text-[11px] text-brand-charcoal/80 italic leading-relaxed">"{planResult.themeDescription}"</p>
                        
                        <div className="border-t border-brand-sand/50 pt-2.5 space-y-3 text-xs">
                          {planResult.dayItineraries.map((day) => (
                            <div key={day.dayNumber} className="space-y-1 pl-2 border-l border-brand-gold">
                              <strong className="text-[10px] font-mono text-brand-gold uppercase">Day {day.dayNumber}: {day.title}</strong>
                              <p className="text-[11px] font-sans text-brand-charcoal/80 font-light leading-relaxed">
                                {day.narrative}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-brand-sand/15 p-4 rounded border border-dashed border-brand-sand flex flex-col items-center justify-center text-center py-6 space-y-3">
                        <Sparkles className="w-8 h-8 text-brand-gold/80" />
                        <div>
                          <strong className="text-xs font-serif text-brand-forest block">No AI Journey Scroll</strong>
                          <span className="text-[11px] text-brand-charcoal/60 leading-relaxed max-w-xs block font-sans font-light">
                            Run our smart Trip Planner in the main window to build a detailed regional route!
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setIsCockpitOpen(false);
                            scrollToId("ai-planner");
                          }}
                          className="px-3 py-1 bg-brand-forest text-brand-ivory text-[9px] font-mono uppercase tracking-widest rounded hover:bg-brand-gold hover:text-brand-forest transition-colors cursor-pointer"
                        >
                          Launch Planner
                        </button>
                      </div>
                    )}

                    {/* BOOKED HOMESTAYS/STAYS */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-brand-sand pb-1.5">
                        <strong className="font-mono text-[10px] uppercase text-brand-gold tracking-widest">Active Stays & Bookings</strong>
                        <span className="font-mono text-[9px] bg-brand-sand text-brand-forest px-1.5 rounded">{savedHomestays.length} Reserved</span>
                      </div>

                      {savedHomestays.length > 0 ? (
                        <div className="space-y-3">
                          {savedHomestays.map((booking) => (
                            <div key={booking.id} className="bg-brand-ivory rounded border border-brand-sand shadow-sm relative overflow-hidden flex flex-col">
                              {/* Left border ticket motif */}
                              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-gold"></div>
                              <div className="p-4 pl-6 space-y-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h6 className="font-serif text-sm font-semibold text-brand-forest leading-tight">{booking.name}</h6>
                                    <span className="text-[10px] font-mono text-brand-charcoal/60 uppercase">{booking.location} • Udupi</span>
                                  </div>
                                  <button
                                    onClick={() => removeHomestayBooking(booking.id)}
                                    className="p-1 hover:text-brand-terracotta text-brand-charcoal/40 transition-colors cursor-pointer focus:outline-none"
                                    title="Cancel reservation"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-b border-brand-sand/50 py-2">
                                  <div>
                                    <span className="text-brand-charcoal/50 block uppercase">Check In Date</span>
                                    <strong className="text-brand-forest">{booking.date}</strong>
                                  </div>
                                  <div>
                                    <span className="text-brand-charcoal/50 block uppercase">Guests</span>
                                    <strong className="text-brand-forest">{booking.guests} Seekers</strong>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 pt-1">
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] font-mono text-brand-charcoal/50 block uppercase">Host Support</span>
                                    <a href={`tel:${booking.hostPhone}`} className="text-[10px] font-mono text-brand-forest font-semibold hover:underline flex items-center gap-1">
                                      <Phone className="w-3 h-3 text-brand-gold" /> {booking.hostPhone}
                                    </a>
                                  </div>
                                  {/* Dummy QR code ticket motif */}
                                  <div className="flex flex-col items-center text-center p-1 bg-white border border-brand-sand rounded">
                                    <div className="w-10 h-10 bg-brand-charcoal flex items-center justify-center text-white font-mono text-[6px]">QR</div>
                                    <span className="text-[7px] font-mono text-brand-charcoal/40 mt-1">{booking.qrCode}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-brand-charcoal/50 italic block text-center font-sans py-2">
                          No active homestay bookings. Discover sustainable lodging in our curated showcase below the itinerary designer!
                        </span>
                      )}
                    </div>

                    {/* SAVED PLACES/LANDMARKS */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-brand-sand pb-1.5">
                        <strong className="font-mono text-[10px] uppercase text-brand-gold tracking-widest">Saved Coordinates</strong>
                        <span className="font-mono text-[9px] bg-brand-sand text-brand-forest px-1.5 rounded">{savedLandmarks.length} Spots</span>
                      </div>

                      {savedLandmarks.length > 0 ? (
                        <div className="space-y-2">
                          {savedLandmarks.map((id) => {
                            const landmark = LANDMARKS.find(l => l.id === id);
                            if (!landmark) return null;
                            return (
                              <div key={landmark.id} className="bg-brand-ivory rounded p-3 border border-brand-sand/80 flex items-center gap-3">
                                <img src={landmark.imageUrl} alt={landmark.name} className="w-12 h-12 object-cover rounded" />
                                <div className="flex-grow min-w-0">
                                  <strong className="font-serif text-xs text-brand-forest block truncate">{landmark.name}</strong>
                                  <span className="text-[9px] font-mono text-brand-gold uppercase block truncate">{landmark.subtitle}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => {
                                      setIsCockpitOpen(false);
                                      scrollToId("cultural-map");
                                    }}
                                    className="p-1.5 hover:bg-brand-sand/30 rounded text-brand-forest transition-colors cursor-pointer"
                                    title="Show on map"
                                  >
                                    <Map className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => toggleLandmarkSave(landmark.id)}
                                    className="p-1.5 hover:bg-brand-sand/30 rounded text-brand-terracotta transition-colors cursor-pointer"
                                    title="Remove"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-[11px] text-brand-charcoal/50 italic block text-center font-sans py-2">
                          No saved landmarks. Click the "+ Save" or "+ Add to Companion" button on any place card above!
                        </span>
                      )}
                    </div>

                    {/* SAVED FOOD TRAILS */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-brand-sand pb-1.5">
                        <strong className="font-mono text-[10px] uppercase text-brand-gold tracking-widest">Saved Culinary Feasts</strong>
                        <span className="font-mono text-[9px] bg-brand-sand text-brand-forest px-1.5 rounded">{savedFoodTrails.length} Saved</span>
                      </div>

                      {savedFoodTrails.length > 0 ? (
                        <div className="space-y-2">
                          {savedFoodTrails.map((id) => {
                            const food = FOOD_TRAILS.find(f => f.id === id);
                            if (!food) return null;
                            return (
                              <div key={food.id} className="bg-brand-ivory rounded p-3 border border-brand-sand/80 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <strong className="font-serif text-xs text-brand-forest block truncate">{food.name}</strong>
                                  <span className="text-[9px] font-mono text-brand-charcoal/60 block uppercase truncate">Spot: {food.whereToFind}</span>
                                </div>
                                <button
                                  onClick={() => toggleFoodTrailSave(food.id)}
                                  className="p-1.5 hover:bg-brand-sand/30 rounded text-brand-terracotta transition-colors cursor-pointer"
                                  title="Remove"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-[11px] text-brand-charcoal/50 italic block text-center font-sans py-2">
                          No culinary stops saved. Click "+ Add to Trail" in the Heritage Food section to build your food list!
                        </span>
                      )}
                    </div>

                    {/* SAVED LIVING HERITAGE */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-brand-sand pb-1.5">
                        <strong className="font-mono text-[10px] uppercase text-brand-gold tracking-widest">Saved Curation Exhibits</strong>
                        <span className="font-mono text-[9px] bg-brand-sand text-brand-forest px-1.5 rounded">{savedLivingHeritage.length} Saved</span>
                      </div>

                      {savedLivingHeritage.length > 0 ? (
                        <div className="space-y-2">
                          {savedLivingHeritage.map((id) => {
                            const exp = LIVING_HERITAGE_EXPERIENCES.find(l => l.id === id);
                            if (!exp) return null;
                            return (
                              <div key={exp.id} className="bg-brand-ivory rounded p-3 border border-brand-sand/80 flex items-center gap-3">
                                <img src={exp.imageUrl} alt={exp.title} className="w-12 h-12 object-cover rounded" />
                                <div className="flex-grow min-w-0">
                                  <strong className="font-serif text-xs text-brand-forest block truncate">{exp.title}</strong>
                                  <span className="text-[9px] font-mono text-brand-gold uppercase block truncate">{exp.category}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => {
                                      setIsCockpitOpen(false);
                                      setSelectedLivingHeritage(exp);
                                    }}
                                    className="p-1.5 hover:bg-brand-sand/30 rounded text-brand-forest transition-colors cursor-pointer"
                                    title="View details"
                                  >
                                    <Compass className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => toggleLivingHeritageSave(exp.id)}
                                    className="p-1.5 hover:bg-brand-sand/30 rounded text-brand-terracotta transition-colors cursor-pointer"
                                    title="Remove"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-[11px] text-brand-charcoal/50 italic block text-center font-sans py-2">
                          No saved curated experiences. Click "+ Save to Planner" in the Living Heritage section to enrich your route!
                        </span>
                      )}
                    </div>

                  </div>
                )}

                {/* TAB 2: LIVE CONCIERGE CHAT WITH ANANTHA */}
                {cockpitTab === "chat" && (
                  <div className="space-y-4 flex flex-col h-full">
                    <div className="space-y-1 flex-shrink-0">
                      <h4 className="font-serif text-lg text-brand-forest font-semibold">Talk to Anantha</h4>
                      <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans font-light">
                        Speak directly with our local companion concierge. Ask any practical question about temple hours, local custom protocols, or finding transport.
                      </p>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-grow overflow-y-auto border border-brand-sand/80 rounded bg-white p-4 space-y-3 h-64">
                      {chatMessages.map((msg, mIdx) => (
                        <div
                          key={mIdx}
                          className={`flex flex-col max-w-[85%] space-y-1 ${
                            msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                          }`}
                        >
                          <span className="font-mono text-[8px] uppercase tracking-wider text-brand-charcoal/40">
                            {msg.sender === "user" ? "You" : "Anantha"}
                          </span>
                          <div
                            className={`p-3 rounded text-xs font-sans leading-relaxed ${
                              msg.sender === "user"
                                ? "bg-brand-forest text-brand-ivory rounded-br-none"
                                : "bg-brand-sand/20 text-brand-charcoal rounded-bl-none border-l-2 border-brand-gold"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isChatLoading && (
                        <div className="flex items-center gap-2 mr-auto text-brand-charcoal/40 font-mono text-[10px]">
                          <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping"></span>
                          <span>Anantha is reflecting on your question...</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="space-y-1 flex-shrink-0">
                      <span className="font-mono text-[8px] uppercase text-brand-charcoal/50">Common Inquiries:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "What is the dress code for Krishna Matha temple?",
                          "Where can I eat authentic wood-fired prasada lunch?",
                          "How do I catch a private bus from Service Stand to Kapu?",
                          "What is the Bhoota Kola ritual protocol?"
                        ].map((chipText, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => {
                              setChatInput(chipText);
                            }}
                            className="bg-brand-ivory border border-brand-sand px-2 py-1 rounded text-[9px] text-brand-forest hover:border-brand-gold transition-colors text-left truncate max-w-full cursor-pointer focus:outline-none"
                          >
                            {chipText}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Form */}
                    <form onSubmit={handleSendChatMessage} className="flex gap-2 flex-shrink-0">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask Anantha of Udupi..."
                        className="flex-grow bg-white border border-brand-sand/80 rounded p-2.5 text-xs focus:outline-none focus:border-brand-gold"
                      />
                      <button
                        type="submit"
                        disabled={isChatLoading || !chatInput.trim()}
                        className="bg-brand-forest text-brand-ivory px-4 py-2.5 rounded text-xs font-mono uppercase font-bold hover:bg-brand-gold hover:text-brand-forest transition-colors disabled:opacity-50 cursor-pointer focus:outline-none"
                      >
                        Ask
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 3: TRANSIT & POCKETBOOK */}
                {cockpitTab === "transit" && (
                  <div className="space-y-6">
                    {/* Transit Calculator Section */}
                    <div className="space-y-3 bg-white p-4 rounded border border-brand-sand shadow-sm">
                      <h4 className="font-serif text-sm font-semibold text-brand-forest flex items-center gap-1.5">
                        <Bus className="w-4 h-4 text-brand-gold" /> Udupi Auto Union Fare Guide
                      </h4>
                      <p className="text-[11px] text-brand-charcoal/70 leading-relaxed font-sans">
                        Government & Auto Union standard tariff calculator: <strong>Rs. 30 minimum</strong> for first 1.5 km, then <strong>Rs. 15/km</strong> after.
                      </p>
                      
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex-grow space-y-1">
                          <label className="text-[9px] font-mono uppercase text-brand-charcoal/50">Approximate Distance (km)</label>
                          <input
                            type="number"
                            value={distanceInput}
                            onChange={(e) => setDistanceInput(e.target.value)}
                            min="1"
                            max="50"
                            className="w-full bg-brand-ivory border border-brand-sand rounded p-2 text-xs focus:outline-none focus:border-brand-gold"
                          />
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono uppercase text-brand-charcoal/50 block">Union Tariff</span>
                          <strong className="text-lg font-mono text-brand-forest">
                            Rs. {Math.max(30, Math.floor(30 + (Math.max(0, parseFloat(distanceInput || "0") - 1.5) * 15)))}
                          </strong>
                        </div>
                      </div>
                      <div className="p-2.5 bg-brand-sand/15 text-[10px] text-brand-forest font-mono rounded border border-brand-sand/30">
                        💡 <strong>Auto Tip:</strong> Standard practice in Udupi is incredibly friendly. Always ask the driver: <strong>"Meter-haaki"</strong> (Put on the meter) before boarding.
                      </div>
                    </div>

                    {/* Common Bus Route Board */}
                    <div className="space-y-3">
                      <h4 className="font-serif text-sm font-semibold text-brand-forest">Key Coastal Bus Routes</h4>
                      <div className="space-y-2">
                        {[
                          { route: "Udupi Service Stand ➡️ Malpe Beach", freq: "Every 10 mins", fare: "Rs. 12", type: "Hanuman / Sri Prasanna Private Bus" },
                          { route: "Udupi Service Stand ➡️ Kapu Beach", freq: "Every 15 mins", fare: "Rs. 22", type: "Sudarshan / Mangalore Express" },
                          { route: "Udupi Service Stand ➡️ Barkur Ruins", freq: "Every 30 mins", fare: "Rs. 25", type: "Kollur-bound Ordinary Bus" },
                          { route: "Malpe Beach ➡️ St. Mary's Ferry", freq: "9:00 AM - 5:00 PM", fare: "Rs. 300 roundtrip", type: "Govt. Passenger Ferry (Malpe Jetty)" }
                        ].map((bus, bIdx) => (
                          <div key={bIdx} className="bg-brand-ivory p-3 rounded border border-brand-sand text-xs space-y-1">
                            <strong className="font-serif text-brand-forest block text-xs">{bus.route}</strong>
                            <div className="flex justify-between items-center text-[10px] font-mono text-brand-charcoal/60">
                              <span>Timing: <strong>{bus.freq}</strong></span>
                              <span>Fare: <strong className="text-brand-gold">{bus.fare}</strong></span>
                            </div>
                            <span className="text-[9px] text-brand-charcoal/40 block font-mono">Service: {bus.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Language Pocketbook */}
                    <div className="space-y-3">
                      <h4 className="font-serif text-sm font-semibold text-brand-forest flex items-center gap-1.5">
                        <Languages className="w-4 h-4 text-brand-gold" /> Coastal Tulu & Kannada Pocketbook
                      </h4>
                      <p className="text-[11px] text-brand-charcoal/70 leading-relaxed font-sans">
                        Tulu is the local language of coastal Tulu Nadu. Kannada is the official state language. Speak like a true companion!
                      </p>

                      <div className="space-y-2">
                        {[
                          { tulu: "Solmelu", kannada: "Namaskara", english: "Hello / Respects", use: "Standard respectful greeting" },
                          { tulu: "Oota Aitha?", kannada: "Oota Aitha?", english: "Had your meal?", use: "Deepest coastal expression of care" },
                          { tulu: "Encha Ullar?", kannada: "Hegiddira?", english: "How are you?", use: "To ask how someone is" },
                          { tulu: "Mast Yedde Undu", kannada: "Thumba Chennagide", english: "It is very good!", use: "To praise a food joint or service" },
                          { tulu: "Yentha Samachara?", kannada: "Yenu Samachara?", english: "What's the news?", use: "Informal greeting for friends" }
                        ].map((phr, pIdx) => (
                          <div key={pIdx} className="bg-brand-ivory p-3 rounded border border-brand-sand text-xs flex flex-col gap-1.5 relative overflow-hidden group">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] font-mono uppercase text-brand-gold block font-bold">English: "{phr.english}"</span>
                                <span className="text-[11px] text-brand-charcoal/75 leading-relaxed font-sans font-light italic">Use: {phr.use}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  if (typeof window !== "undefined") {
                                    try {
                                      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                      const osc = ctx.createOscillator();
                                      const gain = ctx.createGain();
                                      osc.type = "sine";
                                      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                                      gain.gain.setValueAtTime(0, ctx.currentTime);
                                      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
                                      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
                                      osc.connect(gain);
                                      gain.connect(ctx.destination);
                                      osc.start();
                                      osc.stop(ctx.currentTime + 1.3);
                                    } catch (e) {}
                                  }
                                }}
                                className="p-1 rounded bg-brand-sand hover:bg-brand-gold text-brand-forest transition-colors cursor-pointer"
                                title="Play audio cue"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-brand-sand/40 pt-1.5">
                              <div>
                                <span className="text-brand-charcoal/40 block">Tulu (Native)</span>
                                <strong className="text-brand-forest">{phr.tulu}</strong>
                              </div>
                              <div>
                                <span className="text-brand-charcoal/40 block">Kannada (State)</span>
                                <strong className="text-brand-forest">{phr.kannada}</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 4: ETHICS, ETIQUETTE & DISPATCH SPEED DIAL */}
                {cockpitTab === "etiquette" && (
                  <div className="space-y-6">
                    
                    {/* Responsible Tourism Pledge Progress Bar */}
                    <div className="space-y-3 bg-white p-4 rounded border border-brand-sand shadow-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-sm font-semibold text-brand-forest flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-brand-gold" /> Responsible Traveler Pledge
                        </h4>
                        <span className="font-mono text-[10px] text-brand-forest font-bold">{completedPledges.length} / 5 Checked</span>
                      </div>
                      
                      <div className="w-full bg-brand-sand/30 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-gold h-full transition-all duration-500"
                          style={{ width: `${(completedPledges.length / 5) * 100}%` }}
                        ></div>
                      </div>

                      {completedPledges.length === 5 && (
                        <div className="p-2.5 bg-brand-forest text-brand-gold rounded border border-brand-gold/30 text-[10px] font-mono uppercase text-center animate-pulse">
                          🏆 Honorable Lore Keeper Badge Unlocked!
                        </div>
                      )}

                      <div className="space-y-2 pt-2">
                        {RESPONSIBLE_PLEDGES.map((pledge) => (
                          <label
                            key={pledge.id}
                            className="flex items-start gap-2.5 text-xs font-sans text-brand-charcoal/80 cursor-pointer hover:text-brand-forest transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={completedPledges.includes(pledge.id)}
                              onChange={() => togglePledge(pledge.id)}
                              className="mt-0.5 border-brand-sand focus:ring-brand-gold text-brand-forest rounded h-3.5 w-3.5 cursor-pointer"
                            />
                            <div>
                              <strong className="text-[9px] font-mono text-brand-gold uppercase block">{pledge.category}</strong>
                              <span className="font-light">{pledge.text}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Cultural Etiquettes list */}
                    <div className="space-y-3">
                      <h4 className="font-serif text-sm font-semibold text-brand-forest">Sacred Customs & Decorum</h4>
                      <div className="space-y-2.5 text-xs text-brand-charcoal/80 font-sans font-light leading-relaxed">
                        <div className="p-3 bg-brand-sand/10 rounded border-l-2 border-brand-gold flex gap-2.5">
                          <Info className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-serif text-brand-forest block font-semibold mb-0.5 text-xs">Sri Krishna Matha Dress Code</strong>
                            <span className="font-light">Men must remove shirts, vests, or t-shirts before stepping onto the inner Chowki sanctum. Women should wear modest traditional clothing (salwar, saree, or long skirt). Shorts are strictly forbidden.</span>
                          </div>
                        </div>

                        <div className="p-3 bg-brand-sand/10 rounded border-l-2 border-brand-gold flex gap-2.5">
                          <Info className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-serif text-brand-forest block font-semibold mb-0.5 text-xs">Bhoota Kola Oracle Ceremonies</strong>
                            <span className="font-light">Oracle dancers channel divine forest spirits. Maintain absolute silence, never step into the consecrated mud arena, never touch the sacred brass masks or palm-frond skirts, and ask local elders before filming.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contacts Speed Dial */}
                    <div className="space-y-3">
                      <h4 className="font-serif text-sm font-semibold text-brand-forest flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-brand-gold" /> Emergency & Safety Assistance
                      </h4>
                      <p className="text-[11px] text-brand-charcoal/70 leading-relaxed font-sans font-light">
                        Click on any contact number to copy or speed-dial immediately. These are genuine Udupi community helpline services.
                      </p>

                      <div className="space-y-2 font-mono text-xs">
                        {[
                          { title: "National Tourism Helpline", phone: "1363" },
                          { title: "Malpe Beach Lifeguard / Marine Police", phone: "0820-2538100" },
                          { title: "Udupi Govt. General Hospital", phone: "0820-2520120" },
                          { title: "Car Street Auto Stand Dispatch", phone: "0820-2521111" }
                        ].map((help, hIdx) => (
                          <div key={hIdx} className="bg-brand-ivory p-3 rounded border border-brand-sand flex justify-between items-center">
                            <div>
                              <span className="text-[9px] text-brand-charcoal/50 block uppercase leading-none">{help.title}</span>
                              <strong className="text-brand-forest text-[11px]">{help.phone}</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(help.phone);
                                if (typeof window !== "undefined") {
                                  try {
                                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                    const osc = ctx.createOscillator();
                                    const gain = ctx.createGain();
                                    osc.frequency.setValueAtTime(600, ctx.currentTime);
                                    gain.gain.setValueAtTime(0, ctx.currentTime);
                                    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
                                    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
                                    osc.connect(gain);
                                    gain.connect(ctx.destination);
                                    osc.start();
                                    osc.stop(ctx.currentTime + 0.4);
                                  } catch (e) {}
                                }
                              }}
                              className="px-2.5 py-1 text-[9px] uppercase tracking-wider text-brand-forest bg-brand-sand rounded hover:bg-brand-gold hover:text-brand-forest transition-colors cursor-pointer focus:outline-none"
                              title="Copy Number"
                            >
                              Copy Number
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Drawer Footer Status bar */}
              <div className="p-4 bg-brand-ivory border-t border-brand-sand/50 text-[10px] font-mono text-brand-charcoal/40 text-center flex justify-between items-center">
                <span>SYSTEM ACTIVE • GPS 13.3409°</span>
                <span>© LocalLore Trust</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RESERVATION SCHEDULER POPUP MODAL */}
      <AnimatePresence>
        {activeBookingHomestay && (
          <div className="fixed inset-0 bg-brand-forest/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#FAF8F5] text-brand-charcoal max-w-sm w-full rounded-lg shadow-2xl p-6 border border-brand-sand relative"
            >
              <button
                onClick={() => setActiveBookingHomestay(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-brand-sand text-brand-charcoal/60 hover:text-brand-charcoal transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="space-y-1 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">Secure Local Reservation</span>
                  <h3 className="font-serif text-xl font-semibold text-brand-forest">{activeBookingHomestay.name}</h3>
                  <p className="text-xs text-brand-charcoal/60">{activeBookingHomestay.location} • Udupi</p>
                </div>

                <div className="w-12 h-0.5 bg-brand-gold/40 mx-auto"></div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-brand-charcoal/50 block">Proposed Check-In Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-white border border-brand-sand rounded p-2.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-brand-charcoal/50 block">Number of Seekers/Guests</label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                      className="w-full bg-white border border-brand-sand rounded p-2.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold font-sans"
                    >
                      <option value={1}>1 Seeker (Solo)</option>
                      <option value={2}>2 Seekers (Couple)</option>
                      <option value={3}>3 Seekers</option>
                      <option value={4}>4 Seekers (Family)</option>
                      <option value={6}>6 Seekers</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => addHomestayBooking(activeBookingHomestay.name, activeBookingHomestay.location, checkInDate, guestsCount)}
                    className="w-full py-3 bg-brand-forest text-brand-ivory hover:bg-brand-gold hover:text-brand-forest text-xs font-mono uppercase tracking-widest font-bold rounded transition-colors cursor-pointer"
                  >
                    Confirm & Sync Booking
                  </button>
                  <p className="text-[10px] text-brand-charcoal/50 leading-relaxed text-center font-sans">
                    By booking, you agree to respect our community's water conservation & traditional heritage guidelines.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* IMMERSIVE LIVING HERITAGE DETAILS MODAL */}
      <AnimatePresence>
        {selectedLivingHeritage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-forest/90 backdrop-blur-md z-50 overflow-y-auto p-4 md:p-8 flex items-center justify-center"
            onClick={() => setSelectedLivingHeritage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-[#FAF8F5] text-brand-charcoal max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-brand-sand relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLivingHeritage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-ivory/80 text-brand-forest hover:bg-brand-gold hover:text-brand-forest shadow-md transition-all cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Column */}
              <div className="lg:col-span-5 relative bg-brand-forest text-brand-ivory flex flex-col justify-between p-8 min-h-[350px] lg:min-h-[500px]">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={selectedLivingHeritage.imageUrl} 
                    alt={selectedLivingHeritage.title} 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/40 to-brand-forest/20"></div>
                </div>

                {/* Top Badge */}
                <div className="relative z-10">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-brand-gold bg-brand-forest/95 px-3 py-1 border border-brand-gold/30 rounded inline-block">
                    {selectedLivingHeritage.category}
                  </span>
                </div>

                {/* Bottom coordinates and stamp */}
                <div className="relative z-10 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-brand-gold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse"></span>
                    COORDINATES: {selectedLivingHeritage.coordinates}
                  </div>
                  <h4 className="font-serif italic text-lg text-brand-gold/80 font-light">
                    "A curated piece of Tulu heritage"
                  </h4>
                </div>
              </div>

              {/* Lore Column */}
              <div className="lg:col-span-7 p-8 md:p-10 space-y-6 flex flex-col justify-between overflow-y-auto max-h-[90vh] lg:max-h-[500px]">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#c5a85c] font-bold">
                      {selectedLivingHeritage.curatorBadge}
                    </span>
                    <h3 className="font-serif text-3xl font-light text-brand-forest leading-tight">
                      {selectedLivingHeritage.title}
                    </h3>
                  </div>

                  <p className="text-sm font-sans font-light text-brand-charcoal/90 leading-relaxed">
                    {selectedLivingHeritage.detailedLore}
                  </p>

                  <div className="bg-brand-sand/15 p-4 rounded border border-brand-sand/40 text-xs italic text-brand-charcoal/80 font-sans leading-relaxed">
                    <strong>Curator's Note:</strong> This selected landmark actively practices carbon-neutral operations, architectural preservation, and provides direct support to the craft micro-economies of Udupi.
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-sand/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-xs text-brand-charcoal/60">
                    <span>Suggested Stay / Visit: </span>
                    <strong className="text-brand-forest">{selectedLivingHeritage.duration}</strong>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        toggleLivingHeritageSave(selectedLivingHeritage.id);
                      }}
                      className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded border transition-colors duration-500 flex items-center gap-1.5 font-semibold cursor-pointer ${
                        savedLivingHeritage.includes(selectedLivingHeritage.id)
                          ? "bg-brand-gold text-brand-forest border-brand-gold"
                          : "border-brand-sand hover:border-brand-gold text-brand-forest bg-transparent"
                      }`}
                    >
                      {savedLivingHeritage.includes(selectedLivingHeritage.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Saved to Planner
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Save to Planner
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedLivingHeritage(null)}
                      className="px-4 py-2 bg-brand-forest text-brand-ivory hover:bg-brand-gold hover:text-brand-forest text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 rounded font-semibold cursor-pointer"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
