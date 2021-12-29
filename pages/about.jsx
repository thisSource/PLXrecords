import AboutBackground from "../components/index/AboutBackground";

function About() {
  return (
    <div className="">
      <p className="absolute lg:my-80 my-60 lg:mx-80 p-10 bg-yellow-200">
        Genre- and norm breaking music, made and performed by boundary pushing
        artists.
        <a
          target="_blank"
          href="https://www.instagram.com/plxrecords/"
          rel="noopener noreferrer"
          className="flex flex-col items-center bg-yellow-100 border-2 border-black border-dashed py-4 m-20 rounded-md text-xl font-semibold hover:bg-gray-300"
        >
          Instagram
        </a>
      </p>

      <AboutBackground />
    </div>
  );
}

export default About;
