import React, { useEffect, useRef, useState } from "react";
import { Landmark } from "../types";

// Coordinates helper
const LANDMARK_COORDS: Record<string, [number, number]> = {
  "krishna-matha": [13.3409, 74.7421],
  "kapu-lighthouse": [13.2215, 74.7352],
  "st-marys-island": [13.3464, 74.6811],
  "barkur-ruins": [13.4735, 74.7505],
  "pajaka-kshetra": [13.2842, 74.7891],
};

const HERITAGE_COORDS: Record<string, [number, number]> = {
  "lh-hasta-shilpa": [13.3516, 74.7871],
  "lh-kidiyoor": [13.3412, 74.7438],
  "lh-kodachadri": [13.8594, 74.8719],
  "lh-backwaters": [13.3856, 74.7212],
  "lh-soulful": [13.3409, 74.7421],
};

interface SatelliteMapProps {
  landmarks: Landmark[];
  livingHeritage: any[];
  selectedLandmark: Landmark | null;
  selectedLivingHeritage: any | null;
  onSelectLandmark: (landmark: Landmark) => void;
  onSelectLivingHeritage: (lh: any) => void;
}

// Global script loader for Leaflet
function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).L) {
      resolve((window as any).L);
      return;
    }

    // Check if CSS is already added
    const cssId = "leaflet-css-cdn";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => {
      resolve((window as any).L);
    };
    script.onerror = (err) => {
      reject(err);
    };
    document.body.appendChild(script);
  });
}

export default function SatelliteMap({
  landmarks,
  livingHeritage,
  selectedLandmark,
  selectedLivingHeritage,
  onSelectLandmark,
  onSelectLivingHeritage,
}: SatelliteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Leaflet library
  useEffect(() => {
    loadLeaflet()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load Leaflet map resources", err);
        setError("Unable to load satellite map library. Please check your connection.");
      });
  }, []);

  // Initialize and update Map Instance
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Create custom click handlers attached to window so the HTML inside the Popups can call them
    (window as any).onMapItemSelect = (id: string, type: "landmark" | "heritage") => {
      if (type === "landmark") {
        const found = landmarks.find((l) => l.id === id);
        if (found) onSelectLandmark(found);
      } else {
        const found = livingHeritage.find((lh) => lh.id === id);
        if (found) onSelectLivingHeritage(found);
      }
    };

    // Initialize Map if not already created
    if (!mapInstanceRef.current) {
      // Create Leaflet map centered at Udupi
      const map = L.map(mapContainerRef.current, {
        center: [13.3409, 74.7421],
        zoom: 11,
        zoomControl: false, // Custom position below
        attributionControl: true,
      });

      // Add Zoom Control at the bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // 1. Esri World Imagery (High-res Satellite)
      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxZoom: 18,
        }
      );

      // 2. Esri World Transportation / Labels overlay so landmarks and boundaries are easily readable
      const labelLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Labels &copy; Esri",
          maxZoom: 18,
          opacity: 0.85,
        }
      );

      satelliteLayer.addTo(map);
      labelLayer.addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const markers = markersRef.current;

    // Clear existing markers to prevent duplicates
    Object.values(markers).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    // 1. Add markers for Primary Landmarks
    landmarks.forEach((land) => {
      const coords = LANDMARK_COORDS[land.id];
      if (!coords) return;

      // Custom pulsing gold HTML marker
      const customIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2" style="width: 24px; height: 24px;">
            <span class="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-[#c5a85c] opacity-60"></span>
            <span class="relative inline-flex rounded-full h-4.5 w-4.5 bg-[#0d261b] border-2 border-[#c5a85c] shadow-lg flex items-center justify-center">
              <span class="w-1.5 h-1.5 rounded-full bg-[#c5a85c]"></span>
            </span>
          </div>
        `,
        className: "custom-leaflet-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const popupHtml = `
        <div style="font-family: sans-serif; padding: 6px; width: 220px;">
          <img src="${land.imageUrl}" style="width: 100%; height: 100px; object-cover; border-radius: 4px; margin-bottom: 6px;" />
          <div style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #c5a85c; letter-spacing: 0.1em; font-family: monospace;">
            PRIMARY LANDMARK • ${land.category}
          </div>
          <h4 style="font-family: serif; font-size: 14px; margin: 2px 0 6px 0; color: #0d261b; font-weight: bold;">
            ${land.name}
          </h4>
          <p style="font-size: 11px; color: #4a5568; line-height: 1.4; margin-bottom: 8px;">
            ${land.lore.substring(0, 85)}...
          </p>
          <button 
            onclick="window.onMapItemSelect('${land.id}', 'landmark')"
            style="width: 100%; background-color: #0d261b; color: #faf8f5; border: none; padding: 5px 8px; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 3px; cursor: pointer; transition: background-color 0.2s;"
            onmouseover="this.style.backgroundColor='#c5a85c'; this.style.color='#0d261b';"
            onmouseout="this.style.backgroundColor='#0d261b'; this.style.color='#faf8f5';"
          >
            Open Lore Dossier
          </button>
        </div>
      `;

      const marker = L.marker(coords, { icon: customIcon })
        .bindPopup(popupHtml, { maxWidth: 260, className: "custom-museum-popup" })
        .addTo(map);

      markers[land.id] = marker;
    });

    // 2. Add markers for Living Heritage Curations
    livingHeritage.forEach((lh) => {
      const coords = HERITAGE_COORDS[lh.id];
      if (!coords) return;

      // Custom pulsing emerald HTML marker
      const customIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2" style="width: 20px; height: 20px;">
            <span class="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-emerald-500 opacity-50"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-ivory border-2 border-emerald-600 shadow-md flex items-center justify-center">
              <span class="w-1 h-1 rounded-full bg-emerald-600"></span>
            </span>
          </div>
        `,
        className: "custom-leaflet-marker-heritage",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const popupHtml = `
        <div style="font-family: sans-serif; padding: 6px; width: 220px;">
          <img src="${lh.imageUrl}" style="width: 100%; height: 100px; object-cover; border-radius: 4px; margin-bottom: 6px;" />
          <div style="font-size: 8px; font-weight: bold; text-transform: uppercase; color: #10b981; letter-spacing: 0.1em; font-family: monospace;">
            LIVING HERITAGE • ${lh.category}
          </div>
          <h4 style="font-family: serif; font-size: 14px; margin: 2px 0 6px 0; color: #0d261b; font-weight: bold;">
            ${lh.title}
          </h4>
          <p style="font-size: 11px; color: #4a5568; line-height: 1.4; margin-bottom: 8px;">
            ${lh.description.substring(0, 85)}...
          </p>
          <button 
            onclick="window.onMapItemSelect('${lh.id}', 'heritage')"
            style="width: 100%; background-color: #0d261b; color: #faf8f5; border: none; padding: 5px 8px; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 3px; cursor: pointer; transition: background-color 0.2s;"
            onmouseover="this.style.backgroundColor='#10b981'; this.style.color='#0d261b';"
            onmouseout="this.style.backgroundColor='#0d261b'; this.style.color='#faf8f5';"
          >
            Explore Experience
          </button>
        </div>
      `;

      const marker = L.marker(coords, { icon: customIcon })
        .bindPopup(popupHtml, { maxWidth: 260, className: "custom-museum-popup" })
        .addTo(map);

      markers[lh.id] = marker;
    });

    // Cleanup on unmount
    return () => {
      // We don't remove the map instance here so it caches across renders, but we do clean callbacks
      (window as any).onMapItemSelect = undefined;
    };
  }, [isLoaded, landmarks, livingHeritage]);

  // Handle external selections: Fly map to focus on selected items
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const markers = markersRef.current;

    if (selectedLandmark) {
      const coords = LANDMARK_COORDS[selectedLandmark.id];
      if (coords) {
        map.flyTo(coords, 13, { animate: true, duration: 1.5 });
        const marker = markers[selectedLandmark.id];
        if (marker) {
          setTimeout(() => {
            marker.openPopup();
          }, 1500);
        }
      }
    }
  }, [selectedLandmark, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const markers = markersRef.current;

    if (selectedLivingHeritage) {
      const coords = HERITAGE_COORDS[selectedLivingHeritage.id];
      if (coords) {
        map.flyTo(coords, 13, { animate: true, duration: 1.5 });
        const marker = markers[selectedLivingHeritage.id];
        if (marker) {
          setTimeout(() => {
            marker.openPopup();
          }, 1500);
        }
      }
    }
  }, [selectedLivingHeritage, isLoaded]);

  if (error) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-brand-forest/5 text-brand-forest border border-brand-sand rounded-xl p-8 text-center">
        <p className="font-sans text-sm font-medium mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-brand-forest text-brand-ivory text-xs font-mono uppercase tracking-widest rounded hover:bg-brand-gold hover:text-brand-forest transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col rounded-xl overflow-hidden border border-brand-sand shadow-inner relative bg-zinc-900">
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-brand-forest/90 z-20 flex flex-col items-center justify-center text-brand-ivory space-y-4">
          <div className="w-8 h-8 border-3 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-brand-gold">
            Loading Real Satellite Imagery...
          </span>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-grow min-h-[500px] z-10" />
    </div>
  );
}
