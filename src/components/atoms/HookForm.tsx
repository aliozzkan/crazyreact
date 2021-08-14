import React, {
  forwardRef,
  useImperativeHandle,
  useContext,
  createContext,
  PropsWithChildren,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  RegisterOptions,
  Message,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import {
  Checkbox,
  ComponentWithAs,
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";

type FormProps = PropsWithChildren<{
  onValid: any;
  onChange?: (data: {fieldName: string, fieldValue: string}) => void
}>;

export interface FormHandles {
  setValue: UseFormSetValue<FieldValues>;
  submit: () => void;
}

const FormContext = createContext<{ control: any }>({ control: null });

export const Form = forwardRef<FormHandles, FormProps>((props, ref) => {
  const { control, handleSubmit, setValue, watch,  } = useForm();
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    setValue: setValue,
    submit: handleSubmit(onValid)
  }));

  const onValid: SubmitHandler<any> = (values) => {
    if (props.onValid) {
      props.onValid(values);
    }
  };

  useEffect(() => {
    console.log()
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onValid)} ref={formRef}>
      <FormContext.Provider value={{ control }}>
        {props.children}
      </FormContext.Provider>
    </form>
  );
});

interface FormWrapperProps {
  label?: string;
  errorMessage?: Message;
}

export function FormWrapper({
  children,
  label,
  errorMessage,
  ...formControlProps
}: PropsWithChildren<FormWrapperProps> & FormControlProps) {
  return (
    <FormControl {...formControlProps}>
      {!!label && <FormLabel>{label}</FormLabel>}
      {children}
      {!!errorMessage && Array.isArray(errorMessage) ? (
        <VStack>
          {errorMessage.map((message) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          ))}
        </VStack>
      ) : (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
}

interface FormElement extends FormWrapperProps {
  name: string;
  defaultValue: string;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
}

type InputElementProps = FormElement &
  InputProps & {
    containerProps?: FormControlProps;
  };

export function InputElement({
  label,
  name,
  rules,
  isRequired,
  containerProps,
  defaultValue,
  ...inputProps
}: InputElementProps) {
  const { control } = useContext(FormContext);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ""}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormWrapper
          label={label}
          isRequired={isRequired}
          errorMessage={fieldState.error?.message}
          {...containerProps}
          isInvalid={fieldState.invalid}
        >
          <Input {...inputProps} {...field} />
        </FormWrapper>
      )}
    />
  );
}

type SelectElementProps = FormElement &
  InputProps & {
    containerProps?: FormControlProps;
  } & { data: any };

export function SelectElement({
  label,
  data,
  rules,
  name,
  isRequired,
  defaultValue,
  containerProps,
}: SelectElementProps) {
  const { control } = useContext(FormContext);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? "-1"}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormWrapper
          label={label}
          errorMessage={fieldState.error?.message}
          {...containerProps}
          isInvalid={fieldState.invalid}
          isRequired={isRequired}
        >
          <Select
            borderRadius="sm"
            {...field}
            disabled={!data || data.length < 0}
          >
            <option value={"-1"}>{label} seçiniz...</option>
            {!!data &&
              data.map((item: any) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
          </Select>
        </FormWrapper>
      )}
    />
  );
}

export function FileElement({ label, name, isRequired }: any) {
  const { control } = useContext(FormContext);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      rules={{}}
      render={({ field }) => (
        <FormWrapper label={label} isRequired={isRequired}>
          <Input
            type="file"
            borderRadius="sm"
            {...field}
            placeholder={`${label} giriniz...`}
          />
        </FormWrapper>
      )}
    />
  );
}

export function CheckBoxElement({ label, name, defaultValue }: any) {
  const { control } = useContext(FormContext);

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

InputElement.defaultProps = {
  defaultValue: "",
};
SelectElement.defaultProps = {
  defaultValue: "",
};
FileElement.defaultProps = {
  defaultValue: null,
};
CheckBoxElement.defaultProps = {
  defaultValue: false,
};
