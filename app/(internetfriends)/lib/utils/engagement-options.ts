type EngagementOption = {
  duration: string;
  price: string;
  short_description: string;
  long_description: string;
};

const engagementOptions: EngagementOption[] = [
  {
    duration: "Coffee Time",
    price: "Free",
    short_description: "A friendly first meeting to explore ideas and goals.",
    long_description:
      "Our Coffee Time session is a complimentary opportunity to meet, discuss your challenges, and explore potential ideas and next steps. Let’s brainstorm innovative solutions and uncover how we can bring value to your business or project.",
  },
  {
    duration: "1 Month",
    price: "$5,000 USD*",
    short_description: "Quick engagement for immediate impact.",
    long_description:
      "Our 1-month engagement is designed for teams needing immediate assistance on a targeted project. We focus on high-priority tasks, offering rapid results to address urgent needs while optimizing workflows for success.",
  },
  {
    duration: "2 Months",
    price: "$9,000 USD*",
    short_description: "Efficient solutions for focused results.",
    long_description:
      "A 2-month engagement is ideal for addressing key business challenges or launching small projects. We collaborate closely with your team, delivering impactful results through streamlined processes and creative problem-solving.",
  },
  {
    duration: "3 Months",
    price: "$16,000 USD*",
    short_description: "Intensive support for critical milestones.",
    long_description:
      "Our 3-month engagement is perfect for teams needing immediate results. We integrate seamlessly into your processes to accelerate high-priority initiatives, overcoming challenges and achieving milestones without the delays of internal hiring.",
  },
  {
    duration: "6 Months",
    price: "$24,000 USD*",
    short_description: "Comprehensive solutions for long-term goals.",
    long_description:
      "A 6-month partnership offers a broader range of services tailored to your objectives. With more time, we thoroughly design, build, test, and deploy your solutions, ensuring alignment with long-term strategic goals.",
  },
  {
    duration: "9 Months",
    price: "$32,000 USD*",
    short_description: "Strategic partnership for sustained success.",
    long_description:
      "Our 9-month engagement enables deeper collaboration and strategic alignment. We help refine your operations, streamline processes, and enhance go-to-market efforts. This partnership positions you for lasting success without the overhead of hiring full-time staff.",
  },
  {
    duration: "12 Months",
    price: "$50,000 USD*",
    short_description: "Dedicated partnership for maximum impact.",
    long_description:
      "Our 12-month partnership immerses us fully in your organization. Acting as an extension of your team, we contribute continuously to your strategic and operational goals, delivering long-term impact while maintaining your agility and efficiency.",
  },
];

export default engagementOptions;
