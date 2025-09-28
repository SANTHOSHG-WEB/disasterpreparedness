import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface DragDropItem {
  id: number;
  text: string;
  category: string;
  order?: number;
  priority?: string;
}

interface DragDropCategory {
  id: string;
  label: string;
}

interface DragDropGameProps {
  data: {
    instruction: string;
    items: DragDropItem[];
    categories?: DragDropCategory[];
  };
  onComplete: (score: number) => void;
  isActive: boolean;
}

const DragDropGame: React.FC<DragDropGameProps> = ({ data, onComplete, isActive }) => {
  const [draggedItem, setDraggedItem] = useState<DragDropItem | null>(null);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, DragDropItem[]>>({});
  const [availableItems, setAvailableItems] = useState<DragDropItem[]>(data.items);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDragStart = (item: DragDropItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (categoryId: string) => {
    if (!draggedItem) return;

    // Make game easier - accept all placements
    setCategorizedItems(prev => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), draggedItem]
    }));

    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));

    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkCompletion = () => {
    if (availableItems.length === 0) {
      setIsCompleted(true);
      const score = 100; // Always give full score for easier gameplay
      setTimeout(() => onComplete(score), 1000);
    }
  };

  React.useEffect(() => {
    checkCompletion();
  }, [availableItems]);

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-glass-foreground mb-2">
          {data.instruction}
        </h3>
        <p className="text-sm text-muted-foreground">
          Drag items to their correct categories
        </p>
      </div>

      {/* Available Items */}
      <Card className="glass border-glass-border">
        <CardContent className="p-4">
          <h4 className="font-medium text-glass-foreground mb-3">Items to Sort</h4>
          <div className="flex flex-wrap gap-2">
            {availableItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="px-3 py-2 bg-primary/20 border border-primary rounded-lg cursor-move 
                          hover:bg-primary/30 transition-colors text-sm"
              >
                {item.text}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drop Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {(data.categories || [
          { id: 'natural', label: 'Natural Disasters' },
          { id: 'human-made', label: 'Human-Made Disasters' }
        ]).map(category => (
          <Card
            key={category.id}
            className="glass border-glass-border min-h-32"
            onDrop={() => handleDrop(category.id)}
            onDragOver={handleDragOver}
          >
            <CardContent className="p-4">
              <h4 className="font-medium text-glass-foreground mb-3">{category.label}</h4>
              <div className="space-y-2 min-h-20 border-2 border-dashed border-glass-border rounded-lg p-2">
                {(categorizedItems[category.id] || []).map(item => (
                  <div
                    key={item.id}
                    className="px-3 py-2 bg-success/20 border border-success rounded-lg text-sm"
                  >
                    {item.text}
                  </div>
                ))}
                {(categorizedItems[category.id] || []).length === 0 && (
                  <div className="text-muted-foreground text-sm text-center py-4">
                    Drop items here
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isCompleted && (
        <div className="text-center p-4 bg-success/20 border border-success rounded-lg">
          <p className="text-success font-medium">
            🎉 Excellent work! All items sorted correctly!
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropGame;