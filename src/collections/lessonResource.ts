import {
  buildSchema,
  buildCollection,
  buildProperty,
  EntityReference,
} from "@camberi/firecms";

type Lesson = {
  title: string;
  type: EntityReference;
  image_header: string;
  content: Array<any>;
};

const content = buildProperty({
  title: "Content",
  description: "Content of the lesson, must contain at least 1 resource",
  validation: { required: true },
  columnWidth: 400,
  dataType: "array",
  oneOf: {
    properties: {
      image: {
        title: "Image",
        description: "Image content, upload it here",
        dataType: "string",
        config: {
          storageMeta: {
            mediaType: "image",
            storagePath: "images/tbt/lessons",
            acceptedFiles: ["image/*"],
          },
        },
      },
      text: {
        title: "Text",
        description: "",
        dataType: "string",
        config: {
          markdown: true,
        },
      },
      video: {
        title: "Video",
        description: "Video content, place the url here",
        dataType: "string",
        validation: {
          url: true,
        },
        config: {
          url: true,
        },
      },
    },
  },
});

const lessonResourceSchema = buildSchema<Lesson>({
  name: "Lesson Resource",
  properties: {
    title: {
      title: "Lesson Resource Title",
      dataType: "string",
      validation: {
        min: 1,
      },
    },
    type: {
      title: "Type",
      dataType: "reference",
      path: "resource-type",
    },
    image_header: {
      title: "Image header",
      description: "Header image of the Lesson, upload it here",
      dataType: "string",
      config: {
        storageMeta: {
          mediaType: "image",
          storagePath: "images/tbt/lessons/lesson-resources",
          acceptedFiles: ["image/*"],
        },
      },
    },
    content,
  },
});

export const lessonResourceCollection = buildCollection({
  name: "Lesson Resource",
  path: "lesson-resources",
  schema: lessonResourceSchema,
});
