import { Injectable } from '@angular/core';
import * as esprima from 'esprima';

@Injectable({
  providedIn: 'root'
})
export class CodeParserService {
  findFunctionDeclaration(code: string, name: string): string {
    const ast = esprima.parseScript(code, { range: true });

    for (const node of ast.body) {
      if (node.type === 'FunctionDeclaration' && node.id.name === name) {

        const bodyStart = Array.isArray(node.body.range) && node.body.range[0] || 0;
        const bodyEnd = Array.isArray(node.body.range) && node.body.range[1] || 0;

        return code.substring(bodyStart, bodyEnd);
      }
    }

    return '';
  }
}
