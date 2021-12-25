import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "artists"
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug }
    };
  });

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "artists",
    "fields.slug": params.slug
  });

  return {
    props: { artists: items[0] },
    revalidate: 1
  };
};
export default function RecipeDetails({ artists }) {
  if (!artists) return <div>loading</div>;
  const { image, name, longInfo, album1, album2, spotify } =
    artists.fields;
  return (
    <div>
      <Image
        src={"https:" + image.fields.file.url}
        width={image.fields.file.details.image.width}
        height={image.fields.file.details.image.height}
      ></Image>
      <h2>{name}</h2>
      {/* <div className="info">
        <p>Take about {cookingTime} mins to cook</p>
        <h3>Ingredients: </h3>
        {ingredients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div> */}
      <div className="">
        <h3>About</h3>
        <div>{documentToReactComponents(longInfo)}</div>
      </div>
    </div>
  );
}
