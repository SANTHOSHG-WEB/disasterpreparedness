import React, { useState } from 'react';
import { QuizQuestion } from '../data/modules';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ question: string; selected: string; correct: string; isCorrect: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer = {
      question: currentQuestion.question,
      selected: selectedAnswer,
      correct: currentQuestion.correctAnswer,
      isCorrect
    };

    setAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score
      const correctAnswers = answers.filter(a => a.isCorrect).length + 
                           (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      const score = Math.floor((correctAnswers / questions.length) * 100);
      
      setIsCompleted(true);
      setTimeout(() => onComplete(score), 1500);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    }
  };

  const getAnswerStatus = (answer: string) => {
    if (!showExplanation) return 'default';
    if (answer === currentQuestion.correctAnswer) return 'correct';
    if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) return 'incorrect';
    return 'default';
  };

  if (isCompleted) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const finalScore = Math.floor((correctAnswers / questions.length) * 100);

    return (
      <Card className="glass border-glass-border">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <CardTitle className="text-2xl text-glass-foreground">
            Quiz Complete!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            You've successfully completed the knowledge assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="neumorphic p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary">{finalScore}</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div className="neumorphic p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-success">{correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
            <div className="neumorphic p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-glass-foreground">{questions.length}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
          </div>

          <div className="glass p-4 rounded-lg border-l-4 border-success">
            <p className="text-sm text-glass-foreground">
              ✓ Module completed successfully! You've earned {finalScore} points and are ready for the next challenge.
            </p>
          </div>

          {/* Answer Review */}
          <div className="space-y-3">
            <h4 className="font-medium text-glass-foreground">Answer Review:</h4>
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  answer.isCorrect 
                    ? 'bg-success/10 border-success' 
                    : 'bg-emergency/10 border-emergency'
                }`}
              >
                <div className="flex items-start gap-2">
                  {answer.isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-emergency mt-0.5 flex-shrink-0" />
                  )}
                  <div className="text-sm">
                    <div className="font-medium text-glass-foreground mb-1">
                      Q{index + 1}: {answer.question}
                    </div>
                    <div className="text-muted-foreground">
                      Your answer: <span className={answer.isCorrect ? 'text-success' : 'text-emergency'}>
                        {answer.selected}
                      </span>
                      {!answer.isCorrect && (
                        <>
                          <br />
                          Correct answer: <span className="text-success">{answer.correct}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="glass border-glass-border">
          Question {currentQuestionIndex + 1} of {questions.length}
        </Badge>
        <div className="flex gap-1">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentQuestionIndex 
                  ? 'bg-success' 
                  : index === currentQuestionIndex 
                  ? 'bg-primary' 
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <Card className="glass border-glass-border">
        <CardHeader>
          <CardTitle className="text-xl text-glass-foreground">
            {currentQuestion.question}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {currentQuestion.type === 'multiple-choice' && 'Choose the best answer'}
            {currentQuestion.type === 'true-false' && 'Select true or false'}
            {currentQuestion.type === 'fill-blank' && 'Complete the statement'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.type === 'true-false' ? (
              ['true', 'false'].map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    getAnswerStatus(option) === 'correct'
                      ? 'border-success bg-success/20 text-success'
                      : getAnswerStatus(option) === 'incorrect'
                      ? 'border-emergency bg-emergency/20 text-emergency'
                      : selectedAnswer === option
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-glass-border bg-glass/30 text-glass-foreground hover:bg-glass/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswer === option ? 'border-current bg-current' : 'border-current'
                    }`}>
                      {selectedAnswer === option && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="capitalize font-medium">{option}</span>
                  </div>
                </button>
              ))
            ) : (
              (currentQuestion.options || []).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    getAnswerStatus(option) === 'correct'
                      ? 'border-success bg-success/20 text-success'
                      : getAnswerStatus(option) === 'incorrect'
                      ? 'border-emergency bg-emergency/20 text-emergency'
                      : selectedAnswer === option
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-glass-border bg-glass/30 text-glass-foreground hover:bg-glass/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      selectedAnswer === option ? 'border-current bg-current' : 'border-current'
                    }`}>
                      {selectedAnswer === option && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="glass p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-glass-foreground mb-2">Explanation:</h4>
              <p className="text-muted-foreground text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-success hover:bg-success/90 text-success-foreground"
              >
                {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizComponent;