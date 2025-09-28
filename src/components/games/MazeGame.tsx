import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface MazeGameProps {
  data: {
    instruction: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    obstacles: number[][];
  };
  onComplete: (score: number) => void;
  isActive: boolean;
}

const MazeGame: React.FC<MazeGameProps> = ({ data, onComplete, isActive }) => {
  const [playerX, setPlayerX] = useState(data.startX);
  const [playerY, setPlayerY] = useState(data.startY);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const gridSize = 10;

  const isObstacle = (x: number, y: number) => {
    return data.obstacles.some(([ox, oy]) => ox === x && oy === y);
  };

  const isValidMove = (x: number, y: number) => {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize && !isObstacle(x, y);
  };

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerX + dx;
    const newY = playerY + dy;

    if (isValidMove(newX, newY)) {
      setPlayerX(newX);
      setPlayerY(newY);
      setMoves(moves + 1);
    }
  };

  useEffect(() => {
    if (playerX === data.endX && playerY === data.endY && !isCompleted) {
      setIsCompleted(true);
      const score = Math.max(50, 100 - moves); // Better score for fewer moves
      setTimeout(() => onComplete(score), 1000);
    }
  }, [playerX, playerY, data.endX, data.endY, moves, isCompleted, onComplete]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isActive || isCompleted) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
          event.preventDefault();
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
          event.preventDefault();
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, isCompleted, playerX, playerY, moves]);

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-glass-foreground mb-2">
          {data.instruction}
        </h3>
        <p className="text-sm text-muted-foreground">
          Use arrow keys or buttons to navigate to the exit
        </p>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center gap-4">
        <div className="neumorphic px-4 py-2 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Moves</div>
          <div className="text-lg font-bold text-glass-foreground">{moves}</div>
        </div>
      </div>

      {/* Maze Grid */}
      <Card className="glass border-glass-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
            {Array.from({ length: gridSize * gridSize }, (_, index) => {
              const x = index % gridSize;
              const y = Math.floor(index / gridSize);
              const isPlayer = x === playerX && y === playerY;
              const isStart = x === data.startX && y === data.startY;
              const isEnd = x === data.endX && y === data.endY;
              const isObstacleCell = isObstacle(x, y);

              return (
                <div
                  key={index}
                  className={`aspect-square rounded border ${
                    isPlayer
                      ? 'bg-primary border-primary text-primary-foreground flex items-center justify-center'
                      : isEnd
                      ? 'bg-success border-success'
                      : isStart
                      ? 'bg-accent border-accent'
                      : isObstacleCell
                      ? 'bg-emergency border-emergency'
                      : 'bg-glass/30 border-glass-border'
                  }`}
                >
                  {isPlayer && '🏃'}
                  {isEnd && !isPlayer && '🏁'}
                  {isStart && !isPlayer && '🚀'}
                  {isObstacleCell && '🚫'}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Controls */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          <div></div>
          <Button
            onClick={() => movePlayer(0, -1)}
            variant="outline"
            size="sm"
            className="glass border-glass-border"
            disabled={isCompleted}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <div></div>
          
          <Button
            onClick={() => movePlayer(-1, 0)}
            variant="outline"
            size="sm"
            className="glass border-glass-border"
            disabled={isCompleted}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div></div>
          <Button
            onClick={() => movePlayer(1, 0)}
            variant="outline"
            size="sm"
            className="glass border-glass-border"
            disabled={isCompleted}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <div></div>
          <Button
            onClick={() => movePlayer(0, 1)}
            variant="outline"
            size="sm"
            className="glass border-glass-border"
            disabled={isCompleted}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <div></div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span className="text-muted-foreground">You</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-success rounded"></div>
          <span className="text-muted-foreground">Exit</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-emergency rounded"></div>
          <span className="text-muted-foreground">Danger</span>
        </div>
      </div>

      {isCompleted && (
        <div className="text-center p-4 bg-success/20 border border-success rounded-lg">
          <p className="text-success font-medium">
            🎉 You reached safety! Completed in {moves} moves!
          </p>
        </div>
      )}
    </div>
  );
};

export default MazeGame;