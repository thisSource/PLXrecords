import { createClient } from "contentful";
import ArtistCard from "../components/ArtistCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  });

  const resArtist = await client.getEntries({
    content_type: "artists"
  });

  return {
    props: { artists: resArtist.items },
    revalidate: 1
  };
}

export default function Releases({ artists }) {
  return (
    <div className="pt-40 bg-gray-300">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-24 lg:mx-40">
        {artists.map((artist) => (
          <ArtistCard key={artist.sys.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
