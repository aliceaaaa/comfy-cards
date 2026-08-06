import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FlashCard,
  Page,
  Panel,
  Progress,
  Segmented,
  WordPairList,
} from '../../components';
import { SegmentedOption } from '../../components/segmented';
import { useDeck } from '../../hooks/use-decks';
import { useStudySession } from '../../hooks/use-study-session';
import { cardsLabel } from '../../lib/plural';
import { setDocumentMeta } from '../../lib/meta';
import { CardSide } from '../../types';
import styles from './study.module.scss';

const sideOptions: SegmentedOption<CardSide>[] = [
  { value: 'original', label: 'Оригинал' },
  { value: 'translation', label: 'Перевод' },
];

export const StudyPage = () => {
  const { id } = useParams();
  const deck = useDeck(id);
  const session = useStudySession();

  const [side, setSide] = useState<CardSide>('original');
  const [shuffleCards, setShuffleCards] = useState(true);

  useEffect(() => {
    setDocumentMeta({ title: deck ? deck.title : 'Тренировка' });
  }, [deck]);

  if (deck === undefined) {
    return <Page title="Загрузка…">{null}</Page>;
  }

  if (deck === null) {
    return (
      <Page title="Колода не найдена" backTo="/" backLabel="К колодам">
        <Panel>
          <p>Возможно, её удалили.</p>
        </Panel>
      </Page>
    );
  }

  const { currentCard } = session;
  const isFrontOriginal = side === 'original';

  if (!session.isStarted) {
    return (
      <Page
        title={deck.title}
        subtitle={cardsLabel(deck.cards.length)}
        backTo="/"
        backLabel="К колодам"
      >
        <Panel title="Настройки тренировки">
          <div className={styles.setting}>
            <span className={styles.settingLabel}>Показывать сначала</span>
            <Segmented
              ariaLabel="Сторона карточки"
              options={sideOptions}
              value={side}
              onChange={setSide}
            />
          </div>
          <Checkbox
            label="Перемешать карточки"
            checked={shuffleCards}
            onChange={setShuffleCards}
          />
        </Panel>

        <Button
          size="lg"
          fullWidth
          disabled={deck.cards.length === 0}
          onClick={() => {
            session.start(deck.cards, shuffleCards);
          }}
        >
          Начать
        </Button>
      </Page>
    );
  }

  if (session.isFinished) {
    const wrongCount = session.wrongCards.length;
    const rightCount = session.totalCount - wrongCount;

    return (
      <Page
        title="Сессия закончена"
        subtitle={`Правильно ${rightCount} из ${session.totalCount}`}
        backTo="/"
        backLabel="К колодам"
      >
        <Panel title={wrongCount > 0 ? 'Ошибки' : 'Ошибок нет'}>
          <WordPairList
            cards={session.wrongCards}
            emptyText="Вся колода пройдена без ошибок."
          />
        </Panel>

        <div className={styles.actions}>
          {wrongCount > 0 ? (
            <Button
              size="lg"
              onClick={() => {
                session.start(session.wrongCards, shuffleCards);
              }}
            >
              Повторить ошибки
            </Button>
          ) : null}
          <Button
            variant="secondary"
            onClick={() => {
              session.start(deck.cards, shuffleCards);
            }}
          >
            Пройти заново
          </Button>
          <Button variant="ghost" onClick={session.reset}>
            К настройкам
          </Button>
        </div>
      </Page>
    );
  }

  return (
    <Page title={deck.title} backTo="/" backLabel="К колодам">
      <Progress
        value={session.doneCount}
        max={session.totalCount}
        caption={`Ошибок: ${session.wrongCards.length}`}
      />

      {currentCard ? (
        <FlashCard
          front={isFrontOriginal ? currentCard.original : currentCard.translation}
          back={isFrontOriginal ? currentCard.translation : currentCard.original}
          backCaption={isFrontOriginal ? 'перевод' : 'оригинал'}
          flipped={session.flipped}
          onFlip={session.flip}
        />
      ) : null}

      <div className={styles.answers}>
        <Button
          variant="danger"
          size="circle"
          aria-label="Не угадал"
          onClick={() => {
            session.answer(false);
          }}
        >
          ✕
        </Button>
        <Button
          variant="success"
          size="circle"
          aria-label="Угадал"
          onClick={() => {
            session.answer(true);
          }}
        >
          ✓
        </Button>
      </div>

      <Button variant="ghost" onClick={session.reset}>
        Прервать сессию
      </Button>
    </Page>
  );
};
