import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Text,
  Flex,
  FormControlProps,
  FormErrorMessage,
} from "@chakra-ui/react";

const isRequiredOptions = (fieldName: string) => ({
  required: { value: true, message: `${fieldName} boş bırakılamaz!` },
});

export function FormWrapper({
  children,
  label,
  errorMessage,
  ...rest
}: FormControlProps & {
  children: any;
  label: string;
  errorMessage?: string | string[];
}) {
  return (
    <FormControl {...rest}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage>
        {Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}

export function SelectElement({
  control,
  label,
  data,
  isRequired,
  name,
  defaultValue,
}: any) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? undefined}
      rules={isRequired ? isRequiredOptions(label) : {}}
      render={({ field, fieldState, formState }) => {
        return (
          <FormWrapper
            label={label}
            isRequired={isRequired}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState?.error?.message}
          >
            <Select
              borderRadius="sm"
              {...field}
              disabled={!data || data.length < 0}
            >
              <option value={undefined}>{label} seçiniz...</option>
              {!!data &&
                data.map((item: any) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
            </Select>
          </FormWrapper>
        );
      }}
    />
  );
}

export function InputElement({
  control,
  label,
  name,
  defaultValue,
  isRequired,
  disabled,
  ...rest
}: any) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? null}
      rules={isRequired ? isRequiredOptions(label) : {}}
      render={({ field, fieldState }) => (
        <FormWrapper label={label} isRequired={isRequired} isInvalid={fieldState.invalid} errorMessage={fieldState?.error?.message}>
          <Input
            borderRadius="sm"
            placeholder={`${label} giriniz...`}
            {...field}
            required={false}
            disabled={disabled}
          />
        </FormWrapper>
      )}
    />
  );
}

export function FileElement({ control, label, name }: any) {
  return (
    <FormWrapper label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        rules={{}}
        render={({ field }) => (
          <Input
            type="file"
            borderRadius="sm"
            {...field}
            placeholder={`${label} giriniz...`}
          />
        )}
      />
    </FormWrapper>
  );
}
export function CheckBoxElement({ control, label, name, defaultValue }: any) {
  return (
    <FormWrapper label={label}>
      <Flex alignItems="center">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue ?? false}
          rules={{}}
          render={({ field }) => (
            <Checkbox
              borderRadius="sm"
              {...field}
              placeholder={`${label} giriniz...`}
            />
          )}
        />
        <Text ml="3">{label}</Text>
      </Flex>
    </FormWrapper>
  );
}
