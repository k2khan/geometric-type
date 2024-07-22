class WordGenerator {
  static easyWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
    "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
    "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
  ];

  static mediumWords = [
    "ability", "achieve", "acquire", "adapt", "advance", "advice", "affect", "agree", "allow", "amount",
    "analyze", "annual", "appear", "apply", "approach", "appropriate", "argue", "arrange", "assume", "attend",
    "balance", "believe", "benefit", "build", "calculate", "career", "carry", "cause", "change", "choose",
    "clarify", "collaborate", "collect", "communicate", "compare", "compete", "complete", "conclude", "conduct", "confirm",
    "consider", "consist", "constitute", "consult", "contain", "continue", "contribute", "create", "define", "deliver",
    "demonstrate", "depend", "describe", "design", "determine", "develop", "differ", "discuss", "distribute", "document",
    "dominate", "emphasize", "enable", "encourage", "ensure", "establish", "evaluate", "examine", "exceed", "exclude",
    "exist", "expand", "expect", "experience", "explain", "express", "extend", "facilitate", "finance", "focus",
    "generate", "identify", "illustrate", "implement", "improve", "include", "increase", "indicate", "influence", "inform",
    "initiate", "install", "interact", "introduce", "investigate", "involve", "maintain", "manage", "measure", "negotiate"
  ];

  static hardWords = [
    "abstruse", "acquiesce", "ameliorate", "anomaly", "arcane", "belligerent", "cacophony", "circumlocution", "cognizant", "conundrum",
    "deleterious", "ebullient", "ephemeral", "esoteric", "fastidious", "gregarious", "heterogeneous", "idiosyncratic", "indefatigable", "juxtapose",
    "labyrinthine", "mellifluous", "nefarious", "obfuscate", "paradigm", "quintessential", "recalcitrant", "surreptitious", "ubiquitous", "vociferous",
    "aberration", "abeyance", "abjure", "abnegate", "abrogate", "abscond", "abstemious", "acerbic", "acrimony", "adumbrate",
    "aesthetic", "afflatus", "agglomerate", "alacrity", "altruistic", "ambivalent", "ameliorate", "anachronistic", "anathema", "anodyne",
    "antipathy", "apocryphal", "approbation", "arbitrary", "arcane", "arduous", "artless", "ascetic", "asperity", "assiduous",
    "attenuate", "audacious", "austere", "avarice", "aver", "axiomatic", "beguile", "bereft", "blandishment", "bombastic",
    "cachet", "cajole", "callous", "calumny", "capricious", "captious", "cardinal", "catalyze", "caustic", "celestial",
    "chicanery", "clemency", "cogent", "cognizant", "commensurate", "compendium", "complacent", "complicit", "conciliate", "condone",
    "conflagration", "congruent", "connive", "consternation", "construe", "contend", "contretemps", "converge", "convivial", "corollary"
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