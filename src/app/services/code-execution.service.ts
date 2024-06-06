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
          self.postMessage({ type: 'error', data: error.message });
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

          if (e.data.type === 'result') {
            this.taskStateSubject.next(e.data.data);
          }

          worker.terminate();
          URL.revokeObjectURL(url); // Cleanup URL object
        }
      };

      // TODO: Implement timeouts to prevent infinite loops. You can use setTimeout or setInterval in the main thread to terminate the worker if it runs for too long.
      // TODO: Restrict the worker from making network requests to unauthorized domains using Content Security Policy (CSP).
      // TODO: Perform static analysis on the code before running it to detect potentially harmful patterns.

      worker.postMessage(code);
    } catch (error) {
      console.error('Error running JavaScript code:', error);
    }
  }

  runTypeScriptCode(code: string): void {
    try {
      const transpiledCode = ts.transpile(code);
      this.runJavaScriptCode(transpiledCode);
    } catch (error) {
      console.error('Error transpiling TypeScript code:', error);
    }
  }
}
