export class Project {
  id: number;
  name: string;
  identifier: string;
  description: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.identifier = obj && obj.identifier || null;
    this.description = obj && obj.description || null;
  }
}
