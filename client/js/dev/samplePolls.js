const samplePolls = [
  {
    id: 1,
    author: "MarkoN95",
    public: true,
    createdAt: Date.now(),
    body: {
      title: "How often do you code?",
      totalVotes: 5,
      options: [
        {
          option: "Every day",
          votes: 2
        },
        {
          option: "4-5 times per week",
          votes: 2
        },
        {
          option: "1-2 times per week",
          votes: 1
        },
        {
          option: "I don't code",
          votes: 0
        }
      ]
    }
  },
  {
    id: 2,
    author: "Mr. Bubbles",
    public: true,
    createdAt: Date.now(),
    body: {
      title: "Which is your favourite Bioshock game?",
      totalVotes: 12,
      options: [
        {
          option: "Bioshock 1",
          votes: 5
        },
        {
          option: "Bioshock 2",
          votes: 3
        },
        {
          option: "Bioshock Infinite",
          votes: 4
        }
      ]
    }
  }
];

module.exports = samplePolls;
