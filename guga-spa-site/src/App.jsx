import React, { useState } from 'react';
import { 
  Activity, Menu, MapPin, Calendar, Trophy, Flame, 
  Clock, ArrowLeft, Users, ListTree, Medal, CheckCircle2, 
  Map, Award, ChevronRight, Play
} from 'lucide-react';

// --- MOCK DATA ---
const mockEvents = [
  {
    id: 1,
    title: "Guga Futevôlei Cup - Etapa Formosa",
    date: "14 e 15 de Dezembro, 2026",
    location: "Arena Formosa - GO",
    categories: ["Aprendiz", "Iniciante", "Misto"],
    status: "open", // open, active, closed
    description: "A etapa final do circuito formosense de futevôlei reunindo as melhores duplas da região em dois dias intensos de competição.",
    registered: [
      { id: 1, team: "João & Marcelo", category: "Iniciante" },
      { id: 2, team: "Lucas & Pedro", category: "Aprendiz" },
      { id: 3, team: "Ana & Felipe", category: "Misto" },
      { id: 4, team: "Carlos & Eduardo", category: "Iniciante" }
    ],
    brackets: [
      { match: 1, team1: "João & Marcelo", team2: "Carlos & Eduardo", status: "Em breve", time: "Sáb 09:00" },
      { match: 2, team1: "Lucas & Pedro", team2: "A Definir", status: "Aguardando", time: "Sáb 09:30" }
    ],
    results: []
  },
  {
    id: 2,
    title: "Circuito Manakai de Areia",
    date: "12 e 13 de Novembro, 2026",
    location: "Complexo Presida - BSB",
    categories: ["Qualify", "Intermediário", "Open"],
    status: "active",
    description: "Um dos maiores circuitos do Centro-Oeste, valendo pontos cruciais para o ranking regional.",
    registered: [
      { id: 1, team: "Thiago & Vitor", category: "Open" },
      { id: 2, team: "Camila & Sara", category: "Intermediário" }
    ],
    brackets: [
      { match: 1, team1: "Thiago & Vitor", team2: "Bruno & Diego", status: "Em Andamento", time: "Agora" }
    ],
    results: [
      { match: 10, team1: "Thiago & Vitor", score1: 18, team2: "Marcos & Paulo", score2: 14, category: "Open" },
      { match: 11, team1: "Camila & Sara", score1: 18, team2: "Julia & Leticia", score2: 16, category: "Intermediário" }
    ]
  },
  {
    id: 3,
    title: "Rei da Praia - Finais 2026",
    date: "20 e 21 de Dezembro, 2026",
    location: "Arena BSB - Brasília",
    categories: ["Profissional Masculino", "Feminino"],
    status: "closed",
    description: "O grande encerramento da temporada coroando os Reis e Rainhas da praia de 2026.",
    registered: [],
    brackets: [],
    results: [
      { match: 50, team1: "Guga & Anderson", score1: 21, team2: "Felipe & Renan", score2: 19, category: "Profissional" }
    ]
  }
];

const mockRankings = [
  { rank: 1, name: "Thiago Silva", points: 1250, category: "Open", trend: "up" },
  { rank: 2, name: "Vitor Santos", points: 1180, category: "Open", trend: "same" },
  { rank: 3, name: "Bruno Costa", points: 950, category: "Open", trend: "down" },
  { rank: 1, name: "Camila Ferreira", points: 800, category: "Feminino", trend: "up" },
  { rank: 2, name: "Sara Martins", points: 750, category: "Feminino", trend: "up" },
];

const mockArenas = [
  { id: 1, name: "Arena Formosa", location: "Formosa, GO", courts: 4, type: "Areia Fina" },
  { id: 2, name: "Complexo Presida", location: "Brasília, DF", courts: 8, type: "Areia Tratada" },
  { id: 3, name: "Arena BSB", location: "Brasília, DF", courts: 12, type: "Areia de Praia" },
  { id: 4, name: "Nação Club", location: "Goiânia, GO", courts: 6, type: "Areia Fina" }
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  if (status === 'open') {
    return <span className="px-3 py-1 bg-[#ccff00]/10 text-[#ccff00] rounded-md text-xs font-bold uppercase tracking-wider border border-[#ccff00]/20 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Inscrições Abertas</span>;
  }
  if (status === 'active') {
    return <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-md text-xs font-bold uppercase tracking-wider border border-red-500/20 flex items-center gap-1 animate-pulse"><Play className="w-3 h-3" /> Ao Vivo</span>;
  }
  return <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md text-xs font-bold uppercase tracking-wider border border-gray-700 flex items-center gap-1"><Clock className="w-3 h-3" /> Finalizado</span>;
};

const EventCard = ({ event, onClick }) => (
  <div 
    onClick={() => onClick(event)}
    className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 flex flex-col h-full cursor-pointer hover:border-[#ccff00]/40 hover:shadow-[0_0_20px_rgba(204,255,0,0.05)] transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-4">
      <StatusBadge status={event.status} />
      <Flame className={`w-5 h-5 ${event.status === 'active' ? 'text-red-500' : 'text-[#ccff00]'}`} />
    </div>
    <h3 className="text-xl font-bold mb-4 uppercase leading-tight text-white group-hover:text-[#ccff00] transition-colors">{event.title}</h3>
    
    <div className="space-y-3 flex-grow text-sm text-gray-400 mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-[#ccff00] transition-colors"><Calendar className="w-4 h-4" /></div>
        <span>{event.date}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-[#ccff00] transition-colors"><MapPin className="w-4 h-4" /></div>
        <span>{event.location}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-[#ccff00] transition-colors"><Trophy className="w-4 h-4" /></div>
        <span>{event.categories.join(', ')}</span>
      </div>
    </div>
    
    <button className="w-full py-3 bg-white/5 text-white border border-white/10 rounded-xl font-bold uppercase tracking-wide group-hover:bg-[#ccff00] group-hover:text-black group-hover:border-[#ccff00] transition-all flex items-center justify-center gap-2 mt-auto">
      Ver Detalhes
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const EventDetails = ({ event, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <Activity className="w-4 h-4" /> },
    { id: 'brackets', label: 'Chaves', icon: <ListTree className="w-4 h-4" /> },
    { id: 'registered', label: 'Inscritos', icon: <Users className="w-4 h-4" /> },
    { id: 'results', label: 'Resultados', icon: <Award className="w-4 h-4" /> }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-[#ccff00] transition-colors font-semibold uppercase tracking-wider text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para Eventos
      </button>

      <div className="bg-[#1a1a1a] rounded-3xl border border-white/5 overflow-hidden mb-8">
        <div className="p-8 md:p-12 bg-gradient-to-br from-[#1a1a1a] to-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ccff00]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <div className="mb-4 inline-block">
              <StatusBadge status={event.status} />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">{event.title}</h1>
            <p className="text-gray-400 text-lg max-w-2xl">{event.description}</p>
          </div>
        </div>

        {/* Tabs Menu */}
        <div className="flex overflow-x-auto border-b border-white/5 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-bold uppercase tracking-wider text-sm whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'border-[#ccff00] text-[#ccff00] bg-white/5' 
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase text-white border-l-4 border-[#ccff00] pl-3">Informações</h3>
                <div className="bg-black/50 rounded-2xl p-6 border border-white/5 space-y-4">
                  <div className="flex items-center gap-4 text-gray-300">
                    <Calendar className="w-5 h-5 text-[#ccff00]" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Data</p>
                      <p className="font-semibold">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <MapPin className="w-5 h-5 text-[#ccff00]" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Local</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase text-white border-l-4 border-[#ccff00] pl-3">Categorias</h3>
                <div className="flex flex-wrap gap-2">
                  {event.categories.map((cat, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-semibold">{cat}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'brackets' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold uppercase text-white border-l-4 border-[#ccff00] pl-3">Próximos Confrontos</h3>
              {event.brackets.length === 0 ? (
                <div className="text-gray-500 text-center py-12 bg-black/30 rounded-2xl border border-white/5">Nenhum confronto gerado ainda.</div>
              ) : (
                <div className="grid gap-4">
                  {event.brackets.map(bracket => (
                    <div key={bracket.match} className="flex flex-col md:flex-row justify-between items-center bg-black/50 p-6 rounded-2xl border border-white/5 gap-4">
                      <div className="flex-1 text-center md:text-right font-bold text-lg text-white">{bracket.team1}</div>
                      <div className="px-4 py-2 bg-[#1a1a1a] rounded-lg text-xs font-bold uppercase text-[#ccff00] border border-white/10 text-center">
                        <span className="block text-gray-500 mb-1">Jogo {bracket.match}</span>
                        {bracket.time}
                      </div>
                      <div className="flex-1 text-center md:text-left font-bold text-lg text-white">{bracket.team2}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'registered' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold uppercase text-white border-l-4 border-[#ccff00] pl-3">Duplas Confirmadas</h3>
              {event.registered.length === 0 ? (
                 <div className="text-gray-500 text-center py-12 bg-black/30 rounded-2xl border border-white/5">Nenhum atleta inscrito.</div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {event.registered.map(reg => (
                    <div key={reg.id} className="bg-black/50 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{reg.team}</div>
                        <div className="text-xs text-[#ccff00] font-semibold uppercase">{reg.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold uppercase text-white border-l-4 border-[#ccff00] pl-3">Placares Finais</h3>
              {event.results.length === 0 ? (
                 <div className="text-gray-500 text-center py-12 bg-black/30 rounded-2xl border border-white/5">Sem resultados disponíveis.</div>
              ) : (
                <div className="grid gap-4">
                  {event.results.map(res => (
                    <div key={res.match} className="flex flex-col md:flex-row justify-center items-center bg-black/50 p-6 rounded-2xl border border-white/5 gap-6">
                      <div className={`flex-1 text-center md:text-right font-bold text-lg ${res.score1 > res.score2 ? 'text-[#ccff00]' : 'text-white'}`}>{res.team1}</div>
                      <div className="flex items-center gap-4 bg-[#1a1a1a] px-6 py-3 rounded-xl border border-white/10">
                        <span className={`text-2xl font-black ${res.score1 > res.score2 ? 'text-[#ccff00]' : 'text-gray-400'}`}>{res.score1}</span>
                        <span className="text-gray-600 text-sm font-bold">X</span>
                        <span className={`text-2xl font-black ${res.score2 > res.score1 ? 'text-[#ccff00]' : 'text-gray-400'}`}>{res.score2}</span>
                      </div>
                      <div className={`flex-1 text-center md:text-left font-bold text-lg ${res.score2 > res.score1 ? 'text-[#ccff00]' : 'text-white'}`}>{res.team2}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RankingsView = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">Ranking <span className="text-[#ccff00]">Guga</span></h2>
      <p className="text-gray-400 mt-2">Classificação oficial dos atletas no circuito.</p>
    </div>
    
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-black/50 border-b border-white/5">
            <tr>
              <th className="p-4 text-gray-500 font-bold uppercase text-sm">Pos</th>
              <th className="p-4 text-gray-500 font-bold uppercase text-sm">Atleta</th>
              <th className="p-4 text-gray-500 font-bold uppercase text-sm">Categoria</th>
              <th className="p-4 text-gray-500 font-bold uppercase text-sm text-right">Pontos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockRankings.map((rank, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-black text-sm ${
                    rank.rank === 1 ? 'bg-[#ccff00] text-black' : 
                    rank.rank === 2 ? 'bg-gray-300 text-black' : 
                    rank.rank === 3 ? 'bg-orange-400 text-black' : 'bg-white/5 text-gray-400'
                  }`}>
                    {rank.rank}
                  </span>
                </td>
                <td className="p-4 font-bold text-white">{rank.name}</td>
                <td className="p-4 text-gray-400 text-sm font-semibold">{rank.category}</td>
                <td className="p-4 text-right font-black text-[#ccff00]">{rank.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ArenasView = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">Arenas <span className="text-[#ccff00]">Parceiras</span></h2>
      <p className="text-gray-400 mt-2">Os melhores complexos de esportes de areia homologados.</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockArenas.map(arena => (
        <div key={arena.id} className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 flex items-start gap-4 hover:border-white/10 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-[#ccff00] shrink-0">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{arena.name}</h3>
            <p className="text-gray-400 text-sm flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" /> {arena.location}</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded font-semibold uppercase">{arena.courts} Quadras</span>
              <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded font-semibold uppercase">{arena.type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('events'); // events, rankings, arenas, eventDetails
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (view, event = null) => {
    setCurrentView(view);
    if (event) setSelectedEvent(event);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const NavLinks = () => (
    <>
      <button onClick={() => navigate('events')} className={`font-semibold text-sm uppercase tracking-wider transition-colors ${currentView === 'events' && !selectedEvent ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'}`}>Eventos</button>
      <button onClick={() => navigate('rankings')} className={`font-semibold text-sm uppercase tracking-wider transition-colors ${currentView === 'rankings' ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'}`}>Ranking</button>
      <button onClick={() => navigate('arenas')} className={`font-semibold text-sm uppercase tracking-wider transition-colors ${currentView === 'arenas' ? 'text-[#ccff00]' : 'text-gray-400 hover:text-white'}`}>Arenas</button>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#ccff00] selection:text-black">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('events')}>
              <Activity className="text-[#ccff00] w-8 h-8" />
              <span className="font-extrabold text-2xl tracking-tighter uppercase text-white">Guga<span className="text-[#ccff00]">.</span></span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center">
              <NavLinks />
              <button className="px-5 py-2.5 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-all font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                <Users className="w-4 h-4" /> Entrar
              </button>
            </nav>

            {/* Mobile Toggle */}
            <button className="md:hidden text-gray-300 hover:text-[#ccff00]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-b border-white/5 px-4 py-4 flex flex-col gap-4">
            <NavLinks />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh]">
        {currentView === 'events' && (
          <div className="animate-in fade-in duration-500">
             <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">Próximos <span className="text-[#ccff00]">Torneios</span></h2>
                <p className="text-gray-400 mt-2">Escolha seu evento, acompanhe chaves e resultados ao vivo.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map(event => (
                <EventCard key={event.id} event={event} onClick={(e) => navigate('eventDetails', e)} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'eventDetails' && selectedEvent && (
          <EventDetails event={selectedEvent} onBack={() => navigate('events')} />
        )}

        {currentView === 'rankings' && <RankingsView />}
        {currentView === 'arenas' && <ArenasView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Activity className="w-5 h-5" />
            <span className="font-extrabold text-lg tracking-tighter uppercase">Guga<span className="text-[#ccff00]">.</span></span>
          </div>
          <div className="text-gray-600 text-sm font-semibold uppercase tracking-wider">
            &copy; 2026 Guga SPA. Gestão Esportiva.
          </div>
        </div>
      </footer>
    </div>
  );
}