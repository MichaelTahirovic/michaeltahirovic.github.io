import React, { useRef } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  // Use process.env.PUBLIC_URL to reference public/media assets
  const linkedinPfp = process.env.PUBLIC_URL + '/media/linkedinPfp.JPG';
  const cbotm = process.env.PUBLIC_URL + '/media/cbotm.png';

  const firstCardRef = useRef(null);
  function handleScroll() {
    if (firstCardRef.current) {
      firstCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Video />
      <Title handleScroll={handleScroll}/>
      <Triangles />
      <CardRight
        ref={firstCardRef}
        image = {linkedinPfp}
        title = "Learn About The Coolest Person Ever"
        description = "As a strong leader and great friend, Michael is a man of many talents. With a passion for learning, he excels at basically everything ever. He loves video games and spending time with his friends. Curently attending Wilfrid Laurier University to learn Business Administration and Computer Science, Michael believes he has many paths to take in his future."
        link = "/about"
      />
      <CardLeft 
        image = {cbotm}
        title = "Awesome Projects By An Awesomer Guy"
        description= "Check out these awesome computer design projects, along wih other things I've done!"
        link = "/projects"
      />
      <CardRight 
        image = {cbotm}
        title = "My Amazing Work Experience"
        description = "I have worked at many places, including a few internships. Check out my work experience and see how awesome I am!"
        link = "/jobs"
      />
      <Socials />
    </div>
  );
}

function Video() {
  const thumbnail = process.env.PUBLIC_URL + '/media/linkedinPfp.JPG';
  const video = process.env.PUBLIC_URL + '/media/myhonestreaction.mp4';
  /* Title Overlay and Video */
  return (
    <section className="relative w-full -z-50">
      <div className="inset-0">
        <video
          className="w-full object-cover fixed"
          autoPlay
          muted
          loop
          poster={thumbnail}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </section>

  );
}

function Title({handleScroll}) {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-end align-middle relative">
        <div className="fixed inset-0 bg-black bg-opacity-40 items-center justify-center flex flex-col ">
          <h1 className="w-full text-5xl md:text-8xl font-bold text-headerFont font-roboto text-center ">
            This is
          </h1>
          <h1 className="w-full h-1/3 text-5xl md:text-9xl font-bold bg-gradient-to-tr from-teal-100 to-blue-800 bg-clip-text text-transparent font-roboto text-center z-20">
            Michael Tahirovic
          </h1>
        </div>
        <div className="fixed bottom-20 w-full h-1/3 flex flex-col items-center justify-center">
          <button onClick={handleScroll} className="hidden md:flex flex-col w-1/6 justify-center align-middle inset-0  z-10">
            <img src={process.env.PUBLIC_URL + '/media/downArrow.svg'} alt="Down Arrow" className="opacity-70 hover:opacity-100 w-1/2 block mt-4 m-auto z-20" />
          </button>
        </div>
    </div>
  );
}

function Triangles() {
  return (
  <>
    <div className="relative w-full h-4 -mt-20 ">
        <div className="absolute flex justify-between items-end w-full h-full z-10">
          <div className="w-0 h-0 border-r-[90vw] border-b-[16vh] border-r-transparent border-b-headerColor"
          />
          <div
            className="w-0 h-0 border-l-[6vw] border-b-[8vh] border-l-transparent border-b-headerColor"
          />
        </div>
    </div>
    <div className="relative bottom-0 w-full h-32  bg-gradient-to-b from-headerColor via-headerColor to-white z-10"></div>
  </>
  );
}


const CardRight = React.forwardRef(function CardRight({image, title, description, link}, ref) {
  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center justify-center w-screen h-dvh md:h-screen min-h-fit max-w-full py-5 md:py-0 z-10 bg-background">
      {/* Left Side Content */}
      <div className="flex flex-col justify-evenly flex-grow min-h-fit mx-2vw z-10 px-6 py-3 md:w-1/2 w-full relative">
        <h1 className="text-3xl md:text-5xl text-center md:text-left font-roboto w-full pb-2 p-4 md:p-4 rounded-t-lg md:rounded md:bg-opacity-0 bg-subContent md:mb-4">
          {title || 'No Title Provided'}
        </h1>
        {/* Mobile Image */}
        <div className="md:hidden flex w-full h-full justify-end items-center drop-shadow-lg mb-4">
          <img
            src={image}
            alt={title || 'Section image'}
            className="object-contain object-right w-full max-h-screen rounded-b-lg"
          />
        </div>
        <p className="text-base font-helvetica p-5 rounded md:bg-opacity-0 bg-subContent w-full">
          {description || 'This is a default description. Please provide a description for this section.'}
        </p>
        <Link to={link} className="flex justify-center md:justify-start w-full md:mt-5 hover:md:mt-4 md:px-5 transition-all transition-discrete duration-200">
          <button className="bg-buttonColor text-white md:w-4/5 hover:md:w-full text-base hover:text-lg font-roboto p-2 rounded cursor-pointer mt-4 hover:bg-buttonHover transition-all transition-discrete duration-200">
            Learn More
          </button>
        </Link>
      </div>
      {/* Right Side Image aligned to the right */}
      <div className="hidden md:flex w-1/2 h-full justify-end items-center">
        <img
          src={image}
          alt={title || 'Section image'}
          className="object-cover h-full object-right w-full max-h-screen"
          style={{
            maskImage: 'linear-gradient(92deg, transparent 0%, black 40%)',
            WebkitMaskImage: 'linear-gradient(92deg, transparent 0%, black 40%)'
          }}
        />
      </div>
    </div>
  );
});

function CardLeft({image, title, description, link}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-screen h-dhv md:h-screen md:min-h-fit max-w-full py-5 md:py-0 z-10 bg-backgroundAlt sticky">
      {/* Left Side Image aligned to the left */}
      <div className="hidden md:flex w-1/2 h-full justify-end items-center">
        <img
          src={image}
          alt={title || 'Section image'}
          className="object-cover h-full object-left w-full max-h-screen"
          style={{
            maskImage: 'linear-gradient(-92deg, transparent 0%, black 40%)',
            WebkitMaskImage: 'linear-gradient(-92deg, transparent 0%, black 40%)'
          }}
        />
      </div>
      {/* Right Side Content */}
      <div className="flex flex-col justify-evenly flex-grow min-h-fit mx-2vw z-10 px-6 py-3 md:w-1/2 w-full relative">
        <h1 className="text-3xl md:text-5xl text-center md:text-right font-roboto text-defaultFont w-full pb-2 p-4 md:p-4 rounded-t-lg md:rounded md:bg-opacity-0 bg-subContent md:mb-4">
          {title || 'No Title Provided'}
        </h1>
        {/* Mobile Image */}
        <div className="md:hidden flex w-full h-full justify-end items-center drop-shadow-lg mb-4">
          <img
            src={image}
            alt={title || 'Section image'}
            className="object-contain object-right w-full max-h-screen rounded-b-lg"
          />
        </div>
        <p className="text-base md:text-right text-defaultFont font-helvetica p-5 rounded md:bg-opacity-0 bg-subContent w-full">
          {description || 'This is a default description. Please provide a description for this section.'}
        </p>
        <Link to={link} className="flex justify-center md:justify-end w-full md:mt-5 hover:md:mt-4 md:px-5 transition-all transition-discrete duration-200">
          <button className="bg-buttonColor text-white md:w-4/5 hover:md:w-full text-base hover:text-lg font-roboto p-2 rounded cursor-pointer mt-4 hover:bg-buttonHover transition-all transition-discrete duration-200">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
}

function Socials() {
  const githubLogo = process.env.PUBLIC_URL + '/media/githubLogo.png';
  const linkedinLogo = process.env.PUBLIC_URL + '/media/linkedinLogo.png';
  const instagramLogo = process.env.PUBLIC_URL + '/media/instagramLogo.png';
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-white bg-opacity-30 text-white z-20">
      <h1 className="text-2xl md:text-7xl font-bold font-roboto">Connect with Michael</h1>
      <div className="w-2/3 h-1 ustify-self-center bg-white my-8"></div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-96">
        <a href="https://github.com/MichaelTahirovic" className="w-1/3 flex flex-col items-center justify-between bg-buttonColor rounded-3xl p-6 m-2 hover:bg-buttonHover transition-all duration-300">
          <div className="flex flex-col items-center justify-center size-3/4">
            <img src={githubLogo} alt="Michael's GitHub Page" className="block mx-auto rounded-full" />
            <h1 className="text-xl text-white font-roboto mt-3">GitHub</h1>
          </div>
        </a>
        <span className="text-5xl mx-4">|</span>
        <a href="https://www.linkedin.com/in/michael-tahirovic/" className="w-1/3 flex flex-col items-center justify-between bg-buttonColor rounded-3xl p-6 m-2 hover:bg-buttonHover transition-all duration-300">
          <div className="flex flex-col items-center justify-center size-3/4">
            <img src={linkedinLogo} alt="Michael's LinkedIn Page" className="block mx-auto rounded-full" />
            <h1 className="text-xl font-roboto text-white mt-3">LinkedIn</h1>
          </div>
        </a>
        <span className="text-5xl mx-4">|</span>
        <a href="https://www.instagram.com/smoltoastyphotos" className="w-1/3 h-fit flex flex-col items-center justify-center align-middle bg-buttonColor rounded-3xl p-6 m-2 hover:bg-buttonHover transition-all duration-300">
          <div className="flex flex-col items-center justify-center size-3/4">
            <img src={instagramLogo} alt="Michael's Photography Instagram Page" className="block mx-auto rounded-full" />
            <h1 className="text-xl font-roboto text-white mt-3">Instagram</h1>
          </div>
        </a>
      </div>
    </div>
  );
}

function Blog() { /* To add in future */
  const cbotm = process.env.PUBLIC_URL + '/media/cbotm.png';
  /* Blog Section */
  return (
    <div className="flex flex-col items-center w-full min-h-[90vh] bg-[#383f41] pt-0 pb-8 relative z-10">
      <div className="w-full text-center bg-[#474650] mb-12  top-[7vh] z-10">
        <h1 className="text-3xl text-[#dbdbdb] pb-4 pt-6 font-roboto">Latest Updates</h1>
      </div>
      <div className="flex flex-row overflow-x-auto items-center px-4 w-full h-[70vh] min-h-[28rem] gap-6">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className="flex flex-col items-center w-[35%] h-[98%] p-4 bg-[#dbdbdb] rounded-xl mr-6 transition-all duration-200 hover:w-[36%] hover:h-full hover:shadow"
          >
            <img src={cbotm} alt="Michael Tahirovic" className="w-full h-[60%] rounded-xl object-cover" />
            <h1 className="pt-4 pb-1 text-2xl text-[#373737]">My {['First', 'Second', 'Third', 'Fourth'][num - 1]} Post</h1>
            <p className="text-base font-helvetica pt-2 flex flex-col">
              {num === 1
                ? 'Welcome to my blog! This is my first post. I hope you enjoy it!'
                : `This is my ${['second', 'third', 'fourth'][num - 2]} post. I hope you enjoy it!`}
            </p>
            <Link to="/projects" className="w-full mt-auto">
              <button className="bg-[#394552] text-white w-full text-lg font-roboto p-2 rounded mt-4 hover:bg-[#445566] transition-all duration-300">
                Read More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}