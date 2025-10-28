
export default function Footer() {
  return (
    <div className="relative">
      <Socials />
      <footer className="flex justify-center items-center static full-width h-20 bg-headerColor text-headerFont z-50">
        <div className="flex flex-row items-center justify-center w-full">
            <p>Copyright<h1 className="font-bold"> Michael Tahirovic 2025</h1></p>
        </div>
      </footer>
    </div>
  );
}


function Socials() {
  const githubLogo = process.env.PUBLIC_URL + '/media/githubLogo.png';
  const linkedinLogo = process.env.PUBLIC_URL + '/media/linkedinLogo.png';
  const instagramLogo = process.env.PUBLIC_URL + '/media/instagramLogo.png';
  return (
    <div className="flex flex-col justify-center items-left w-full h-fit py-20 md:py-28 px-10 md:px-32 lg:px-60 xl:px-80 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 text-white z-50">
      <h1 className="text-6xl md:text-7xl font-bold font-roboto text-left">Connect with Michael</h1>
      <p className="text-xl md:text-2xl font-helvetica mt-4 text-left xl:text-center">Follow me on my social media accounts!</p>
      <div className="w-full h-1 ustify-self-center bg-white my-8"></div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <a href="https://github.com/MichaelTahirovic" className="size-3/4 md:w-1/3 flex flex-col items-center bg-buttonColor bg-opacity-35 hover:bg-opacity-100 rounded-3xl p-6 m-2 hover:bg-buttonHover transition-all duration-300">
          <div className="flex flex-col items-center justify-center size-3/4">
            <img src={githubLogo} alt="Michael's GitHub Page" className="block rounded-full" />
            <h1 className="text-xl text-white font-roboto mt-3">GitHub</h1>
          </div>
        </a>
        <span className="hidden md:block text-5xl mx-4">|</span>
        <a href="https://www.linkedin.com/in/michael-tahirovic/" className="size-3/4 md:w-1/3 flex flex-col items-center bg-buttonColor bg-opacity-35 hover:bg-opacity-100 rounded-3xl p-6 m-2 hover:bg-buttonHover transition-all duration-300">
          <div className="flex flex-col items-center justify-center size-3/4">
            <img src={linkedinLogo} alt="Michael's LinkedIn Page" className="block rounded-full" />
            <h1 className="text-xl font-roboto text-white mt-3">LinkedIn</h1>
          </div>
        </a>
        <span className="hidden md:block text-5xl mx-4">|</span>
        <a href="https://www.instagram.com/smoltoastyphotos" className="size-3/4 md:w-1/3 flex flex-col items-center bg-buttonColor bg-opacity-35 hover:bg-opacity-100 rounded-3xl p-6 m-2 hover:bg-buttonHover transition-all duration-300">
          <div className="flex flex-col items-center justify-center size-3/4">
            <img src={instagramLogo} alt="Michael's Photography Instagram Page" className="block rounded-full" />
            <h1 className="text-xl font-roboto text-white mt-3">Instagram</h1>
          </div>
        </a>
      </div>
    </div>
  );
}
