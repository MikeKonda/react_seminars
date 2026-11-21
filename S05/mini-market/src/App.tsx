import { useMemo, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { Grid } from './components/Grid';
import { Input } from './components/Input';
import { ProductCard } from './components/ProductCard';
import type { Product } from './components/ProductCard';
import { useThemeMode } from './hooks/useThemeMode';
import { GlobalStyle } from './styles/GlobalStyle';
import { darkTheme, lightTheme } from './theme/theme';

const products: Product[] = [
  {
    id: '1',
    title: 'Кружка «Код»',
    description: 'Керамическая кружка для долгих ревью.',
    price: 990,
    category: 'Кухня',
    isNew: true,
    emoji: '☕',
  },
  {
    id: '2',
    title: 'Худи «Frontend»',
    description: 'Мягкое худи с принтом для холодных спринтов.',
    price: 3490,
    category: 'Одежда',
    emoji: '🧥',
  },
  {
    id: '3',
    title: 'Стикеры «React»',
    description: 'Набор виниловых стикеров для ноутбука.',
    price: 490,
    category: 'Аксессуары',
    emoji: '⚛️',
  },
  {
    id: '4',
    title: 'Блокнот «Sprint»',
    description: '100 страниц для планов и ретро.',
    price: 790,
    category: 'Канцелярия',
    isNew: true,
    emoji: '📒',
  },
  {
    id: '5',
    title: 'Лампа «Debug»',
    description: 'Тёплый свет для вечерних баг-фиксов.',
    price: 2190,
    category: 'Кухня',
    emoji: '💡',
  },
  {
    id: '6',
    title: 'Рюкзак «Deploy»',
    description: 'Вмещает ноутбук, наушники и термос.',
    price: 4590,
    category: 'Аксессуары',
    emoji: '🎒',
  },
];

const Page = styled.div`
  min-height: 100vh;
`;

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space(6)} ${({ theme }) => theme.space(4)};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.space(6)};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

const Subtitle = styled.p`
  margin: ${({ theme }) => theme.space(1)} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Toolbar = styled.div`
  display: flex;
  align-items: end;
  gap: ${({ theme }) => theme.space(3)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.space(4)};
`;

const Chips = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.space(5)};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
`;

const Empty = styled.div`
  padding: ${({ theme }) => theme.space(10)} ${({ theme }) => theme.space(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

function App() {
  const { mode, toggle } = useThemeMode();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(() => new Set());

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === 'all' || product.category === category;
      const matchesQuery = product.title
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const handleAdd = (id: string) => {
    setLoadingIds((prev) => new Set(prev).add(id));

    window.setTimeout(() => {
      setLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setCartCount((count) => count + 1);
    }, 700);
  };

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />

      <Page>
        <Container>
          <Header>
            <div>
              <Title>Мини-маркет</Title>
              <Subtitle>UI-кит с темами на styled-components</Subtitle>
            </div>

            <Actions>
              <Badge tone="neutral">Корзина: {cartCount}</Badge>
              <Button variant="outline" onClick={toggle}>
                {mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
              </Button>
            </Actions>
          </Header>

          <Toolbar>
            <Input
              label="Поиск"
              placeholder="Найти товар..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Toolbar>

          <Chips>
            {categories.map((item) => (
              <Button
                key={item}
                size="sm"
                variant={category === item ? 'primary' : 'secondary'}
                onClick={() => setCategory(item)}
              >
                {item === 'all' ? 'Все' : item}
              </Button>
            ))}
          </Chips>

          {filtered.length === 0 ? (
            <Empty>
              Ничего не найдено. Попробуйте изменить запрос или категорию.
            </Empty>
          ) : (
            <Grid>
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  loading={loadingIds.has(product.id)}
                  onAdd={handleAdd}
                />
              ))}
            </Grid>
          )}
        </Container>
      </Page>
    </ThemeProvider>
  );
}

export default App;