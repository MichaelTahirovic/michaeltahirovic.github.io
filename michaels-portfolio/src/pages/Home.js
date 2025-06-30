import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Use process.env.PUBLIC_URL to reference public/media assets
  const linkedinPfp = process.env.PUBLIC_URL + '/media/linkedinPfp.JPG';
  const cbotm = process.env.PUBLIC_URL + '/media/cbotm.png';
  const myhonestreaction = process.env.PUBLIC_URL + '/media/myhonestreaction.mp4';

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center font-sans">
      {/* Title Overlay and Video */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-[-10]">
          <video
            className="w-full h-full object-cover fixed"
            autoPlay
            muted
            loop
            poster={linkedinPfp}
          >
            <source src={myhonestreaction} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-30 z-[-9]" />
        </div>
        <div className="flex justify-center items-center w-full h-[15vh] relative top-[45vh]">
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[6rem] text-[#97a4b1] font-roboto text-center bg-black bg-opacity-80 px-4 py-2 rounded opacity-80 fixed w-full z-10">
            This is<br />Michael Tahirovic
          </h1>
        </div>
      </section>

      {/* Triangles */}
      <div className="relative w-full h-[13vh] flex flex-col">
        <div className="absolute flex justify-between items-end w-full h-full z-[-1]">
          <div
            className="w-0 h-0 border-r-[50vw] border-b-[15vh] border-r-transparent border-b-white"
            style={{ borderRightColor: 'transparent', borderBottomColor: '#fff' }}
          />
          <div
            className="w-0 h-0 border-l-[50vw] border-b-[15vh] border-l-transparent border-b-white"
            style={{ borderLeftColor: 'transparent', borderBottomColor: '#fff' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="flex flex-col items-center w-full bg-white relative pt-0 text-[#373737] font-roboto">
        {/* Card 1 */}
        <div className="flex flex-row items-center justify-center w-full min-h-[100vh] max-w-full px-12 py-0 sticky top-[4vh] z-10 bg-white mb-[2vh]">
          <div className="flex flex-col items-center flex-grow mx-[2vw] z-10">
            <h1 className="text-[clamp(2.5rem,3vw,4rem)] font-roboto w-full p-4 rounded bg-[#dbdbdb] mb-[6vh] -rotate-2">
              Learn About The Coolest Person Ever
            </h1>
            <p className="text-[clamp(1rem,1.3vw,1.5rem)] font-helvetica p-5 rounded bg-[#dbdbdb] flex flex-col">
              As a strong leader and great friend, Michael is a man of many talents. With a passion for learning, he excels at basically everything ever. He loves video games and spending time with his friends. Curently attending Wilfrid Laurier University to learn Business Administration and Computer Science, Michael believes he has many paths to take in his future.
              <br /> <br />
              <Link to="/about">
                <button className="bg-[#394552] text-white w-full text-[clamp(1rem,1.3vw,1.5rem)] font-roboto p-2 rounded cursor-pointer mt-4">
                  &gt;&gt;Learn More
                </button>
              </Link>
            </p>
          </div>
          <div className="flex flex-col justify-center w-[35%] pl-4">
            <img src={linkedinPfp} alt="Michael Tahirovic" className="object-contain rounded-2xl w-full" />
            <div className="w-full h-4 mt-8 bg-black opacity-10 rounded-[100px] shadow" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-row items-center justify-center w-full min-h-[100vh] max-w-full px-12 py-0 sticky top-[4vh] z-10 bg-[#383f41] mb-[2vh]">
          <div className="flex flex-col justify-center w-[35%] pr-4">
            <img src={cbotm} alt="Michael Tahirovic" className="object-contain rounded-2xl w-full" />
            <div className="w-full h-4 mt-8 bg-black opacity-10 rounded-[100px] shadow" />
          </div>
          <div className="flex flex-col items-center flex-grow mx-[2vw] z-10">
            <h1 className="text-[clamp(2.5rem,3vw,4rem)] font-roboto w-full p-4 rounded bg-[#dbdbdb] mb-[6vh] rotate-2">
              Awesome Projects By An Awesomer Guy
            </h1>
            <p className="text-[clamp(1rem,1.3vw,1.5rem)] font-helvetica p-5 rounded bg-[#dbdbdb] flex flex-col">
              Check out these awesome computer design projects, along wih other things I've done!
              <br /> <br />
              <Link to="/projects">
                <button className="bg-[#394552] text-white w-full text-[clamp(1rem,1.3vw,1.5rem)] font-roboto p-2 rounded cursor-pointer mt-4">
                  &gt;&gt;Learn More
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-row items-center justify-center w-full min-h-[100vh] max-w-full px-12 py-0 sticky top-[4vh] z-10 bg-white mb-[2vh]">
          <div className="flex flex-col items-center flex-grow mx-[2vw] z-10">
            <h1 className="text-[clamp(2.5rem,3vw,4rem)] font-roboto w-full p-4 rounded bg-[#dbdbdb] mb-[6vh] -rotate-2">
              My Amazing Work Experience
            </h1>
            <p className="text-[clamp(1rem,1.3vw,1.5rem)] font-helvetica p-5 rounded bg-[#dbdbdb] flex flex-col">
              I have worked at many places, including a few internships. Check out my work experience and see how awesome I am!
              <br /> <br />
              <Link to="/jobs">
                <button className="bg-[#394552] text-white w-full text-[clamp(1rem,1.3vw,1.5rem)] font-roboto p-2 rounded cursor-pointer mt-4">
                  &gt;&gt;Learn More
                </button>
              </Link>
            </p>
          </div>
          <div className="flex flex-col justify-center w-[35%] pl-4">
            <img src={linkedinPfp} alt="Michael Tahirovic" className="object-contain rounded-2xl w-full" />
            <div className="w-full h-4 mt-8 bg-black opacity-10 rounded-[100px] shadow" />
          </div>
        </div>

        {/* Blog Section */}
        <div className="flex flex-col items-center w-full min-h-[90vh] bg-[#383f41] pt-0 pb-8 mt-8 relative z-10">
          <div className="w-full text-center bg-[#474650] mb-12 sticky top-[7vh] z-10">
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

        {/* Footer */}
        <footer className="flex justify-center items-center w-full h-16 bg-[#3a3941] text-[#97a4b1] z-10 mt-8">
          <div className="text-center">
            <p className="inline-block align-middle">
              Copyright <span className="font-bold">Michael Enterprises 2025</span>
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
}

