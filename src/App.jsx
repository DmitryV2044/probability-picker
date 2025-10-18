import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import EventItem from './components/EventItem';
import AddEventButton from './components/AddEventButton';
import ProbabilityPicker from './components/ProbabilityPicker';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  // Загрузка событий из URL при монтировании
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventsParam = params.get('events');
    
    if (eventsParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(eventsParam));
        setEvents(decoded);
      } catch (e) {
        console.error('Ошибка загрузки из URL:', e);
        initializeDefaultEvents();
      }
    } else {
      initializeDefaultEvents();
    }
  }, []);

  // Инициализация событий по умолчанию
  const initializeDefaultEvents = () => {
    setEvents([
      { id: Date.now() + 1, name: 'Событие 1', probability: 0.5 },
      { id: Date.now() + 2, name: 'Событие 2', probability: 0.3 },
      { id: Date.now() + 3, name: 'Событие 3', probability: 0.2 },
    ]);
  };

  // Сохранение событий в URL при изменении
  useEffect(() => {
    if (events.length > 0) {
      const params = new URLSearchParams();
      params.set('events', encodeURIComponent(JSON.stringify(events)));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [events]);

  const addEvent = () => {
    const newEvent = {
      id: Date.now(),
      name: `Событие ${events.length + 1}`,
      probability: 0,
    };
    setEvents([...events, newEvent]);
    setSelectedResult(null);
  };

  const updateEvent = (id, updates) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
    setSelectedResult(null);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setSelectedResult(null);
  };

  const pickRandomEvent = () => {
    if (events.length === 0) return;

    // Weighted random selection
    const random = Math.random();
    let cumulative = 0;

    for (const event of events) {
      cumulative += event.probability;
      if (random <= cumulative) {
        setSelectedResult(event);
        return;
      }
    }

    // Fallback на последнее событие
    setSelectedResult(events[events.length - 1]);
  };

  const totalProbability = events.reduce((sum, event) => sum + event.probability, 0);
  const canPick = events.length > 0 && Math.abs(totalProbability - 1) < 0.001;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
            235 probability
          </h1>
          <p className="text-white/60 text-lg">
            Создайте события с вероятностями и выберите случайное
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Events Section */}
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📋</span>
              События
            </h2>
            
            <div className="space-y-3">
              <AnimatePresence>
                {events.map(event => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onUpdate={updateEvent}
                    onDelete={deleteEvent}
                  />
                ))}
              </AnimatePresence>
            </div>

            <AddEventButton onClick={addEvent} />
          </div>

          {/* Picker Section */}
          <div className="space-y-4">
            <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🎲</span>
              Выбор
            </h2>

            <ProbabilityPicker
              onClick={pickRandomEvent}
              disabled={!canPick}
              totalProbability={totalProbability}
            />

            <ResultDisplay result={selectedResult} />

            {/* Info Box */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-white/60 text-sm">
              <p className="mb-2">
                {/* <strong>Совет:</strong> Сумма всех вероятностей должна быть равна 1.0 */}
              </p>
              <p>
                🔗 Все настройки сохраняются в URL - поделитесь ссылкой!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
