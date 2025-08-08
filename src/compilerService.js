const JUDGE0_API_URL = "https://judge029.p.rapidapi.com"; // ✅ Fixed Base URL
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY; // Load API Key from .env

console.log("Loaded API Key:", API_KEY || "⚠️ API Key is missing! Check your .env file.");

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
};

/**
 * Runs user code against multiple test cases (LeetCode-style).
 * @param {string} code - The user's submitted code.
 * @param {string} language - The selected programming language.
 * @param {Array<{input: string, expectedOutput: string}>} testCases - List of test cases.
 * @returns {Promise<{success: boolean, results: Array<{input: string, expected: string, actual: string, passed: boolean}>}>}
 */
export async function runCode(code, language, testCases) {
  try {
    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return { success: false, error: "Unsupported language" };
    }

    const testResults = [];
    for (const testCase of testCases) {
      const response = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true&fields=*`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "judge029.p.rapidapi.com",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: testCase.input,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error: ${response.status}, ${errorText}`);
      }

      const data = await response.json();
      console.log("Judge0 API Response:", data); // ✅ Debugging log

      // ✅ Ensure stdout exists before calling .trim()
      const actualOutput = data.stdout ? data.stdout.trim() : "";
      const errorOutput = data.stderr ? data.stderr.trim() : "";
      const statusMessage = data.status ? data.status.description : "Unknown Error";

      const passed = actualOutput === testCase.expectedOutput.trim();
      testResults.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: actualOutput || errorOutput || statusMessage, // ✅ Show error if no output
        passed,
      });
    }

    const allPassed = testResults.every((result) => result.passed);
    return { success: allPassed, results: testResults };
  } catch (error) {
    console.error("Compiler API Error:", error);
    return { success: false, error: error.message };
  }
}


/**
 * Submits the user's code for final validation.
 * @param {string} code - The user's submitted code.
 * @param {string} language - The selected programming language.
 * @param {Array<{input: string, expectedOutput: string}>} testCases - List of test cases.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitCode(code, language, testCases) {
  const runResults = await runCode(code, language, testCases);

  if (!runResults.success) {
    return { success: false, message: "Submission failed. Not all test cases passed." };
  }

  return { success: true, message: "All test cases passed! Submission successful." };
}
