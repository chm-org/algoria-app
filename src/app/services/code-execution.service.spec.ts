import { TestBed } from '@angular/core/testing';
import { CodeExecutionService } from './code-execution.service';

describe('CodeExecutionService', () => {
  let service: CodeExecutionService;
  let codeTS: string;

  beforeEach(() => {
    codeTS = 'let a:number = 5;';
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('run JS code', () => {
    it('should run JavaScript code', (done) => {
      spyOn(service['taskStateSubject'], 'next').and.callFake((result) => {
        expect(result).toEqual('Lorem');

        done();
      });

      service.runJavaScriptCode(`const test = () => 'Lorem'; test()`);
    });

    it('should handle JavaScript code errors', (done) => {
      spyOn(service['taskStateSubject'], 'next').and.callFake((result) => {
        expect(result).toEqual('TypeError: console.loog is not a function');
        done();
      });

      service.runJavaScriptCode('console.loog("Test")');
    });

    it('should restrict fetch API', (done) => {
      spyOn(service['taskStateSubject'], 'next').and.callFake((result) => {
        expect(result).toEqual('Error: fetch is disabled.');
        done();
      });

      service.runJavaScriptCode('fetch(\'https://localhost:4200\')');
    });

    it('should restrict XMLHttpRequest API', (done) => {
      spyOn(service['taskStateSubject'], 'next').and.callFake((result) => {
        expect(result).toEqual('Error: XMLHttpRequest is disabled.');
        done();
      });

      service.runJavaScriptCode('new XMLHttpRequest()');
    });

    it('should restrict WebSocket API', (done) => {
      spyOn(service['taskStateSubject'], 'next').and.callFake((result) => {
        expect(result).toEqual('Error: WebSocket is disabled.');
        done();
      });

      service.runJavaScriptCode('new WebSocket()');
    });

    it('should prevent long-running scripts', (done) => {
      spyOn(service['taskStateSubject'], 'next').and.callFake((result) => {
        expect(result).toEqual('Error: Time for script execution exceeded. Check for possible infinite loops in your code.');
        done();
      });

      service.runJavaScriptCode('while(true) {}');
    });
  });
});
