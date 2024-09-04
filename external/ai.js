const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const task = `Look at two people's profiles and show score how much people match in interests from 0 to 100 and the output must be strictly like this “{score: 0-100} without anything else!!!, nothing more, just give only json. For each common hobby, interests, passion add +20. If there’s no common interests, hobbies or goals - return 0.`;

const getProfilesScore = async (user, match) => {
  const personFirst = `hobbies: ${user.hobbies.join(", ")}, goals and dreams:${
    user.goals_dreams
  }, about me:${user.aboutme}`;

  const personSecond = `hobbies: ${match.hobbies.join(
    ", "
  )}, goals and dreams:${match.goals_dreams}, about me:${match.aboutme}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `TASK: ${task}\nPERSON1: ${personFirst}\nPERSON2: ${personSecond}`,
        },
      ],
    });

    let jsonMatch = completion.choices[0].message.content.match(/{[\s\S]*?}/);

    let score = 0;

    if (jsonMatch) {
      try {
        let jsonObject = JSON.parse(jsonMatch[0]); // Parse the extracted JSON
        console.log("Extracted JSON object:", jsonObject);

        // Access the score value if it exists
        if (jsonObject.hasOwnProperty("score")) {
          score = jsonObject.score;
        } else {
          throw new Error("No score found in JSON");
        }
      } catch (error) {
        throw new Error("Error parsing expected JSON:", error);
      }
    } else {
      throw new Error("No JSON found in the string");
    }

    return { parsed: true, score };
  } catch (error) {
    console.log(error);
    return { parsed: true };
  }
};

module.exports = { getProfilesScore };
