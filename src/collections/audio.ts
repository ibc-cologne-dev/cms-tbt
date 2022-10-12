import { buildSchema, buildCollection } from "@camberi/firecms";

type Audio = {
  title: string;
  subtitle: string;
  file: string;
  audio_duration: number;
  number: number;
  artist: string;
  album: string;
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
    subtitle: {
      title: "Subtitle (ex: biblical passage)",
      dataType: "string",
      validation: {
        min: 2,
      },
    },
    number: {
      title: "Song Number",
      dataType: "number",
      validation: {
        min: 1,
        max: 999,
      },
    },
    album: {
      title: "Album",
      description: "Album",
      dataType: "string",
      validation: {
        required: true,
      },
      config: {
        enumValues: {
          Genesis: "Genesis",
          Exodus: "Exodus",
          Acts: "Acts",
          Ephesians: "Ephesians",
        },
      },
    },
    file: {
      title: "File",
      description: "Audio file",
      dataType: "string",
      config: {
        storageMeta: {
          mediaType: "audio",
          storagePath: "audios",
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
          ["IBC Cologne"]: "IBC Cologne",
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
