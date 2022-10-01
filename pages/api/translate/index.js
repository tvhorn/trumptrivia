const getIntroduction = (input) => {
  if (input.includes("will")) return "Believe me, ";
  if (input.includes("know")) return "Believe me, ";
  if (input.includes("i'm")) return "Let me tell you, ";
  else return "";
};

const getReplacement = (input) => {
  let formatted = "";
  const replacement = input.trim().split(" ");

  replacement.map((word, index) => {
    if (index == 0) {
    } else {
      formatted += " ";
    }
    if (word == "coronavirus") formatted += "kungflu";
    else if (word == "china") formatted += "CHAI-NAH!";
    else if (word == "covid-19") formatted += "kungflu";
    else if (word == "covid") formatted += "kungflu";
    else if (word == "joe") formatted += "lazy joe";
    else if (word == "bernie") formatted += "crazy bernie";
    else if (word == "democrats") formatted += "Do Nothing Democrats";
    else if (word == "big") formatted += "bigly";
    else if (word == "wall") formatted += "great, great wall";
    else if (word == "good") formatted += "incredible";
    else if (word == "cnn") formatted += "FAKE NEWS CNN";
    else if (word == "success") formatted += "TREMENDOUS SUCCESS";
    else if (word == "i") formatted += "I";
    else formatted += word;
  });

  return formatted;
};

const getMain = (raw) => {
  const input = raw.toLowerCase();
  if (input.includes("epstein")) throw new Error();
  else if (input.includes("science")) throw new Error();
  else if (input.includes("covid-19 is not under control"))
    return "OPEN UP SCHOOLS!";
  else if (input.includes("black lives matter")) return "ALL LIVES MATTER";
  else if (input.includes("blm")) return "alm";
  else if (input.includes("ivanka"))
    return "if she weren’t my daughter, perhaps I’d be dating her";
  else if (input.includes("george floyd"))
    return "when the shooting starts, the looting starts";
  else if (input.includes("hillary")) return "LOCK HER UP!";
  else if (input.includes("russia")) return "WITCH HUNT!";
  else if (input.includes("fraud"))
    return "FRAUD! FRAUD! FRAUD! THIS ELECTION WAS RIGGED!";
  else if (input.includes("joe biden"))
    return "JOE BIDEN IS NOT THE FUTURE PRESIDENT!";
  else return getReplacement(input);
};

const randomlyCapitalize = (body) => {
  let formatted = "";
  const input = body.trim().split(" ");
  input.map((word, index) => {
    const d = Math.random();
    if (d < 0.75) {
      if (index != 0) formatted += " ";
      formatted += word;
    } else {
      if (index != 0) formatted += " ";
      formatted += word.toUpperCase();
    }
  });
  return formatted;
};

const response = (input) => {
  const intro = getIntroduction(input);
  const main = getMain(input);
  const body = randomlyCapitalize(main);
  const bodyCapitalized = body.charAt(0).toUpperCase() + body.slice(1);
  return intro + bodyCapitalized;
};

export default async function handler(req, res) {
  const { input } = req.body;

  if (input.toLowerCase().includes("obama"))
    return res.status(200).json({ obamna: true });

  if (input.toLowerCase().includes("election"))
    return res.status(200).json({ translation: "I WON THE ELECTION!" });

  res.status(200).json({ translation: response(input) });
}
