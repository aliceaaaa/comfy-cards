import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Page,
  Panel,
  TextArea,
  TextField,
  WordPairList,
} from '../../components';
import { useDeck } from '../../hooks/use-decks';
import { buildCards, parseWords } from '../../lib/parse-words';
import { createId } from '../../lib/id';
import { saveDeck } from '../../lib/storage';
import { cardsLabel } from '../../lib/plural';
import { setDocumentMeta } from '../../lib/meta';
import styles from './deck-form.module.scss';

const HINT =
  'Есть запятые — слово это всё до запятой (можно «der Hund»). Нет — каждое слово с новой строки или через пробел.';

export const DeckFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deck = useDeck(id);

  const [title, setTitle] = useState('');
  const [originalsRaw, setOriginalsRaw] = useState('');
  const [translationsRaw, setTranslationsRaw] = useState('');

  useEffect(() => {
    if (!deck) {
      return;
    }

    setTitle(deck.title);
    setOriginalsRaw(
      deck.cards
        .map((card) => {
          return card.original;
        })
        .join('\n'),
    );
    setTranslationsRaw(
      deck.cards
        .map((card) => {
          return card.translation;
        })
        .join('\n'),
    );
  }, [deck]);

  useEffect(() => {
    setDocumentMeta({ title: id ? 'Редактирование колоды' : 'Новая колода' });
  }, [id]);

  const originalsCount = parseWords(originalsRaw).length;
  const translationsCount = parseWords(translationsRaw).length;

  const cards = useMemo(() => {
    return buildCards(originalsRaw, translationsRaw);
  }, [originalsRaw, translationsRaw]);

  const isMismatched =
    originalsCount !== translationsCount &&
    originalsCount > 0 &&
    translationsCount > 0;
  const isTitleEmpty = title.trim().length === 0;
  const canSave = !isTitleEmpty && cards.length > 0;

  /** Кнопка не должна молча гаснуть — объясняем, чего не хватает. */
  const getBlockReason = () => {
    if (isTitleEmpty) {
      return 'Чтобы сохранить, заполните название колоды.';
    }

    if (cards.length === 0) {
      return 'Чтобы сохранить, добавьте слова в оба поля.';
    }

    return '';
  };

  const handleSave = () => {
    if (!canSave) {
      const fieldId = isTitleEmpty ? 'deck-title' : 'deck-originals';

      document.getElementById(fieldId)?.focus();
      return;
    }

    saveDeck({
      id: deck?.id ?? createId(),
      title: title.trim(),
      cards,
      createdAt: deck?.createdAt ?? Date.now(),
    });

    navigate('/');
  };

  if (id && deck === null) {
    return (
      <Page title="Колода не найдена" backTo="/" backLabel="К колодам">
        <Panel>
          <p>Возможно, её удалили.</p>
        </Panel>
      </Page>
    );
  }

  return (
    <Page
      title={id ? 'Редактирование колоды' : 'Новая колода'}
      subtitle="Слова сопоставляются по порядку: первое с первым, второе со вторым."
      backTo="/"
      backLabel="К колодам"
    >
      <Panel>
        <TextField
          id="deck-title"
          label="Название колоды"
          placeholder="Например: Еда"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <div className={styles.columns}>
          <TextArea
            id="deck-originals"
            label="Оригинал"
            rows={10}
            placeholder={'der Hund\ndas Brot\nsich freuen'}
            hint={`Сейчас: ${originalsCount}`}
            value={originalsRaw}
            onChange={(event) => {
              setOriginalsRaw(event.target.value);
            }}
          />
          <TextArea
            id="deck-translations"
            label="Перевод"
            rows={10}
            placeholder={'собака\nхлеб\nрадоваться'}
            hint={`Сейчас: ${translationsCount}`}
            value={translationsRaw}
            onChange={(event) => {
              setTranslationsRaw(event.target.value);
            }}
          />
        </div>
        <p className={styles.hint}>{HINT}</p>
        {isMismatched ? (
          <p className={styles.warning}>
            Слов не поровну: {originalsCount} и {translationsCount}. Лишние в
            конце списка не попадут в колоду.
          </p>
        ) : null}
      </Panel>

      <Panel title={`Получится ${cardsLabel(cards.length)}`}>
        <WordPairList cards={cards} emptyText="Добавьте слова в оба поля." />
      </Panel>

      <div className={styles.actions}>
        <Button size="lg" onClick={handleSave}>
          Сохранить
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            navigate('/');
          }}
        >
          Отмена
        </Button>
        {canSave ? null : (
          <span className={styles.warning}>{getBlockReason()}</span>
        )}
      </div>
    </Page>
  );
};
