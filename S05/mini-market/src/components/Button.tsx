import styled, { css, keyframes } from 'styled-components';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $loading: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(1)};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  font-weight: 600;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  opacity: ${({ $loading }) => ($loading ? 0.75 : 1)};
  pointer-events: ${({ $loading }) => ($loading ? 'none' : 'auto')};

  ${({ $size, theme }) => {
    if ($size === 'sm') {
      return css`
        min-height: ${theme.space(8)};
        padding: 0 ${theme.space(3)};
        font-size: ${theme.fontSizes.sm};
      `;
    }

    if ($size === 'lg') {
      return css`
        min-height: ${theme.space(12)};
        padding: 0 ${theme.space(5)};
        font-size: ${theme.fontSizes.lg};
      `;
    }

    return css`
      min-height: ${theme.space(10)};
      padding: 0 ${theme.space(4)};
      font-size: ${theme.fontSizes.md};
    `;
  }}

  ${({ $variant, theme }) => {
    if ($variant === 'secondary') {
      return css`
        background: ${theme.colors.secondary};
        color: ${theme.colors.onSecondary};

        &:hover {
          background: ${theme.colors.secondaryHover};
        }
      `;
    }

    if ($variant === 'outline') {
      return css`
        background: transparent;
        color: ${theme.colors.text};
        border-color: ${theme.colors.border};

        &:hover {
          background: ${theme.colors.secondary};
        }
      `;
    }

    if ($variant === 'danger') {
      return css`
        background: ${theme.colors.danger};
        color: ${theme.colors.onDanger};

        &:hover {
          background: ${theme.colors.dangerHover};
        }
      `;
    }

    return css`
      background: ${theme.colors.primary};
      color: ${theme.colors.onPrimary};

      &:hover {
        background: ${theme.colors.primaryHover};
      }
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.disabledBg};
    color: ${({ theme }) => theme.colors.disabledText};
    border-color: ${({ theme }) => theme.colors.disabledBg};
  }

  ${({ $loading, theme }) =>
    $loading &&
    css`
      &::after {
        content: '';
        width: ${theme.space(3)};
        height: ${theme.space(3)};
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: ${spin} 0.7s linear infinite;
      }
    `}
`;

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}