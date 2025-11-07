import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 via-green-200 to-green-300 min-h-screen pt-10">
      <NameCard />
      <MainDescription />
      <EducationSection />
      <FuturePlansSection />
    </div>
  );
}

function NameCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-1/2 md:mb-10">
      <div className="mx-6 md:mx-0 md:w-1/4 max-w-56 md:mr-6 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
        <img src="/media/linkedinPfp.JPG" alt="MichaelPhoto" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold mt-4">Michael Tahirovic</h1>
        <h2 className="text-xl text-center md:text-left mt-2">4th Year BBA/BSc at Wilfrid Laurier University</h2>
        <h3 className="text-lg text-center md:text-left mt-2">Finance Consultant, Software Engineer, Game Developer</h3>
      </div>
    </div>
  );
}

function MainDescription() {
  return (
    <div className="relative flex items-center justify-center w-full h-fit md:w-3/4 my-2 md:my-5 overflow-hidden rounded-xl shadow-lg">
      <img src="/media/cbotm.png" alt="BackgoundPic" className="absolute opacity-50 w-full h-full blur-sm object-cover" />
      <div className="relative flex flex-col items-center justify-center bg-black bg-opacity-5 w-full h-full">
        <p className="text-lg text-center text-white p-6">
          Hi! I'm Michael, a 4th year BBA/BSc student at Wilfrid Laurier University. I am passionate about finance and technology, and I love to learn new things. I have experience in software engineering, game development, and finance consulting. I am always looking for new opportunities to grow and develop my skills.
          <br /><br />
          In my free time, I enjoy playing video games, reading books, and spending time with friends and family. I am also an avid traveler and love to explore new places.
        </p>
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="flex flex-col items-left justify-center w-full md:w-3/4 my-5 md:my-10 bg-white bg-opacity-20 md:bg-opacity-0 shadow-md md:shadow-none rounded-xl md-rounded-none">
      <h2 className="text-3xl text-center md:text-left font-bold mb-4 pt-3">Education</h2>
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex md:hidden md:w-1/2 items-center justify-center overflow-hidden border-t-4 border-b-4 border-gray-300 shadow-lg">
          <img src="/media/cbotm.png" alt="LaurierLogo" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col self-start md:w-1/2 p-6 md:p-0 md:pr-6">
          <p className="text-lg text-left">
            I am currently pursuing a Bachelor of Business Administration and Bachelor of Science at Wilfrid Laurier University, with a focus on Finance and Computer Science. My coursework has provided me with a strong foundation in both business principles and technical skills.             I am currently pursuing a Bachelor of Business Administration and Bachelor of Science at Wilfrid Laurier University, with a focus on Finance and Computer Science. My coursework has provided me with a strong foundation in both business principles and technical skills.
            I am currently pursuing a Bachelor of Business Administration and Bachelor of Science at Wilfrid Laurier University, with a focus on Finance and Computer Science. My coursework has provided me with a strong foundation in both business principles and technical skills.
          </p>
        </div>
        <div className="hidden md:flex md:w-1/2 items-center justify-center rounded-lg overflow-hidden border-4 border-gray-300 shadow-lg">
          <img src="/media/cbotm.png" alt="LaurierLogo" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}

function FuturePlansSection() {
  return (
    <div className="flex flex-col items-left justify-center w-full md:w-3/4 mb-5 md:my-10 bg-white bg-opacity-20 md:bg-opacity-0 shadow-md md:shadow-none rounded-xl md-rounded-none">
      <h2 className="text-3xl text-center md:text-left font-bold mb-4 pt-3">Future Plans</h2>
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="md:w-1/2 flex items-center justify-center md:rounded-lg overflow-hidden border-t-4 border-b-4 md:border-4 border-gray-300 shadow-lg">
          <img src="/media/cbotm.png" alt="LaurierLogo" className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col self-start md:w-1/2 p-6 md:p-0 md:pl-6">
          <p className="text-lg text-left">
            After graduation, I plan to pursue a career in finance or technology, where I can leverage my skills and knowledge to make a positive impact. I am particularly interested in roles that involve financial analysis, software development, or data science. Additionally, I hope to continue learning and growing both personally and professionally.
          </p>
        </div>
      </div>
    </div>
  );
}
 