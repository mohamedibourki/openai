import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

async function askOpenAI(question: string) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: question }],
  });
  console.log("\nAI:", `${chatCompletion.choices[0].message.content}\n`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  rl.question("You: ", async (question) => {
    if (question.toLowerCase() === "exit") {
      rl.close();
    } else {
      await askOpenAI(question);
      promptUser();
    }
  });
}

promptUser();