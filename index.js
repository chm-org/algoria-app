import { Language, ConsoleLogger, HttpChallengesLoader } from 'algoria-utils';
import { MetaplexTestRunner } from 'algoria-metaplex';

const logger = new ConsoleLogger();
const runner = new MetaplexTestRunner(logger);
const loader = new HttpChallengesLoader('http://localhost:5173/algoria-challenges/', logger);

const loadTestChallengeData = async () => {
  const challenges = await loader.loadChallenges();
  const expectations = await loader.loadExpectations();
  const challenge = challenges[0];

  return { challenge, expectations: expectations.find(e => e.challengeId === challenge.id) };
}


(async () => {
  const { challenge, expectations } = await loadTestChallengeData();
  const submission = {
    id: "123",
    userId: "user1",
    problemId: challenge.id,
    code: `function sum(a, b) { return a + b; }`,
    language: Language.JavaScript,
    timestamp: new Date(),
  };

  if (!expectations) {
    throw new Error("No expectations found for challenge");
  }

  // console.log(challenge, expectations);
  const result = await runner.runTests(submission, expectations.functions);
  console.log(result);
})()
