export interface DigitalTwin {
  id: number;
  name: string;
  behavior: string;
  attention: number; 
  absence: number; 
}

export interface QCMQuestion {
  question: string;
  answer: string;
}