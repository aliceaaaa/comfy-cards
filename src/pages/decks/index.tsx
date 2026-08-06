import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Page, Panel } from '../../components';
import { useDecks } from '../../hooks/use-decks';
import { cardsLabel } from '../../lib/plural';
import { setDocumentMeta } from '../../lib/meta';
import styles from './decks.module.scss';

export const DecksPage = () => {
  const { decks, deleteDeck } = useDecks();
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentMeta({
      title: 'Comfy cards',
      description: 'Карточки для запоминания слов',
    });
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Удалить колоду «${title}»?`)) {
      return;
    }

    deleteDeck(id);
  };

  return (
    <Page title="Колоды" subtitle="Наборы слов для запоминания">
      <Button
        size="lg"
        fullWidth
        onClick={() => {
          navigate('/decks/new');
        }}
      >
        Новая колода
      </Button>

      {decks.length === 0 ? (
        <Panel>
          <p className={styles.empty}>
            Пока пусто. Создайте колоду — и слова превратятся в карточки.
          </p>
        </Panel>
      ) : (
        <ul className={styles.list}>
          {decks.map((deck) => (
            <li key={deck.id}>
              <Panel>
                <div className={styles.head}>
                  <h2 className={styles.title}>{deck.title}</h2>
                  <span className={styles.count}>
                    {cardsLabel(deck.cards.length)}
                  </span>
                </div>
                <div className={styles.actions}>
                  <Button
                    disabled={deck.cards.length === 0}
                    onClick={() => {
                      navigate(`/decks/${deck.id}/study`);
                    }}
                  >
                    Учить
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigate(`/decks/${deck.id}/edit`);
                    }}
                  >
                    Изменить
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleDelete(deck.id, deck.title);
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
};
