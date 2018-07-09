export class Issue {
  id: number;
  subject: string;
  author: {
    id: number;
    name: string;
  };
  assigned_to: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  description: string;

  created_on: string;
  updated_on: string;
  start_date: string;
  done_ratio: number;


  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.subject = obj && obj.subject || null;
    this.author = obj && obj.author || null;
    this.assigned_to = obj && obj.assigned_to || null;
    this.priority = obj && obj.priority || null;
    this.status = obj && obj.status || null;
    this.description = obj && obj.description || null;

    this.created_on = obj && obj.created_on || null;
    this.updated_on = obj && obj.updated_on || null;
    this.start_date = obj && obj.start_date || null;
    this.done_ratio = obj && obj.done_ratio || 0;
  }
}


