// Code Generator Engine for BluePrinter
import { FigmaNode } from './figma-api';

export interface GeneratedCode {
  react: string;
  html: string;
  css: string;
  tailwind: string;
}

export class CodeGenerator {
  generateCode(node: FigmaNode): GeneratedCode {
    return {
      react: this.generateReact(node),
      html: this.generateHTML(node),
      css: this.generateCSS(node),
      tailwind: this.generateTailwind(node),
    };
  }

  private generateReact(node: FigmaNode): string {
    if (node.type === 'TEXT') {
      return this.generateTextComponent(node);
    }
    
    if (node.type === 'RECTANGLE' || node.type === 'FRAME') {
      return this.generateContainerComponent(node);
    }

    return this.generateGenericComponent(node);
  }

  private generateHTML(node: FigmaNode): string {
    const className = this.toKebabCase(node.name);
    const styles = this.getCSSStyles(node);
    return `.${className} {\n${styles}\n}`;
  }

  private generateCSS(node: FigmaNode): string {
    const classes = this.getTailwindClasses(node);
    
    if (node.type === 'TEXT') {
      const text = node.characters || node.name;
      return `<p class="${classes}">${text}</p>`;
    }
    
    return `<div class="${classes}">${node.name}</div>`;
  }

  private generateTailwind(node: FigmaNode): string {
    const styles = this.getTailwindClasses(node);
    
    if (node.type === 'TEXT') {
      const text = node.characters || node.name;
      return `const TextComponent = () => (
    <p className="${styles}">
      ${text}
    </p>
  );

export default TextComponent;`;
    }

    const componentName = this.toPascalCase(node.name);
    return `const ${componentName} = () => (
    <div className="${styles}">
      ${node.name}
    </div>
  );

export default ${componentName};`;
  }

  private generateTextComponent(node: FigmaNode): string {
    const styles = this.getTailwindClasses(node);
    const text = node.characters || node.name;
    
    return `const TextComponent = () => (
    <p className="${styles}">
      ${text}
    </p>
  );

export default TextComponent;`;
  }

  private generateContainerComponent(node: FigmaNode): string {
    const styles = this.getTailwindClasses(node);
    const componentName = this.toPascalCase(node.name);
    
    return `const ${componentName} = ({ children }) => (
    <div className="${styles}">
      {children}
    </div>
  );

export default ${componentName};`;
  }

  private generateGenericComponent(node: FigmaNode): string {
    const styles = this.getTailwindClasses(node);
    const componentName = this.toPascalCase(node.name);
    
    return `const ${componentName} = () => (
    <div className="${styles}">
      ${node.name}
    </div>
  );

export default ${componentName};`;
  }

  private getCSSStyles(node: FigmaNode): string {
    const styles: string[] = [];
    
    if (node.absoluteBoundingBox) {
      const { width, height } = node.absoluteBoundingBox;
      if (width) styles.push(`width: ${width}px;`);
      if (height) styles.push(`height: ${height}px;`);
    }

    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b } = fill.color;
        const color = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
        styles.push(`background-color: ${color};`);
      }
    }

    if (node.style) {
      if (node.style.fontSize) {
        styles.push(`font-size: ${node.style.fontSize}px;`);
      }
      
      if (node.style.fontWeight) {
        styles.push(`font-weight: ${node.style.fontWeight};`);
      }
    }

    return styles.join('\n  ');
  }

  private getTailwindClasses(node: FigmaNode): string {
    const classes: string[] = [];
    
    if (node.absoluteBoundingBox) {
      const { width, height } = node.absoluteBoundingBox;
      if (width) classes.push(`w-[${width}px]`);
      if (height) classes.push(`h-[${height}px]`);
    }

    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b } = fill.color;
        const color = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
        classes.push(`bg-[${color}]`);
      }
    }

    if (node.style) {
      if (node.style.fontSize) {
        classes.push(`text-[${node.style.fontSize}px]`);
      }
      
      if (node.style.fontWeight) {
        const weight = this.getFontWeightClass(node.style.fontWeight);
        classes.push(weight);
      }
    }

    return classes.join(' ');
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private toPascalCase(str: string): string {
    return str.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  }

  private getFontWeightClass(weight: number): string {
    if (weight <= 300) return 'font-light';
    if (weight <= 400) return 'font-normal';
    if (weight <= 500) return 'font-medium';
    if (weight <= 600) return 'font-semibold';
    if (weight <= 700) return 'font-bold';
    return 'font-extrabold';
  }
}