import { GroupBase, OptionProps } from "react-select";

import AsyncSelect from "react-select/async";



interface SearchSelectProps<T> {
  gettterFunction(keyword: string): Promise<any[]>;
  setValue: (value: any) => void;

  CustomOption?: (
    props: OptionProps<T, boolean, GroupBase<T>>
  ) => JSX.Element | null;
}

export function SearchSelect<T>({
  gettterFunction,
  setValue,
  CustomOption,
}: SearchSelectProps<T>) {


  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    setTimeout(async () => {
      callback(await gettterFunction(inputValue ?? " "));
    }, 200);
  };

  return (
    <AsyncSelect
      className="w-full"
      onChange={(res) => {
        // @ts-expect-error
        setValue(res.value);
      }}
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      components={CustomOption ? { Option: CustomOption } : undefined}
    />
  );
}
