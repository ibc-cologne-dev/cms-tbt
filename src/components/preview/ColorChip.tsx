import makeStyles from "@mui/styles/makeStyles";
import { Chip, Theme } from "@mui/material";
import { EnumValuesChip } from "@camberi/firecms/dist/preview/components/CustomChip";

const useStyles = makeStyles<Theme, { customColor: string }>(() => ({
  root: ({ customColor }) => ({
    maxWidth: "100%",
    backgroundColor: customColor,
  }),
  label: {
    color: "#ffffff",
  },
}));

type ColorChipProps = Omit<
  React.ComponentProps<typeof EnumValuesChip>,
  "small"
>;

export const ColorChip: React.FC<ColorChipProps> = ({
  enumKey,
  enumValues,
}) => {
  // @ts-ignore
  const enumValue = enumValues[enumKey] as string;

  const { root, label } = useStyles({
    customColor: enumValue,
  });
  return (
    <Chip
      classes={{
        root,
        label,
      }}
      variant="filled"
      label={`${enumKey}: ${enumValue}`}
    />
  );
};
