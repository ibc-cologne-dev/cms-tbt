import { buildSchema, buildProperty, buildCollection } from "@camberi/firecms";
import { nanoid } from "nanoid";

import { lessonCollection } from "./lesson";

type TBT = {
  title: string;
  image: string;
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
    image: buildProperty({
      title: "Image",
      description: "Image to show as cover of the TBT",
      dataType: "string",
      config: {
        storageMeta: {
          mediaType: "image",
          storagePath: "images/tbt",
          acceptedFiles: ["image/*"],
          fileName: () => nanoid(),
        },
      },
    }),
  },
});

export const tbtCollection = buildCollection({
  name: "TBT",
  path: "tbt",
  schema: tbtSchema,
  subcollections: [lessonCollection],
});
