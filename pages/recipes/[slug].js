import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe"
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
    content_type: "recipe",
    "fields.slug": params.slug
  });

  return {
    props: { recipe: items[0] },
    revalidate: 1
  };
};
export default function RecipeDetails({ recipe }) {
  if(!recipe) return <div>loading</div>
  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;
  return (
    <div>
      <Image
        src={"https:" + featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      ></Image>
      <h2>{title}</h2>
      <div className="info">
        <p>Take about {cookingTime} mins to cook</p>
        <h3>Ingredients: </h3>
        {ingredients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>
      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
    </div>
  );
}
