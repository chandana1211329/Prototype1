import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import statesData from '@/data/statesData.json';
import './InteractiveMap.css';

interface StateInfo {
  overview: string;
  districts: string[];
  tourism: string[];
  food: string;
  culture: string;
  festivals: string[];
  history: string;
  key_stats: {
    Capital: string;
    Population: string;
    Area: string;
    "Official Language": string;
  };
}

const InteractiveMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Load SVG content
    fetch('/interactive-map-of-india/index.php')
      .then(response => response.text())
      .then(html => {
        // Extract SVG content from the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const svg = doc.querySelector('svg');
        if (svg) {
          setSvgContent(new XMLSerializer().serializeToString(svg));
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading map:', error);
        setIsLoading(false);
      });
  }, []);

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
  };

  const handleStateHover = (stateName: string | null) => {
    setHoveredState(stateName);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedState(null);
    setHoveredState(null);
  };

  const getStateColor = (stateId: string) => {
    // Colors are now handled by CSS
    return '';
  };

  const selectedStateData: StateInfo | null = selectedState 
    ? statesData[selectedState as keyof typeof statesData] as StateInfo
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-muted-foreground">Loading interactive map...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Interactive India Map
        </h2>
        <p className="text-muted-foreground text-lg">
          Click on any state to discover its culture, cuisine, festivals and tourist attractions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            {/* Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5 text-primary" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5 text-primary" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  title="Reset Map"
                >
                  <RotateCcw className="w-5 h-5 text-primary" />
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                Zoom: {Math.round(zoomLevel * 100)}%
              </div>
            </div>

            {/* SVG Map */}
            <div className="map-wrapper">
              <div 
                className="map-base relative overflow-hidden rounded-lg bg-background border border-border"
                style={{ height: '600px' }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  {svgContent ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                      className="w-full h-full"
                      onMouseOver={(e) => {
                        const target = e.target as SVGElement;
                        const stateId = target.getAttribute('id');
                        const stateName = target.getAttribute('title');
                        if (stateId && stateName && stateId.startsWith('tryjs')) {
                          handleStateHover(stateName);
                          
                          // Add selected class if this state is selected
                          if (selectedState === stateName) {
                            target.classList.add('selected');
                          } else {
                            target.classList.remove('selected');
                          }
                        }
                      }}
                      onMouseOut={(e) => {
                        const target = e.target as SVGElement;
                        handleStateHover(null);
                      }}
                      onClick={(e) => {
                        const target = e.target as SVGElement;
                        const stateId = target.getAttribute('id');
                        const stateName = target.getAttribute('title');
                        if (stateId && stateName && stateId.startsWith('tryjs')) {
                          handleStateClick(stateName);
                          
                          // Remove selected class from all paths
                          const allPaths = target.parentElement?.querySelectorAll('path');
                          allPaths?.forEach(path => path.classList.remove('selected'));
                          
                          // Add selected class to clicked path
                          target.classList.add('selected');
                        }
                      }}
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Map could not be loaded</p>
                    </div>
                  )}
                </div>

                {/* Tooltip */}
                {hoveredState && (
                  <div className="map-tooltip show" style={{ top: '10px', left: '10px' }}>
                    <p className="font-medium">{hoveredState}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* State Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-heading font-bold text-foreground">
                {selectedState || 'Select a State'}
              </h3>
              {selectedState && (
                <button
                  onClick={() => setSelectedState(null)}
                  className="p-1 rounded-lg hover:bg-accent transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>

            {selectedStateData ? (
              <div className="space-y-6">
                {/* Capital Badge */}
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Capital: {selectedStateData.key_stats.Capital}</span>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedStateData.overview}
                  </p>
                </div>

                {/* Key Stats */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Population:</span>
                      <span className="text-foreground font-medium">{selectedStateData.key_stats.Population}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Area:</span>
                      <span className="text-foreground font-medium">{selectedStateData.key_stats.Area}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="text-foreground font-medium">{selectedStateData.key_stats["Official Language"]}</span>
                    </div>
                  </div>
                </div>

                {/* Tourism */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tourist Attractions</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedStateData.tourism.map((place, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent/50 rounded-full text-xs text-foreground"
                      >
                        {place}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Food */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Famous Food</h4>
                  <p className="text-muted-foreground text-sm">{selectedStateData.food}</p>
                </div>

                {/* Culture */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Culture & Heritage</h4>
                  <p className="text-muted-foreground text-sm">{selectedStateData.culture}</p>
                </div>

                {/* Festivals */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Festivals</h4>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedStateData.festivals.map((festival, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 rounded-full text-xs text-primary"
                      >
                        {festival}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dive In Button */}
                <Button asChild className="w-full">
                  <Link to="/login">
                    Dive In
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h4 className="text-lg font-medium text-foreground mb-2">Click on any Indian state</h4>
                <p className="text-muted-foreground text-sm">
                  Discover rich cultural heritage, delicious cuisine, vibrant festivals, and breathtaking tourist destinations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
