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
        setSelectedResult({ ...event, timestamp: Date.now() });
        return;
      }
    }

    // Fallback на последнее событие
    setSelectedResult({ ...events[events.length - 1], timestamp: Date.now() });
  };

  const totalProbability = events.reduce((sum, event) => sum + event.probability, 0);
  const canPick = events.length > 0 && Math.abs(totalProbability - 1) < 0.001;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 mb-4 mt-8 tracking-wider uppercase" style={{ fontFamily: 'serif' }}>
            235 probability
          </h1>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-600"></div>
            <div className="w-2 h-2 bg-amber-500 rotate-45"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
          <p className="text-slate-400 text-sm uppercase tracking-widest">
            Вероятностный селектор событий
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Events Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border-2 border-amber-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-500"></div>
              </div>
              <h2 className="text-amber-400 text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
                События
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-600 to-transparent"></div>
            </div>
            
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border-2 border-amber-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-500 rotate-45"></div>
              </div>
              <h2 className="text-amber-400 text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
                Выбор
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-600 to-transparent"></div>
            </div>

            <ProbabilityPicker
              onClick={pickRandomEvent}
              disabled={!canPick}
              totalProbability={totalProbability}
            />

            <ResultDisplay result={selectedResult} />

            {/* Info Box */}
            <div className="relative border border-amber-600/30 bg-slate-800/50 p-6 mt-8">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500"></div>
              
              <p className="text-slate-400 text-xs uppercase tracking-wider text-center">
                Настройки сохраняются в URL, можно поделиться ссылкой с заполненными событиями или смело перезагружать случайно страницу
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
