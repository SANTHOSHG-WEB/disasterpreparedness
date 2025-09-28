import React, { useState } from 'react';
import { Module } from '../data/modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import DragDropGame from './games/DragDropGame';
import MazeGame from './games/MazeGame';
import SpotHazardGame from './games/SpotHazardGame';
import MemoryMatchGame from './games/MemoryMatchGame';

interface GameComponentProps {
  module: Module;
  onComplete: (score: number) => void;
}

const GameComponent: React.FC<GameComponentProps> = ({ module, onComplete }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [score, setScore] = useState(0);

  const handleGameComplete = (gameScore: number) => {
    setScore(gameScore);
    setGameState('completed');
  };

  const handleContinue = () => {
    onComplete(score);
  };

  const renderGame = () => {
    switch (module.gameType) {
      case 'drag-drop':
        return (
          <DragDropGame
            data={module.gameData}
            onComplete={handleGameComplete}
            isActive={gameState === 'playing'}
          />
        );
      case 'maze':
        return (
          <MazeGame
            data={module.gameData}
            onComplete={handleGameComplete}
            isActive={gameState === 'playing'}
          />
        );
      case 'spot-hazard':
        return (
          <SpotHazardGame
            data={module.gameData}
            onComplete={handleGameComplete}
            isActive={gameState === 'playing'}
          />
        );
      case 'memory-match':
        return (
          <MemoryMatchGame
            data={module.gameData}
            onComplete={handleGameComplete}
            isActive={gameState === 'playing'}
          />
        );
      default:
        return <div>Game type not supported</div>;
    }
  };

  if (gameState === 'ready') {
    return (
      <Card className="glass border-glass-border">
        <CardHeader className="text-center">
          <Badge variant="outline" className="glass border-glass-border w-fit mx-auto mb-4">
            Interactive Game
          </Badge>
          <CardTitle className="text-2xl text-glass-foreground">
            {module.title} Challenge
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {module.gameData.instruction || 'Complete the interactive challenge to test your knowledge'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="neumorphic p-6 rounded-xl">
            <h4 className="font-semibold text-glass-foreground mb-2">Game Instructions</h4>
            <p className="text-muted-foreground text-sm mb-4">
              {module.gameData.instruction}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="glass">Interactive</Badge>
              <Badge variant="secondary" className="glass">Educational</Badge>
              <Badge variant="secondary" className="glass">Scored</Badge>
            </div>
          </div>
          
          <Button
            onClick={() => setGameState('playing')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
          >
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    return (
      <Card className="glass border-glass-border">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <CardTitle className="text-2xl text-glass-foreground">
            Game Completed!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Great job! You've successfully completed the interactive challenge.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="neumorphic p-6 rounded-xl">
            <div className="text-3xl font-bold text-accent mb-2">{score} Points</div>
            <p className="text-muted-foreground">Your game score</p>
          </div>
          
          <div className="glass p-4 rounded-lg border-l-4 border-success">
            <p className="text-sm text-glass-foreground">
              ✓ Puzzle game completed successfully! The knowledge quiz is now unlocked.
            </p>
          </div>
          
          <Button
            onClick={handleContinue}
            size="lg"
            className="bg-success hover:bg-success/90 text-success-foreground px-8 py-3"
          >
            Continue to Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-glass-foreground">
          {module.title} Challenge
        </h3>
        <Badge variant="outline" className="glass border-glass-border">
          Playing...
        </Badge>
      </div>
      
      {renderGame()}
    </div>
  );
};

export default GameComponent;