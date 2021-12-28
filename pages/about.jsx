import AboutBackground from "../components/index/AboutBackground";

function About() {
  return (
    <div className="">
         <p className="absolute lg:my-80 my-60 lg:mx-80 p-10 bg-yellow-200">
        PLX records is a Läget inom sjukvården i Region Stockholm är ansträngt.
        Det beskedet var tydligt när regionen höll presskonferens dagen innan
        julafton. För tillfället vårdas 104 personer med covid-19 som behöver
        sjukhusvård. Av dessa är det 28 som intensivvåras. Dessutom är det
        ungefär lika många som behöver vård för säsongsinfluensan.

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
