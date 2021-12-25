import Image from "next/image";
import Link from "next/link";

function ArtistCard({ artist }) {
  const { name, slug, shortInfo, thumbnail, releaseName, year, spotify } = artist.fields;
  return (
    <div className="bg-red-100 text-gray-700 mb-10 border-8 border-blue-200">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          // width={700}
          // height={700}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
        <div className="mt-4">
          <span className="text-xl ml-4">{name}</span>
          <span className="text-xl"> // {releaseName}</span>
          <span className="text-xl"> // {year}</span>
          <p className="h-32 mx-4">{shortInfo}</p>
          <iframe src={`${spotify}`} width="100%" height="280" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
          </div>
    </div>
  );
}

export default ArtistCard;
