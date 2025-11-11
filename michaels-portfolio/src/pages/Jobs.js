import React from 'react';

const cbotm = process.env.PUBLIC_URL + '/media/cbotm.png';
export default function About() {


  return (
    <div className="flex flex-col items-center z-10 min-h-screen pt-10 p-3 bg-gradient-to-b from-red-100 via-orange-200 to-stone-300">
        <PageTitle />
        <WorkCard 
            jobLogo= "/media/CoolMilwaukeeLogo.svg"
            barColor="#DB011C"
            jobTitle="Demand Planner"
            location="Toronto, ON"
            duration="August 2025 - Present"
            textColor="#FFFFFF"
            description="During my time at place I did stuff. Here is some stuff I did:
                        Thing 1 that looks cool on a resume
                        Thing 2 thats also really cool
                        Thing 3 I liked thats also kinda funny
                        I learned some stuff that was interesting and sounds impressive because of the way I wrote it down on here. I like the job and it was a great time! Must recommend this job."
            photo={cbotm}
        />
        <WorkCard 
            jobLogo= "/media/CoolMilwaukeeLogo.svg"
            barColor="#DB011C"
            jobTitle="Demand Planner"
            location="Toronto, ON"
            duration="August 2025 - Present"
            textColor="#FFFFFF"
            description="During my time at place I did stuff. Here is some stuff I did:
                        Thing 1 that looks cool on a resume
                        Thing 2 thats also really cool
                        Thing 3 I liked thats also kinda funny
                        I learned some stuff that was interesting and sounds impressive because of the way I wrote it down on here. I like the job and it was a great time! Must recommend this job."
            photo={cbotm}
        />
        <WorkCard 
            jobLogo= "/media/CoolMilwaukeeLogo.svg"
            barColor="#DB011C"
            jobTitle="Demand Planner"
            location="Toronto, ON"
            duration="August 2025 - Present"
            textColor="#FFFFFF"
            description="During my time at place I did stuff. Here is some stuff I did:
                        Thing 1 that looks cool on a resume
                        Thing 2 thats also really cool
                        Thing 3 I liked thats also kinda funny
                        I learned some stuff that was interesting and sounds impressive because of the way I wrote it down on here. I like the job and it was a great time! Must recommend this job."
            photo={cbotm}
        />
        <WorkCard 
            jobLogo= "/media/CoolMilwaukeeLogo.svg"
            barColor="#DB011C"
            jobTitle="Demand Planner"
            location="Toronto, ON"
            duration="August 2025 - Present"
            textColor="#FFFFFF"
            description="During my time at place I did stuff. Here is some stuff I did:
                        Thing 1 that looks cool on a resume
                        Thing 2 thats also really cool
                        Thing 3 I liked thats also kinda funny
                        I learned some stuff that was interesting and sounds impressive because of the way I wrote it down on here. I like the job and it was a great time! Must recommend this job."
            photo={cbotm}
        />
    </div>
  );
}

function PageTitle() {
  return (
    <>
    <div className="flex flex-col items-left justify-start w-full h-fit my-5 md:my-10 md:mt-16 md:mb-24 md:px-64 md:ml-64">
        <h1 className="text-4xl md:text-6xl font-bold">Experiences</h1>
        <h2 className="text-2xl md:text-4xl mb-6 -mt-1 pl-24"> My professional journey</h2>
    </div>
    <div className="absolute flex flex-col w-2/3 h-full top-18">
        <img src="/media/Compass.svg" alt="Compass" className="self-end w-1/4 h-1/3 mr-16" />
        <img 
          src="/media/DottedSquiggle.svg" 
          alt="BackgroundTexture" 
          className="w-auto -mt-10 mx-40" 
        />
    </div>
    </>
  );
}

function WorkCard({ jobLogo, barColor, jobTitle, location, duration, textColor,description, photo }) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-fit bg-white bg-opacity-20 md:bg-opacity-0 shadow-md md:shadow-none rounded-xl md-rounded-none p-6 md:px-24 z-10 mb-64">
            <div className="flex flex-row items-center justify-end rounded-xl w-full h-32" style={{ backgroundColor: barColor }}>
                <img src={jobLogo} alt="JobLogo" className="absolute w-16 h-16 left-14 md:w-96 md:h-auto" />
                <div className="flex flex-col mr-6 md:mr-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-right" style={{ color: textColor }}>{jobTitle}</h3>
                    <p className="text-lg text-right md:text-xl " style={{ color: textColor }}>{location}, {duration}</p>
                </div>
            </div>
            <div className="relative flex flex-row justify-evenly mt-16 w-full px-6">
                <p className="text-sm md:text-lg bg-gray-400 rounded-md p-4 w-1/2">{description}</p>
                <img src={photo} alt="Cool thing I did" className="w-16 h-16 md:w-1/3 md:h-full ml-6 md:ml-10 object-cover border-4 border-gray-300" />
            </div>
        </div>
    );
}
