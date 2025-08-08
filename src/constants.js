export const scaleFactor = 4;

export const dialogueData = {
  pc: "Hey ! Are you ready to solve the problem ?!? ",
  "cs-degree": "Hope you Enjoyed this tiny little project by our Team : Anuj , Akshar , Aparna , Anushka and Aditya^2 ",
  "sofa-table": "That's our sofa . Take some rest . You did great job learning to take input and reverse a string today !",
  tv: `About this project : This project was made using Kaboom JS Library and this map was created using Tiled map editor . Hop on to our Git repository for source code and detailed Explaination : <a href="https://github.com/GeLectic/Campus-Quest" target="_blank">Github</a>!`,
  bed: "Hey ! Welcome to Campus Quest . Lets learn some string concept today",
  resume: 'Now , attempt the question on the PC in other room !',
  projects: `To reverse a String , we can use 
  Python : print(s[::-1])
  C++ :  reverse(s.begin(), s.end()); 
    cout << s << endl; 
  JS : console.log(s.split("").reverse().join("")); `,
  library: `For each language , there is a specific way to input string from user.
   Python : s = sys.stdin.read().strip()     
   C++:  getline(cin, s); 
   JS : process.stdin.on("data", (data) => {
          let s = data.toString().trim(); 
        }`,
  exit: "If you want to leave , just close the tab. Have a great day !",
};

// ✅ Add coding challenges
export const codingChallenges = {
  pc: {
    question: "Write a function to reverse a string.",
    example: "Input: 'hello' -> Output: 'olleh'",
    testCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "world", expectedOutput: "dlrow" },
      { input: "12345", expectedOutput: "54321" }
    ],
  },
  "cs-degree": {
    question: "Find the factorial of a number.",
    example: "Input: 5 -> Output: 120",
    testCases: [
      { input: "5", expectedOutput: "120" },
      { input: "3", expectedOutput: "6" },
      { input: "0", expectedOutput: "1" }
    ],
  },
};

