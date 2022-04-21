// The FAQ Component for the home page
import React from 'react';
import FAQQuestion from '../Components/FAQQuestion';
import '../Styles/FAQ.scss';

const FAQ = () => {
  return (
    <div className="FAQ" id = "faq_scroll_point">
      <div className="FAQ__contents">
        <p className="FAQ__title"><u className="FAQ__title">FA</u>Q</p>
        {/* If for any string we want a new line, we insert <br> where we want a new line, and the FAQQuestion.js component will take care of it */}
        <FAQQuestion question = "Who can apply?" answer = "Any college or undergraduate student can apply to eHacks."/>
        <FAQQuestion question = "How much is the eHacks registration fee?" answer = "Thanks to our generous sponsors, eHacks is completely free for all competitors!"/>

        <FAQQuestion question = "I am a graduate/PhD/other student. Can I compete?" answer = "Please email us directly at ehacksevents@gmail.com to discuss your situation and other options available (e.g. mentorship)."/>

        <FAQQuestion question = "When will eHacks be held?" answer = "eHacks 2022 will be held on February 5 - February 6!"/>

        <FAQQuestion question = "Will eHacks be in-person or online?" answer = 'eHacks will be held virtually. If COVID-19 restrictions permit, we may host some in-person activities that are non-mandatory.'/>

        <FAQQuestion question = "What if I don't have a team? What should I be looking for?" answer = "eHacks will work with you to find a team. If you want to take matters into your own hands, note the team requirements below."/>

        <FAQQuestion question = "What are the team requirements?" answer = "eHacks requires that each team consists of at least 1 technical and 1 non-technical member, technical meaning technological skills such as coding and programming. If you have alternative requests, please reach out to ehacksevents@gmail.com. We may approve different team structures in limited circumstances. "/>

        <FAQQuestion question = "I'm a business/finance/social science student. Why eHacks?" answer = "Business is impossible without technology. Whether you're in banking, accounting, consulting, marketing, or any other industry, it's nearly guaranteed that working on technology will be at the core of your work. eHacks will prepare you for this workforce better than any other event in Canada. Not only will you bolster your business skills by working on your feasibility pitch, attending workshops, and networking with top companies, you'll have the unique opportunity to work alongside technical individuals building new technology right in front of your eyes. Your job is to keep them on track towards building a solution that's feasible and impactful - just like you would in the real world. Plus, if you want to get your hands dirty with some coding, eHacks has tons of beginner focused workshops geared towards getting you started. <br><br>eHacks will teach you the skills you need to last you a lifetime, on top of the opportunity to walk away with monetary prizes. "/>

        <FAQQuestion question = "I'm a computer science/engineering/STEM student. Why eHacks?" answer = "Technology is never developed in a vacuum. In the workplace, developers have to deal with business requirements, designers, budgets, and non-technical coworkers every day to do their job. Hackathons usually teach you new technical skills, but often neglect the business side of technology. At eHacks, we do both. Not only will you bolster your tech skills by building a technical demo, attending workshops, and networking with top companies, you'll have the unique opportunity to work alongside non-technical individuals to learn more about the entrepreneurial and business side of technology. <br><br>Plus, if you want to get your hands dirty working on the business plan, eHacks has tons of beginner focused workshops geared towards getting you started. eHacks will teach you the skills you need to last you a lifetime, on top of the opportunity to walk away with monetary prizes. "/>

        <FAQQuestion question = "What opportunities are there to connect at eHacks?" answer = "There are many events where you can meet and network with corporate partners, industry professionals, and fellow students. During eHacks, we host technical and non-technical workshops, networking sessions with recruiters, and bring in technical and business savvy mentors, judges, and speakers.<br><br> Our partners include various high-growth companies and organizations. As a result, there are many opportunities to develop life-long connections to support you on your career path through the post-pandemic environment."/>

        <FAQQuestion question = "I have another question. What should I do?" answer = "Reach out to ehacksevents@gmail.com. We're happy to help."/>

        <FAQQuestion question = "I want to apply as a team, but there's no option to sign up with my team. What should I do?" answer = "Once the eHacks team has read and approved all applications, we will send out an RSVP form where you can fill out your team’s information. Please note that the RSVP form comes out in waves so if you or your friends don’t receive it at the same time, don’t fret! Simply complete the form as you receive it or send us an email and we’ll take care of everything for you!"></FAQQuestion>

        <FAQQuestion question = "Do I need to apply with a team or can I apply solo?" answer = "You can either apply solo or as a full or partial team - a full team being a team of four that meets the requirements. The eHacks team will pair you with the remaining members of your team prior to the event and share that with you in advance so that you have a chance to meet before the competition starts!"></FAQQuestion>
      </div>
    </div>
  );
};

export default FAQ;
