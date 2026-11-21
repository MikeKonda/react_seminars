import styled from 'styled-components';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  isNew?: boolean;
  emoji: string;
}

interface ProductCardProps {
  product: Product;
  loading: boolean;
  onAdd: (id: string) => void;
}

const Media = styled.div`
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  margin-bottom: ${({ theme }) => theme.space(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Description = styled.p`
  margin: ${({ theme }) => theme.space(2)} 0 ${({ theme }) => theme.space(3)};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
`;

const Price = styled.strong`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

export function ProductCard({ product, loading, onAdd }: ProductCardProps) {
  return (
    <Card>
      <Media aria-hidden>{product.emoji}</Media>

      <Head>
        <Title>{product.title}</Title>
        {product.isNew && <Badge tone="new">Новинка</Badge>}
      </Head>

      <Description>{product.description}</Description>

      <Footer>
        <Price>{product.price.toLocaleString('ru-RU')} ₽</Price>
        <Button
          size="sm"
          loading={loading}
          onClick={() => onAdd(product.id)}
        >
          В корзину
        </Button>
      </Footer>
    </Card>
  );
}