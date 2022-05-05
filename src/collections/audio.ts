import { buildSchema, buildCollection } from "@camberi/firecms";

type Audio = {
  title: string;
  file: string;
  audio_duration: number;
  artist: string;
};

const audioSchema = buildSchema<Audio>({
  name: "Audio",
  properties: {
    title: {
      title: "Audio title",
      dataType: "string",
      validation: {
        min: 2,
      },
    },
    file: {
      title: "File",
      description: "Audio file",
      dataType: "string",
      config: {
        storageMeta: {
          mediaType: "audio",
          storagePath: "audio",
          acceptedFiles: ["audio/*"],
        },
      },
      validation: {
        required: true,
      },
    },
    audio_duration: {
      title: "Audio duration",
      description: "Duration of the audion in seconds",
      dataType: "number",
      validation: {
        required: true,
      },
    },
    artist: {
      title: "Artist",
      description: "Author ot the audio",
      dataType: "string",
      validation: {
        required: true,
      },
      config: {
        enumValues: {
          ibcCologne: "IBC Cologne",
        },
      },
    },
  },
});

export const audioCollection = buildCollection({
  name: "Audio",
  path: "audios",
  schema: audioSchema,
  inlineEditing: false,
});
