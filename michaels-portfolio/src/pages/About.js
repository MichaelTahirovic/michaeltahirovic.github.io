import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-green-200 min-h-screen py-10">
      <NameCard />
      <MainDescription />
      <EducationSection />
      <FuturePlansSection />
      {/*<div>
        <div className="Description_Me">
          <img src="/media/linkedinPfp.JPG" alt="MichaelPhoto" />
          <div className="Name_Title">
            <h1>Michael Tahirovic</h1>
            <h2>3rd Year BBA/BSc at Wilfrid Laurier University</h2>
            <h3>Finance Consultant, Software Engineer, Game Developer</h3>
          </div>
        </div>
        <div className="AboutMe_Section">
          <p>
            Hi! I'm Michael, a 3rd year BBA/BSc student at Wilfrid Laurier University. I am passionate about finance and technology, and I love to learn new things. I have experience in software engineering, game development, and finance consulting. I am always looking for new opportunities to grow and develop my skills.
            <br /><br />
            In my free time, I enjoy playing video games, reading books, and spending time with friends and family. I am also an avid traveler and love to explore new places.
          </p>
        </div>
      </div>
      */}
    </div>
  );
}

function NameCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-1/3 my-10">
      <div className="flex flex-row md:flex-col items-center justify-center w-full h-1/2">
        <div className="w-1/4 max-w-56 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
          <img src="/media/linkedinPfp.JPG" alt="MichaelPhoto" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mt-4">Michael Tahirovic</h1>
          <h2 className="text-xl mt-2">3rd Year BBA/BSc at Wilfrid Laurier University</h2>
          <h3 className="text-lg mt-2">Finance Consultant, Software Engineer, Game Developer</h3>
        </div>
      </div>
    </div>
  );
}

function MainDescription() {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 my-10">
      <p className="text-lg text-center">
        Hi! I'm Michael, a 3rd year BBA/BSc student at Wilfrid Laurier University. I am passionate about finance and technology, and I love to learn new things. I have experience in software engineering, game development, and finance consulting. I am always looking for new opportunities to grow and develop my skills.
        <br /><br />
        In my free time, I enjoy playing video games, reading books, and spending time with friends and family. I am also an avid traveler and love to explore new places.
      </p>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 my-10">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      <p className="text-lg text-center">
        I am currently pursuing a Bachelor of Business Administration and Bachelor of Science at Wilfrid Laurier University, with a focus on Finance and Computer Science. My coursework has provided me with a strong foundation in both business principles and technical skills.
      </p>
    </div>
  );
}

function FuturePlansSection() {
  return (
    <div className="flex flex-col items-center justify-center w-3/4 my-10">
      <h2 className="text-2xl font-bold mb-4">Future Plans</h2>
      <p className="text-lg text-center">
        After graduation, I plan to pursue a career in finance or technology, where I can leverage my skills and knowledge to make a positive impact. I am particularly interested in roles that involve financial analysis, software development, or data science. Additionally, I hope to continue learning and growing both personally and professionally.
      </p>
    </div>
  );
}