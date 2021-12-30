import Image from "next/image";
import Link from "next/link";

function ArtistCard({ artist }) {
  const {
    name,
    slug,
    shortInfo,
    thumbnail,
    releaseName,
    year,
    website,
    spotify,
    bandcamp
  } = artist.fields;

  console.log(bandcamp);

  return (
    <div className="bg-red-100 text-gray-700 mb-10 border-8 border-blue-200">
      <Image
        src={"https:" + thumbnail.fields.file.url}
        width={thumbnail.fields.file.details.image.width}
        height={thumbnail.fields.file.details.image.height}
      />
      <div className="mt-4">
        <span className="text-xl ml-4">{name}</span>
        <span className="text-xl"> // {releaseName}</span>
        <p className="text-xl ml-4">{year}</p>
        <p className="h-32 mx-4">{shortInfo}</p>

        {bandcamp != undefined ? (
          <div>
            <a
              target="_blank"
              href={`${bandcamp}`}
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-red-100 border-2 border-black border-dashed py-4 mb-4 mx-10 rounded-md text-xl font-semibold hover:bg-gray-300"
            >
              visit {name} on Bandcamp
            </a>
          </div>
        ) : (
          <div>
            <a
              target="_blank"
              href={`https://plxrecords.bandcamp.com/`}
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-red-100 border-2 border-black border-dashed py-4 mb-4 mx-10 rounded-md text-xl font-semibold hover:bg-gray-300"
            >
              visit PLX Records on Bandcamp
            </a>
          </div>
        )}

        {spotify != undefined ? (
          <iframe
            src={`${spotify}`}
            width="100%"
            height="170"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        ) : (
          <div>
            <a
              target="_blank"
              href={`${website}`}
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-red-100 border-2 border-black border-dashed py-12 mx-10 rounded-md text-xl font-semibold hover:bg-gray-300"
            >
              visit {name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistCard;
