import { buildSchema, buildCollection } from "@camberi/firecms";

type ResourceType = {
  title: string;
};

const resourceTypeSchema = buildSchema<ResourceType>({
  name: "Resource Type",
  properties: {
    title: {
      title: "Title",
      dataType: "string",
      validation: {
        min: 2,
      },
    },
  },
});

export const resourceTypeCollection = buildCollection({
  name: "Resource Type",
  path: "resource-type",
  schema: resourceTypeSchema,
});
