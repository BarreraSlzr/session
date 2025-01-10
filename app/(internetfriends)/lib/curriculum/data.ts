import { CVData } from "./type";

export const curriculum: CVData = {
    professionalPosition: 'Senior Software Engineer',
    jobExperiences: [
      {
        title: 'Software Engineer II',
        description: 'Responsible for tech consulting, planning, developing and maintaining web applications.',
        razonSocial: 'Robert Bosch México S.A. de C.V.',
        projects: [
          {
            name: 'Preboarding and Onboarding Web System App',
            description: 'Development of a web application for the management of the recruitment of human resources with external users, internal administrators and different roles involved.',
            skillsUsed: [3, 5, 8, 10, 14, 15, 13, 16, 11]
          },
          {
            name: 'Tariff Classifier for Aduanas',
            description: 'Created an website to ask for Aduana Classification having a text input to describe any kind of object.',
            skillsUsed: [2, 3, 4, 6, 12]
          },
          {
            name: 'Audits and Jobs scheduler - 5 Renew Projects',
            description: 'Refurbishment of 5 projects, each 5 years old since the last commit pushed, used to audit financial databases and manage recurring work schedules to monitor financial functionality with different currencies around the world.',
            skillsUsed: [2, 3, 4, 7, 5]
          },
          {
            name: 'Security Audits Dashboard',
            description: 'Creation of a graphical dashboard platform to audit security compliance performance and facilitate accreditation and certification of business departments through manager role-based access.',
            skillsUsed: [2, 3, 4, 5, 10, 22]
          },
          {
            name: 'Chatbot Support',
            description: `Initialization and configuration of the support chatbot that is displayed on the company's website for end users to increase the company's engagement and support to customers and experienced users, specific information is queried in databases. Support ticket creation is also connected throughout a DevOps system.`,
            skillsUsed: [1, 7, 16, 23]
          },
          {
            name: 'Many other small-projects as Fullstack or only Frontend capability',
            description: 'I have created many other projects with less impact in core business, such as internal laboratory management, the sensor network website with real-time information from site, Stamping Monitor which was a website for real-time monitoring of Industry 4.0, or FlowChart that was a webapp where you can create a flow work and export it in csv to be used with a special font that creates flow-charts.',
            skillsUsed: [1, 3, 4, 25]
          },
          {
            name: 'Internal Collaboration with coworkers',
            description: `I was committed to increasing technology awareness among my co-workers with technical talks not only with other developers, but also with many non-technological people, such as the Human Resources Department, helping to automate their workflows using Microsoft's new capabilities.`,
            skillsUsed: [24, 25]
          },
        ],
        startDate: 'Oct. 2019',
        endDate: 'Apr. 2024'
      },
      {
        title: 'Tech Support and Marketing Content Creator',
        description: 'Assisted in tech support of the company\'s tech devices and created content for the company\'s social networks.',
        razonSocial: 'Zapata Camiones S.A. de C.V.',
        projects: [
          {
            name: 'Marketing Content Creator',
            description: 'Create content for the company\'s social networks, such as images, videos and texts to increase the engagement on potencial clients.',
            skillsUsed: [17, 18, 19],
          }, {
            name: 'Tech Support - Tier 3',
            description: 'Assist the company\'s clients with their problems on the software and hardware of the company\'s products.',
            skillsUsed: [20, 21],
          }
        ],
        startDate: 'Mar. 2015',
        endDate: 'Feb. 2018'
      }
    ],
    skills: [
      { id: 1, name: 'JavaScript', popularity: 90 },
      { id: 2, name: 'TypeScript', popularity: 80 },
      { id: 3, name: 'React', popularity: 85 },
      { id: 4, name: 'Node.js', popularity: 70 },
      { id: 5, name: 'Next.js', popularity: 75 },
      { id: 6, name: 'CosmosDB', popularity: 65 },
      { id: 7, name: 'SQL Language - CTEs', popularity: 95 },
      { id: 8, name: 'SASS', popularity: 90 },
      { id: 9, name: 'Tailwind CSS', popularity: 80 },
      { id: 10, name: 'SSO - Auth Providers', popularity: 85 },
      { id: 11, name: 'PWA - Progressive Web App', popularity: 73 },
      { id: 12, name: 'OpenAI', popularity: 60 },
      { id: 13, name: 'Azure Blob Storage', popularity: 70 },
      { id: 14, name: 'Azure WebApp', popularity: 65 },
      { id: 15, name: 'Mailing', popularity: 60 },
      { id: 16, name: 'Azure DevOps - CI/CD', popularity: 75 },
      { id: 17, name: 'Photography', popularity: 70 },
      { id: 18, name: 'Videography', popularity: 65 },
      { id: 19, name: 'Social Media Marketing', popularity: 80 },
      { id: 20, name: 'Ticket Tech Support', popularity: 75 },
      { id: 21, name: 'General Hardware Acknowledge', popularity: 70 },
      { id: 22, name: 'Power BI', popularity: 80 },
      { id: 23, name: 'Cognigy', popularity: 60 },
      { id: 24, name: 'Social Skills', popularity: 69 },
      { id: 25, name: 'Embrace newest tech', popularity: 69 },
      { id: 25, name: 'Tech Consultor', popularity: 72 },
    ],
    contactInfo: {
      email: 'BarreraSlzr@gmail.com',
      phone: '+52 (33) 1165-4324',
      fullname: 'Emmanuel Barrera Salazar',
      timezone: 'UTC-5',
      isOnline: true,
      bio: "Full Stack Software Developer with expertise in building and maintaining web applications using modern technologies like Java, TypeScript, React, and NodeJS. Skilled in cloud infrastructure, data engineering, and AI systems, with a proven ability to deliver high-quality solutions collaboratively and independently.",
      urls: [
        { title: 'Website', url: 'https://BarreraSlzr.InternetFriends.xyz', icon: 'web' },
        { title: 'LinkedIn', url: 'https://www.linkedin.com/in/barreraslzr/', icon: 'linkedin' },
        { title: 'GitHub', url: 'https://github.com/barreraslzr', icon: 'github' },
        { title: 'WhatsApp', url: 'https://wa.me/+523311654324', icon: 'whatsapp' }
      ],
      height: "178 cm",
      sex: "Male",
      nationality: "Mexican",
      location: "Worldwide - Remote",
      localTime: "America/Mexico_City",
      availability: "Partial Availability"
    }
  };