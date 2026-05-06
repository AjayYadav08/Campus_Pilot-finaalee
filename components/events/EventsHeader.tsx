import React from 'react';
import { MessageCircle, Rocket, UserPlus } from 'lucide-react';
import { Team } from './types';
import { useTutorial } from '../tutorial/TutorialContext';

interface EventsHeaderProps {
  showTeamsView: boolean;
  setShowTeamsView: (val: boolean) => void;
  setActiveTeam: (team: Team | null) => void;
  setShowTeamMembers: (val: boolean) => void;
  setShowCreateTeamForm: (val: boolean) => void;
  setShowJoinTeamView: (val: boolean) => void;
  teams: Team[];
  showCreateTeamForm: boolean;
  showJoinTeamView: boolean;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({
  showTeamsView,
  setShowTeamsView,
  setActiveTeam,
  setShowTeamMembers,
  setShowCreateTeamForm,
  setShowJoinTeamView,
  teams,
  showCreateTeamForm,
  showJoinTeamView
}) => {
  const { activeFlow, currentStepIndex, advanceStep, resetAllFlows } = useTutorial();

  return (
    <div className="px-8 pt-10 flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <button 
          onClick={resetAllFlows}
          className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative"
          title="Replay Onboarding Tutorial"
        >
          <span className="text-[18px] font-black text-white group-hover:rotate-12 transition-transform">⚡</span>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <Rocket className="w-3 h-3 text-blue-600" />
          </div>
        </button>
        <div>
          <h1 className="text-4xl font-black text-slate-900">Event Artemis</h1>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Discover & Participate</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* YOUR TEAMS BUTTON */}
        <button
          id="tour-teams-tab"
          onClick={() => { 
            setShowTeamsView(!showTeamsView); 
            setActiveTeam(null); 
            setShowTeamMembers(false); 
            setShowCreateTeamForm(false); 
            setShowJoinTeamView(false);
            
            if (activeFlow === 'homepage' && currentStepIndex === 3) {
              advanceStep();
            }
          }}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all border-2 shadow-sm ${
            showTeamsView
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-200'
              : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          Your Teams
          <span className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-black ${showTeamsView ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'}`}>{teams.length}</span>
        </button>

        {/* New & Join Action Buttons (Only when Your Teams is active) */}
        {showTeamsView && (
          <div className="flex items-center gap-2  slide-in-from-right-4 ">
            <button
              id="tour-create-team-btn"
              onClick={() => { setShowCreateTeamForm(true); setShowJoinTeamView(false); setActiveTeam(null); }}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                showCreateTeamForm 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200' 
                  : 'bg-white text-emerald-600 border-emerald-100 hover:bg-emerald-50'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              New Team
            </button>
            <button
              id="tour-team-search"
              onClick={() => { setShowJoinTeamView(true); setShowCreateTeamForm(false); setActiveTeam(null); }}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                showJoinTeamView 
                  ? 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-200' 
                  : 'bg-white text-amber-600 border-amber-100 hover:bg-amber-50'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Join Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsHeader;
