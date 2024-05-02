export interface ButtonProps {
  onClick?: () => void;
  iconComponent?: JSX.Element;
  text: string;
  disabled?: boolean;
  buttonClass?: 'primary' | '';
  $ariaLabel?: string;
  ariaLabel?: string;
  dataTestid?: string;
}
export type StyledButtonProps = Omit<ButtonProps, 'buttonType'> & {
  className?: 'primary' | '';
};
