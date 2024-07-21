class WordGenerator {
  static wordList = [
    "ability", "achieve", "acquire", "adapt", "advance", "advice", "affect", "agree", "allow", "amount",
    "analyze", "annual", "appear", "apply", "approach", "appropriate", "argue", "arrange", "assume", "attend",
    "balance", "believe", "benefit", "build", "calculate", "career", "carry", "cause", "change", "choose",
    "clear", "combine", "common", "compare", "compete", "complete", "complex", "concept", "concern", "confirm",
    "connect", "consider", "consist", "constant", "contain", "continue", "create", "current", "decide", "define",
    "demand", "describe", "design", "determine", "develop", "different", "difficult", "direct", "discuss", "divide",
    "effect", "effort", "encourage", "ensure", "establish", "estimate", "evaluate", "event", "evidence", "example",
    "explain", "express", "extend", "factor", "feature", "figure", "final", "focus", "form", "function",
    "general", "goal", "growth", "guide", "happen", "history", "identify", "imagine", "improve", "include",
    "increase", "indicate", "individual", "influence", "information", "interest", "involve", "issue", "knowledge", "likely",
    "maintain", "manage", "material", "matter", "measure", "method", "model", "modern", "natural", "necessary",
    "obtain", "occur", "offer", "opinion", "option", "organize", "original", "particular", "perform", "period",
    "picture", "policy", "popular", "position", "positive", "possible", "practice", "prepare", "present", "prevent",
    "produce", "product", "project", "promote", "propose", "provide", "purpose", "quality", "question", "range",
    "realize", "reason", "receive", "recognize", "recommend", "record", "reduce", "reflect", "regard", "relate",
    "remain", "remember", "report", "represent", "require", "research", "resource", "respond", "result", "reveal",
    "review", "secure", "separate", "serious", "service", "similar", "simple", "situation", "source", "specific",
    "strategy", "structure", "success", "suggest", "support", "suppose", "theory", "understand", "unique", "value",
    "various", "view", "whole", "wonder", "worker", "within"
  ];

  static generateWords(count) {
    const words = [];
    for (let i = 0; i < count; i++) {
      words.push(this.wordList[Math.floor(Math.random() * this.wordList.length)]);
    }
    return words;
  }
}

export default WordGenerator;