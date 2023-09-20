import { useTheme } from "next-themes";
import tw_config_file from "../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
interface ThemeToggleProps {}

export function ThemeToggle({}: ThemeToggleProps) {
       const { theme, setTheme } = useTheme();
    const tw_config = resolveConfig(tw_config_file);
    const theme_list = tw_config.daisyui;
  return (
    <select
        data-choose-theme
        className=" min-w-xs select select-sm bg-secondary/60 pl-2 pr-0"
      >
        {theme_list.themes.map((theme) => {
          return (
            <option key={theme} value={theme} >
              {theme}
            </option>
          );
        })}
      </select>

  );
}
