const topicTypes = ['IELTS Writing', 'IELTS Speaking', 'Debate'];

const generateButtons = [
  { name: 'Outline', promptType: 'outline', tooltip: 'Write an essay outline' },
  {
    name: 'Supportive arguments',
    promptType: 'support_arguments',
    tooltip: 'generate 3 arguments to support the statement',
  },
  {
    name: 'Opposite arguments',
    promptType: 'oppose_arguments',
    tooltip: 'generate 3 arguments to oppose the statement',
  },
  {
    name: 'Sample answer',
    promptType: 'sample_answer',
    tooltip: 'Write an sample essay',
  },
  {
    name: 'Introduction',
    promptType: 'introduction',
    tooltip: 'Write a short introduction paragraph for an essay',
  },
  {
    name: 'Conclusion',
    promptType: 'conclusion',
    tooltip: 'Write a short conclusion paragraph for this half-done essay',
    requireContent: true,
  },
  {
    name: 'Improve',
    promptType: 'improve',
    tooltip: 'Improve/Perfect this essay',
    requireContent: true,
  },
  {
    name: 'Suggestions',
    promptType: 'suggestions',
    tooltip:
      'What are the strengths & weaknesses of this essay? Give your suggestions for improvement for the writer',
    requireContent: true,
  },
];

const contentButtons = [
  {
    name: 'Elaborate',
    promptType: 'elaborate',
    tooltip: 'Elaborate/Explain the following argument in 3-4 sentences',
  },
  {
    name: 'Example',
    promptType: 'example',
    tooltip:
      'Give and explain an example in support of the following argument in 1-2 sentences',
  },
  {
    name: 'Finish sentence',
    promptType: 'finish_sentence',
    tooltip: 'Finish this sentence',
  },
  {
    name: 'Correct mistakes',
    promptType: 'correct_mistakes',
    tooltip:
      'Point out clearly the mistakes in this essay and how to correct them',
  },
  {
    name: 'Paraphrase',
    promptType: 'paraphrase',
    tooltip: 'Paraphrase/Rephrase this sentence/paragraph',
  },
  {
    name: 'Make longer',
    promptType: 'make_longer',
    tooltip: `Make this essay longer by elaborating on the existing points (don't add more arguments)`,
  },
  {
    name: 'Make simpler',
    promptType: 'make_simpler',
    tooltip: 'Rewrite this essay using simpler/more academic language',
  },
  {
    name: 'Summarize',
    promptType: 'summarize',
    tooltip: 'Summarize this essay',
  },
];

const vocabButtons = [
  {
    name: 'Dictionary',
    promptType: 'dictionary',
    tooltip:
      'Explain the meaning of the word and give me an example of how to use it in real life',
  },
  { name: 'Synonyms', promptType: 'synonyms', tooltip: 'Give me 5 synonyms' },
  { name: 'Antonyms', promptType: 'antonyms', tooltip: 'Give me 5 antonyms' },
  {
    name: 'Other ways to say',
    promptType: 'other_ways_to_say',
    tooltip: 'Give me 10 other ways to say this',
  },
];

export { topicTypes, generateButtons, contentButtons, vocabButtons };