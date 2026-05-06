import { TutorialStep } from '../TutorialOverlay';

export type FlowId = 'homepage' | 'teams' | 'team_details' | 'event_details' | 'calendar';

export const TUTORIAL_FLOWS: Record<FlowId, TutorialStep[]> = {
  homepage: [
    {
      targetId: 'tour-filter',
      title: 'Smart Filters',
      content: 'Use these filters to quickly find specific types of events like Hackathons, Workshops, or Fests.',
      position: 'bottom'
    },
    {
      targetId: 'tour-closing',
      title: 'Closing Soon',
      content: 'These events are starting or closing registration soon. Act fast to secure your spot!',
      position: 'top'
    },
    {
      targetId: 'tour-mini-calendar',
      title: 'Quick Calendar',
      content: 'Keep track of your schedule here. You can click to select dates and filter events.',
      position: 'left'
    },
    {
      targetId: 'tour-teams-tab',
      title: 'Your Teams',
      content: 'Click here to manage your hackathon teams, chat with members, and find new teammates!',
      position: 'bottom',
      requiresAction: true, // User must click the tab to proceed
    }
  ],
  teams: [
    {
      targetId: 'tour-team-search',
      title: 'Find Teams',
      content: 'Search for existing teams or filter by hackathons to find the perfect group to join.',
      position: 'bottom'
    },
    {
      targetId: 'tour-create-team-btn',
      title: 'Create a Team',
      content: 'Have an idea? Create your own team and become the Team Lead!',
      position: 'bottom'
    },
    {
      targetId: 'tour-my-teams-list',
      title: 'Your Active Teams',
      content: 'Access all your current teams here. Click on a team to open the Team Portal.',
      position: 'top'
    }
  ],
  team_details: [
    {
      targetId: 'tour-team-chat',
      title: 'Team Chat',
      content: 'Communicate with your teammates in real-time. Discuss strategies and share updates!',
      position: 'left'
    },
    {
      targetId: 'tour-team-members-btn',
      title: 'Manage Members',
      content: 'Click here to view team members, roles, and manage join requests.',
      position: 'bottom',
      requiresAction: true
    }
  ],
  event_details: [
    {
      targetId: 'tour-event-overview',
      title: 'Event Overview',
      content: 'Read all about the event, its format, and what you can expect.',
      position: 'bottom'
    },
    {
      targetId: 'tour-event-essentials',
      title: 'Key Details',
      content: 'Check eligibility, team sizes, registration fees, and prize pools at a glance.',
      position: 'left'
    },
    {
      targetId: 'tour-event-register',
      title: 'Secure Your Spot',
      content: 'Ready to join? Click here to register. You can also mark events as interested to save them for later.',
      position: 'bottom'
    }
  ],
  calendar: [
    {
      targetId: 'tour-cal-event-dot',
      title: 'Event Days',
      content: 'Days with a red dot have events scheduled. Dont miss out!',
      position: 'bottom'
    },
    {
      targetId: 'tour-cal-interested',
      title: 'Saved Events',
      content: 'Dates with a green border indicate events you are interested in.',
      position: 'bottom'
    },
    {
      targetId: 'tour-cal-registered',
      title: 'Your Schedule',
      content: 'Fully green dates mean you are registered for an event on that day. Get ready!',
      position: 'bottom'
    }
  ]
};
