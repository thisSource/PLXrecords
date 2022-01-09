import MixBackground from "../components/index/MixBackground";

export async function getStaticProps() {
  const res = await fetch("https://api.mixcloud.com/plxplxplx/cloudcasts/");
  const data = await res.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data } // will be passed to the page component as props
  };
}

function Mix(props) {
  let mixTape = props.data.data;
  console.log(mixTape);
  return (
    <div className="bg-red-200 grid lg:grid-cols-2 gap-10">
      <div className="w-full py-40 lg:mx-40">
        {mixTape.map((mix) => (
          <div className="py-4">
            <iframe
              className="bg-gray-300"
              width="100%"
              height="140"
              src={`https://api.mixcloud.com${mix.key}embed-html/`}
              frameborder="0"
            ></iframe>
          </div>
        ))}
      </div>
      <div className="lg:py-44 lg:ml-64 lg:mr-52 mb-10 lg:text-3xl text-blue-300">
      <MixBackground />

        {/* <iframe
                      className="bg-gray-300"

          width="200"
          height="250"
          src="https://www.mixcloud.com/widget/follow/?u=%2Fplxplxplx%2F"
          frameborder="0"
        ></iframe> */}
      </div>
    </div>
  );
}

export default Mix;
