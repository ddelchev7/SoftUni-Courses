function rightPlace(string1, char, string2) {
  let firstWord = string1;
  let result = firstWord.replace("_", char);

  if (result === string2) {
    console.log("Matched");
  } else {
    console.log("Not Matched");
  }
}

rightPlace("Str_ng", "I", "Strong");
rightPlace("Str_ng", "i", "String");
