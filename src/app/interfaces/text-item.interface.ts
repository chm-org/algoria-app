export enum TextItemType {
  Text = 'Text',
  Pre = 'Pre',
  Code = 'Code'
}

export interface TextItem {
  type: TextItemType;
  title?: string;
  body: string;
}
