export interface QuestionResponse {
    message: string;
    question: {
      id: number;
      text: string;
      options: string[];
      correctIndex: number;
      createdAt: Date; 
      updatedAt: Date; 
    };
  }
  

