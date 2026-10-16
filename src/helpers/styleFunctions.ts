import {CommonButtonProps} from "@/types";

const getStyles = (variant: CommonButtonProps["variant"]) => {
  if (variant === 'primary') {
    return 'text-black bg-white hover:text-gray-500 hover:bg-gray-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'
  } else {
    return "text-white bg-black hover:text-black hover:bg-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
  }
};

export {
  getStyles
}
