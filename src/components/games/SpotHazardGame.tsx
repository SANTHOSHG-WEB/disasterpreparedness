import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';

interface Hazard {
  x: number;
  y: number;
  label: string;
}

interface SpotHazardGameProps {
  data: {
    instruction: string;
    imageUrl?: string;
    hazards: Hazard[];
  };
  onComplete: (score: number) => void;
  isActive: boolean;
}

const SpotHazardGame: React.FC<SpotHazardGameProps> = ({ data, onComplete, isActive }) => {
  const [foundHazards, setFoundHazards] = useState<Set<number>>(new Set());
  const [clickedPositions, setClickedPositions] = useState<{ x: number; y: number; isCorrect: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isCompleted) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Check if click is near any hazard (within 5% tolerance)
    const foundHazardIndex = data.hazards.findIndex(hazard => 
      Math.abs(hazard.x - x) < 5 && Math.abs(hazard.y - y) < 5
    );

    const isCorrect = foundHazardIndex !== -1;
    
    if (isCorrect && !foundHazards.has(foundHazardIndex)) {
      const newFoundHazards = new Set([...foundHazards, foundHazardIndex]);
      setFoundHazards(newFoundHazards);
      
      setClickedPositions(prev => [...prev, { x, y, isCorrect: true }]);

      // Check if all hazards found
      if (newFoundHazards.size === data.hazards.length) {
        setIsCompleted(true);
        const score = Math.floor((newFoundHazards.size / data.hazards.length) * 100);
        setTimeout(() => onComplete(score), 1000);
      }
    } else if (!isCorrect) {
      setClickedPositions(prev => [...prev, { x, y, isCorrect: false }]);
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-glass-foreground mb-2">
          {data.instruction}
        </h3>
        <p className="text-sm text-muted-foreground">
          Click on hazards you can identify in the scene below
        </p>
      </div>

      {/* Progress */}
      <div className="text-center">
        <div className="neumorphic px-4 py-2 rounded-lg inline-block">
          <span className="text-sm text-muted-foreground">Found: </span>
          <span className="font-bold text-glass-foreground">
            {foundHazards.size} / {data.hazards.length}
          </span>
        </div>
      </div>

      {/* Game Area */}
      <Card className="glass border-glass-border">
        <CardContent className="p-4">
          <div 
            className="relative w-full h-80 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg 
                      cursor-crosshair border-2 border-glass-border"
            onClick={handleClick}
            style={{
              backgroundImage: data.imageUrl ? `url(${data.imageUrl})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Classroom Scene (if no image provided) */}
            {!data.imageUrl && (
              <>
                {/* Room elements */}
                <div className="absolute top-4 left-4 w-16 h-20 bg-brown-600 border border-brown-800 rounded">
                  <div className="text-xs p-1 text-white">Bookshelf</div>
                </div>
                <div className="absolute top-8 right-8 w-8 h-8 bg-gray-400 rounded-full">
                  <div className="text-xs text-center mt-1">Fan</div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-brown-400 border border-brown-600">
                  <div className="text-xs p-1">Desk</div>
                </div>
                <div className="absolute top-4 right-4 w-24 h-32 bg-blue-200 border-2 border-blue-400">
                  <div className="text-xs p-1">Window</div>
                </div>
              </>
            )}

            {/* Click markers */}
            {clickedPositions.map((pos, index) => (
              <div
                key={index}
                className={`absolute w-6 h-6 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 ${
                  pos.isCorrect 
                    ? 'bg-success border-success animate-pulse' 
                    : 'bg-emergency border-emergency'
                }`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="text-white text-xs text-center leading-5">
                  {pos.isCorrect ? '✓' : '✗'}
                </div>
              </div>
            ))}

            {/* Hazard labels for found hazards */}
            {data.hazards.map((hazard, index) => {
              if (!foundHazards.has(index)) return null;
              
              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hazard.x}%`, top: `${hazard.y}%` }}
                >
                  <div className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full border-2 border-white shadow-lg">
                    {hazard.label}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Hazard List */}
      <Card className="glass border-glass-border">
        <CardContent className="p-4">
          <h4 className="font-medium text-glass-foreground mb-3">Hazards to Find:</h4>
          <div className="space-y-2">
            {data.hazards.map((hazard, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-2 rounded ${
                  foundHazards.has(index) 
                    ? 'bg-success/20 text-success' 
                    : 'text-muted-foreground'
                }`}
              >
                <div className="w-4 h-4 rounded border-2 border-current flex items-center justify-center">
                  {foundHazards.has(index) && <span className="text-xs">✓</span>}
                </div>
                <span className="text-sm">{hazard.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isCompleted && (
        <div className="text-center p-4 bg-success/20 border border-success rounded-lg">
          <p className="text-success font-medium">
            🎉 All hazards identified! Great safety awareness!
          </p>
        </div>
      )}
    </div>
  );
};

export default SpotHazardGame;