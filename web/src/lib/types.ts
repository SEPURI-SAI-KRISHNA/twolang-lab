export type Language = "python" | "java";
export type Tier = "T1" | "T2" | "T3";
export type ItemStatus = "done" | "in_progress" | "todo";

export interface ManifestItem {
  tier: Tier;
  text: string;
  status: ItemStatus;
  slug: string | null;
  title?: string;
}

export interface ManifestCategory {
  letter: string;
  name: string;
  heading: string;
  items: ManifestItem[];
}

export interface Manifest {
  python: ManifestCategory[];
  java: ManifestCategory[];
}

export type OutputBlock =
  | { kind: "stream"; stream: string; text: string }
  | { kind: "error"; ename: string; evalue: string; traceback: string[] }
  | { kind: "result"; text: string; html: string | null }
  | { kind: "unknown"; raw: unknown };

export type Cell =
  | { type: "markdown"; source: string }
  | { type: "code"; source: string; outputs: OutputBlock[] }
  | { type: "raw"; source: string };

export type RelationKind = "related" | "compare";

export interface RelatedTopicRef {
  language: Language;
  slug: string;
  title: string;
  kind: RelationKind;
  label: string | null;
}

export interface Topic {
  language: Language;
  slug: string;
  title: string;
  notebookPath: string;
  cells: Cell[];
  category: string;
  categoryLetter: string;
  tier: Tier;
  interview: string | null;
  industryPractice: string | null;
  related: RelatedTopicRef[];
}

export interface SearchEntry {
  language: Language;
  slug: string;
  title: string;
  category: string;
  tier: Tier;
  text: string;
}

export interface TopicRef {
  language: Language;
  slug: string;
  title: string;
}

export interface ComparePair {
  a: TopicRef;
  b: TopicRef;
  label: string | null;
}

export interface GraphNode {
  id: string;
  language: Language;
  slug: string;
  title: string;
  category: string;
  categoryLetter: string;
  tier: Tier;
}

export interface GraphEdge {
  a: string;
  b: string;
  kind: RelationKind;
  label: string | null;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
