export class Version {
  id: number;
  name: string;
  project: {
    id: number;
    name: string;
  };
  sharing: string;
  status: string;
  due_date: string;
  created_on: string;
  updated_on: string;
  description: string;
  wiki_page_title: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.project = obj && obj.project || null;
    this.sharing = obj && obj.sharing || null;
    this.status = obj && obj.status || null;
    this.due_date = obj && obj.due_date || null;
    this.created_on = obj && obj.created_on || null;
    this.updated_on = obj && obj.updated_on || null;
    this.description = obj && obj.description || null;
    this.wiki_page_title = obj && obj.wiki_page_title || null;
  }
}
