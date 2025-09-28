import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';

interface MemoryPair {
  id: number;
  term: string;
  action: string;
}

interface MemoryCard {
  id: string;
  content: string;
  type: 'term' | 'action';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchGameProps {
  data: {
    instruction: string;
    pairs: MemoryPair[];
  };
  onComplete: (score: number) => void;
  isActive: boolean;
}

const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({ data, onComplete, isActive }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize cards
  useEffect(() => {
    const gameCards: MemoryCard[] = [];
    
    data.pairs.forEach(pair => {
      gameCards.push({
        id: `term-${pair.id}`,
        content: pair.term,
        type: 'term',
        pairId: pair.id,
        isFlipped: false,
        isMatched: false
      });
      
      gameCards.push({
        id: `action-${pair.id}`,
        content: pair.action,
        type: 'action',
        pairId: pair.id,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, [data.pairs]);

  const handleCardClick = (clickedCard: MemoryCard) => {
    if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, { ...clickedCard, isFlipped: true }];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      // Check for match
      const [card1, card2] = newFlippedCards;
      const isMatch = card1.pairId === card2.pairId && card1.type !== card2.type;

      setTimeout(() => {
        if (isMatch) {
          const newMatchedPairs = new Set([...matchedPairs, card1.pairId]);
          setMatchedPairs(newMatchedPairs);
          
          setCards(prev => prev.map(card =>
            card.pairId === card1.pairId 
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          ));

          // Check if game is complete
          if (newMatchedPairs.size === data.pairs.length) {
            setIsCompleted(true);
            const score = Math.max(50, 100 - (moves * 5)); // Better score for fewer moves
            setTimeout(() => onComplete(score), 500);
          }
        } else {
          setCards(prev => prev.map(card =>
            newFlippedCards.some(fc => fc.id === card.id)
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        
        setFlippedCards([]);
      }, 1000);
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
          Click cards to flip them and find matching pairs
        </p>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center gap-4">
        <div className="neumorphic px-4 py-2 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Moves</div>
          <div className="text-lg font-bold text-glass-foreground">{moves}</div>
        </div>
        <div className="neumorphic px-4 py-2 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Pairs Found</div>
          <div className="text-lg font-bold text-glass-foreground">
            {matchedPairs.size} / {data.pairs.length}
          </div>
        </div>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
        {cards.map(card => (
          <Card
            key={card.id}
            className={`h-24 cursor-pointer transition-all duration-300 ${
              card.isMatched
                ? 'glass border-success bg-success/20'
                : card.isFlipped
                ? 'glass border-primary bg-primary/20'
                : 'glass border-glass-border hover:bg-glass/80'
            }`}
            onClick={() => handleCardClick(card)}
          >
            <CardContent className="p-2 h-full flex items-center justify-center">
              {card.isFlipped || card.isMatched ? (
                <div className="text-center">
                  <div className={`text-xs font-medium ${
                    card.type === 'term' ? 'text-primary' : 'text-accent'
                  }`}>
                    {card.type === 'term' ? 'TERM' : 'ACTION'}
                  </div>
                  <div className="text-sm text-glass-foreground mt-1 leading-tight">
                    {card.content}
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center">
                  <span className="text-primary text-lg">?</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="glass border-glass-border">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>🔵 <span className="text-primary font-medium">TERM</span> cards contain disaster-related terms</p>
            <p>🟡 <span className="text-accent font-medium">ACTION</span> cards contain corresponding actions</p>
            <p>Match each term with its correct action to complete the game!</p>
          </div>
        </CardContent>
      </Card>

      {isCompleted && (
        <div className="text-center p-4 bg-success/20 border border-success rounded-lg">
          <p className="text-success font-medium">
            🎉 All pairs matched! Completed in {moves} moves!
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryMatchGame;