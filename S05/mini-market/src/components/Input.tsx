import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.space(1)};
  min-width: 220px;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space(2.5)} ${({ theme }) => theme.space(3)};
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus {
  border-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
}

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <Field htmlFor={inputId}>
      {label && <Label>{label}</Label>}
      <StyledInput ref={ref} id={inputId} {...props} />
    </Field>
  );
});