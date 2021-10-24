import { buildSchema, buildCollection } from "@camberi/firecms";
import { nanoid } from "nanoid";
import { lessonResourceCollection } from "./lessonResource";

type Lesson = {
  title: string;
  image: string;
};

const lessonSchema = buildSchema<Lesson>({
  name: "Lesson",
  properties: {
    title: {
      title: "Lesson title",
      dataType: "string",
      validation: {
        min: 1,
      },
    },
    image: {
      title: "Image",
      description: "Image of the Lesson, upload it here",
      dataType: "string",
      config: {
        storageMeta: {
          mediaType: "image",
          storagePath: "images/tbt/lessons",
          acceptedFiles: ["image/*"],
          fileName: () => nanoid(),
        },
      },
    },
  },
});

export const lessonCollection = buildCollection({
  name: "Lesson",
  path: "lessons",
  schema: lessonSchema,
  subcollections: [lessonResourceCollection],
});
