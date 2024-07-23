class WordGenerator {
  static easyWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
  ];

  static mediumWords = [
    "ability", "achieve", "action", "active", "actual", "adjust", "admire", "adult", "affect", "agree", "allow", "amount", "animal", "answer", "appear", "apply", "area", "argue", "arrange", "arrive", "artist", "assume", "attack", "attend", "avoid", "beauty", "become", "before", "begin", "behave", "behind", "belong", "better", "between", "beyond", "book", "bring", "build", "business", "call", "carry", "catch", "cause", "center", "chance", "change", "choose", "class", "clear", "close", "color", "come", "common", "compare", "complete", "concern", "consider", "continue", "control", "correct", "cost", "cover", "create", "current", "cut", "dance", "deal", "decide", "deep", "degree", "depend", "describe", "design", "develop", "differ", "difficult", "direct", "discuss", "divide", "doctor", "door", "down", "draw", "dream", "drive", "drop", "during", "each", "early", "earth", "east", "easy", "eat", "edge", "effect", "effort", "either", "else", "end", "enjoy", "enough", "enter", "entire", "especially", "even"
  ];

  static hardWords = [
    "abandon", "abbreviate", "abiding", "ability", "abolish", "abroad", "abrupt", "absence", "absorb", "abstract", "absurd", "abundant", "abuse", "academy", "accelerate", "accent", "accept", "access", "accident", "accommodate", "accompany", "accomplish", "account", "accumulate", "accurate", "accuse", "achieve", "acknowledge", "acquire", "acquit", "across", "activate", "actual", "adapt", "add", "address", "adequate", "adjacent", "adjust", "administer", "admire", "admit", "adolescent", "adopt", "adore", "advance", "advantage", "adventure", "advertise", "advise", "advocate", "aesthetic", "affect", "affiliate", "affirm", "afford", "afraid", "aftermath", "afternoon", "again", "against", "age", "agency", "agenda", "aggression", "agile", "agitate", "agree", "agriculture", "ahead", "aid", "aim", "air", "aircraft", "airline", "airport", "aisle", "alarm", "album", "alcohol", "alert", "alien", "align", "alike", "alive", "allege", "allergic", "allocate", "allow", "ally", "almost", "alone", "along", "already", "alter", "alternate", "although", "altogether", "always", "amaze", "ambition", "ambulance", "amend", "amount", "amplify", "amuse", "analyze", "ancestor", "ancient", "anger", "angle", "angry", "animal", "animate", "announce", "annual", "another", "answer", "anticipate"
  ];

  static generateWords(count, difficulty = 'medium') {
    let wordList;
    switch(difficulty) {
      case 'easy':
        wordList = this.easyWords;
        break;
      case 'hard':
        wordList = this.hardWords;
        break;
      default:
        wordList = this.mediumWords;
    }
    const words = [];
    for (let i = 0; i < count; i++) {
      words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return words;
  }
}

export default WordGenerator;