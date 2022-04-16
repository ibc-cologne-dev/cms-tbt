import { InputLabel, MenuItem, Select } from "@mui/material";
import {
  FieldDescription,
  FieldProps,
  EnumType,
  LabelWithIcon,
} from "@camberi/firecms";
import { ColorChip } from "../preview/ColorChip";

type SelectProps<T extends EnumType> = FieldProps<T>;

export const SelectColor = <T extends EnumType>({
  property,
  value,
  name,
  setValue,
  error,
  isSubmitting,
}: SelectProps<T>) => {
  const enumValues = property.config?.enumValues! as Record<string, string>;
  console.log("enumValues", enumValues);

  return (
    <>
      <InputLabel id={`${name}-select-label`}>
        <LabelWithIcon property={property} />
      </InputLabel>

      <Select
        required={property.validation?.required}
        error={!!error}
        disabled={isSubmitting}
        label={property.title}
        value={value?.toString() ?? ""}
        onChange={(evt: any) => {
          setValue(evt.target.value);
        }}
        fullWidth
        variant={"filled"}
        renderValue={(enumKey: string) => {
          return <ColorChip enumKey={enumKey} enumValues={enumValues} />;
        }}
      >
        {Object.keys(enumValues).map((key) => {
          console.log("key", key);
          return (
            <MenuItem key={`select_${name}_${key}`} value={key}>
              <ColorChip enumKey={key} enumValues={enumValues} />
            </MenuItem>
          );
        })}
      </Select>

      <FieldDescription property={property} />
    </>
  );
};
