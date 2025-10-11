// Figma API Integration for BluePrinter

// Describes the structure of a single node in a Figma file
export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  characters?: string;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fills?: Array<{
    type: string;
    color?: {
      r: number;
      g: number;
      b: number;
    };
  }>;
  style?: {
    fontSize?: number;
    fontWeight?: number;
  };
  children?: FigmaNode[];
}

// Describes the structure of a style object from the Figma API
export interface FigmaStyle {
  key: string;
  name: string;
  style_type: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
  description: string;
}

// Describes the overall structure of a Figma file response
export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaNode>;
  styles: Record<string, FigmaStyle>; // FIXED: Replaced 'any' with the specific 'FigmaStyle' interface
}

export class FigmaAPI {
  private accessToken: string;
  private baseURL = 'https://api.figma.com/v1';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getFile(fileId: string): Promise<FigmaFile> {
    const response = await fetch(`${this.baseURL}/files/${fileId}`, {
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getNode(fileId: string, nodeId: string): Promise<FigmaNode> {
    const response = await fetch(`${this.baseURL}/files/${fileId}/nodes?ids=${nodeId}`, {
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.nodes[nodeId].document;
  }

  extractFileId(url: string): string | null {
    const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }
}
