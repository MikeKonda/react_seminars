import styled, { css } from 'styled-components';
import type { ReactNode } from 'react';

type BadgeTone = 'new' | 'neutral' | 'sale';

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

const StyledBadge = styled.span<{ $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.space(6)};
  padding: 0 ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  white-space: nowrap;

  ${({ $tone, theme }) => {
    if ($tone === 'new') {
      return css`
        background: ${theme.colors.badgeBg};
        color: ${theme.colors.badgeText};
      `;
    }

    if ($tone === 'sale') {
      return css`
        background: ${theme.colors.danger};
        color: ${theme.colors.onDanger};
      `;
    }

    return css`
      background: ${theme.colors.surfaceAlt};
      color: ${theme.colors.textMuted};
    `;
  }}
`;

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <StyledBadge $tone={tone}>{children}</StyledBadge>;
}