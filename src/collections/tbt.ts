import { buildSchema, buildCollection } from "@camberi/firecms";
import { lessonCollection } from "./lesson";

type TBT = {
  title: string;
  orderNumber: number;
};

const tbtSchema = buildSchema<TBT>({
  name: "TBT Title",
  properties: {
    title: {
      title: "Title",
      dataType: "string",
      validation: {
        min: 2,
      },
    },
    orderNumber: {
      title: "Number (order)",
      dataType: "number",
      validation: {
        min: 1,
        max: 999,
      },
    },
  },
});

export const tbtCollection = buildCollection({
  name: "TBT",
  path: "tbt",
  schema: tbtSchema,
  subcollections: [lessonCollection],
});
