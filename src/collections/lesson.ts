import { buildSchema, buildCollection } from "@camberi/firecms";
import { lessonResourceCollection } from "./lessonResource";
import { colors } from "../utils/styles";
import { SelectColor } from "../components/fields/SelectColor";

type Lesson = {
  title: string;
  number: number;
  color: string;
};

const lessonSchema = buildSchema<Lesson>({
  name: "Lesson",
  properties: {
    title: {
      title: "Title",
      dataType: "string",
      validation: {
        min: 1,
      },
    },
    number: {
      title: "Lesson Number",
      dataType: "number",
      validation: {
        min: 1,
        max: 999,
      },
    },
    color: {
      title: "Color",
      dataType: "string",
      config: {
        enumValues: colors,
        Field: SelectColor,
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
