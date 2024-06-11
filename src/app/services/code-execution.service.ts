import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import * as ts from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class CodeExecutionService {
  private taskStateSubject = new Subject();
  taskState$ = this.taskStateSubject.asObservable();

  runJavaScriptCode(code: string): void {
    try {
      const blob = new Blob([`self.onmessage = function(e) {
        const code = e.data;
        try {
          // Run the code and post back the result
          const result = eval(code);
          self.postMessage({ type: 'result', data: result });
        } catch (error) {
          console.error(error)
          self.postMessage({ type: 'error', data: error.name + ': ' + error.message });
        }
        // Terminate the worker after execution
        self.close();
      };`], {type: 'application/javascript'});
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);

      worker.onerror = (error) => {
        console.error('Error in worker:', error);
      };

      // Terminate the worker when done
      worker.onmessage = (e) => {
        if (e.data.type === 'result' || e.data.type === 'error') {

          this.taskStateSubject.next(e.data.data);

          worker.terminate();
          URL.revokeObjectURL(url); // Cleanup URL object
        }
      };

      worker.postMessage(code);
    } catch (error) {
      console.error('Error running JavaScript code:', error);
    }
  }

  transpileTypeScript(code: string): string {
    return ts.transpile(code);
  }

  runTypeScriptCode(code: string): void {
    try {
      const transpiledCode = this.transpileTypeScript(code);
      this.runJavaScriptCode(transpiledCode);
    } catch (error) {
      console.error('Error transpiling TypeScript code:', error);
    }
  }
}
