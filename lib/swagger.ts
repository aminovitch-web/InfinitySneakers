import fs from "fs";
import path from "path";
import { createSwaggerSpec } from "next-swagger-doc";
import yaml from "yaml";

export const getApiDocs = async () => {
  if (process.env.NODE_ENV !== "development") {
    return {}; // Return an empty spec or handle appropriately
  }

  // Read and parse the YAML file
  const filePath = path.resolve(process.cwd(), "swagger.yaml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const swaggerDefinition = yaml.parse(fileContents);

  const spec = createSwaggerSpec({
    apiFolder: "app/api", // define api folder under app folder
    definition: swaggerDefinition,
  });

  return spec;
};
