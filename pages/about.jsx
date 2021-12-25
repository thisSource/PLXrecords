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
      </p>
      <AboutBackground />
     
    </div>
  );
}

export default About;
