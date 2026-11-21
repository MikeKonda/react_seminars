import styled from 'styled-components';

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space(4)};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.shadowHover};
    transform: translateY(-2px);
  }
`;